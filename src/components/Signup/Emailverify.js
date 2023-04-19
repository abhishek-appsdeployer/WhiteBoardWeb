import React, { useState } from 'react';
// import "./Login.css"
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Emailverify = () => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const navigate = useNavigate();
  const handleEmailverify = async(e) => {
    e.preventDefault();
    // Do any necessary validation or API calls here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      
      setEmailErr("Please enter a valid email address")
      
    }
   
    
    else
    {

try {
    // Call the API to verify email
    const datas={
      "email":email,
      "account_type":"Normal"
  }
    const response = await axios.post('https://task.appdeployers.com/api/deployer/emailverification',datas);
    const data = response.data;
    if (data.success) {
      // If API response is successful, navigate to signup page
      alert("Verification Code is sent to your email")
      navigate('/signup');
    } else {
      // If API response is not successful, show error message
      setEmailErr("Email verification failed. Please try again.");
    }
  } catch (error) {
    console.error(error);
    setEmailErr("An error occurred. Please try again.");
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

        <form onSubmit={handleEmailverify}>
          <h1>Emailverify for free today</h1>
          <p className='text-center'>We recommend using your work email — <br /> it keeps work and life separate.</p>
          <label htmlFor="" className='my-2'>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          
         
          
          {emailErr ? <p className='text-danger'>{emailErr}</p> : null}
         
        
          <br />
         
          <button type="submit" className="">Agree</button>
        </form>

      </div>
    </div>
  )
}

export default Emailverify;
