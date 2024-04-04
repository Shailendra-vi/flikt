import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./login"
import Register from './Register';
import { useState } from 'react';
import Dashboard from './Dashboard';
import Update from './Update';


function App() {
  const [userData,setUserData] = useState(null)


  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard userData={userData} setUserData={setUserData}/>} />
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<Update userData={userData} setUserData={setUserData}/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
