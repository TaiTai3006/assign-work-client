import './App.css';
import {  Routes, Route } from "react-router-dom";
import Login from './screen/Login.screen';
import Task from './screen/Task.screen';

function App() {
  return (
    <Routes>
        <Route path="/">
           {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} /> 
          <Route path="*" element={<NoPage />} />  */}
          <Route path="/login" element={<Login />} />
          <Route path="/task" element={<Task />} />
        </Route>
      </Routes>
  );
}

export default App;
