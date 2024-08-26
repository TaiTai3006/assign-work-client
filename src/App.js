import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./screen/Login.screen";
import Task from "./screen/Task.screen";
import Admin from "./screen/Admin.screen";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogin } from "./redux/action/auth.action";
import { useSelector, useDispatch } from "react-redux";


const ProtectedLogin = () => {
  const { checkStatus } = useLogin();
  const status = useSelector((state) => state.auth.status);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    user && checkStatus(user.gmail);
  }, [status]);

  return status === 1 ? (
    <Navigate to={`/task?user=${user.gmail}`} />
  ) : (
    <Outlet />
  );
};

const ProtectedTask = () => {
  const { checkStatus } = useLogin();
  const status = useSelector((state) => state.auth.status);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    user && checkStatus(user.gmail);
  }, [status]);

  return status === 1 ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/task" />} />  
      
      <Route element={<ProtectedLogin />}>
        <Route path="/login" index element={<Login />} />
      </Route>
      
      <Route element={<ProtectedTask />}>
        <Route path="/task" element={<Task />} />
      </Route>
      
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
