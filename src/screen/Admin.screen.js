import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';

const Admin = () => {

  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
  }

  const taskData = ["Dọn nhà tắm", "Quét nhà", "Lau nhà", "Đổ rác", "Lau bếp"];

  const [time, setTime] = useState({ start: getCurrentDate(), end: "" });
  const [dayData, setDayData] = useState([]);
  const [assginTask, setAssginTask] = useState([]);

  const getDatesArray = () => {
    const result = [];
    const currentDate = new Date(time.start);
    const end = new Date(time.end);

    while (currentDate <= end) {
      result.push(new Date(currentDate).toLocaleDateString("en-GB"));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };

  useEffect(() => {
    time.end && setDayData(getDatesArray());
  }, [time]);

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
  };

  const isValueExist = (taskIndex, dayIndex) => {
    for(let i = 0; i < assginTask.length; i++){
        if (assginTask[i].task === taskData[taskIndex] && assginTask[i].date === dayData[dayIndex]){
            return true;
        }
        
    }
    return false;
  };

  const handleAssignTask = (event, taskIndex, dayIndex) => {
    const { name, value } = event.target;
    if (value === "") {
      setAssginTask(
        assginTask.filter(
          (task) =>
            task.task !== taskData[taskIndex] || task.date !== dayData[dayIndex]
        )
      );
      return 0;
    }

    if (isValueExist(taskIndex, dayIndex)) {
        setAssginTask(assginTask.map((task) => {
            if (
              task.task === taskData[taskIndex] &&
              task.date === dayData[dayIndex]
            ) {
              return {...task, name: value};
            }
            return task;
          }))

        return 0
    }

    setAssginTask((preAssginTask) => [
      ...preAssginTask,
      { name: value, task: taskData[taskIndex], date: dayData[dayIndex] },
    ]);
  };

  const getNameTask = (taskIndex, dayIndex)=>{

    if(assginTask.length === 0) return "";

    for(let i = 0; i < assginTask.length; i++){
        if (assginTask[i].task === taskData[taskIndex] && assginTask[i].date === dayData[dayIndex]){
            return assginTask[i].name;
        }
    }

    return "";

  }

  const handleResetTask = ()=>{
    setAssginTask([]);
  }

  console.log(assginTask);
  return (
    <div className="container mt-5">
      <h1 className="fw-bold">Tạo công việc </h1>
      <Row>
        <Col>
          <div>
            <label for="exampleInputPassword1" class="form-label fs-5 fw-bold">
              Thời gian bắt đầu:
            </label>
            <input
              style={{ width: "30%" }}
              onChange={handleDateChange}
              name="start"
              value={time.start}
              type="date"
              class="form-control"
            />
          </div>
        </Col>
        <Col>
          <div class="">
            <label for="exampleInputPassword1" class="form-label fs-5 fw-bold">
              Thời gian kết thúc:
            </label>
            <input
              style={{ width: "30%" }}
              name="end"
              onChange={handleDateChange}
              type="date"
              class="form-control"
            />
          </div>
        </Col>
      </Row>
      {dayData.length !== 0 && (
        <Table className="my-4" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th># Task</th>
              {dayData.map((data, index) => (
                <th key={index}>{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {taskData.map((data, indexTaskData) => (
              <tr key={indexTaskData}>
                <td>{data}</td>
                {dayData.map((day, indexDayData) => (
                  <td key={indexDayData}>
                    <select
                      onChange={(e) =>
                        handleAssignTask(e, indexTaskData, indexDayData)
                      }
                      value={getNameTask(indexTaskData, indexDayData)}
                      name="example"
                      defaultValue=""
                    >
                      <option value=""></option>
                      <option value="Tai">Tài</option>
                      <option value="Thang">Thắng</option>
                      <option value="Bao">Bảo</option>
                      <option value="Tee">Tee</option>
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Button variant="success">Save</Button> {' '}
      <Button onClick={handleResetTask} variant="danger">Reset data</Button>

      <hr />

      <h1 className="fw-bold">Lịch đã phân công:</h1>

      <div>
        <label
          style={{ marginRight: "10px" }}
          for="exampleInputPassword1"
          class=" fs-5 fw-bold"
        >
          Khoảng thời gian:
        </label>
        <select style={{ width: "10%" }} name="example">
          <option value=""></option>
          <option value="B">B</option>
          <option value="-">Other</option>
        </select>
      </div>

      <Table className="my-4" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th># Task</th>
            {dayData.map((data, index) => (
              <th key={index}>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {taskData.map((data, indexTaskData) => (
            <tr key={indexTaskData}>
              <td>{data}</td>
              {dayData.map((data, indexDayData) => (
                <td key={indexDayData}>
                  {getNameTask(indexTaskData, indexDayData)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Table className="my-4" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th># Task</th>
            {dayData.map((data, index) => (
              <th key={index}>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {taskData.map((data, indexTaskData) => (
            <tr key={indexTaskData}>
              <td>{data}</td>
              {dayData.map((data, indexDayData) => (
                <td key={indexDayData}>
                  <select name="example">
                    <option value=""></option>
                    <option value="B">B</option>
                    <option value="-">Other</option>
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
