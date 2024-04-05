import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null)

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

  const handleSubmit = async (e) => {
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
      setError(null)
    } catch (error) {
      setError(error.response.data.message)
      console.log(error.response.data);
    }
  };

  const handleLoginClick = () => {
    navigate('/login')
  };

  return (
    <div className="register-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <input
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            placeholder="Enter your Full Name"
            required
            className="register-input"
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your Email-ID"
            required
            className="register-input"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your Password"
            required
            className="register-input"
          />
        </div>
        {error ? <div className='error'>{error}</div> : <></>}
        <button type="submit" className="register-btn">Signup</button>
      </form>
      <div className="create-account">
        <button onClick={handleLoginClick} className="login-btn login-btn-2">Back to Login</button>
      </div>
    </div>
  );
};

export default Register;
