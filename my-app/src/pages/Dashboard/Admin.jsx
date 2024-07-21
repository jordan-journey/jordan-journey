import { useState, useEffect } from "react";
import { dbURL } from "./Config";
import axios from "axios";
import Saidbar from "./Saidbar";

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
    <div className="a flex">
      <Saidbar />
      <div className=" flex flex-wrap px-28">
        {Admins.map((admin) =>
          admin.delete ? (
            <div key={admin.id} className="max-w-sm mx-auto mt-10 mb-10">
              <div className="p-6 flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center">
                  <img
                    className="rounded-full h-12 w-12 border-2 border-green-500"
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
                  className="ml-4 h-8 px-4 text-md font-bold text-white bg-green-500 border border-green-500 rounded-full hover:bg-green-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
export default Admin;
