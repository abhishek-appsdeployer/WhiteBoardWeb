import React, { useState } from 'react';
// import "./Login.css"
import { Link } from 'react-router-dom';

const Emailverify = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

  const handleEmailverify = (e) => {
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
    else if(confirmPassword=="")
    {
        setPasswordErr("")
        setConfirmPasswordErr("Empty confirm password")
    }
    else if (password !=confirmPassword)
    {
        setConfirmPasswordErr("password and confirmpassord not same")
    }
    else
    {
setConfirmPasswordErr("")
   
    alert(`Email: ${email}\nPassword: ${password}\nConfirm Password: ${confirmPassword}`);
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
