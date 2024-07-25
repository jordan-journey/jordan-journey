import Saidbar from "./Saidbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import NavDashboard from "../../component/NavDashboard";

function DisplayEvents() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // استخدم useLocation لجلب حالة التوجيه
  const successMessage = location.state?.successMessage;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const closeMessage = () => {
    setShowSuccessMessage(false); // إخفاء الرسالة
  };

  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true); // عرض الرسالة عند وجودها
    }
  }, [successMessage]);

  function AddEvent() {
    navigate(`/add`);
  }

  {
    /**************fetch data******************* */
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://tickets-73a3c-default-rtdb.firebaseio.com/events.json"
        );
        setData(res.data);
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);
  {
    /**************end fetch data*************** */
  }

  {
    /*******************update****************** */
  }
  const handleUpdateClick = (id) => {
    navigate(`/Update/${id}`);
  };
  {
    /*******************end update****************** */
  }
  {
    /*******************Delete****************** */
  }
  const handleDeleteClick = (id) => {
    navigate(`/Delete/${id}`);
  };
  {
    /*******************end Delete****************** */
  }

  {
    /*********************pagination************************* */
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = data
    ? Math.ceil(Object.keys(data).length / itemsPerPage)
    : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data
    ? Object.keys(data).slice(startIndex, endIndex)
    : [];
  {
    /**********************end pagination****************** */
  }

  return (
    <div>
      <NavDashboard />
      <div className="flex flex-wrap gap-12 pt-16 mt-16">
        <div className="w-1/4">
          <Saidbar />
        </div>
        <div className="w-2/4 py-10 ms-28">
          <h1 className="text-4xl font-bold mb-9">Events</h1>

          {showSuccessMessage && (
            <div
              id="alert-3"
              className="flex items-center p-4 my-20 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="text-sm font-medium ms-3">{successMessage}</div>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-3"
                aria-label="Close"
                onClick={closeMessage}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          )}

          {/*************Add Event*********** */}
          <button
            type="button"
            className="w-32 px-4 py-2 mb-10 font-bold text-white rounded bg-slate-400 hover:bg-slate-300 "
            onClick={() => {
              AddEvent();
            }}
          >
            Add Event +
          </button>
          {/************end Add Event******** */}

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            {/********table********** */}

            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
              {/*************************************************** */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {/*************************************************** */}

              {/*************************************************** */}
              <tbody>
                {/****************************** */}

                {error && <div>{error}</div>}
                {currentItems.map((key) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={key}
                  >
                    <td className="p-4">
                      <img
                        src={data[key].mainImage}
                        className="w-16 max-w-full max-h-full md:w-32"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {data[key].name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {data[key].details.location}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {data[key].details.price}
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="hover:underline">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="mx-1 mr-1"
                          onClick={() => handleUpdateClick(key)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="mx-1"
                          onClick={() => handleDeleteClick(key)}
                        />
                      </a>{" "}
                    </td>
                  </tr>
                ))}
                {/********************************************* */}
              </tbody>

              {/***************************************** */}
            </table>

            {/********end table********** */}
            {/********pagination********** */}
            <div className="flex justify-center my-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 mx-1 ${
                    currentPage === index + 1
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayEvents;
