import React,{useState} from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

  const handleSignup = (e) => {
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
    <div class="">
      {/* header for login */}
      <div className="d-flex flex-sm-row flex-column justify-content-between p-5">
        <h1>WhiteBoard</h1>
       <div className="d-flex gap-3">
       
       <p className='py-1'><i className="fas fa-globe"></i>{"  "}En</p>
       <Link to="/email"> 
       <div>
       <p className='border border-dark px-3 py-1 rounded-2'>Signup</p></div>
       </Link>
       </div>
      </div>

      {/* login form codes  */}
      <div className="d-flex center">

      <form onSubmit={handleSignup}>
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
    <p className='px-2'><u>I forgot my password</u></p>
    <button type="submit display-5">Sign in</button>
  </form>

      </div>
    </div>
  )
}

export default Login
