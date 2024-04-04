import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ userData, setUserData }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/users/${userData.userId}`);
            setUserData(null)
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    };


    const handleUpdate = () => {
        navigate('/update')
    }

    const handleLogin = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/register')
    }


    return (
        <>
            {userData ? (
                <div className="home">
                    <div className="home-container" >
                        <span>Name: {userData.name}</span>
                        <span>Email: {userData.email}</span>
                        <div>
                            <button className="btn btn-xl btn-info" onClick={() => handleUpdate()}>Edit</button>
                            <button className="btn btn-xl btn-danger" onClick={() => handleDelete()}>Delete Profile</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="welcome-container">
                        <div className="welcome-box">
                            <h2>Welcome to Our Website!</h2>
                            <p>
                                Please login to continue. <button onClick={() => handleLogin()}>Login</button><br/>
                                New User? <button onClick={() => handleRegister()}>Register</button><br/>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
