import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../component/header";
import Footer from "../component/Footer";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData ? userData.id : null;
    const userEmail = userData ? userData.email.trim().toLowerCase() : ""; // Ensure email is trimmed and lowercased

    if (userId) {
      setId(userId);
      setEmail(userEmail);

      // Fetch user data
      axios
        .get(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/users/${userId}.json`
        )
        .then(async (response) => {
          console.log(response);
          const userData = await response.data;
          
          setName(userData.name);
        })
        .catch((error) => {
          console.error("Error fetching user data from Firebase:", error);
          alert("Error fetching user data. Please try again.");
        });

      // Fetch orders
      axios
        .get(`https://tickets-73a3c-default-rtdb.firebaseio.com/orders.json`)
        .then((response) => {
          const ordersData = response.data;
          if (ordersData) {
            const userOrders = Object.keys(ordersData)
              .filter((key) => ordersData[key].userId === userId)
              .map((key) => ({ id: key, ...ordersData[key] }));
            setOrders(userOrders);
          } else {
            setOrders([]);
          }
          setLoading(false);
          //   saveOrdersToFirebase(ordersData);
        })
        .catch((error) => {
          console.error("Error fetching orders from Firebase:", error);
          setError("Error fetching orders. Please try again.");
          setLoading(false);
        });

      // Fetch coupons
      axios
        .get(`https://tickets-73a3c-default-rtdb.firebaseio.com/coupons.json`)
        .then((response) => {
          const couponsData = response.data;
          if (couponsData) {
            const userCoupons = Object.keys(couponsData)
              .filter(
                (key) =>
                  couponsData[key].email.trim().toLowerCase() === userEmail
              )
              .map((key) => ({ id: key, ...couponsData[key] }));
            setCoupons(userCoupons);
          } else {
            setCoupons([]);
          }
          setLoading(false); // Set loading to false once coupons are fetched
        })
        .catch((error) => {
          console.error("Error fetching coupons from Firebase:", error);
          setError("Error fetching coupons. Please try again.");
          setLoading(false);
        });
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://tickets-73a3c-default-rtdb.firebaseio.com/users/${id}.json`,
        { name, email }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-r">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Profile Page
        </h1>
        <form className="space-y-6" onSubmit={handleUpdate}>
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Profile Information
          </h2>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
          >
            Update Profile
          </button>
        </form>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Orders</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading orders...</p>
          ) : error ? (
            <p className="text-center text-gray-800">{error}</p>
          ) : (
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-700">
                      Trip: {order.title}
                    </h3>
                    <p className="text-gray-600">Location: {order.location}</p>
                    <p className="text-gray-600">Date: {order.date}</p>
                    <p className="text-gray-600">
                      Total Price: {order.totalPrice}
                    </p>
                    <p className="text-gray-600">Quantity: {order.quantity}</p>

                    <h3 className="mt-4 text-lg font-semibold text-gray-700">
                      Payment Details:
                    </h3>
                    <ul className="text-gray-600">
                      <li>ID: {order.paymentDetails.id}</li>
                      <li>Status: {order.paymentDetails.status}</li>
                      <li>Intent: {order.paymentDetails.intent}</li>
                      <li>
                        Payer Name: {order.paymentDetails.payer.name.given_name}{" "}
                        {order.paymentDetails.payer.name.surname}
                      </li>
                      <li>
                        Payer Email: {order.paymentDetails.payer.email_address}
                      </li>
                      <li>
                        Amount:{" "}
                        {order.paymentDetails.purchase_units[0].amount.value}
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No orders found.</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Coupons</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading coupons...</p>
          ) : error ? (
            <p className="text-center text-gray-800">{error}</p>
          ) : (
            <div className="space-y-4">
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-700">
                      Coupon Code: {coupon.couponCode}
                    </h3>
                    <p className="text-gray-600">
                      Discount: {coupon.discountPercentage}%
                    </p>
                    <p className="text-gray-600">
                      Used: {coupon.used ? "Yes" : "No"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No coupons found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
