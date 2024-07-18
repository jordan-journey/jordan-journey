
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './component/header';
import Home from './component/Home';
import AboutUs from './component/AboutAu';
import ContactUs from './component/ContactUs';
import ListingPage from './component/ListingPage';
import Login from './component/Login';


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


        </Routes> 
      </div>
      
     
    </div> 
      </BrowserRouter>
  
  );

}

export default App
