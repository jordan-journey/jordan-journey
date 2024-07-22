import Saidbar from "./Saidbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { dbURL } from "./Config";

function Contact() {
  const [Contact, setContact] = useState({});

  async function fetchData() {
    try {
      const response = await axios.get(`${dbURL}Contact.json`);
      setContact(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(Contact);
  async function DeleteMsg(id) {
    await axios.patch(`${dbURL}/Contact/${id}.json`, {
      Delete: true,
    });
  }
  async function Return(id) {
    await axios.patch(`${dbURL}/Contact/${id}.json`, {
      Delete: false,
    });
  }

  return (
    <div className="flex flex-wrap gap-12 px-4 py-6">
      <Saidbar />

      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-center mb-6">All Contact</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    message
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(Contact).map((key) => (
                  <tr
                    key={key}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {Contact[key].email}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {Contact[key].firstName}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {Contact[key].feed}
                    </td>

                    <td className="px-6 py-4">
                      {Contact[key].Delete ? (
                        <button
                          onClick={() => Return(key)}
                          className="bg-[#3a9228] text-white px-4 py-2 rounded hover:bg-[#35a035] transition duration-300"
                        >
                          Return
                        </button>
                      ) : (
                        <button
                          onClick={() => DeleteMsg(key)}
                          className="bg-[#ff2d2d] text-white px-4 py-2 rounded hover:bg-[#35a035] transition duration-300"
                        >
                          Details
                        </button>
                      )}
                    </td>
                    {/* {information[key]?.Active ? (
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
                        )} */}
                  </tr>
                ))}
              </tbody>
              {/* <tbody>
  {Object.keys(Contact).map((key) => (
    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {Contact[key].email}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>
      <td className="px-6 py-4"></td>
    </tr>
  ))}
</tbody> */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
