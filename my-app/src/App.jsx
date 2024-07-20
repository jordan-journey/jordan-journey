
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/header";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutAu";
import ContactUs from "./pages/ContactUs";
import ListingPage from "./pages/ListingPage";
import Login from "./pages/Login";
import MainDashboard from "./pages/Dashboard/Dashboard";
import AddNewTicket from "./pages/Dashboard/add";
import AddAdmin from "./pages/Dashboard/AddAdmin";
import Admin from "./pages/Dashboard/Admin";
import AdminLogin from "./pages/Dashboard/AdminLogin";
import Saidbar from "./pages/Dashboard/Saidbar";
import DelteTicket from "./pages/Dashboard/Delte";
import UpdateTicket from "./pages/Dashboard/UPdate";
import Users from "./pages/Dashboard/Users";
import Contact from "./pages/Dashboard/ContactMsg";
import Footer from './component/Footer';
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div>
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/ListingPage" element={<ListingPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<AdminLogin />} />
            <Route path="/Add" element={<AddNewTicket />} />
            <Route path="ADDAdmin" element={<AddAdmin />} />
            <Route path="Admin" element={<Admin />} />
            <Route path="Said" element={<Saidbar />} />
            <Route path="/Delete" element={<DelteTicket />} />
            <Route path="/Update" element={<UpdateTicket />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/MDashboard" element={<MainDashboard />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/SignUp" element={<SignUp />} />


    
          </Routes>
        </div>


      <Footer/>
      
     
    </div> 
      </BrowserRouter>
  

  );
}

export default App;
