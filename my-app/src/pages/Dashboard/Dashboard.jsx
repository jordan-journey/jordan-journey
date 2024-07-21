import axios from "axios";
import Saidbar from "./Saidbar";
import { dbURL } from "./Config";
import { useState, useEffect } from "react";

function MainDashboard() {
  const [numofuser, setnumofuser] = useState(null);
  const [numoforder, setnumoforder] = useState(null);
  const [numofevents, setnumofevents] = useState(null);

  async function Fetchnumofuser() {
    try {
      const response = await axios.get(`${dbURL}users.json`);
      setnumofuser(Object.keys(response.data).length);
    } catch (error) {
      console.error("Error fetching number of users:", error);
    }
  }
  useEffect(() => {
    Fetchnumofuser();
  }, []);
  async function Fetchorder() {
    const respons = await axios.get(`${dbURL}orders.json`);
    setnumoforder(Object.keys(respons.data).length);
  }
  useEffect(() => {
    Fetchorder();
  }, []);
  async function Fetchevents() {
    const respons = await axios.get(`${dbURL}events.json`);
    setnumofevents(Object.keys(respons.data).length);
  }
  useEffect(() => {
    Fetchevents();
  }, []);

  return (
    <div className="flex flex-wrap gap-12">
      <Saidbar />

      <div className="flex-grow mx-auto my-5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md flex-grow">
            <h2 className="text-xl font-semibold text-gray-700">Users</h2>
            <p className="text-4xl text-blue-500 mt-2">{numofuser} </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md flex-grow">
            <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
            <p className="text-4xl text-green-500 mt-2">{numoforder}</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md flex-grow">
            <h2 className="text-xl font-semibold text-gray-700">Events</h2>
            <p className="text-4xl text-red-500 mt-2">{numofevents}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
