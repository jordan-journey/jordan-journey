import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://tickets-73a3c-default-rtdb.firebaseio.com/events.json"
      );
      if (response.data) {
        const fetchedEvents = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        const limitedEvents = fetchedEvents.slice(0, 4);

        setEvents(limitedEvents);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="mb-48 mt-14">
        <div className="container">
          {/* Header section */}
          <div className="text-center mb-20 max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-6xl font-bold">
              Tours
            </h1>
            <p data-aos="fade-up" className="text-xl text-gray-400">
              Explore a collection of wonderful places that will give you the
              full testament of Jordan Journeys
            </p>
          </div>
          {/* Body section */}
          <div>
            <div className="flex flex-wrap justify-around gap-5 mt-32">
              {/* card section */}
              {events.map((event) => (
                <div
                  data-aos="zoom-in"
                  data-aos-delay={event.aosDelay}
                  key={event.id}
                  className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-green-600/80 dark:hover:bg-green-600 hover:text-white relative shadow-xl duration-300 group w-[300px] h-[237px] m-2"
                >
                  <div className="h-[100px]">
                    <img
                      src={event.mainImage}
                      alt=""
                      className="h-32 w-40 block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md rounded-md"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h1 className="text-xl font-bold">{event.title}</h1>
                    <p className="mb-5 text-sm text-gray-500 duration-300 group-hover:text-white line-clamp-2">
                      {event.details.date}
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <p className="text-green-400 group-hover:text-white text-center">
                        JD {event.details.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* view all button */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
