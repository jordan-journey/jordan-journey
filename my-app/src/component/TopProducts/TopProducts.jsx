import React from "react";
import Img1 from "../../assets/hero/img4.jpeg";
import Img2 from "../../assets/hero/Amman.jpg";
import Img3 from "../../assets/hero/Ajloun.jpeg";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Ramtha City tour",
    description:
      "Enjoy the calm and peaceful places",
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
];
const TopProducts = ({ handleOrderPopup }) => {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Tours for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Most booked tours
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            These tours were picked by most of our viewers
          </p>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-green-600/80 dark:hover:bg-green-600 hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt=""
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStarHalf className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
                <button
                  className="bg-green-800 hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  onClick={handleOrderPopup}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
