// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDmXL7rGHKZqsGV4syUI5r8qYfEkpoSZg",
  authDomain: "expense-tracker-8ef98.firebaseapp.com",
  projectId: "expense-tracker-8ef98",
  storageBucket: "expense-tracker-8ef98.firebasestorage.app",
  messagingSenderId: "616587392525",
  appId: "1:616587392525:web:9fef5b5de5162d2b93c744"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const createUser=createUserWithEmailAndPassword;