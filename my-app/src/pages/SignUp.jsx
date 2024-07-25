import { useState, useContext } from "react";
import "../assets/style/SigUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/images/ListingPageImage.jpg";
import Footer from "../component/Footer";
import Header from "../component/header";
import { AuthContext } from "../hooks/AuthContext";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

        // Update context state
        login(userData);

        alert("Sign up successful!");
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };

  return (
    <>
      <Header />
      <section
        className="flex items-center justify-center h-screen signup-container"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center items-center w-[30rem] bg-white p-8 rounded-lg shadow-lg">
          <div className="w-full max-w-md signup-box">
            <h2 className="text-3xl font-semibold text-center text-[#000000] mb-6">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center py-2 border-gray-300 input-container">
                <i className="mr-2 text-gray-400 fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                />
              </div>
              <div className="flex items-center py-2 border-gray-300 input-container">
                <i className="mr-2 text-gray-400 fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                />
              </div>
              <div className="flex items-center py-2 border-gray-300 input-container">
                <i className="mr-2 text-gray-400 fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
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
                  className="w-full px-4 py-2 mt-4 font-bold text-gray-800 bg-gray-300 rounded login-btn hover:bg-gray-400"
                >
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default SignUp;
