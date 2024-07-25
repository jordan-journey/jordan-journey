import { useState } from "react";
import Saidbar from "./Saidbar";
import { dbURL } from "./Config";
import axios from "axios";
import NavDashboard from "../../component/NavDashboard";

function AddAdmin() {
  const [newadmin, setnewadmin] = useState({
    delete: true,
    email: "",
    fullname: "",
    pasword: "",
    src: "",
  });

  const [file, setFile] = useState(null);
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  async function AddNewAdmin(e) {
    e.preventDefault();
    try {
      const fileBase64 = file ? await convertToBase64(file) : "";

      const adminData = {
        ...newadmin,
        src: fileBase64,
      };

      await axios.post(`${dbURL}/Admin.json`, adminData);
      alert("Admin added successfully!");
    } catch (error) {
      console.error("Error adding new admin:", error);
    }
  }

  return (
    <>
      <NavDashboard />
      <div className="flex">
        <Saidbar />
        <section className="flex items-center justify-center flex-1 min-h-screen p-10 mt-20 dark:bg-gray-900 ms-52">
          {" "}
          {/* Adjusted margin-top */}
          <div className="w-full max-w-md p-6 mx-auto shadow-2xl rounded-xl dark:bg-gray-800">
            <h1 className="mb-4 font-serif text-2xl font-extrabold text-center dark:text-white">
              Add Admin
            </h1>

            <form onSubmit={AddNewAdmin}>
              <div className="flex items-center justify-center w-full h-32 mb-4 bg-gray-200 rounded-sm dark:bg-gray-700">
                <div className="flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full dark:bg-gray-600">
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-400">
                    <input
                      type="file"
                      name="profile"
                      id="upload_profile"
                      hidden
                      required
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        setFile(selectedFile);
                      }}
                    />
                    <label htmlFor="upload_profile" className="cursor-pointer ">
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
              <h2 className="mt-2 mb-4 font-semibold text-center dark:text-gray-300">
                Upload Profile Image
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    value={newadmin.fullname}
                    onChange={(e) =>
                      setnewadmin({ ...newadmin, fullname: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    className="w-full p-4 border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    value={newadmin.email}
                    onChange={(e) =>
                      setnewadmin({ ...newadmin, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-4 border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    value={newadmin.pasword}
                    onChange={(e) =>
                      setnewadmin({ ...newadmin, pasword: e.target.value })
                    }
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 mt-4 text-lg font-semibold text-white bg-green-500 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default AddAdmin;
