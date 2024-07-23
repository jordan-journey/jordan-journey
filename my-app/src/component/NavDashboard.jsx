import { useState, useEffect } from "react";
import Jordan_JOURNEYLogo from "../assets/images/Jordan_JOURNEYLogo.png";

function NavDashboard() {
  // State to store the image URL
  const [viewImage, setViewImage] = useState('');

  // Function to retrieve the image URL from session storage
  function ViewImage() {
    const imageUrl = sessionStorage.getItem('AdminImg');
    if (imageUrl) {
      setViewImage(imageUrl);
    }
  }

  // Use useEffect to call ViewImage when the component mounts
  useEffect(() => {
    ViewImage();
  }, []);

  return (
    <nav className="bg-gray-200 border-gray-400 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Jordan_JOURNEYLogo} className="h-10" alt="Flowbite Logo" />
        </a>
        
        <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
         
          
          <img src={viewImage} className="w-10 h-10 rounded-full" alt="Admin" />
        </div>
      </div>
    </nav>
  );
}

export default NavDashboard;
