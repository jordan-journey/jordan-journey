import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Img1 from "../../assets/women/women.png";
// import Img2 from "../../assets/women/women2.jpg";
// import Img3 from "../../assets/women/women3.jpg";
// import Img4 from "../../assets/women/women4.jpg";
// import { FaDollarSign } from "react-icons/fa6";
// import { FaVaadin } from "react-icons/fa";

// const ProductsData = [
//   {
//     id: 1,
//     img: Img1,
//     title: "Women Ethnic",
//     rating: 5.0,
//     color: "white",
//     aosDelay: "0",
//   },
//   {
//     id: 2,
//     img: Img2,
//     title: "Women western",
//     rating: 4.5,
//     color: "Red",
//     aosDelay: "200",
//   },
//   {
//     id: 3,
//     img: Img3,
//     title: "Goggles",
//     rating: 4.7,
//     color: "brown",
//     aosDelay: "400",
//   },
//   {
//     id: 4,
//     img: Img4,
//     title: "Printed T-Shirt",
//     rating: 4.4,
//     color: "Yellow",
//     aosDelay: "600",
//   },
//   {
//     id: 5,
//     img: Img2,
//     title: "Fashin T-Shirt",
//     rating: 4.5,
//     color: "Pink",
//     aosDelay: "800",
//   },
// ];

const Products = () => {

  const [events, setEvents] = useState([]);


    useEffect(() => {
        fetchData();
      }, []);
    



  
    const fetchData = async () => {
        try {
          const response = await axios.get("https://tickets-73a3c-default-rtdb.firebaseio.com/events.json");
          if (response.data) {
            const fetchedEvents = Object.keys(response.data).map(key => ({
              id: key,
              ...response.data[key]
            }));
            const limitedEvents = fetchedEvents.slice(0, 4);
      
            
            setEvents(limitedEvents);
    
           
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

{/********* {events.map(event => ( */}
  return (
    <>
    <div className="mb-20 mt-7">
      <div>
        {/* Header section */}
        <div className="text-center mb-16 max-w-[600px] mx-auto">
          
          <h1 data-aos="fade-up" className="text-6xl font-bold">
            Tours
          </h1>
          <p data-aos="fade-up" className="text-xl text-gray-400">
           Explore a collection of wonderful places that will give you the full
           testement of Jordan Journeys
          </p>
        </div>
        {/* Body section */}
        <div>
        <div className="grid grid-cols-1 gap-32 p-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 place-items-center">        {/******************cards*************** */}
        {events.map((event) => (
                  <div
                  key={event.id}
                  className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-green-600/80 dark:hover:bg-green-600 hover:text-white relative shadow-xl duration-300 group w-[300px] h-[247px] mt-8"
                ><div className="h-[100px]">
                  <img
                    src={event.mainImage}
                    alt=""
                    className="max-w-[190px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md h-40 "
                  />
                  </div>
                  <div className="p-3 text-center">
                    <h1 className="text-xl font-bold">{event.name}</h1>
                    <p className="mb-2 text-sm text-gray-500 duration-300 group-hover:text-white line-clamp-2">{event.details.date}</p>
                      <p className="mb-3 text-green-400 group-hover:text-white"><span>JD {event.details.price} </span></p>
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
          {/* view all button */}
          
        </div>
      </div>
      </div> 
     
      </>
  );
};

export default Products