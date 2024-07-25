import Image1 from "../../assets/images/ajlounHome.png";
import Image2 from "../../assets/images/ammanHome.png";
import Image3 from "../../assets/hero/pngwing.com (2).png";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const ImageList = [
  {
    id: 1,
    img: Image3,
    title: "70% off on family lunch",
    description: "Enjoy a happy family's meal",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all in Amman trips",
    description: "See all wonderful places during a fabulous trip around Amman",
  },
  {
    id: 3,
    img: Image1,
    title: "Upto 50% off on Ajloun trip",
    description: "Full day with launch and free camps",
  },

];

const Hero = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-green-600 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
      {/* hero section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <>
              <div key={data.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* text content section */}
                  <div className="relative z-10 flex flex-col justify-center order-2 gap-4 pt-12 text-center pl-36 sm:pt-0 sm:text-left sm:order-1">
                    <h1
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl font-bold sm:text-6xl lg:text-7xl"
                    >
                      {data.title}
                    </h1>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay="100"
                      className="text-sm"
                    >
                      {data.description}
                    </p>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay="300"
                    >
                      <Link
                        to="/ListingPage"
                        className="px-4 py-2 text-white duration-200 bg-green-600 bg-green-700 rounded-full bg-gradient-to-r hover:scale-105"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                  {/* image section */}
                  <div className="order-1 sm:order-2">
                    <div
                      data-aos="zoom-in"
                      data-aos-once="true"
                      className="relative z-10"
                    >
                      <img
                        src={data.img}
                        alt=""
                        className="object-contain mx-auto h-96 w-96 sm:scale-105 lg:scale-120"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
