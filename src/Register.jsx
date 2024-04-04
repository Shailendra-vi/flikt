import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      const res = await axios.post('http://localhost:3000/register', {
        name: fullName,
        email,
        password,
      });

      if (res && res.data.success) {
        localStorage.setItem('authToken', res.data.token);
        navigate('/Login');
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };

  const handleLoginClick = () => {
    navigate('/login')
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <div className="additional-links">
        Already have an account? <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default Register;
