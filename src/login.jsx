import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUserData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError]= useState(null)
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const data = response.data;
        setUserData(data)
        navigate('/');
        setError(data.message)
        localStorage.setItem('token', data.token);
      } else {
        const data = response.data;
        console.log('Login failed:', data.message);
        setError(data.message)
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setError(error.message)
    }
  };

  const handleCreateAccountClick = () => {
    navigate('/register')
  };


  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your Email-ID"
            className="login-input"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your Password"
            className="login-input"
            required
          />
        </div>
        {error ? <div className='error'>{error}</div> : <></>}
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="create-account">
        <button onClick={handleCreateAccountClick} className="create-account-btn">Create New Account</button>
      </div>
    </div>
  );
};

export default Login;
