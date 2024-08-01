import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ImageUploading from "react-images-uploading";
import { RiImage2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const Task = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const handleClose = () => {
    setShow(false);
    setImages([]);
  };
  const handleShow = () => setShow(true);

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="container my-5 ">
      <h1 className="text-center fw-bold">
        Công việc hôm nay ({day}/{month}/{year})
      </h1>
      {[...new Array(3)].map((index) => (
        <li
          style={{cursor: "pointer"}}
          className="fs-3 text-primary text-decoration-underline my-2 "
          key={index}
          onClick={handleShow}
        >
          cong viec 1
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
          <Modal.Title>Modal heading</Modal.Title>
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
                  {images.length === 0 && <p className="text-danger">* Bắt buộc phải thêm ảnh minh chứng.</p>}
                </div>
              )}
            </ImageUploading>

            <div class="my-3">
              <label
                for="exampleInputPassword1"
                class="form-label fs-5 fw-bold"
              >
                Ghi chú:
              </label>
              <input type="text" class="form-control" />
            </div>
            <div className="d-flex justify-content-end ">
              <button type="submit" class="btn btn-primary px-4 fs-5 fw-bold">
                Gửi
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Task;
