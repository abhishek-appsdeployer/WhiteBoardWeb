import React from "react";

import { Link } from "react-router-dom";
import "./home.css";
const Home = () => {
  return (
    <>
      <div className="main">
        <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-5 justify-content-end mx-5 pt-5">
          <Link
            to="login"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              width: "fit-content",
            }}
          >
            {" "}
            <p className="border border-dark px-3 py-1 rounded-2 ho">Sign in</p>
          </Link>
          <Link
            to="email"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              width: "fit-content",
            }}
          >
            {" "}
            <p className="border border-dark px-3 py-1 rounded-2 ho">Signup</p>
          </Link>
        </div>

        <div className=" ">
          <h1 className="wh">WhiteBoard</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
