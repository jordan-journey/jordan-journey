import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Jordan_JOURNEYLogo from "../assets/images/Jordan_JOURNEYLogo.png";
import { AuthContext } from "../hooks/AuthContext";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation(); // استخدام useLocation لمعرفة المسار الحالي

  return (
    <div>
      <nav className="bg-green-600 border-b-2 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link to="/" className="flex items-center">
              <img
                src={Jordan_JOURNEYLogo}
                className="w-20 h-14"
                alt="Jordan Journey Logo"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {isLoggedIn && (
              <Link
                to="/Profile"
                className="text-sm text-white dark:text-white hover:underline"
              >
                <FontAwesomeIcon icon={faUser} className="mx-1" /> Profile
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                to="/Dashboard"
                className="text-sm text-white dark:text-white hover:underline"
              >
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="mx-1"
                />{" "}
                Admin
              </Link>
            )}
            {!isLoggedIn ? (
              <Link
                to="/Login"
                className="text-sm text-white dark:text-white hover:underline"
              >
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="mx-1"
                />{" "}
                Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="text-sm text-white dark:text-white hover:underline"
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="mx-1"
                />{" "}
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-green-600 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-center">
            <ul className="flex flex-row mt-0 space-x-20 text-sm font-medium rtl:space-x-reverse">
              <li>
                <Link
                  to="/"
                  className={`text-white dark:text-white hover:underline ${
                    location.pathname === "/" ? "underline" : ""
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ListingPage"
                  className={`text-white dark:text-white hover:underline ${
                    location.pathname === "/ListingPage" ? "underline" : ""
                  }`}
                >
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  to="/ContactUs"
                  className={`text-white dark:text-white hover:underline ${
                    location.pathname === "/ContactUs" ? "underline" : ""
                  }`}
                >
                  Reach Out
                </Link>
              </li>
              <li>
                <Link
                  to="/AboutUs"
                  className={`text-white dark:text-white hover:underline ${
                    location.pathname === "/AboutUs" ? "underline" : ""
                  }`}
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
