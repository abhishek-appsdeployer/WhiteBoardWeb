import React from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { Routes, Route, HashRouter } from "react-router-dom";
import Emailverify from "./components/Signup/Emailverify";
import Dashboard from "./components/Dashboard/Dashboard";
import DrawingArea from "./components/Draw/DrawingArea";
import Lines from "./components/Draw/line";

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
        <Route path="line" element={<Lines />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
