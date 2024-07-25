import React from "react";
import Img1 from "../../assets/hero/img4.jpeg";
import Img2 from "../../assets/hero/Amman.jpg";
import Img3 from "../../assets/hero/Ajloun.jpeg";
import amman from "../../assets/images/amman.jpg";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Ramtha City tour",
    description: "Enjoy the calm and peaceful places",
  },
  {
    id: 2,
    img: Img2,
    title: "Amman City tour",
    description:
      "In Amman city tour you'll see a wonderful complexity between modernity and ancient places",
  },
  {
    id: 3,
    img: Img3,
    title: "Ajloun City tour",
    description:
      "In Ajloun city tour you'll take a run for 3km , in addition to teleferic trip that will blow your mind after a delicious launch!",
  },
  {
    id: 4,
    img: amman,
    title: "Amman City tour",
    description:
      "In Amman city tour you'll take a run for 3km , in addition to teleferic trip that will blow your mind after a delicious launch!",
  },
];
const TopProducts = ({ handleOrderPopup }) => {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-44">
          <h1 data-aos="fade-up" className="text-6xl font-bold">
            Most booked tours
          </h1>
          <p data-aos="fade-up" className="text-xl text-gray-400">
            These tours were picked by most of our viewers
          </p>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-4 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <>
              <div
                data-aos="zoom-in"
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-green-600/80 dark:hover:bg-green-600 hover:text-white relative shadow-xl duration-300 group max-w-[300px]  h-[255px] w-72"
              >
                {/* image section */}
                <div className="h-[100px]">
                  <img
                    src={data.img}
                    alt=""
                    className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md h-40"
                  />
                </div>
                {/* details section */}
                <div className="p-4 text-center">
                  {/* star rating */}
                  <div className="flex items-center justify-center w-full gap-1">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStarHalf className="text-yellow-500" />
                  </div>
                  <h1 className="text-xl font-bold">{data.title}</h1>
                  <p className="mb-5 text-sm text-gray-500 duration-300 group-hover:text-white line-clamp-2">
                    {data.description}
                  </p>
                  <Link
                    className="px-4 py-1 text-white duration-300 bg-green-800 rounded-full hover:scale-105 group-hover:bg-white group-hover:text-green-800"
                    to="/ListingPage"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
