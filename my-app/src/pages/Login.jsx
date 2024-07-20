import { useState } from "react";
import "../assets/style/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://tickets-73a3c-default-rtdb.firebaseio.com/users.json"
      );
      if (response.status === 200) {
        const users = response.data;
        let userFound = false;
        let id;

        for (let key in users) {
          if (users[key].email === email && users[key].password === password) {
            userFound = users[key];
            id = key;
            break;
          }
        }

        if (userFound) {
          // Login successful
          alert("Login successful!");

          // Create a user object with all details
          const user = {
            id: id,
            username: userFound.name,
            email: userFound.email,
          };

          // Save the user object to localStorage
          localStorage.setItem("userData", JSON.stringify(user));

          // Navigate to the home page
          navigate("/");
        } else {
          // Login failed
          alert("Invalid email or password.");
        }
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      alert("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="mb-20 forms-container">
      <div className="signup-container">
        <div className="signup-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="login1-btn">
              Login
            </button>
            <Link to="/SignUp">
              <button type="button" className="signup2-btn">
                Sign Up
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
