import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Cards({ events = [], searchQuery = "" }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust the number of items per page as needed

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(500, 500);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(500, 500);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(500, 500);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-20 px-20 py-24">
        {/******************cards*************** */}
        {currentEvents.map((event) => (
          <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg w-80 dark:bg-gray-800 dark:border-gray-700 shadow-green-600"
            key={event.id}
          >
            <a href="#">
              <img
                className="w-full rounded-t-lg h-52"
                src={event.mainImage}
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {event.name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {event.title}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {event.details.date}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {event.details.price} JD
              </p>
              <Link
                to={`/event/${event.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
        {/******************end cards*************** */}
      </div>
      {/************************** Pagination Controls ***********************/}
      <div className="flex flex-wrap justify-center my-4 space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-2 text-sm font-medium text-white rounded-lg ${
              currentPage === index + 1
                ? "bg-green-700"
                : "bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Cards;
