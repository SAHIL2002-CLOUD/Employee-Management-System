import { useState } from "react";
import "./App.css";
import Home from "./Home";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/adminlogin"element={<AdminLogin/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
