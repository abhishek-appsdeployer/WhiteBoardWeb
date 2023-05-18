import React from "react";
// import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import Axios
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post(
        "https://task.appdeployers.com/api/deployer/login",
        { email, password }
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
    <div className="">
      {/* header for login */}
      <div className="d-flex flex-sm-row flex-column justify-content-between p-5">
        <h1>WhiteBoard</h1>
        <div className="d-flex gap-3">
          <p className="py-1">
            <i className="fas fa-globe"></i>
            {"  "}En
          </p>
          <Link to="/email">
            <div>
              <p className="border border-dark px-3 py-1 rounded-2">Signup</p>
            </div>
          </Link>
        </div>
      </div>

      {/* login form codes  */}
      <div className="d-flex justify-content-center align-items-center">
  <form onSubmit={handleSubmit(handleSignup)} style={{ maxWidth: "400px", width: "100%", padding: "20px" }}>
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
    {errors.email && (
      <p className="text-danger">{errors.email.message}</p>
    )}
    <br />

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
    {errors.password && (
      <p className="text-danger">{errors.password.message}</p>
    )}

    <p className="px-2">
      <u>I forgot my password</u>
    </p>
    <button
      type="submit"
      className="rounded-5 w-100"
      style={{
        backgroundColor: "#4262ff",
        color: "white",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "10px"
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
