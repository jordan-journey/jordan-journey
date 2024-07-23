import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import coupon from "../assets/images/imgonline-com-ua-ReplaceColor-i5I62J4vDy9gr-removebg-preview.png";
import gif from "../assets/images/imggif.gif";
import Header from "./header";
import Footer from "./Footer";

const CheckPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    quantity,
    totalPrice: initialTotalPrice,
    price,
    title,
    date,
    location: eventLocation,
    time,
    mainImage,
    otherImages,
    eventId,
  } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [couponKey, setCouponKey] = useState(null);
  const [couponStatus, setCouponStatus] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false); // New state for payment completion

  const nextStep = () => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem("userData");

    // Only allow moving to the next step if user data is present
    if (userData) {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    } else {
      // Optionally show an alert or some feedback to the user
      Swal.fire({
        icon: "error",
        title: "Process Error",
        text: "Please Login First.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#d9534f",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const applyCoupon = async () => {
    try {
      const response = await axios.get(
        "https://tickets-73a3c-default-rtdb.firebaseio.com/coupons.json"
      );

      const coupons = response.data;
      if (coupons) {
        const couponKey = Object.keys(coupons).find(
          (key) => coupons[key].couponCode === couponCode
        );
        const coupon = couponKey ? coupons[couponKey] : null;

        if (coupon) {
          if (coupon.used) {
            Swal.fire({
              icon: "warning",
              title: "Coupon Already Used!",
              text: "This coupon has already been used. Please try a different one.",
              confirmButtonText: "Okay",
              confirmButtonColor: "#519341",
            });
            return;
          }

          const discountPercentage = coupon.discountPercentage;
          const totalPrice = Number(initialTotalPrice);

          if (isNaN(totalPrice)) {
            throw new Error("Initial total price is not a valid number.");
          }

          const discountAmount = (totalPrice * discountPercentage) / 100;
          const newTotalPrice = totalPrice - discountAmount;

          setDiscountedPrice(newTotalPrice.toFixed(2));
          setTotalPrice(totalPrice.toFixed(2));
          setCouponApplied(true);
          setCouponStatus(true);
          setCouponKey(couponKey);

          Swal.fire({
            icon: "success",
            title: "Coupon Applied Successfully!",
            text: "Enjoy a discount on your trip with us!",
            confirmButtonText: "Let’s Go!",
            confirmButtonColor: "#519341",
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Invalid Coupon Code!",
            text: "Oops! The coupon code didn’t work. Double-check and try again.",
            confirmButtonText: "Try Again!",
            confirmButtonColor: "#519341",
          });
        }
      } else {
        alert("No coupons found.");
      }
    } catch (error) {
      console.error("Error checking coupon code:", error);
      alert("Error checking coupon code.");
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      console.log("Payment details:", details);

      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData ? userData.id : null;

      if (!userId) {
        throw new Error("User ID is missing from localStorage");
      }

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Thank you for your purchase!",
        confirmButtonText: "Okay",
        confirmButtonColor: "#519341",
      });

      await axios.post(
        "https://tickets-73a3c-default-rtdb.firebaseio.com/orders.json",
        {
          userId: userId,
          paymentDetails: details,
          totalPrice: discountedPrice || initialTotalPrice,
          quantity: quantity,
          couponStatus: couponStatus,
          title: title,
          date: date,
          location: eventLocation,
        }
      );

      const eventId = location.state?.eventId;
      if (eventId) {
        const eventResponse = await axios.get(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/events/${eventId}.json`
        );

        const currentEventData = eventResponse.data;
        const currentSoldTickets = currentEventData.details?.soldTickets || 0;

        console.log("Current soldTickets:", currentSoldTickets);

        await axios.patch(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/events/${eventId}/details.json`,
          {
            soldTickets: currentSoldTickets + quantity,
          }
        );

        console.log("Updated soldTickets:", currentSoldTickets + quantity);
      } else {
        console.error("Event ID is missing");
      }

      if (couponStatus && couponKey) {
        await axios.patch(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/coupons/${couponKey}.json`,
          { used: true }
        );
      }

      setPaymentDetails(details);
      setPaymentCompleted(true); // Update payment completion status
      nextStep();
    } catch (error) {
      console.error(
        "Error processing payment:",
        error.response || error.message || error
      );
      Swal.fire({
        icon: "error",
        title: "Payment Error!",
        text: `There was an error processing your payment. Please try again. Error details: ${error.message}`,
        confirmButtonText: "Okay",
        confirmButtonColor: "#d9534f",
      });
    }
  };

  const handleOrderDetails = () => {
    if (!paymentDetails) {
      Swal.fire({
        icon: "error",
        title: "No Payment Details",
        text: "No payment details found. Please complete the payment first.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#d9534f",
      });
      return;
    }

    navigate("/order-details", {
      state: {
        orderDetails: {
          title,
          date,
          time,
          price,
          quantity,
          totalPrice: discountedPrice || totalPrice,
          mainImage,
          otherImages,
        },
        paymentDetails: {
          details: paymentDetails,
        },
      },
    });
  };

  return (
    <>
      <Header />
      <div className="font-sans bg-white p-8 lg:max-w-7xl max-w-xl mx-auto mt-10">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="bg-green-100 p-8 rounded-lg h-[30rem] shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <ul className="mt-6 space-y-6 text-gray-800">
              <li className="flex justify-between text-lg">
                <span>Location:</span>
                <span className="font-bold">{eventLocation}</span>
              </li>
              <li className="flex justify-between text-lg">
                <span>Date:</span>
                <span className="font-bold">{date}</span>
              </li>
              <li className="flex justify-between text-lg">
                <span>Time:</span>
                <span className="font-bold">{time} AM</span>
              </li>
              <li className="flex justify-between text-lg">
                <span>Price per Ticket:</span>
                <span className="font-bold">${price}</span>
              </li>
              <li className="flex justify-between text-lg">
                <span>Quantity of Tickets:</span>
                <span className="font-bold">{quantity}</span>
              </li>
              <li className="pt-4 text-lg font-bold border-t-2">
                {discountedPrice ? (
                  <div className="flex flex-col">
                    <span className="text-red-500 line-through">
                      Previous Total: ${totalPrice}
                    </span>
                    <span className="mt-2 text-gray-800">
                      Discounted Total: ${discountedPrice}
                    </span>
                  </div>
                ) : (
                  <span>Total Price: ${totalPrice}</span>
                )}
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2 max-lg:order-1">
            <div className="flex items-start space-x-6">
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className={`w-8 h-8 shrink-0 ${
                      currentStep >= 1
                        ? "bg-green-600"
                        : "bg-green-600 opacity-50"
                    } p-1.5 rounded-full text-white flex items-center justify-center text-lg font-bold`}
                  >
                    1
                  </div>
                  <div
                    className={`flex-grow h-1 ${
                      currentStep >= 2
                        ? "bg-green-600"
                        : "bg-green-600 opacity-50"
                    }`}
                  />
                  <div
                    className={`w-8 h-8 shrink-0 ${
                      currentStep >= 2
                        ? "bg-green-600"
                        : "bg-green-600 opacity-50"
                    } p-1.5 rounded-full text-white flex items-center justify-center text-lg font-bold`}
                  >
                    2
                  </div>
                  <div
                    className={`flex-grow h-1 ${
                      currentStep >= 3
                        ? "bg-green-600"
                        : "bg-green-600 opacity-50"
                    }`}
                  />
                  <div
                    className={`w-8 h-8 shrink-0 ${
                      currentStep >= 3
                        ? "bg-green-600"
                        : "bg-green-600 opacity-50"
                    } p-1.5 rounded-full text-white flex items-center justify-center text-lg font-bold`}
                  >
                    3
                  </div>
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              <div className="mt-12 px-6 py-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                  Have a Discount Code?
                </h2>
                <div className="flex items-center space-x-6 mb-6">
                  <img src={coupon} alt="Coupon Icon" className="w-16 h-16" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Discount Code"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={applyCoupon}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  >
                    Apply
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="mt-12 px-6 py-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                  Payment
                </h2>
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AWQjlXnJ7sd3brhAawVZd4KPIF93UxZKCY_OB8L0GfftCa6mmzOM-pDsBmQVJmYMrQgFcPg8jbm4q1jy",
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) =>
                      actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: discountedPrice || totalPrice,
                            },
                          },
                        ],
                      })
                    }
                    onApprove={(data, actions) =>
                      actions.order
                        .capture()
                        .then((details) => handlePaymentSuccess(details))
                    }
                  />
                </PayPalScriptProvider>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!paymentCompleted} // Disable the button based on payment status
                    className={`px-6 py-3 ${
                      paymentCompleted ? "bg-green-600" : "bg-gray-400"
                    } text-white font-semibold rounded-lg shadow-md hover:${
                      paymentCompleted ? "bg-green-700" : "bg-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center px-6 py-8 bg-white shadow-lg rounded-lg">
                <img
                  src={gif}
                  alt="Success Animation"
                  className="mx-auto mb-6 h-52 w-auto max-w-md"
                />
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                  Your payment went through smoothly. Thanks a bunch for
                  choosing us! 😊
                </h2>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleOrderDetails}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  >
                    View Order Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckPayment;
