import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import Axios

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    // const { email, password } = data;

    try {
      const response = await axios.post(
        "https://task.appdeployers.com/api/deployer/login",
        { email: data.email, password: data.password }
      );

      const token = response.data.token; // Extract token from response
      // const decodedToken = jwt_decode(token); // Decode token using jwt_decode library (imported separately)

      if (response.data.success) {
        alert(`Login Successful!`);
        localStorage.setItem("User", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Invalid details");
      // Handle any error responses from the API here
    }
  };

  return (
    <div>
      {/* header for login */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
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
          <Link to="/email">
            <div>
              <p
                style={{
                  border: "1px solid #343a40",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                }}
              >
                Signup
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* login form codes  */}
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
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <br />

          <label style={{ margin: "0.25rem 0", width: "100%" }}>
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
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}

          <p style={{ padding: "0 0.5rem" }}>
            <u>I forgot my password</u>
          </p>
          <button
            type="submit"
            style={{
              backgroundColor: "#4262ff",
              color: "white",
              borderRadius: "10px",
              padding: "20px",
              marginTop: "10px",
              width: "100%",
              borderRadius: "50px",
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
