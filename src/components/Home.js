import React from "react";

import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
        <div>HOme</div>
        <Link to="/login"> <button>Login</button></Link>
        <Link to="/signup">   <button>Signup</button></Link>
    </>
   
  );
};

export default Home;
