import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com"; // Import emailjs
import "../assets/style/Rev.css"; // Assuming you create a separate CSS file for custom styles
import Swal from "sweetalert2"; // If using modules
import SoldOut from "../assets/images/SoldOut.jpg";
import soldwhite from "../assets/images/soldwhite.png";
import Header from "./header";
import Footer from "./Footer";
import Modal from "react-modal";
import { motion } from "framer-motion";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const toastShown = useRef(false);

  const [isSoldOutModalOpen, setIsSoldOutModalOpen] = useState(true); // Open by default

  const closeSoldOutModal = () => {
    setIsSoldOutModalOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!toastShown.current) {
        Toastify({
          text: "🌟 Leave a review to get a coupon! 🎟️",
          duration: 5000, // Duration in milliseconds
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center`, `right`
          backgroundColor: "#4CAF50", // Green color for the background
          stopOnFocus: true, // Prevents the toast from closing on mouse hover
          offset: {
            x: 20, // Horizontal offset
            y: 100, // Vertical offset (distance from the top)
          },
        }).showToast();

        toastShown.current = true; // Mark toast as shown
      }
    }, 5000); // Delay in milliseconds

    // Cleanup function to clear the timer if the component unmounts before the delay completes
    return () => clearTimeout(timer);
  }, []);

  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        if (eventData.details.totlaTicket <= eventData.details.soldTickets) {
          setIsSoldOutModalOpen(true);
        } else {
          setIsSoldOutModalOpen(false);
        }
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
          text: "Your email has been sent to the trip organizer, check the coupon code in your profile.",
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
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "You need to be logged in to to applay a review ",
          confirmButtonText: "OK",
        });
        return; // Exit if the user is not authenticated
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
      Toastify({
        text: "✅ Thank you for your review! !",
        duration: 5000, // Duration in milliseconds
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center`, `right`
        backgroundColor: "#4CAF50", // Green color for the background
        stopOnFocus: true, // Prevents the toast from closing on mouse hover
        offset: {
          x: 20, // Horizontal offset
          y: 50, // Vertical offset (distance from the top)
        },
      }).showToast();

      toastShown.current = true; // Mark toast as shown
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
    <>
      {/* Modal for Sold Out */}
      <Modal
        isOpen={isSoldOutModalOpen}
        onRequestClose={closeSoldOutModal}
        contentLabel="Sold Out Modal"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <button
            onClick={closeSoldOutModal}
            className="absolute top-3 right-3 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={SoldOut}
            alt="Sold Out"
            className="w-full h-auto object-contain"
          />
        </div>
      </Modal>

      <Header />
      <main className="p-6 mx-auto max-w-screen-xl space-y-16">
        {/* Hero Section */}
        <section className="relative mb-16">
          <div className="relative">
            <img
              src={mainImage}
              alt={name}
              className="w-full h-[50vh] object-cover rounded-xl shadow-xl"
            />
            <div className="absolute bottom-6 left-6 bg-white bg-opacity-85 p-6 rounded-lg shadow-xl">
              <h2 className="text-4xl font-extrabold text-gray-900">{title}</h2>
              <p className="mt-2 text-gray-700">{mainDescription}</p>
            </div>
          </div>
        </section>
        {/* Event Details Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-3xl font-bold text-[#519341] mb-6">
            Event Details
          </h3>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Event Information
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <span className="text-gray-500 mr-2">📅</span>
                    <strong>Date:</strong> {details.date}
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-gray-500 mr-2">📍</span>
                    <strong>Location:</strong> {details.location}
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-gray-500 mr-2">⏰</span>
                    <strong>Time:</strong> {details.time}
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-gray-500 mr-2">💲</span>
                    <strong>Price:</strong> ${details.price}
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-gray-500 mr-2">🎫</span>
                    <strong>Total tickets:</strong> {details.totlaTicket}
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-gray-500 mr-2">✅</span>
                    <strong>Sold tickets:</strong> {details.soldTickets}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Description
                </h4>
                <p className="text-gray-700">{details.eventDescription}</p>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Tickets
              </h4>
              <div
                className={`mb-4 ${
                  highlightPrice ? "bg-yellow-100 border border-yellow-500" : ""
                }`}
              >
                <span className="text-xl font-medium text-gray-800">
                  Total Price: ${totalPrice}
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="px-4 py-2 text-white bg-[#519341] rounded-lg flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
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
                  className="w-16 h-12 text-center bg-green-100 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="px-4 py-2 text-white bg-[#519341] rounded-lg flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
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
              <button
                type="button"
                onClick={handlePayTickets}
                className={`w-full py-3 mt-4 text-base font-medium text-white rounded-lg ${
                  isButtonVisible ? "bg-red-500" : "bg-[#519341]"
                }`}
                disabled={isButtonVisible}
              >
                Pay Tickets
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section>
          <h3 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Gallery
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-2">
            {otherImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-md cursor-pointer group"
                onClick={() => openModal(image)}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                  style={{ width: "100%", height: "20rem" }} // Ensure full width
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold">
                    View Image
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Image Preview */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Image Modal"
            className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75"
          >
            <div className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={currentImage}
                alt="Current Gallery"
                className="w-full h-auto object-contain"
              />
            </div>
          </Modal>
        </section>

        {/* Reviews Section */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Reviews
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-xl">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-500">
                  There are no reviews yet. Be the first to leave a review!
                </p>
              ) : (
                <div
                  className={`space-y-8 ${
                    reviews.length > 3 ? "max-h-80 overflow-y-scroll" : ""
                  }`}
                >
                  {reviews.slice(0, 3).map((review, index) => (
                    <div
                      key={index}
                      className="p-6 bg-green-50 rounded-lg shadow-lg flex items-center space-x-4"
                    >
                      <img
                        src={
                          review.avatar ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5mKo7TNAlFnR_IPJ9JWBKb4jNOzzlFFjrA&s"
                        }
                        alt={`${review.name}'s avatar`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">
                          {review.name}
                        </h4>
                        <p className="mt-2 text-gray-700">{review.text}</p>
                      </div>
                    </div>
                  ))}
                  {reviews.length > 3 && (
                    <div className="space-y-8">
                      {reviews.slice(3).map((review, index) => (
                        <div
                          key={index}
                          className="p-6 bg-green-50 rounded-lg shadow-lg flex items-center space-x-4"
                        >
                          <img
                            src={
                              review.avatar ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5mKo7TNAlFnR_IPJ9JWBKb4jNOzzlFFjrA&s"
                            }
                            alt={`${review.name}'s avatar`}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900">
                              {review.name}
                            </h4>
                            <p className="mt-2 text-gray-700">{review.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="mt-12">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Leave a Review
              </h4>
              <form
                className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto"
                onSubmit={handleCommentSubmit}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={comment.name}
                    onChange={handleCommentChange}
                    required
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={comment.email}
                    onChange={handleCommentChange}
                    required
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Comment
                  </label>
                  <textarea
                    name="text"
                    value={comment.text}
                    onChange={handleCommentChange}
                    required
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm"
                    rows="4"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-500 transition-transform duration-200"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Rev;
