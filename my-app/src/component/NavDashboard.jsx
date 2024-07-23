import { useState, useEffect } from "react";
import Jordan_JOURNEYLogo from "../assets/images/Jordan_JOURNEYLogo.png";

function NavDashboard() {
  const [viewImage, setViewImage] = useState("");

  function ViewImage() {
    const imageUrl = sessionStorage.getItem("AdminImg");
    if (imageUrl) {
      setViewImage(imageUrl);
    }
  }

  useEffect(() => {
    ViewImage();
  }, []);

  return (
    <nav className="bg-green-500 border-gray-400 dark:bg-gray-900 fixed w-full z-50 top-0 left-0 h-16"> {/* تأكيد ارتفاع الشريط */}
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto h-full"> {/* تأكيد ملائمة الارتفاع */}
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
