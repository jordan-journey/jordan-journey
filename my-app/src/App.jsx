
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './component/header';
import Home from './pages/Home';
import AboutUs from './pages/AboutAu';
import ContactUs from './pages/ContactUs';
import ListingPage from './pages/ListingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Footer from './component/Footer';


function App() {

  return (
   
   
    <BrowserRouter>
    <div className='App'>
      <Header/>
      <div>
        <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/AboutUs' element={<AboutUs />}/>
              <Route path='/ContactUs' element={<ContactUs />}/>
              <Route path='/ListingPage' element={<ListingPage />}/>
              <Route path='/Login' element={<Login />}/>
              <Route path='/Dashboard' element={<Dashboard />}/>



        </Routes> 
      </div>
      <Footer/>
      
     
    </div> 
      </BrowserRouter>
  
  );

}

export default App
