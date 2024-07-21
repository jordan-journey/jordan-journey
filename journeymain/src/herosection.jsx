// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Swipping from './logoon';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './swiper.css';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Heros() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Swipping/></SwiperSlide>
        
        
        <SwiperSlide><img src='https://international.visitjordan.com/uploads/experiences/b7c097c0-d6c9-430f-8fea-92ca085d9c09..jpg'/></SwiperSlide>
        

        <SwiperSlide><img src='./imgs/img3.jpeg'/></SwiperSlide>
        <SwiperSlide><img src='./imgs/img4.jpeg'/></SwiperSlide>
        <SwiperSlide><img src='./imgs/Amman.jpg'/></SwiperSlide>
        
      </Swiper>
    </>
  );
}
