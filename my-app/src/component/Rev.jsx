import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com"; // Import emailjs
import "../assets/style/Rev.css"; // Assuming you create a separate CSS file for custom styles
import Swal from "sweetalert2"; // If using modules
import SoldOut from "../assets/images/SoldOut.jpg";
import soldwhite from "../assets/images/soldwhite.png";
import Header from "./header";
import Footer from "./Footer";

const Rev = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [event, setEvent] = useState(null); // State to hold event data
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const [activeTab, setActiveTab] = useState("description"); // State to manage active tab
  const [highlightPrice, setHighlightPrice] = useState(false); // State to manage price highlight
  const [reviews, setReviews] = useState([]); // State to manage reviews
  const [comment, setComment] = useState({ name: "", email: "", text: "" }); // State to manage new comment
  const [totalTickets, setTotalTickets] = useState(0); // Total number of tickets
  const [soldTickets, setSoldTickets] = useState(0); // Number of sold tickets

  // Fetch event data and reviews when the component mounts or `id` changes
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/events/${id}.json`
        );
        const eventData = response.data;
        setEvent(eventData);
        setTotalTickets(eventData.details.totlaTicket || 0); // Set totalTickets
        setSoldTickets(eventData.details.soldTickets || 0); // Set soldTickets
      } catch (error) {
        console.error("Error fetching event data", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/reviews.json`
        );
        const allReviews = response.data ? Object.values(response.data) : [];
        // Filter reviews for the current event ID
        const filteredReviews = allReviews.filter(
          (review) => review.eventId === id
        );
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error.message, error.response);
      }
    };

    fetchEvent();
    fetchReviews();
  }, [id]);

  const isButtonVisible = totalTickets > 0 && totalTickets === soldTickets;

  const handleIncrement = () => {
    if (quantity < totalTickets - soldTickets) {
      setQuantity(quantity + 1);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Maximum limit reached",
        text: "You cannot select more tickets than available.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    setHighlightPrice(true);
    const timer = setTimeout(() => {
      setHighlightPrice(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [quantity]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({ ...prevComment, [name]: value }));
  };

  const generateCouponCode = () => {
    const discountPercentages = [10, 15, 25];
    const randomPercentage =
      discountPercentages[
        Math.floor(Math.random() * discountPercentages.length)
      ];
    return {
      couponCode: `COUPON-${Math.random()
        .toString(36)
        .substr(2, 8)
        .toUpperCase()}`,
      discountPercentage: randomPercentage,
    };
  };

  const sendCouponEmail = (toName, toEmail, couponCode, discountPercentage) => {
    emailjs
      .send(
        "service_797x9nb",
        "template_1x4qkha",
        {
          name: toName,
          email: toEmail,
          message: `Hello ${toName} (${toEmail}),\n\nThank you for your review! Here is your coupon code: ${couponCode}\n\nYou have received a ${discountPercentage}% discount.`,
        },
        "9jOoUtMBh9FcpJ1eR"
      )
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Thank you for your comment!",
          text: "Your email has been sent to the trip organizer to inquire about discounts for future trips with them.",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error sending email",
          text: error.text,
          confirmButtonText: "OK",
        });
      });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve user ID from localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData ? userData.id : null;

      // Check if user ID exists
      if (!userId) {
        console.error("User is not logged in.");
        return; // Exit if the user is not logged in
      }

      // Fetch existing reviews from Firebase
      const reviewsResponse = await axios.get(
        `https://tickets-73a3c-default-rtdb.firebaseio.com/reviews.json`
      );
      const reviews = Object.values(reviewsResponse.data || []);

      // Check if the user has already reviewed
      const userHasReviewed = reviews.some(
        (review) => review.userId === userId
      );

      if (!userHasReviewed) {
        // User has not reviewed yet, generate a coupon and send it
        const { couponCode, discountPercentage } = generateCouponCode();
        const newComment = {
          ...comment,
          eventId: id,
          userId, // Add user ID to comment
          couponCode, // Add coupon code to comment
        };

        // Save the review and coupon in Firebase
        await axios.post(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/reviews.json`,
          newComment
        );

        await axios.post(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/coupons.json`,
          { couponCode, email: comment.email, discountPercentage }
        );

        // Send coupon email
        await sendCouponEmail(
          comment.name,
          comment.email,
          couponCode,
          discountPercentage
        );
      } else {
        // User has already reviewed, just save the review without coupon
        const newComment = {
          ...comment,
          eventId: id,
          userId, // Add user ID to comment
        };

        // Save the review in Firebase
        await axios.post(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/reviews.json`,
          newComment
        );
      }

      // Clear the comment form and update reviews
      setComment({ name: "", email: "", text: "" });
      setReviews((prevReviews) => [...prevReviews, { ...comment, userId }]);
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#519341]" />
      </div>
    );
  }

  const { details, mainDescription, mainImage, name, otherImages, title } =
    event;
  const totalPrice = (details.price * quantity).toFixed(2);

  const handlePayTickets = () => {
    if (!mainImage || !otherImages) {
      console.error("Images are not defined");
      return;
    }

    navigate("/CheckPayment", {
      state: {
        quantity,
        totalPrice,
        price: details.price,
        title,
        date: details.date,
        location: details.location,
        time: details.time,
        mainImage, // Ensure mainImage is correctly set
        otherImages, // Ensure otherImages is correctly set
        eventId: id, // Pass the event ID
      },
    });
  };
  return (
    <><Header/>
    <div className="p-8 mx-auto mb-8 font-sans tracking-wide max-lg:max-w-2xl">
      <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 text-center lg:sticky top-8">
          <div className=" p-4 flex items-center sm:h-[32rem] rounded-lg">
            <img
              src={mainImage}
              alt={name}
              className="w-full max-h-[30rem] rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 ">
            {otherImages.map((image, index) => (
              <div
                key={index}
                className=" p-4 flex items-center rounded-lg sm:h-[182px]"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-[15rem] rounded-lg "
                />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-xl">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600 mt-2 w-auto z-[-10000000000]">
              {mainDescription}
            </p>
            <br /> <br />{" "}
          </div>

          <form className="flex flex-col items-end space-y-4 ">
            <div className="flex items-center justify-end space-x-4">
              <div className="w-[11rem]">
                <div className={`mb-4 ${highlightPrice ? "highlight" : ""}`}>
                  <span className="text-lg font-medium">
                    Total Price: ${totalPrice}
                  </span>
                </div>
                <legend className="mb-4 text-xl font-medium">Quantity</legend>
                <div className="flex items-center space-x-1 ">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="px-2.5 py-1.5 text-xs text-[#519341] rounded-lg flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-20 h-12 text-center bg-green-100 border border-gray-300 rounded-md pl-7"
                  />

                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="px-2.5 py-1.5 text-xs text-[#519341] rounded-lg flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {isButtonVisible ? (
                <img
                  src={SoldOut}
                  alt={`${title} Sold Out`}
                  width="370"
                  height="200"
                  className="mt-[-2rem] mb-[-2rem] mx-auto"
                />
              ) : (
                <img
                  src={soldwhite}
                  alt={`${title} Sold Out`}
                  width="370"
                  height="200"
                  className="mt-[-2rem] mb-[-2rem] mx-auto "
                />
              )}
            </div>
            <button
              type="button"
              onClick={handlePayTickets}
              className={`w-full py-3 text-base font-medium text-white rounded-lg ${
                isButtonVisible
                  ? "bg-red-500 text-white"
                  : "bg-[#519341] text-white"
              }`}
              disabled={isButtonVisible}
            >
              Pay Tickets
            </button>
          </form>

          <div className="mt-10 border-b border-gray-200">
            <nav className="flex -mb-px space-x-8">
              <button
                onClick={() => handleTabChange("description")}
                className={`pb-4 px-1 text-base font-medium ${
                  activeTab === "description"
                    ? "border-[#519341] text-[#519341] border-b-2"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => handleTabChange("reviews")}
                className={`pb-4 px-1 text-base font-medium ${
                  activeTab === "reviews"
                    ? "border-[#519341] text-[#519341] border-b-2"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === "description" && (
              <>
                <div className="mt-4 text-sm text-gray-600">
                  <p>{details.eventDescription}</p>
                </div>
                <ul className="pl-4 mt-6 space-y-3 text-sm text-gray-600 list-disc">
                  <li>Date: {details.date}</li>
                  <li>Location: {details.location}</li>
                  <li>Time: {details.time}</li>
                  <li>Price: ${details.price}</li>
                  <li>Total tickets: {details.totlaTicket}</li>
                  <li>Sold tickets: {details.soldTickets}</li>
                </ul>
              </>
            )}
            {activeTab === "reviews" && (
              <div>
                <h3 className="mb-4 text-lg font-semibold">Reviews</h3>
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-gray-500">
                      There are no reviews yet. Be the first to leave a review!
                    </p>
                  ) : (
                    reviews.map((review, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg shadow bg-green-50"
                      >
                        <div className="flex items-center">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5mKo7TNAlFnR_IPJ9JWBKb4jNOzzlFFjrA&s"
                            alt={`${review.name}'s avatar`}
                            className="w-10 h-10 mr-4 rounded-full"
                          />
                          <div>
                            <p className="text-sm text-gray-600">
                              <strong>{review.name}</strong>: {review.text}
                            </p>
                            {/* <p className="mt-1 text-xs text-gray-400">
                  {new Date(review.date).toLocaleString()}
                </p> */}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <form className="mt-8 space-y-4" onSubmit={handleCommentSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={comment.name}
                      onChange={handleCommentChange}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm h-11 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={comment.email}
                      onChange={handleCommentChange}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm h-11 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Comment
                    </label>
                    <textarea
                      name="text"
                      value={comment.text}
                      onChange={handleCommentChange}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm"
                      rows="4"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 text-base font-medium text-white bg-[#519341] rounded-lg"
                    >
                      Submit Comment
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/></>
  );
};

export default Rev;
