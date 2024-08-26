import axios from "axios";
import {
  TASK_USER,
  COMPLETED_TASK_REQUEST,
  COMPLETED_TASK_SUCCESS,
  COMPLETED_TASK_FAIL,
} from "../reducer/assign-taskSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";

export const useTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAssignWorkToday = (gmail) => {
    axios
      .get(`http://127.0.0.1:8000/assgin-task/today/${gmail}`)
      .then(function (response) {
        console.log(response.data);
        dispatch(TASK_USER(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

 
  const completedTask = async (images, note, id, gmail) => {
    
  
    try {
      dispatch(COMPLETED_TASK_REQUEST());
  
      
      const downloadURL = await uploadImg(images[0].data_url)
      // Gửi yêu cầu cập nhật task lên server
      const response = await axios.put(`http://127.0.0.1:8000/assgin-task/${id}`, {
        img: downloadURL,
        note: note,
      });
  
      console.log(response.data);
      dispatch(COMPLETED_TASK_SUCCESS("Hoàn thành rồi nhe!"));
      getAssignWorkToday(gmail);
  
    } catch (error) {
      console.error("Lỗi khi hoàn thành task:", error);
      dispatch(COMPLETED_TASK_FAIL(error));
    }
  };
  

  return { getAssignWorkToday, completedTask };
};

const dataURLtoBlob = (dataurl) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

export const uploadImg = async (data_url)=>{
  const storageRef = ref(storage, `images/${v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, dataURLtoBlob(data_url));

    // Chờ đợi quá trình tải lên hoàn thành
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Theo dõi tiến trình tải lên (nếu cần)
        },
        (error) => {
          console.error("Lỗi tải lên:", error);
         
          reject(error); // Nếu có lỗi, reject promise
        },
        () => {
          resolve(); // Nếu thành công, resolve promise
        }
      );
    });

    // Lấy URL của file sau khi tải lên thành công
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log(downloadURL);
    return downloadURL
}


