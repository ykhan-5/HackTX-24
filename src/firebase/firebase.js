// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqqHNbDRoRdT7umhpdbrO-5E3rjPvI4Nc",
    authDomain: "healthheroweb.firebaseapp.com",
    projectId: "healthheroweb",
    storageBucket: "healthheroweb.firebasestorage.app",
    messagingSenderId: "436501486268",
    appId: "1:436501486268:web:b322aebc12c858a812ceb9",
    measurementId: "G-RRRXV4LE8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };