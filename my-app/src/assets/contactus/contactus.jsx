import UseCreateUser from "./UseCreateUser";
import validateNewUser from "./validateNewUser";
import { useState } from "react";

const Contacts = () => {
  const { handleChange, values, handleSubmit, errors } =
    UseCreateUser(validateNewUser);
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
    setShowAlert(true);
  };

  return (
    <div className="min-h-screen bg-[--background] flex flex-col items-center p-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-7xl">
        <div className="relative">
          <img
            src="https://media.istockphoto.com/id/1131933936/photo/contact-us-call-customer-support.jpg?s=612x612&w=0&k=20&c=NJIdiFDH2wWvqrUcd36ELOTrhyBXpjt5VScoAB0UFFc="
            alt="Contact Us Banner"
            className="w-full h-[30rem] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
            <h1 className="text-4xl text-white font-extrabold">Contact Us</h1>
          </div>
        </div>
        <div className="p-8 lg:p-12 flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-1/2 p-6 lg:p-8">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Get in Touch
            </h2>
            <p className="text-gray-700 mb-10">
              Have questions, comments, or suggestions? Fill out the form, and
              we’ll get back to you as soon as possible.
            </p>
            <ul className="space-y-8">
              <li className="flex items-start space-x-4">
                <img
                  src="https://openui.fly.dev/openui/24x24.svg?text=📍"
                  alt="location-icon"
                  className="w-8 h-8 text-green-600"
                />
                <div className="text-gray-800">
                  <span className="block font-semibold">Address:</span>
                  <span>
                    1055 Arthur Ave, Elk Grove, 67, New Orleans, South Carolina
                  </span>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <img
                  src="https://openui.fly.dev/openui/24x24.svg?text=📞"
                  alt="phone-icon"
                  className="w-8 h-8 text-green-600"
                />
                <div className="text-gray-800">
                  <span className="block font-semibold">Phone:</span>
                  <span>+1 234 018 999 99</span>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <img
                  src="https://openui.fly.dev/openui/24x24.svg?text=✉️"
                  alt="email-icon"
                  className="w-8 h-8 text-green-600"
                />
                <div className="text-gray-800">
                  <span className="block font-semibold">Email:</span>
                  <span>contact@ourmail.com</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <form
              onSubmit={handleFormSubmit}
              className="bg-[--card] p-8 rounded-xl shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <input
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 w-full text-black placeholder-gray-500 focus:outline-none focus:border-[#17B169] focus:ring-1 focus:ring-[#17B169]"
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 w-full text-black placeholder-gray-500 focus:outline-none focus:border-[#17B169] focus:ring-1 focus:ring-[#17B169]"
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-8">
                <input
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 w-full text-black placeholder-gray-500 focus:outline-none focus:border-[#17B169] focus:ring-1 focus:ring-[#17B169]"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>
              <div className="mb-8">
                <input
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 w-full text-black placeholder-gray-500 focus:outline-none focus:border-[#17B169] focus:ring-1 focus:ring-[#17B169]"
                  placeholder="Your Number"
                  name="phone"
                  type="text"
                  value={values.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                )}
              </div>
              <div className="mb-8">
                <textarea
                  name="feed"
                  placeholder="Your message..."
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 w-full h-32 text-black placeholder-gray-500 focus:outline-none focus:border-[#17B169] focus:ring-1 focus:ring-[#17B169]"
                  value={values.feed}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-500 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {showAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-xl font-semibold mb-4">
                Thanks for your feedback!
              </p>
              <button
                onClick={() => setShowAlert(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
