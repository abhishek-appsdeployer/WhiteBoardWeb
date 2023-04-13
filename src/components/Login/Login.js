import React,{useState} from 'react'
import "./Login.css"
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'; // Import Axios
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');


  const handleSignup = async (e) => {
    e.preventDefault();
    // Do any necessary validation here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailErr("Please enter a valid email address");
    }
    else if (password === "") {
      setEmailErr("");
      setPasswordErr("Empty password");
    }
    else {
      try {
        const response = await axios.post('https://task.appdeployers.com/api/deployer/login',{ email, password });
        console.log(response)
        const token = response.data.token; // Extract token from response
        // const decodedToken = jwt_decode(token); // Decode token using jwt_decode library (imported separately)
        console.log('Decoded Token:', token); // Log the decoded token to the console
        setEmailErr("");
        setPasswordErr("");
        if (response.data.success)
        {
          alert(`Login Successful!`);
          
          // var info =jwt_decode(response.data.token)
          // console.log(info)
          // localStorage.setItem("User", JSON.stringify(info));
          localStorage.setItem("User", JSON.stringify(response.data.user))
          navigate("/dashboard")
        }
        else
        {
          
          setPasswordErr("Invalid credentials")
        }
        
      } catch (error) {
        console.error('Error:', error);
        alert("Invalid details")
        // Handle any error responses from the API here
      }
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
