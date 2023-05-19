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
      alert(error);
    }
  };

  return (
    <div>
      {/* header for login */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "5rem",
        }}
      >
        <h1>WhiteBoard</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <p style={{ padding: "1px 0" }}>
            <i className="fas fa-globe"></i>
            {"  "}En
          </p>
          <Link to="/login">
            <div>
              <p
                style={{
                  border: "1px solid #343a40",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                }}
              >
                Sign in
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* signup form codes  */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSubmit(handleSignup)}
          style={{ maxWidth: "400px", width: "100%", padding: "20px" }}
        >
          <h1>Signup for free today</h1>
          <p style={{ color: "red" }}>
            We recommend using your work email — <br /> it keeps work and life
            separate.
          </p>
          <label style={{ margin: "0.5rem 0", width: "100%" }}>
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
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <label style={{ margin: "0.5rem 0", width: "100%" }}>
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
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <label style={{ margin: "0.5rem 0", width: "100%" }}>
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
            <p style={{ color: "danger" }}>{errors.userName.message}</p>
          )}
          <label style={{ margin: "0.5rem 0", width: "100%" }}>
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
            <p style={{ color: "danger" }}>{errors.otp.message}</p>
          )}
          <button
            type="submit"
            style={{
              backgroundColor: "#4262ff",
              color: "white",
              borderRadius: "10px",
              width: "400px",
              padding: "20px",
              width: "100%",
              borderRadius: "40px",
              "@media (max-width: 600px)": {
                width: "240px",
                display: "none",
              },
            }}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
