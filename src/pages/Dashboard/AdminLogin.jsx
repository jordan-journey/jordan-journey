import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbURL } from "./Config";

function AdminLogin() {
  let navigate = useNavigate();
  const [formdata, setFormdata] = useState({ email: "", pass: "" });
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.get(`${dbURL}/Admin.json`);
      const admins = response.data;

      console.log("Admins from Firebase:", admins); // Log the retrieved data for debugging

      const admin = Object.values(admins).find((adminObj) => {
        // Remove extra spaces from email and password
        const email = adminObj.email ? adminObj.email.trim() : "";
        const password = adminObj.pasword ? adminObj.pasword.trim() : ""; // Note: Using 'pasword' as per your data structure

        console.log("Checking admin:", email, password); // Log the values being checked

        return (
          email === formdata.email.trim() && password === formdata.pass.trim()
        );
      });

      if (admin) {
        sessionStorage.setItem("AdminID", admin.src);
        navigate("/Said"); // Redirect to the home page or another route
      } else {
        setError("البيانات غير صحيحة"); // Error message
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء محاولة تسجيل الدخول");
    }
  }

  return (
    <>
      <div
        className="bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block font-semibold text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={formdata.email}
                  onChange={(e) => {
                    setFormdata({ ...formdata, email: e.target.value });
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block font-semibold text-gray-700 mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={formdata.pass}
                  onChange={(e) => {
                    setFormdata({ ...formdata, pass: e.target.value });
                  }}
                />
              </div>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <div className="mb-6">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
