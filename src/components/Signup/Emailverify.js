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

      {/* login form codes  */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSubmit(handleEmailverify)}
          style={{ maxWidth: "400px", width: "100%", padding: "20px" }}
        >
          <h1>Email verify for free today</h1>
          <p style={{ textAlign: "center" }}>
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

          {errors.email && (
            <p style={{ color: "danger" }}>{errors.email.message}</p>
          )}

          <br />

          <button
            type="submit"
            style={{
              backgroundColor: "#4262ff",
              color: "white",
              borderRadius: "10px",
              padding: "20px",
              width: "100%",
              borderRadius: "50px",
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
