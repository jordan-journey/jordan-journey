import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbURL } from "./Config";
import Header from "../../component/header";
import Footer from "../../component/Footer";

function AdminLogin() {
  let navigate = useNavigate();

  // creat use state
  const [formdata, setFormdata] = useState({ email: "", pass: "" });
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    // fetch data
    try {
      const response = await axios.get(`${dbURL}/Admin.json`);
      const admins = response.data;

      const admin = Object.values(admins).find((adminObj) => {
        // Remove extra spaces from email and password
        const email = adminObj.email ? adminObj.email.trim() : "";
        const password = adminObj.pasword ? adminObj.pasword.trim() : "";

        // console.log("Checking admin:", email, password); 

        return (
          email === formdata.email.trim() && password === formdata.pass.trim()
        );
      });

      if (admin) {
        sessionStorage.setItem("AdminImg", admin.src);
        if (admin.delete) {
          navigate("/MDashboard");
        } else setError("  قد تم انهاء خدماتك ");
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
      <Header />
      <div
        className="bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="w-full p-8 mx-4 bg-white rounded shadow-md md:w-1/2 lg:w-1/3">
            <h1 className="mb-8 text-3xl font-bold text-center">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
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
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={formdata.pass}
                  onChange={(e) => {
                    setFormdata({ ...formdata, pass: e.target.value });
                  }}
                />
              </div>
              {error && (
                <p className="mb-4 text-center text-red-500">{error}</p>
              )}
              <div className="mb-6">
                <button
                  className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLogin;
