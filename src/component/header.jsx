import { Link } from "react-router-dom";

function Header(){

    return (
        <header className="sticky top-0 z-50 flex flex-row items-center justify-between p-2 border-b-2 shadow-2xl sm:justify-around bg-cyan-500">
            
            <Link to="" className="flex items-center h-10 px-10 italic font-bold text-white uppercase rounded-tl-full rounded-br-full bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-100 hover:opacity-90">
            Title
            </Link>
            <nav className="items-center justify-between hidden gap-4 font-semibold text-white sm:flex">
                
            <Link to="/ContactUs" className="mx-4 hover:text-sky-950">
            Contact Us
            </Link>
            <Link to="/AboutAu" className="mx-4 hover:text-sky-950">
            About Us
            </Link>
            <Link to="/ListingPage" className="mx-4 hover:text-sky-950">
            Listing Page
            </Link>
            <Link to="/" className="mx-4 hover:text-sky-950">
            Home
            </Link>

            <Link to="/Login" className="mx-4 hover:text-sky-950">
            Login
            </Link>
            <Link to="/Dashboard" className="mx-4 hover:text-sky-950">
            Dashboard
            </Link>
          
            
            
            </nav>
            
        
        </header>
        );


}
export default Header;