import Saidbar from "./Saidbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { dbURL } from "./Config";
import NavDashboard from "../../component/NavDashboard";

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
    <div className="relative min-h-screen">
      <NavDashboard />
      <div className="flex">
        <div className="fixed top-16 left-0 w-64 h-full bg-gray-100">
          <Saidbar />
        </div>
        <div className="flex-1 ml-64  p-4 mt-[150px]">
          <div className="w-full max-w-4xl mx-auto bg-white shadow-md sm:rounded-lg">
            <h1 className="mb-6 text-2xl font-bold text-center">All Contact</h1>
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
                      Message
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Reply
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
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <button className="bg-[#2d34ff] text-white px-4 py-2 rounded hover:bg-[#35a035] transition duration-300">
                          <a href={`mailto:${Contact[key].email}`}>Reply</a>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
