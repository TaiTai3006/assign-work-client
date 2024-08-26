import axios from "axios";
import { useDispatch } from "react-redux";
import { TASK_REQUEST, TASK_SUCCESS, TASK_FAIL } from "../reducer/task.reducer";
import {
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_FAIL,
  SEND_TASK_REQUEST,
  SEND_TASK_SUCCESS,
  SEND_TASK_FAIL,
} from "../reducer/assign-taskSlice";
import { USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../reducer/userSlice";
import { uploadImg } from "./task.action";

export const useTask = () => {
  const dispatch = useDispatch();


  const getTask = (gmail, token) => {
    dispatch(TASK_REQUEST());

    axios
      .get("https://assign-work-server.vercel.app/task")
      .then(function (response) {
        dispatch(TASK_SUCCESS(response.data));
      })
      .catch(function (error) {
        dispatch(TASK_FAIL(error));
      });
  };

  const printTask = async (data_url)=>{
    dispatch(SEND_TASK_REQUEST());
    const img = await uploadImg(data_url)

    axios
      .post("https://assign-work-server.vercel.app/sendTaskIMG",{
        img: img
      })
      .then(function (response) {
        console.log(response);
        dispatch(SEND_TASK_SUCCESS());
      })
      .catch(function (error) {
       console.log(error);
       dispatch(SEND_TASK_FAIL());
      });
  }



  const getAssignTask = async (start, end) => {
    dispatch(ASSIGN_TASK_REQUEST());
  
    try {
      const response = await axios.get(`https://assign-work-server.vercel.app/assgin-task?start=${start}&end=${end}`);
      dispatch(ASSIGN_TASK_SUCCESS(response.data));
    } catch (error) {
      dispatch(ASSIGN_TASK_FAIL(error));
    }
  };
  

  const updateStatus = (status, id, start, end) => {
    axios
      .post("https://assign-work-server.vercel.app/assgin-task/status", {
        status: status,
        id: id,
      })
      .then(function (response) {
        console.log(response);
        getAssignTask(start, end);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteTask = (id, start, end) => {
    axios
      .post("https://assign-work-server.vercel.app/assgin-task/delete", { id: id })
      .then(function (response) {
        console.log(response);
        getAssignTask(start, end);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUser = () => {
    dispatch(USER_REQUEST());

    axios
      .get("https://assign-work-server.vercel.app/user")
      .then(function (response) {
        dispatch(USER_SUCCESS(response.data));
      })
      .catch(function (error) {
        dispatch(USER_FAIL(error));
      });
  };

  const createTask = async (data, start, end) => {
    try {
      const response = await axios.post("https://assign-work-server.vercel.app/assgin-task", {
        list: data,
      });
      console.log(response);
      getAssignTask(start, end)
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getTask,
    createTask,
    getAssignTask,
    updateStatus,
    deleteTask,
    getUser,
    printTask 
  };
};
