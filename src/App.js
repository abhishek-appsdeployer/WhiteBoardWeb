import React from "react";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Emailverify from "./components/signup/emailVerify";
import Dashboard from "./components/dashboard/dashboard";
import DrawingArea from "./components/draw/drawingArea";
import Lines from "./components/draw/line";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="email" element={<Emailverify />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="drawing" element={<DrawingArea />} />
        <Route path="line" element={<Lines/>} />
      </Routes>
    </HashRouter>
  );
};

export default App;
