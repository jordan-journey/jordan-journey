import { useState, useEffect } from "react";
import Cards from "../component/Cards";
// import ListingPageImage from "../assets/images/ListingPageImage.jpg";
import axios from "axios";
import Header from "../component/header";
import Footer from "../component/Footer";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

function ListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

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

        const uniqueLocations = [
          ...new Set(fetchedEvents.map((event) => event.details.location)),
        ];
        setUniqueLocations(uniqueLocations);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const handleCheckboxChange = (location) => {
    setSelectedLocations((prevState) =>
      prevState.includes(location)
        ? prevState.filter((loc) => loc !== location)
        : [...prevState, location]
    );
  };

  const filteredEvents = events.filter(
    (event) =>
      (selectedLocations.length === 0 ||
        selectedLocations.includes(event.details.location)) &&
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#519341]" />
      </div>
    );
  }

  return (
    <main>
      <Header/>
      {/******************************HeroSection in listing page******************************** */}
      <section
        // style={{
        //   "--image-url": `url(${ListingPageImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
        className="flex flex-wrap items-center justify-center w-full h-20 shadow-lg gap-44 shadow-green-600"
      >
        {/********************************search************************ */}
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
        {/****************************end search************************ */}
      </section>
      {/****************************** end HeroSection in listing page******************************** */}
{/******************************************* */}
      <section className="flex flex-wrap justify-center gap-3 mt-5 ">
      <Card className="w-full max-w-[80rem] p-4 shadow-lg  shadow-green-600">
        <List className="flex flex-row flex-wrap gap-4 border-8 border-green-600 ">
          {uniqueLocations.map((location, index) => (
            <ListItem className="flex-shrink-0 w-auto p-2 " key={index}>
              <label
                htmlFor={`horizontal-list-${location.toLowerCase().replace(".", "")}`}
                className="flex items-center px-3 py-2 cursor-pointer"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id={`horizontal-list-${location.toLowerCase().replace(".", "")}`}
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{ className: "p-0" }}
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleCheckboxChange(location)}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  {location}
                </Typography>
              </label>
            </ListItem>
          ))}
        </List>
      </Card>
    </section>
{/***************************************** */}
      <section>
        <Cards events={filteredEvents} searchQuery={searchQuery} />
      </section>
      <Footer/>
    </main>
  );
}

export default ListingPage;
