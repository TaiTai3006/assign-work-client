import axios from "axios";
import { CHECK_STATUS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../reducer/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const login = (gmail, token) => {
      dispatch(LOGIN_REQUEST());

      axios
        .post("https://assign-work-server.vercel.app/login", {
          gmail: gmail,
          token: token,
        })
        .then(function (response) {
          console.log(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate(`/task?user=${response.data.gmail}`)
          dispatch(LOGIN_SUCCESS(response.data));
        })
        .catch(function (error) {
          dispatch(LOGIN_FAIL(error));
        });
    };

    const checkStatus =  (gmail)=>{
        axios
        .get(`https://assign-work-server.vercel.app/login/status?gmail=${gmail}`)
        .then(function (response) {
          console.log(response.data, 'sdhgfydgf')
          dispatch(CHECK_STATUS(response.data));
        })
        .catch(function (error) {
          console.log(error.message);
          dispatch(CHECK_STATUS(0));
        });
    }
  
    return { login, checkStatus };
  };