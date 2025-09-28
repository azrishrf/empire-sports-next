// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAoCi2XVJ1d3kzqsHSmEH5HVaaDcYsZLU",
  authDomain: "empire-sports-a399d.firebaseapp.com",
  projectId: "empire-sports-a399d",
  storageBucket: "empire-sports-a399d.firebasestorage.app",
  messagingSenderId: "830103837453",
  appId: "1:830103837453:web:3ee7df0d3ce79666e76e44",
  measurementId: "G-YGBSLJMBXK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export default app;
