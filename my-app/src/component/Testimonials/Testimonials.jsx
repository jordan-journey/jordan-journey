import { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

const Testimonials = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://tickets-73a3c-default-rtdb.firebaseio.com/Contact.json"
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
    }
  };

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 my-28">
      <div className="container">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-green-600">
            What our customers are saying
          </p>
          <h1 data-aos="fade-up" className="text-6xl font-bold">
            Testimonials
          </h1>
        </div>

        {/* Testimonial cards */}
        <div className="w-[80rem] h-[300px]" data-aos="zoom-in">
          <Slider {...settings}>
            {events
              .filter((contact) => !contact.Deleted)
              .map((contact) => (
                <>
                  <div className="my-6">
                    <div
                      key={contact.email}
                      className="flex flex-col h-64 gap-4 px-6 py-8 mx-4 shadow-lg w-relative rounded-xl dark:bg-gray-800 bg-primary/10"
                    >
                      <div className="flex flex-col items-center gap-4 mt-10 text-center">
                        <div className="space-y-3">
                          <h1 className="text-xl font-bold text-black/80 dark:text-light">
                            {contact.firstName}
                          </h1>
                          <p className="text-xl text-gray-500">
                            {contact.feed}
                          </p>
                        </div>
                      </div>
                      <p className="absolute top-0 right-0 font-serif text-black/20 text-9xl">
                        ,,
                      </p>
                    </div>
                  </div>
                </>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
