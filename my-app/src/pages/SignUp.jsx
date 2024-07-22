import { useState } from "react";
import "../assets/style/SigUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/images/ListingPageImage.jpg";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://tickets-73a3c-default-rtdb.firebaseio.com/users.json",
        {
          name,
          email,
          password,
        }
      );

      if (response.status === 200) {
        const userData = {
          id: response.data.name,
          username: name,
          email: email,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        alert("Sign up successful!");
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };

  return (
    <section
      className="signup-container flex justify-center items-center h-screen"
      style={{
        backgroundImage: { Image },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" flex justify-center items-center  w-[30rem] bg-white  p-8 rounded-lg shadow-lg">
        <div className="signup-box w-full max-w-md ">
          <h2 className="text-3xl font-semibold text-center text-[#000000] mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="input-container flex items-center   border-gray-300 py-2">
              <i className="fas fa-user mr-2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
            <div className="input-container flex items-center   border-gray-300 py-2">
              <i className="fas fa-envelope mr-2 text-gray-400"></i>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
            <div className="input-container flex items-center   border-gray-300 py-2">
              <i className="fas fa-lock mr-2 text-gray-400"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="signup-btn bg-[#519341] hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Sign Up
            </button>
            <Link to="/Login">
              <button
                type="button"
                className="login-btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full mt-4"
              >
                Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
