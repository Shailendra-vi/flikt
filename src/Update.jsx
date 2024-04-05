import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = ({ userData, setUserData }) => {
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

    const handleSubmit = async (e) => {
        console.log("Called", userData.userId)
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/update-users/${userData.userId}`, {
                name: fullName,
                email,
                password: password
            });
            if (response.data.success === true) {
                setUserData({
                    ...userData,
                    name: response.data.user.name,
                    email: response.data.user.email,
                })
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    const handleHome = () => {
        navigate('/')
    }

    return (
        <div className="update-container">
            {userData ? (
                <>
                    <form onSubmit={handleSubmit} className="update-form">
                        <div className="input-group">
                            <input
                                type="text"
                                value={fullName}
                                onChange={handleFullNameChange}
                                placeholder="Enter new name"
                                className="update-input"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter new email"
                                className="update-input"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter new password"
                                className="update-input"
                            />
                        </div>
                        <button type="submit" className="update-btn">Update</button>
                    </form>
                    <div className="create-account">
                        <button onClick={handleHome} className="login-btn">Home</button>
                    </div>
                </>
            ) : (
                <div className="welcome-msg">
                    <h2>Welcome to Flikt!</h2>
                    <p>
                        Please login to continue. <button onClick={handleLogin} className="login-btn">Login</button><br />
                        New User? <button onClick={handleRegister} className="register-btn">Register</button><br />
                    </p>
                </div>
            )}
        </div>
    )
}

export default Update