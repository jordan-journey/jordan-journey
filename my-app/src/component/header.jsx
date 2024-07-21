import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/images/Logo.png";

function Header() {
  return (
    <div>
      <nav className="bg-green-600 border-b-2 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <img src={Logo} className="h-12" alt="Flowbite Logo" />
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              to="/Profile"
              className="text-sm text-white dark:text-white hover:underline"
            >
              <FontAwesomeIcon icon={faUser} className="mx-1" /> profile
            </Link>
            <Link
              to="/Dashboard"
              className="text-sm text-white dark:text-white hover:underline"
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} className="mx-1" />{" "}
              Admin
            </Link>
            <Link
              to="/Login"
              className="text-sm text-white dark:text-white hover:underline"
            >
              {" "}
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className="mx-1"
              />{" "}
              Login
            </Link>
          </div>
        </div>
      </nav>
      <nav className="bg-green-600 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 space-x-8 text-sm font-medium rtl:space-x-reverse">
              <li>
                <Link
                  to="/"
                  className="text-white dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ListingPage"
                  className="text-white dark:text-white hover:underline"
                >
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  to="/ContactUs"
                  className="text-white dark:text-white hover:underline"
                >
                  Reach Out
                </Link>
              </li>
              <li>
                <Link
                  to="/AboutUs"
                  className="text-white dark:text-white hover:underline"
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
