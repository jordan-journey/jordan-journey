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

  //   add new admin-----------------------------------------------------------------------------------------------------------------------------------
  async function AddNewAdmin(e) {
    e.preventDefault();
    try {
      const fileBase64 = file ? await convertToBase64(file) : "";
      // Create JSON object with image data
      const adminData = {
        ...newadmin,
        src: fileBase64, // Save Base64 image in JSON
      };
      // Send JSON object to Firebase
      await axios.post(`${dbURL}/Admin.json`, adminData);
      // Reset form or handle success
    } catch (error) {
      console.error("Error adding new admin:", error);
      // Handle error
    }
  }

  return (
    <>
    <NavDashboard/>
      <div className="flex flex-wrap gap-6">
        <Saidbar />
        <section className="w-3/4 px-24 py-10 my-auto dark:bg-gray-900">
          <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex ms">
            <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
              <div>
                <h1 className="mb-2 font-serif font-extrabold lg:text-3xl md:text-2xl sm:text-xl xs:text-xl dark:text-white">
                  Profile
                </h1>

                <form onSubmit={AddNewAdmin}>
                  <div className="flex items-center justify-center w-full h-40 bg-gray-200 rounded-sm dark:bg-gray-700">
                    <div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-full dark:bg-gray-600">
                      <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full dark:bg-gray-400">
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
                        <label htmlFor="upload_profile">
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
                  <h2 className="mt-1 font-semibold text-center dark:text-gray-300">
                    Upload Profile Image
                  </h2>
                  <div className="flex justify-center w-full gap-2 lg:flex-row md:flex-col sm:flex-col xs:flex-col">
                    <div className="w-full mt-6 mb-4">
                      <label className="mb-2 dark:text-gray-300">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 mt-2 border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        value={newadmin.fullname}
                        onChange={(e) =>
                          setnewadmin({ ...newadmin, fullname: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-full mb-4 lg:mt-6">
                      <label className="dark:text-gray-300">EMAIL</label>
                      <input
                        type="email"
                        className="w-full p-4 mt-2 border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        value={newadmin.email}
                        onChange={(e) => {
                          setnewadmin({ ...newadmin, email: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center w-full gap-2 lg:flex-row md:flex-col sm:flex-col xs:flex-col">
                    <div className="w-full">
                      <h3 className="mb-2 dark:text-gray-300">PASSWORD</h3>
                      <input
                        type="password"
                        className="w-full p-4 mt-2 border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        value={newadmin.pasword}
                        onChange={(e) =>
                          setnewadmin({ ...newadmin, pasword: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full mt-4 text-lg font-semibold text-white bg-green-500 rounded-lg">
                    <button type="submit" className="w-full p-4">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AddAdmin;
