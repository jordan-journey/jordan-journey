// import Cards from "./card"
// import axios from "axios"
// import { Swiper,SwiperSlide } from "swiper/react";
// import './swiper.css';
import './index.css';


// import Cards from "./card";
import Heros from "./herosection";
// import Swipcard from './cardswip';
import Swipped from './real';


export default function Homepage() {
    
    return (
        <div>
        
        <div className="bg-background text-foreground flex">
        <Heros />




        </div>
            <section className="py-16 bg-card text-card-foreground">
                
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Discover</h2>
                    
                    <div className=" -48grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        

                    <Swipped/>
                        
                    </div>
                    
                    
                </div>
            </section>

            <section className="bg-green-600  py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                    
                        <h2 className="text-3xl font-bold text-white">Your tour to Jordan via Bright Trip</h2>
                        <p className="mt-4">
                        Everything you need to know to take your trip to the next level. In this free guide, you will learn how to travel Jordan with confidence and discover the best places to visit.
                    </p>
                    </div>
                    <div className="md:w-1/2">
                        <img src="./imgs/carde.jpg" alt="Highlight Image" className="w-full h-80 object-cover" />
                    </div>
                </div>
            </section>


            <section className="py-16 bg-background text-foreground">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                        <img src="./imgs/1.jpeg" alt="Gallery Image 1" className="w-full h-40 object-cover rounded-md transition-all duration-300 hover:scale-110 " />
                        <img src="./imgs/2.jpeg" alt="Gallery Image 2" className="w-full h-40 object-cover rounded-md transition-all duration-300 hover:scale-110" />
                        <img src="./imgs/3.jpeg" alt="Gallery Image 3" className="w-full h-40 object-cover rounded-md transition-all duration-300 hover:scale-110" />
                        <img src="./imgs/4.jpeg" alt="Gallery Image 4" className="w-full h-40 object-cover rounded-md transition-all duration-300 hover:scale-110" />
                        <img src="./imgs/img3.jpeg" alt="Gallery Image 5" className="w-full h-40 object-cover rounded-md transition-all duration-300 hover:scale-110" />
                        <img src="./imgs/img4.jpeg" alt="Gallery Image 6" className="w-full h-40 object-cover rounded-md transition-all duration-300 hover:scale-110" />
                        <img src="https://ucarecdn.com/437f548f-3cc5-42de-9bfb-9beba00819a9/-/crop/910x477/0,70/-/resize/680x357/-/resize/x300/" alt="Gallery Image 7" className="w-full h-40 object-cover rounded-md transition-all duration-300 hover:scale-110" />
                        <img src="https://ucarecdn.com/c43e768a-5993-4dd5-a651-0db9ac256bf5/-/crop/736x414/0,1/-/preview/" alt="Gallery Image 8" className="w-full h-40 object-cover rounded-md transition-all duration-300 hover:scale-110" />
                    </div>
                </div>
            </section>

            <footer className="py-8 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Jordan Journeys. All rights reserved.</p>
                </div>
            </footer>
           
            </div>
            
        )
        
        
    
}