import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDXcYkYNmqWgsbH0psj3hBt5dilHzsAYmc",
  authDomain: "taskwala-camp.firebaseapp.com",
  projectId: "taskwala-camp",
  storageBucket: "taskwala-camp.firebasestorage.app",
  messagingSenderId: "963468536206",
  appId: "1:963468536206:web:49f718c2bb0a23692c5cdf",
  measurementId: "G-8SWQ3HJ5GT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()