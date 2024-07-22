import { useState, useEffect } from "react";
import { dbURL } from "./Config";
import axios from "axios";
import Saidbar from "./Saidbar";
import NavDashboard from "../../component/NavDashboard";

function Admin() {
  const [Admins, SetAdmin] = useState([]);

  //   get data------------------------------------------------------------------------------------------------------------------

  async function RetrivAdmin() {
    const response = await axios.get(`${dbURL}/Admin.json`);
    const Data = response.data;
    if (Data) {
      const Array = Object.keys(Data).map((key) => ({
        id: key,
        ...Data[key],
      }));
      SetAdmin(Array);
    }
  }
  useEffect(() => {
    RetrivAdmin();
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------------------
  // delete-----------------------------------------------------------------------------------------------------------------------------------------
  async function Delete(id) {
    await axios.patch(`${dbURL}/Admin/${id}.json`, { delete: false });
    RetrivAdmin();
  }
  return (
    <div><NavDashboard/>
    <div className="flex a">
      <Saidbar />
      <div className="mt-20 px-28"> 
      <h1 className="text-2xl font-bold ms-2">Admins</h1>
      <div className="flex flex-wrap w-3/4 mt-10 ">
        {Admins.map((admin) =>
          admin.delete ? (
            <div key={admin.id} className="max-w-sm mx-auto mt-10 mb-10">
              <div className="flex items-center justify-between p-6 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 border-2 border-green-500 rounded-full"
                    src={admin.src}
                    alt="Admin"
                  />
                  <div className="ml-4">
                    <div className="text-lg font-bold text-gray-900">
                      {admin.fullname}
                    </div>
                    <div className="text-sm text-gray-600">{admin.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => Delete(admin.id)}
                  className="h-8 px-4 ml-4 font-bold text-white transition-colors duration-300 bg-green-500 border border-green-500 rounded-full text-md hover:bg-green-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>
      </div>
    </div></div>
  );
}
export default Admin;
