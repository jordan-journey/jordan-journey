import { useState } from 'react';
import '../assets/style/SigUp.css';
import axios from 'axios';  
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tickets-73a3c-default-rtdb.firebaseio.com/users.json', {
        name,
        email,
        password,
        Active: true
      });
      if (response.status === 200) {
        localStorage.setItem('id', response.data.name);
        localStorage.setItem('username', name);
        localStorage.setItem('email', email);
        alert('Sign up successful!');
        navigate('/home'); 
      } 
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };

  return (
    <section className='signup-section flex'>
   
      <div className="signup-container flex mt-20 ">
        <div className="signup-box text-black">
          <h2 className='v text-white'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
            <Link to="/Login">
              <button type="button" className="login-btn">Login</button>
            </Link>
          </form>
        </div>
      </div>
  
    </section>
  );
}

export default SignUp;