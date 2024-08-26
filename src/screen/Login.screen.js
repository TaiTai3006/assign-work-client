import React from "react";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useLogin } from "../redux/action/auth.action";


const Login = () => {
  const author = useSelector((state) => state.auth.value);
  const { login } = useLogin();

  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(result);
        console.log("User info:", user);
        login(user.email, user.accessToken);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  console.log(author);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <GoogleButton onClick={signin} />
    </div>
  );
};

export default Login;
