import React from "react";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(result)
        console.log('User info:', user);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
}

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
    <GoogleButton
      onClick={signin}
    />
  </div>
  );
};

export default Login;
