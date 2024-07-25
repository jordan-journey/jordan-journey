import { useState, useEffect } from "react";
import Cards from "../component/Cards";
import axios from "axios";
import Header from "../component/header";
import Footer from "../component/Footer";
import { Range, getTrackBackground } from "react-range";

function ListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);

  const STEP = 1;
  const MIN = 0;
  const MAX = 100;

  const uniqueLocations = [
    "Irbid",
    "Ajloun",
    "Jerash",
    "Mafraq",
    "Balqa",
    "Amman",
    "Zarqa",
    "Madaba",
    "Karak",
    "Tafilah",
    "Aqaba",
    "Maan",
  ];

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
        setEvents(fetchedEvents);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const eventPrice = event.details.price;
    return (
      (selectedLocation === "" ||
        selectedLocation === event.details.location) &&
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      eventPrice >= priceRange[0] &&
      eventPrice <= priceRange[1]
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#519341]" />
      </div>
    );
  }

  return (
    <main>
      <Header />
      {/**********************************search********************************** */}

      <section className="flex flex-wrap items-center justify-center w-full h-20 shadow-lg gap-44shadow-xl ">
        <div className="my-3 xl:w-96">
          <div className="relative flex flex-wrap items-stretch w-full mb-4">
            <input
              type="search"
              className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </section>

      {/**********************************end search********************************** */}
      {/******************************************************************** */}

      <section className="flex flex-wrap justify-center gap-3 mt-16">
        <div className="flex flex-row flex-wrap gap-10 p-4 space-x-80">
          {/**********************dropdown list************************* */}
          <select
            id="location"
            className="block px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none h-15 w-52 focus:outline-none focus:bg-white"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select a location</option>
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          {/**********************end dropdown list************************* */}

          {/**********************price************************* */}

          <div className="flex flex-col items-center ">
            <label className="mb-2 text-gray-700">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Range
              values={priceRange}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="w-40 h-2 rounded-md"
                  style={{
                    background: getTrackBackground({
                      values: priceRange,
                      colors: ["#ccc", "#519341", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-6 h-6 bg-green-500 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                />
              )}
            />
          </div>
          {/**********************end price************************* */}
        </div>
      </section>
      {/******************************************************************** */}

      <section>
        <Cards events={filteredEvents} searchQuery={searchQuery} />
      </section>
      <Footer />
    </main>
  );
}

export default ListingPage;
