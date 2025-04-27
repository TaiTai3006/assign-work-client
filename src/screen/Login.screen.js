import React from "react";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";
import { useLogin } from "../redux/action/auth.action";

const Login = () => {
  const author = useSelector((state) => state.auth.value);
  const { login } = useLogin();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { email, accessToken } = result.user;
      console.log("User signed in:", result.user);
      login(email, accessToken);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  console.log("Auth State:", author);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <GoogleButton onClick={handleSignIn} />
    </div>
  );
};

export default Login;
