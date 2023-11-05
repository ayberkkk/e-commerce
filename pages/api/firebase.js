// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOa-CCYAwD1MHovhFWFpVepwd-Bwe8v10",
  authDomain: "e-commerce-aborkkk.firebaseapp.com",
  projectId: "e-commerce-aborkkk",
  storageBucket: "e-commerce-aborkkk.appspot.com",
  messagingSenderId: "292763228057",
  appId: "1:292763228057:web:9c58f481336c5153116508",
  measurementId: "G-RY8Z87NF0J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
