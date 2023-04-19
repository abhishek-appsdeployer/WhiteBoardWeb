import React, { useState } from 'react';
// import "./Login.css"
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [userNameErr, setUserNameErr] = useState('');
  const [userName,setUserName]=useState("")
  
  const handleSignup =async (e) => {
    e.preventDefault();
    // Do any necessary validation or API calls here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      
      setEmailErr("Please enter a valid email address")
      
    }
    else if(password=="")
    {
        setEmailErr("")
        setPasswordErr("Empty password")
    }
    else if(userName=="")
    {
        setPasswordErr("")
        setUserNameErr("User Name missing")
    }
    
    else {
      setUserNameErr("");
      try {
        // Send signup data to the API
        const response = await axios.post('https://task.appdeployers.com/api/deployer/register', {
          email: email,
          password: password,
          username:userName,
          otp:otp
        });
        console.log(response)
        // Handle successful signup
        // Navigate to the login screen
        alert("Signup successfully")
        navigate('/login');
      } catch (error) {
        // Handle error
        console.error(error);
      }
    } 
}

  return (
    <div className="">
      {/* header for login */}
      
      <div className="d-flex flex-sm-row flex-column justify-content-between p-5">
        <h1>WhiteBoard</h1>
        <div className="d-flex gap-3">
          <p className='py-1'><i className="fas fa-globe"></i>{"  "}En</p>
          <Link to="/login">
            <div>
              <p className='border border-dark px-3 py-1 rounded-2'>Sign in</p>
            </div>
          </Link>
        </div>
      </div>

      {/* login form codes  */}
      <div className="d-flex center">

        <form onSubmit={handleSignup}>
          <h1>Signup for free today</h1>
          <p className='text-center'>We recommend using your work email — <br /> it keeps work and life separate.</p>
          <label htmlFor="" className='my-2'>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          
         
          <br />
          {emailErr ? <p className='text-danger'>{emailErr}</p> : null}
          <label htmlFor="" className='my-1'>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          {passwordErr ? <p className='text-danger'>{passwordErr}</p> : null}
          <label htmlFor="" className='my-2'>
            <input type="text" placeholder="User name" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </label>
          <br />
          {userNameErr ? <p className='text-danger'>{userNameErr}</p> : null}
          <label htmlFor="" className='my-2'>
            <input type="text" placeholder="Otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </label>
          <br />
          <button type="submit" className="">Sign up</button>
        </form>

      </div>
    </div>
  )
}

export default Signup;
