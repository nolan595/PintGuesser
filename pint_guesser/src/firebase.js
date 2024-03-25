// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyDaVgY9XTiWwjMYLCybrA6opeqwZf1nImM",
  authDomain: "pintguesser.firebaseapp.com",
  projectId: "pintguesser",
  storageBucket: "pintguesser.appspot.com",
  messagingSenderId: "1097984165032",
  appId: "1:1097984165032:web:f5b137a67d389f0e9dae9d",
  measurementId: "G-M8J5QBSN5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};