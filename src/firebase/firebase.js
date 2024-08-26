import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5LY4eI-mHa4DlRUg9wwMwYsth1jd6LhU",
  authDomain: "assign-work-59dd4.firebaseapp.com",
  projectId: "assign-work-59dd4",
  storageBucket: "assign-work-59dd4.appspot.com",
  messagingSenderId: "1017639265146",
  appId: "1:1017639265146:web:35bdf846dc7072ef99ecc3",
  measurementId: "G-FCF7NHDZSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
