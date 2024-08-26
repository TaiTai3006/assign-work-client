import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ImageUploading from "react-images-uploading";
import { RiImage2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useTask } from "../redux/action/task.action";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from 'react-bootstrap/Alert';

const Task = () => {
  const { getAssignWorkToday, completedTask } = useTask();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user");
  console.log(user);

  useEffect(() => {
    user && getAssignWorkToday(user);
  }, [location]);

  const assignWorkToday = useSelector((state) => state.assign_task.task_user);
  const status = useSelector((state) => state.assign_task.loading);
  const message = useSelector((state) => state.assign_task.message);
  const error = useSelector((state) => state.assign_task.error);
  const [assignWorkIndex, setAssignWorkIndex] = useState(0);

  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [images, setImages] = useState([]);
  const [note, setNote] = useState("");
  const maxNumber = 1;

  const handleClose = () => {
    setShow(false);
    setImages([]);
  };
  const handleShow = (index) => {
    setShow(true);
    setAssignWorkIndex(index);
  };

  const handleInputChange = (event) => {
    setNote(event.target.value); // Cập nhật state với giá trị mới
  };

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleUpload = async (e)  => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Vui lòng chọn một ảnh trước khi tải lên.");
      return;
    }
    await completedTask(images, note, assignWorkToday[assignWorkIndex].id, user);

    setShow(false);
    setShowMessage(true)
    setImages([]);
    setNote("");
    
  };

  return (
    <div className="container my-5 ">
      <h1 className="text-center fw-bold">
        Công việc hôm nay ({day}/{month}/{year})
      </h1>
      {showMessage && <Alert variant={message ? 'success' : 'danger'} onClose={() => setShowMessage(false)} dismissible>
        <p>
        {message ? message : error}
        </p>
      </Alert>}
      {assignWorkToday.map((data, index) => (
        <li
          style={{ cursor: "pointer" }}
          className="fs-3 text-primary text-decoration-underline my-2 "
          key={index}
          onClick={() => handleShow(index)}
        >
          {data.taskname}
        </li>
      ))}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {assignWorkToday[assignWorkIndex]?.taskname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{ marginBottom: "10px" }} className="fs-5 fw-bold">
              Gửi file ảnh minh chứng:
            </div>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  {images.length === 0 && (
                    <RiImage2Line
                      className=""
                      onClick={onImageUpload}
                      size={150}
                    />
                  )}
                  {imageList.map((image, index) => (
                    <div
                      style={{ width: "100px" }}
                      key={index}
                      className="position-relative"
                    >
                      <img
                        onClick={() => onImageUpdate(index)}
                        src={image["data_url"]}
                        alt=""
                        width="100"
                      />
                      <MdCancel
                        size={20}
                        onClick={() => onImageRemove(index)}
                        className="position-absolute top-0 start-100 translate-middle"
                        color="red"
                      />
                      <div className="image-item__btn-wrapper"></div>
                    </div>
                  ))}
                  {images.length === 0 && (
                    <p className="text-danger">
                      * Bắt buộc phải thêm ảnh minh chứng.
                    </p>
                  )}
                </div>
              )}
            </ImageUploading>

            <div className="my-3">
              <label
                for="exampleInputPassword1"
                className="form-label fs-5 fw-bold"
              >
                Ghi chú:
              </label>
              <input
                value={note}
                onChange={handleInputChange}
                type="text"
                className="form-control"
              />
            </div>
            <div className="d-flex justify-content-end ">
              <button
                onClick={handleUpload}
                type="submit"
                className="btn btn-primary px-4 fs-5 fw-bold"
              >
                {status ? <Spinner animation="border" /> : "Gửi"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Task;
