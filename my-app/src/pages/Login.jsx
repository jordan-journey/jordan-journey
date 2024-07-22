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
        sessionStorage.setItem("users", JSON.stringify(users));
        console.log(users);

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
    <section className="signup-container flex justify-center items-center h-screen">
      <div className=" flex justify-center items-center  w-[30rem] bg-white p-8 rounded-lg shadow-lg">
        <div className="signup-box w-full max-w-md text-black">
          <h2 className="text-3xl font-semibold text-center text-black mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              className="login1-btn bg-[#519341] hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Login
            </button>
            <Link to="/SignUp">
              <button
                type="button"
                className="signup2-btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full mt-4"
              >
                Sign Up
              </button>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
