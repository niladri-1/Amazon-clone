// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEPpHjV3EJAeJWH2J8eUpUXuzjGgY5Ato",
  authDomain: "yt-21506.firebaseapp.com",
  projectId: "yt-21506",
  storageBucket: "yt-21506.appspot.com",
  messagingSenderId: "477330100959",
  appId: "1:477330100959:web:a3278f3f23de897e4c8f6a",
  measurementId: "G-7QT8XRKW06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig