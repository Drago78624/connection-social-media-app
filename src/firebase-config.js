import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhgrUj5zc9HkJLuc-nb7emd0aAHjJNbTA",
  authDomain: "connection-174f8.firebaseapp.com",
  projectId: "connection-174f8",
  storageBucket: "connection-174f8.appspot.com",
  messagingSenderId: "276746522208",
  appId: "1:276746522208:web:d94c0a030b75b0e4f9bd05",
  measurementId: "G-J9H1JGG1FY",
};

const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const storage = getStorage(app)
export const auth = getAuth(app);
export const db = getFirestore(app);
