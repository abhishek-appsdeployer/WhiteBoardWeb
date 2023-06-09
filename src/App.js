import React from 'react'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Emailverify from './components/Signup/Emailverify';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    
    <Route path='/' element={<Home/>}/>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="email" element={<Emailverify />} />
        <Route path="dashboard" element={<Dashboard />} />
       
      
    </Routes>
  </BrowserRouter>
  )
}

export default App
