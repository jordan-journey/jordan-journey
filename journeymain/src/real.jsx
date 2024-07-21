import {  useState,useEffect } from 'react';
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './swipercard.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function Swipped() {
    
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
            setEvents(fetchedEvents);
    
           
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


  const [swiperRef, setSwiperRef] = useState(null);

  

  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
       
             <div className="flex flex-wrap justify-center gap-20 px-20 py-24">
        {events.map(event => (
            
                    <SwiperSlide>

          <div className="max-w-sm rounded-lg shadow-lg w-80 dark:bg-gray-800 dark:border-gray-700 shadow-green-600 mb-20" key={event.id}>
            <a href="#">
              <img className="w-full rounded-t-lg h-52" src={event.mainImage} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.title}</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.details.date}</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.details.price} JD</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        </SwiperSlide>
        ))}
        </div>
        
    
            
      
      </Swiper>



      
    </>
  );
}