import Saidbar from "./Saidbar";
import { dbURL } from "./Config";
import axios from "axios";
import { useState, useEffect } from "react";
import NavDashboard from "../../component/NavDashboard";

function Users() {
  const [information, setuserinformation] = useState({});

  async function Userinformation() {
    const response = await axios.get(`${dbURL}/users.json`);
    const data = response.data;
    setuserinformation(data);
  }

  useEffect(() => {
    Userinformation();
  }, []);

  async function HandelunActiv(id) {
    await axios.patch(`${dbURL}/users/${id}.json`, { Active: false });
    setuserinformation((prevState) => {
      const updatedInfo = { ...prevState };
      updatedInfo[id].Active = false;
      return updatedInfo;
    });
  }

  async function HandelActiv(id) {
    await axios.patch(`${dbURL}/users/${id}.json`, { Active: true });
    setuserinformation((prevState) => {
      const updatedInfo = { ...prevState };
      updatedInfo[id].Active = true;
      return updatedInfo;
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavDashboard />
      <Saidbar />
      <div className="flex-grow flex items-center justify-center py-8">
        <div className="lg:flex lg:w-4/5 lg:max-w-screen-lg">
          <div className="lg:w-1/4 hidden lg:block"></div>
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white shadow-md sm:rounded-lg p-4">
              <h1 className="mb-6 text-2xl font-bold text-center">All Users</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Order
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {information && Object.keys(information).length > 0 ? (
                      Object.keys(information).map((key) => (
                        <tr
                          key={key}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {/* {order[key]?.totalPrice || "N/A"} */}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {information[key]?.email || "N/A"}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {information[key]?.name || "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            {information[key]?.Active ? (
                              <button
                                onClick={() => HandelunActiv(key)}
                                className="bg-[#be3737] text-white px-4 py-2 rounded hover:bg-[#ff2828] transition duration-300"
                              >
                                Unactiv
                              </button>
                            ) : (
                              <button
                                onClick={() => HandelActiv(key)}
                                className="bg-[#3a9228] text-white px-4 py-2 rounded hover:bg-[#35a035] transition duration-300"
                              >
                                Activ
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
