import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [openHamburgerMenu, setHamburger] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;

  function handleHamburgerMenu() {
    setHamburger(!openHamburgerMenu);
  }

  return (
    <>
      <button
        onClick={handleHamburgerMenu}
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed h-screen top-0 z-40 w-64 transition-transform ${
          openHamburgerMenu ? "-translate-x-full" : "translate-x-0"
        } sm:translate-x-0 pt-1`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-green-500 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <br />
            <br />
            <li>
              <Link
                to="/MDashboard"
                className={`flex items-center p-2 rounded-lg dark:text-white ${
                  activePath === "/MDashboard"
                    ? "bg-green-400 text-white"
                    : "text-white hover:bg-black-100 dark:hover:bg-gray-700"
                } group`}
              >
                <svg
                  className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/ADDAdmin"
                className={`flex items-center p-2 rounded-lg dark:text-white ${
                  activePath === "/ADDAdmin"
                    ? "bg-green-400 text-white"
                    : "text-white hover:bg-black-100 dark:hover:bg-gray-700"
                } group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3a2 2 0 0 1 2 2v2h-4V5a2 2 0 0 1 2-2zM6 9a6 6 0 1 1 12 0v6a1 1 0 0 1-1 1h-4v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4H7a1 1 0 0 1-1-1V9zm12 0a4 4 0 1 0-8 0v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9zm-5 4a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2h-2z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Add Admin</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add"
                className={`flex items-center p-2 rounded-lg dark:text-white ${
                  activePath === "/add"
                    ? "bg-green-400 text-white"
                    : "text-white hover:bg-black-100 dark:hover:bg-gray-700"
                } group`}
              >
                <svg
                  className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Add Event</span>
              </Link>
            </li>
            <li>
              <Link
                to="/DisplayEvents"
                className={`flex items-center p-2 rounded-lg dark:text-white ${
                  activePath === "/DisplayEvents"
                    ? "bg-green-400 text-white"
                    : "text-white hover:bg-black-100 dark:hover:bg-gray-700"
                } group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Events</span>
              </Link>
            </li>
            <li>
              <Link
                to="/Users"
                className={`flex items-center p-2 rounded-lg dark:text-white ${
                  activePath === "/Users"
                    ? "bg-green-400 text-white"
                    : "text-white hover:bg-black-100 dark:hover:bg-gray-700"
                } group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className={`flex items-center p-2 rounded-lg dark:text-white ${
                  activePath === "/Contact"
                    ? "bg-green-400 text-white"
                    : "text-white hover:bg-black-100 dark:hover:bg-gray-700"
                } group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6l-4 4V6a2 2 0 0 1 2-2zM20 6H4v12h16V6zm-8 6h4v2h-4v-2zm-6-4h12v2H6V8zm0 6h12v2H6v-2z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Contact Messages</span>
              </Link>
            </li>
            <li>
              <Link
                to="/Logout"
                className={`flex items-center p-2 rounded-lg dark:text-white ${
                  activePath === "/Logout"
                    ? "bg-gray-700 text-white"
                    : "text-white hover:bg-black-100 dark:hover:bg-gray-700"
                } group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
