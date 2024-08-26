import React, { useEffect, useState, useCallback, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { useTask } from "../redux/action/admin.action";
import Modal from "react-bootstrap/Modal";
import html2canvas from "html2canvas";
import Spinner from "react-bootstrap/Spinner";



const Admin = () => {
  const ref = useRef(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    html2canvas(ref.current, { scale: 2 })
  .then((canvas) => {
    // Chuyển đổi canvas thành Blob
    const dataUrl = canvas.toDataURL("image/png");

    // Gọi hàm upload với dataURL
    printTask(dataUrl).then((downloadURL) => {
      console.log("URL của hình ảnh đã tải lên:", downloadURL);
    }).catch((error) => {
      console.error("Lỗi khi tải lên hình ảnh:", error);
    });
  })
  .catch((err) => {
    console.log(err);
  });
  }, [ref]);

  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    getTask();
    getUser();
  }, []);

  const getMondayOfWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = day === 0 ? 6 : day - 1;
    today.setDate(today.getDate() - diff);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
  };

  const getSundayOfWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = day === 0 ? 0 : 7 - day;
    today.setDate(today.getDate() + diff);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
  };

  const taskData = useSelector((state) => state.task.value);
  const assignTaskData = useSelector((state) => state.assign_task.value);
  const loading = useSelector((state) => state.assign_task.loading);
  const userData = useSelector((state) => state.user.value);
  console.log(assignTaskData, userData);

  const {
    getTask,
    createTask,
    getAssignTask,
    updateStatus,
    deleteTask,
    getUser,
    printTask 
  } = useTask();

  const [time, setTime] = useState({ start: getCurrentDate(), end: "" });
  const [assignTime, setAssignTime] = useState({
    start: getMondayOfWeek(),
    end: getSundayOfWeek(),
  });
  const [dayData, setDayData] = useState([]);
  const [assignDayData, setAssignDayData] = useState([]);
  const [assginTask, setAssginTask] = useState([]);
  const [assignTaskindex, setAssignTaskindex] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (index) => {
    handleSelectIndex(index);
    setShow(true);
  };
  const handleSelectIndex = (index) => {
    setAssignTaskindex(index);
  };

  const getDatesArray = (data) => {
    if (data.end === '') return [data.start];
    console.log('hsdgg')
    const result = [];
    const currentDate = new Date(data.start);
    const end = new Date(data.end);

    while (currentDate <= end) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Thêm 1 vì tháng bắt đầu từ 0
      const day = String(currentDate.getDate()).padStart(2, "0");

      result.push(`${year}-${month}-${day}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };

  useEffect(() => {
    setDayData(getDatesArray(time));
  }, [time]);

  console.log(dayData)

  useEffect(() => {
    getAssignTask(assignTime.start, assignTime.end);
    setAssignDayData(getDatesArray(assignTime));
  }, [assignTime]);

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
  };

  const handleDateAssignChange = (event) => {
    const { name, value } = event.target;
    setAssignTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
  };

  const isValueExist = (taskIndex, dayIndex) => {
    for (let i = 0; i < assginTask.length; i++) {
      if (
        assginTask[i].taskname === taskData[taskIndex].taskname &&
        assginTask[i].deadline === dayData[dayIndex]
      ) {
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
            task.taskname !== taskData[taskIndex].taskname ||
            task.deadline !== dayData[dayIndex]
        )
      );
      return 0;
    }

    if (isValueExist(taskIndex, dayIndex)) {
      setAssginTask(
        assginTask.map((task) => {
          if (
            task.taskname === taskData[taskIndex].taskname &&
            task.deadline === dayData[dayIndex]
          ) {
            return { ...task, user: value };
          }
          return task;
        })
      );

      return 0;
    }

    setAssginTask((preAssginTask) => [
      ...preAssginTask,
      {
        user: value,
        taskname: taskData[taskIndex].taskname,
        deadline: dayData[dayIndex],
      },
    ]);
  };

  const getNameTask = (taskIndex, dayIndex, list, day) => {
    if (list.length === 0) return "";

    for (let i = 0; i < list.length; i++) {
      if (
        list[i].taskname === taskData[taskIndex].taskname &&
        list[i].deadline === day[dayIndex]
      ) {
        return list[i].user;
      }
    }

    return "";
  };

  const handleResetTask = () => {
    setAssginTask([]);
  };

  const saveAssignTask = async () => {
    createTask(assginTask, assignTime.start, assignTime.end);

    setAssginTask([]);
  };

  function filterTasksByDateRange(tasks, start, end) {
    const newStart = new Date(start);
    const oldStart = new Date(tasks[0].deadline);

    return tasks
      .map((task, index) => {
        const oldDeadline = new Date(task.deadline);
        const timeDifference = oldDeadline - oldStart;
        const newDeadline = new Date(newStart.getTime() + timeDifference);

        const formattedNewDeadline = `${newDeadline.getFullYear()}-${String(
          newDeadline.getMonth() + 1
        ).padStart(2, "0")}-${String(newDeadline.getDate()).padStart(2, "0")}`;

        return {
          ...task,
          deadline: formattedNewDeadline,
        };
      })
      .filter((task) => new Date(task.deadline) <= new Date(end));
  }

  const handleUse = () => {
    time.end &&
      setAssginTask(
        filterTasksByDateRange(assignTaskData, time.start, time.end)
      );
  };

  const redernRowColor = (status) => {
    if (status === "Pending") return "table-secondary";

    if (status === "In Progress") return "table-warning";

    if (status === "Completed") return "table-success";
  };

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
        <>
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
              {taskData?.map((data, indexTaskData) => (
                <tr key={indexTaskData}>
                  <td>{data.taskname}</td>
                  {dayData.map((day, indexDayData) => (
                    <td key={indexDayData}>
                      <select
                        onChange={(e) =>
                          handleAssignTask(e, indexTaskData, indexDayData)
                        }
                        value={getNameTask(
                          indexTaskData,
                          indexDayData,
                          assginTask,
                          dayData
                        )}
                        name="example"
                        defaultValue=""
                      >
                        <option value=""></option>
                        {userData.map((data, index) => (
                          <option key={index} value={data.gmail}>
                            {data.gmail}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="success" onClick={saveAssignTask}>
            Save
          </Button>{" "}
          <Button onClick={handleResetTask} variant="danger">
            Reset data
          </Button>
        </>
      )}

      <hr />
      <h1 className="fw-bold">Lịch đã phân công:</h1>
      <Row>
        <Col>
          <div>
            <label for="exampleInputPassword1" class="form-label fs-5 fw-bold">
              Thời gian bắt đầu:
            </label>
            <input
              style={{ width: "30%" }}
              onChange={handleDateAssignChange}
              name="start"
              value={assignTime.start}
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
              value={assignTime.end}
              onChange={handleDateAssignChange}
              type="date"
              class="form-control"
            />
          </div>
        </Col>
      </Row>
      <Button className="mt-2 me-2" variant="success" onClick={handleUse}>
        Use
      </Button>
      <Button className="mt-2" variant="primary" onClick={onButtonClick}>
      {loading ? <Spinner animation="border" /> : "Send mail"}
      </Button>
      <Table ref={ref} className="my-4" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th># Task</th>
            {assignDayData.map((data, index) => (
              <th key={index}>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {taskData?.map((data, indexTaskData) => (
            <tr key={indexTaskData}>
              <td>{data.taskname}</td>
              {assignDayData.map((data, indexDayData) => (
                <td key={indexDayData}>
                  {getNameTask(
                    indexTaskData,
                    indexDayData,
                    assignTaskData,
                    assignDayData
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Table className="my-4" bordered hover variant="dark">
        <thead>
          <tr>
            <th># STT</th>
            <th>Task name</th>
            <th>User</th>
            <th>Deadline</th>
            <th>Submit Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {assignTaskData.map((data, index) => (
            <tr className={redernRowColor(data.status)} key={index}>
              <th>{index + 1}</th>
              <th
                style={
                  data.img && { color: "blue", textDecoration: "underline" }
                }
                onClick={() => handleShow(index)}
              >
                {data.taskname}
              </th>
              <th>{data.user}</th>
              <th>{data.deadline}</th>
              <th>{data.submitDate}</th>
              <th>
                <select
                  onChange={(e) =>
                    updateStatus(
                      e.target.value,
                      data.id,
                      assignTime.start,
                      assignTime.end
                    )
                  }
                  value={data.status}
                  name="example"
                  defaultValue=""
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </th>
              <th>
                <Button variant="success" onClick={saveAssignTask}>
                  Edit
                </Button>{" "}
                <Button
                  onClick={() =>
                    deleteTask(data.id, assignTime.start, assignTime.end)
                  }
                  variant="danger"
                >
                  Delete
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <img
              style={{ width: "30%" }}
              src={assignTaskData[assignTaskindex]?.img}
              alt="Logo"
            />
          </div>
          <div class="my-3">
            <label for="exampleInputPassword1" class="form-label fs-5 fw-bold">
              Ghi chú:
            </label>
            <input
              value={assignTaskData[assignTaskindex]?.note}
              type="text"
              class="form-control"
              readOnly
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Admin;
