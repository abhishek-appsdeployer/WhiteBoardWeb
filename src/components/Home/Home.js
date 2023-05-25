import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "gray",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            marginRight: "5rem",
            paddingTop: "5rem",
          }}
        >
          <Link
            to="login"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              width: "fit-content",
              marginRight: "1rem",
            }}
          >
            <p
              style={{
                border: "1px solid #343a40",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
              }}
            >
              Sign in
            </p>
          </Link>
          <Link
            to="email"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              width: "fit-content",
              marginRight: "1rem",
            }}
          >
            <p
              style={{
                border: "1px solid #343a40",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
              }}
            >
              Signup
            </p>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1 style={{ color: "white" }}>WhiteBoard</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
