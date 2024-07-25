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
    <nav className="fixed top-0 left-0 z-50 w-full h-16 bg-green-500 border-gray-400 dark:bg-gray-900"> {/* تأكيد ارتفاع الشريط */}
      <div className="flex flex-wrap items-center justify-between h-full max-w-screen-xl p-4 mx-auto"> {/* تأكيد ملائمة الارتفاع */}
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Jordan_JOURNEYLogo} className="h-10" alt="Flowbite Logo" />
        </a>
        <div className="flex px-4 py-3 rounded-md border-2 border-green-400 overflow-hidden max-w-md mx-auto font-[sans-serif] bg-green-400 w-72 h-10">
        <input type="email" placeholder="Search Something..."
          className="w-full text-sm text-gray-600 bg-transparent outline-none" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600">
          <path
            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
          </path>
        </svg>
      </div>
        <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <img src={viewImage} className="w-10 h-10 rounded-full" alt="Admin" />
        </div>
      </div>
    </nav>
  );
}

export default NavDashboard;
