import axios from "axios";
import Saidbar from "./Saidbar";
import { dbURL } from "./Config";
import { useState, useEffect } from "react";
import NavDashboard from "../../component/NavDashboard";
import Admin from "./Admin";

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
    <div className="flex ">
      <Saidbar />
      <div className="flex flex-col flex-1 min-h-screen">
        <NavDashboard />
        <div className="items-center ms-52 ">
        <div className="flex flex-grow justify-center items-center my-12 mt-[150px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Users</h2>
              <p className="mt-2 text-4xl text-blue-500">{numofuser}</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
              <p className="mt-2 text-4xl text-green-500">{numoforder}</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Events</h2>
              <p className="mt-2 text-4xl text-red-500">{numofevents}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Admin />
        </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
