import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ userData, setUserData }) => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    let isRendered = useRef(false);

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                let response = await axios.post('http://localhost:3000/getuser', {
                    token
                });
                if (response.status === 200) {
                    setUserData(response.data)
                    isRendered.current = true
                } else {
                    const data = response.data;
                }
            }
        }
        getUser()
    }, [])

    useEffect(() => {
        let res;
        const getData = async () => {
            if (userData) {
                res = await axios.get(`http://localhost:3000/getList/${userData.userId}`);
                setInputData(res.data.dataList);
                setFilteredData(res.data.dataList);
            }
        };
        getData();
    }, [userData]);

    useEffect(() => {
        const setDataList = async () => {
            if (userData && isRendered.current) {
                const res = await axios.post(`http://localhost:3000/addlist/${userData.userId}`, {
                    dataList: inputData
                });
            }
        };
        setDataList();
    }, [inputData.length]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        gender: ""
    });
    const [newFormData, setNewFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        gender: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        if (!isRendered.current) {
            isRendered.current = true;
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setInputData((prevData) => [...prevData, formData]);
        setFilteredData((prevData) => [...prevData, formData]);
        setFormData({
            name: "",
            email: "",
            address: "",
            phone: "",
            gender: ""
        });
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewFormData({ ...inputData[index] });
    };

    const handleSave = (index) => {
        setInputData((prevData) =>
            prevData.map((item, i) => (i === index ? newFormData : item))
        );
        setFilteredData((prevData) =>
            prevData.map((item, i) => (i === index ? newFormData : item))
        );
        setEditIndex(null);
        setNewFormData({
            name: "",
            email: "",
            address: "",
            phone: "",
            gender: ""
        });
        if (!isRendered.current) {
            isRendered.current = true;
        }
    };

    const handleDelete = (index) => {
        setInputData((prevData) => prevData.filter((_, i) => i !== index));
        setFilteredData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const handleUserDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/users/${userData.userId}`);
            setUserData(null);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = () => {
        navigate('/update');
    };
    const handleLogin = () => {
        navigate('/login');
    };
    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogout = () => {
        setUserData(null);
        localStorage.setItem('token', '')
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        const filtered = inputData.filter((item) =>
            item.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <>

            {userData ? (
                <>
                    <nav className="navbar">
                        <div className="navbar-left">
                            {userData && <span>Welcome, {userData.name}</span>}
                        </div>
                        <div className="navbar-right">
                            {userData ? (
                                <>
                                    <span>{userData.email}</span>
                                    <button className="welcome-btn" onClick={handleLogout}>Log out</button>
                                </>
                            ) : (
                                <>
                                    {/* <button className="welcome-btn" onClick={handleLogin}>Login</button>
                            <button className="welcome-btn" onClick={handleRegister}>Register</button> */}
                                </>
                            )}
                        </div>
                    </nav>
                    <div className="input-container margin-bottom-50">
                        <form onSubmit={handleAdd}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleAddInputChange}
                                placeholder="Name*"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleAddInputChange}
                                placeholder="Email-ID*"
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleAddInputChange}
                                placeholder="Address"
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleAddInputChange}
                                placeholder="Phone Number"
                            />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleAddInputChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                    <div className="search-container input-container">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search by Name"
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email-ID</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((data, index) => (
                                <tr key={index}>
                                    {editIndex === index ? (
                                        <>
                                            <td><input type="text" name="name" value={newFormData.name} onChange={handleInputChange} required /></td>
                                            <td><input type="email" name="email" value={newFormData.email} onChange={handleInputChange} required /></td>
                                            <td><input type="text" name="address" value={newFormData.address} onChange={handleInputChange} /></td>
                                            <td><input type="tel" name="phone" value={newFormData.phone} onChange={handleInputChange} /></td>
                                            <td>
                                                <select name="gender" value={newFormData.gender} onChange={handleInputChange}>
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button className="save-button" onClick={() => handleSave(index)} disabled={(newFormData.name === '' || newFormData.email === '')}>Save</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.address}</td>
                                            <td>{data.phone}</td>
                                            <td>{data.gender}</td>
                                            <td>
                                                <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                                                <button onClick={() => handleDelete(index)}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="welcome-container">
                    <div className="welcome-message">
                        <h2 className="welcome-heading">Welcome!</h2>
                        <p className="welcome-text">
                            Already have an account? Yes<button className="welcome-btn" onClick={handleLogin}>Login</button><br />
                            Create new account<button className="welcome-btn welcome-register-button" onClick={handleRegister}>Register</button>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
