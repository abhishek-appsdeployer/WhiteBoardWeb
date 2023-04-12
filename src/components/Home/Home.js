import React from "react";

import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Link ,useNavigate} from 'react-router-dom';
import "./Home.css"
const Home = () => {
  return (
    <>
        {/* <div>HOme</div>
        <Link to="/login"> <button>Login</button></Link>
        <Link to="/signup">   <button>Signup</button></Link> */}
        <div  className="main">
        <div className="d-flex gap-5 justify-content-end mx-5 pt-5">
        <Link to="/login">  <p className='border border-dark px-3 py-1 rounded-2'>Sign in</p></Link>
        <Link to="/signup"> <p className='border border-dark px-3 py-1 rounded-2'>Signup</p></Link>
</div>

<div className="d-flex wh">
  <h1>WhiteBoard</h1>
</div>
        </div>
    </>
   
  );
};

export default Home;
