import { useState, useContext } from "react";
import "../assets/style/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../component/header";
import Footer from "../component/Footer";
import { AuthContext } from "../hooks/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://tickets-73a3c-default-rtdb.firebaseio.com/users.json"
      );
      if (response.status === 200) {
        const users = response.data;
        let userFound = null;
        let id;

        for (let key in users) {
          if (users[key].email === email && users[key].password === password) {
            userFound = users[key];
            id = key;
            break;
          }
        }

        if (userFound) {
          alert("Login successful!");

          // Consolidate user data into one object
          const userData = {
            id: id,
            username: userFound.name,
            email: userFound.email,
          };

          // Store user data as a JSON string in localStorage
          localStorage.setItem("userData", JSON.stringify(userData));

          // Update context state
          login(userData);

          navigate(`/`); // Navigate to the home page or desired route
        } else {
          alert("Invalid email or password.");
        }
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      alert("Error fetching data. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <section className="flex items-center justify-center h-screen signup-container">
        <div className="flex justify-center items-center w-[30rem] bg-white p-8 rounded-lg shadow-lg">
          <div className="w-full max-w-md text-black signup-box">
            <h2 className="mb-6 text-3xl font-semibold text-center text-black">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                className="login1-btn bg-[#519341] hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Login
              </button>
              <Link to="/SignUp">
                <button
                  type="button"
                  className="w-full px-4 py-2 mt-4 font-bold text-gray-800 bg-gray-300 rounded signup2-btn hover:bg-gray-400"
                >
                  Sign Up
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

export default Login;
