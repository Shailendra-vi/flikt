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

    return (
        <>
            {userData ? <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        value={fullName}
                        onChange={handleFullNameChange}
                        placeholder="Enter new name"

                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter new email"

                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"

                    />
                </div>
                <button type="submit">Update</button>
            </form> : <div className="container">
                <div className="welcome-container">
                    <div className="welcome-box">
                        <h2>Welcome to Our Website!</h2>
                        <p>
                            Please login to continue. <button onClick={() => handleLogin()}>Login</button><br />
                            New User? <button onClick={() => handleRegister()}>Register</button><br />
                        </p>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Update