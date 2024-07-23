import { useState, useEffect } from "react";
import axios from "axios";
// import Img1 from "../../assets/women/women.png";
// import Img2 from "../../assets/women/women2.jpg";
// import Img3 from "../../assets/women/women3.jpg";
// import Img4 from "../../assets/women/women4.jpg";
import { FaDollarSign } from "react-icons/fa6";

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
            const limitedEvents = fetchedEvents.slice(0, 5);
      
            
            setEvents(limitedEvents);
    
           
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


  return (
    <div className="mb-12 mt-14">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-20 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Tours for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Tours
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
           Explore a collection of wonderful places that will give you the full
           testement of Jordan Journeys
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center">
            {/* card section */}
            {events.map(event => (
              <div
                data-aos="fade-up"
                data-aos-delay={event.aosDelay}
                key={event.id}
                className="space-y-3"
              >
                <img
                  src={event.mainImage}
                  alt=""
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.details.date}</p>
                  <div className="flex items-center gap-1">
                    < FaDollarSign className="text-green-400" />
                    <span>{event.details.price} </span>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          
        </div>
      </div>
    </div>
  );
};

export default Products;
