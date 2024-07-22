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
  console.log(eventId);

  const [currentStep, setCurrentStep] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [couponKey, setCouponKey] = useState(null);
  const [couponStatus, setCouponStatus] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const applyCoupon = async () => {
    try {
      const response = await axios.get(
        `https://tickets-73a3c-default-rtdb.firebaseio.com/coupons.json`
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
          setCouponStatus(true); // Set coupon status to true
          setCouponKey(couponKey); // Store coupon key for later use

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
      console.log("Payment details:", details); // Debugging

      // Get user ID from localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData ? userData.id : null;

      // If userId is not available, handle accordingly
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

      // Record the order
      await axios.post(
        "https://tickets-73a3c-default-rtdb.firebaseio.com/orders.json",
        {
          userId: userId, // Include user ID
          paymentDetails: details,
          totalPrice: discountedPrice || initialTotalPrice,
          quantity: quantity,
          couponStatus: couponStatus, // Include coupon status
          title: title, // Include event title
          date: date, // Include event date
          location: eventLocation, // Include event location
        }
      );

      const eventId = location.state?.eventId;
      if (eventId) {
        // Fetch the current event data
        const eventResponse = await axios.get(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/events/${eventId}.json`
        );

        const currentEventData = eventResponse.data;
        const currentSoldTickets = currentEventData.details?.soldTickets || 0;

        console.log("Current soldTickets:", currentSoldTickets); // Debugging

        // Increment the soldTickets field by the quantity of tickets purchased
        await axios.patch(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/events/${eventId}/details.json`,
          {
            soldTickets: currentSoldTickets + quantity,
          }
        );

        console.log("Updated soldTickets:", currentSoldTickets + quantity); // Debugging
      } else {
        console.error("Event ID is missing");
      }

      // Update coupon status if a coupon was applied
      if (couponStatus && couponKey) {
        await axios.patch(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/coupons/${couponKey}.json`,
          { used: true }
        );
      }

      setPaymentDetails(details); // Store payment details in state
      nextStep(); // Proceed to confirmation step
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
    <Header/>
      <div className="font-[sans-serif] bg-white p-4 lg:max-w-7xl max-w-xl mx-auto mt-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="bg-[#ade5a0] p-6 rounded-md h-[27rem]">
            <h2 className="text-2xl font-extrabold text-gray-800">{title}</h2>
            <div className="bg-[#ade5a0] p-6 rounded-md">
              <ul className="mt-8 space-y-4 text-gray-800">
                <li className="flex flex-wrap gap-4 text-sm">
                  Location{" "}
                  <span className="ml-auto font-bold">{eventLocation}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Date: <span className="ml-auto font-bold">{date}</span>
                </li>{" "}
                <li className="flex flex-wrap gap-4 text-sm">
                  Time: <span className="ml-auto font-bold">{time} AM</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Price per Ticket:{" "}
                  <span className="ml-auto font-bold">${price}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Quantity of tickets:{" "}
                  <span className="ml-auto font-bold">{quantity}</span>
                </li>
                <li className="flex flex-col gap-4 pt-4 text-sm font-bold border-t-2">
                  {discountedPrice ? (
                    <>
                      <div className="flex flex-col">
                        <span className="text-red-500 line-through">
                          Previous Total: ${totalPrice}
                        </span>
                        <span className="mt-2 font-bold text-gray-800">
                          Discounted Total: ${discountedPrice}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="ml-auto font-bold">
                      Total Price: ${totalPrice}
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-2 max-lg:order-1">
            <div className="flex items-start">
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className={`w-8 h-8 shrink-0 mx-[-1px] ${
                      currentStep >= 1
                        ? "bg-[#519341]"
                        : "bg-[#519341] opacity-50"
                    } p-1.5 flex items-center justify-center rounded-full`}
                  >
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                  <div
                    className={`w-full h-[3px] mx-4 rounded-lg ${
                      currentStep >= 2
                        ? "bg-[#519341]"
                        : "bg-[#519341] opacity-50"
                    }`}
                  ></div>
                </div>
                <div className="mt-2 mr-4">
                  <h6 className="text-sm font-bold text-gray-800">Coupon</h6>
                </div>
                {currentStep === 1 && (
                  <div className="flex flex-col items-center mt-4">
                    <img
                      src={coupon}
                      alt="Coupon"
                      className="w-[20rem] h-[16rem] " // Adjust the size as needed
                    />
                    <div className="w-full max-w-md mt-4">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter coupon code (optional)"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 mt-2 bg-[#519341] text-white rounded-md w-full"
                      >
                        Apply Coupon
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className={`w-8 h-8 shrink-0 mx-[-1px] ${
                      currentStep >= 2
                        ? "bg-[#519341]"
                        : "bg-[#519341] opacity-50"
                    } p-1.5 flex items-center justify-center rounded-full`}
                  >
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                  <div
                    className={`w-full h-[3px] mx-4 rounded-lg ${
                      currentStep >= 3
                        ? "bg-[#519341]"
                        : "bg-[#519341] opacity-50"
                    }`}
                  ></div>
                </div>
                <div className="mt-2 mr-4">
                  <h6 className="text-sm font-bold text-gray-800">Payment</h6>
                </div>
                {currentStep === 2 && (
                  <div className="p-2 rounded-lg mt-4 border-[#519341] border-2">
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AWQjlXnJ7sd3brhAawVZd4KPIF93UxZKCY_OB8L0GfftCa6mmzOM-pDsBmQVJmYMrQgFcPg8jbm4q1jy",
                        currency: "USD",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: discountedPrice || totalPrice,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order
                            .capture()
                            .then(handlePaymentSuccess);
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}
              </div>

              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className={`w-8 h-8 shrink-0 mx-[-1px] ${
                      currentStep >= 3
                        ? "bg-[#519341]"
                        : "bg-[#519341] opacity-50"
                    } p-1.5 flex items-center justify-center rounded-full`}
                  >
                    <span className="text-sm font-bold text-white">3</span>
                  </div>
                </div>
                <div className="mt-2 mr-4">
                  <h6 className="text-sm font-bold text-gray-800">
                    Confirmation
                  </h6>
                </div>
                {currentStep === 3 && (
                  <div className="p-4 rounded-lg mt-4 border-[#519341] border-2 bg-white shadow-md">
                    <div className="flex flex-col items-center">
                      <img
                        src={gif} // Replace with your image URL
                        alt="Confirmation"
                        className="w-64 h-32 mb-4 object-cover rounded-lg border-4 border-[#519341]"
                      />
                      <h2 className="text-xl font-bold text-green-700">
                        Awesome!
                      </h2>
                      <p className="mt-4 text-lg text-center text-gray-800">
                        Your payment went through smoothly. Thanks a bunch for
                        choosing us! 😊
                      </p>
                      <button
                        onClick={handleOrderDetails}
                        className="px-6 py-3 mt-6 bg-[#519341] text-white rounded-lg shadow-md hover:bg-[#417a2c] transition duration-300"
                      >
                        Order details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-[#519341] text-white rounded-md"
            disabled={currentStep === 1}
          >
            Previous
          </button>
          {!(currentStep === 2 || currentStep === 3) && (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-[#519341] text-white rounded-md"
              disabled={currentStep === 2}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CheckPayment;
