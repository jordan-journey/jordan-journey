import Products from '../component/Products/Products';
import Hero from '../component/Hero/Hero';
import TopProducts from '../component/TopProducts/TopProducts';
import Banner from '../component/Banner/Banner';
import Testimonials from '../component/Testimonials/Testimonials';
import Popup from '../component/Popup/Popup';
import React from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

// import React from "react";

// import Hero from "./components/Hero/Hero";
// import Products from "./components/Products/Products";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import TopProducts from "./components/TopProducts/TopProducts";
// import Banner from "./components/Banner/Banner";
// // import Subscribe from "./components/Subscribe/Subscribe";
// import Testimonials from "./components/Testimonials/Testimonials";

// import Popup from "./components/Popup/Popup";


function Home(){
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    Aos.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    Aos.refresh();
  }, []);


  return(
    
    <div >
    <Hero handleOrderPopup={handleOrderPopup} />
      <Products />
      <TopProducts handleOrderPopup={handleOrderPopup} />
      <Banner />
      
      <Testimonials />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
  );

}

export default Home;