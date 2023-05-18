import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    // Do any necessary validation or API calls here
  
    const { email, password, userName, otp } = data;


    try {
      // Send signup data to the API
      const response = await axios.post(
        "https://task.appdeployers.com/api/deployer/register",
        {
          email: email,
          password: password,
          username: userName,
          otp: otp,
        }
      );
      
      // Handle successful signup
      // Navigate to the login screen
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      // Handle error
      alert(error)
      
    }
  };

  return (
    <div className="">
      {/* header for login */}
      <div className="d-flex flex-sm-row flex-column justify-content-between p-5">
        <h1>WhiteBoard</h1>
        <div className="d-flex gap-3">
          <p className="py-1">
            <i className="fas fa-globe"></i>
            {"  "}En
          </p>
          <Link to="/login">
            <div>
              <p className="border border-dark px-3 py-1 rounded-2">Sign in</p>
            </div>
          </Link>
        </div>
      </div>

      {/* login form codes  */}
      <div className="d-flex center" 
      style={{ justifyContent: "center", textAlign: "center" }}>
        <form onSubmit={handleSubmit(handleSignup)} style={{ maxWidth: "400px", width: "100%", padding: "20px" }}>
          <h1>Signup for free today</h1>
          <p className="text-center">
            We recommend using your work email — <br /> it keeps work and life
            separate.
          </p>
          <label htmlFor="" className="my-2 w-100">
            <input 
            style={{
                width: "100%",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid gray",
              }}
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
          </label>
          <br />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <label htmlFor="" className="my-1 w-100">
            <input 
            style={{
                width: "100%",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid gray",
              }}
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
          </label>
          <br />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
          <label htmlFor="" className="my-2 w-100">
            <input 
            style={{
                width: "100%",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid gray",
              }}
              type="text"
              placeholder="User name"
              {...register("userName", { required: "User Name is required" })}
            />
          </label>
          <br />
          {errors.userName && (
            <p className="text-danger">{errors.userName.message}</p>
          )}
          <label htmlFor="" className="my-2 w-100">
            <input 
            style={{
                width: "100%",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid gray",
              }}
              type="text"
              placeholder="OTP"
              {...register("otp", {
                required: "OTP is required",
               
              })}
            />
          </label>
          <br />
          {errors.otp && (
            <p className="text-danger">{errors.otp.message}</p>
          )}
          <button type="submit" className="rounded-5 w-100"
          style={{
              backgroundColor: "#4262ff",
              color: "white",
              borderRadius: "10px",
              width: "400px",
              padding: "20px",
              "@media (max-width: 600px)": {
                width: "240px",
                display: "none",
              },
            }}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

