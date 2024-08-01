import React from "react";
import GoogleButton from "react-google-button";

const Login = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
    <GoogleButton
      onClick={() => {
        console.log("Google button clicked");
      }}
    />
  </div>
  );
};

export default Login;
