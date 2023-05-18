import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Emailverify = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEmailverify = async (data) => {
    try {
      const response = await axios.post(
        "https://task.appdeployers.com/api/deployer/emailverification",
        {
          email: data.email,
          account_type: "Normal",
        }
      );
      const responseData = response.data;
      if (responseData.success) {
        alert("Verification Code is sent to your email");
        navigate("/signup");
      } else {
        alert("Email verification failed. Please try again.");
      }
    } catch (error) {
      
      alert("An error occurred. Please try again.");
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
        style={{ justifyContent: "center", textAlign: "center" }}
      >
        <form onSubmit={handleSubmit(handleEmailverify)} style={{ maxWidth: "400px", width: "100%", padding: "20px" }}>
          <h1>Email verify for free today</h1>
          <p className="text-center">
            We recommend using your work email — <br /> it keeps work and life separate.
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

          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}

          <br />

          <button type="submit" className="rounded-5 w-100"
          style={{
              backgroundColor: "#4262ff",
              color: "white",
              borderRadius: "10px",
          
              padding: "20px",
             
            }}
          >
            Agree
          </button>
        </form>
      </div>
    </div>
  );
};

export default Emailverify;
