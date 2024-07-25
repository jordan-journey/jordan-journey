import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Cards({ events = [], searchQuery = "" }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjust the number of items per page as needed

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
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
      <div className="grid grid-cols-1 gap-5 p-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 place-items-center">
        {" "}
        {/******************cards*************** */}
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-green-600/80 dark:hover:bg-green-600 hover:text-white relative shadow-xl duration-300 group w-[300px] h-[247px] mt-32"
          >
            <div className="h-[100px]">
              <img
                src={event.mainImage}
                alt=""
                className="max-w-[190px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md h-40 "
              />
            </div>
            <div className="p-3 text-center">
              <h1 className="text-xl font-bold">{event.name}</h1>
              <p className="mb-2 text-sm text-gray-500 duration-300 group-hover:text-white line-clamp-2">
                {event.details.date}
              </p>
              <p className="mb-3 text-green-400 group-hover:text-white">
                <span>JD {event.details.price} </span>
              </p>
              <Link
                className="px-4 py-1 text-white duration-300 bg-green-800 rounded-full hover:scale-105 group-hover:bg-white group-hover:text-green-800"
                to={`/event/${event.id}`}
              >
                Read more
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
