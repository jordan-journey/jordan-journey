import { useState } from "react";
import "../assets/style/SigUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../component/header";
import Footer from "../component/Footer";

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
        navigate("/")
        // alert("Sign up successful!");
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };

  return (
    <div>
      <Header/>
    <section className="flex signup-section">
      <div className="flex mt-20 signup-container ">
        <div className="text-black signup-box">
          <h2 className="text-white v">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
            <Link to="/Login">
              <button type="button" className="login-btn">
                Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
}

export default SignUp;
