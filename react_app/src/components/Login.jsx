// Login.js

import React, { useState ,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {DomainContext } from '../App';

const Login = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login,register}  = useAuth();
  const url=useContext(DomainContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/login`, { email, password });
      // Assuming your backend returns a token upon successful login
      console.log(response);
      const { token,userId,location } = response.data;
      // localStorage.setItem('token',token);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      login(userId);
      register(location);
      console.log(token);
      console.log(userId);
      navigate('/'); 
    } catch (error) {
      alert('Invalid Email or password')
      console.log(error)
      // setError(error.response.data.message);
    }
  };
 const signup=()=>{
  navigate('/register');
 }
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Email  :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="register-button">
        <button onClick={signup}>Create new Account</button>
      </div>
    </div>
  );
};

export default Login;
