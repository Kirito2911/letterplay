// Import the functions you need from the SDKs you need
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {signInWithRedirect } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBI-PP-BS0RVT4aSqx6EAjovgx7gWHjZiM",
    authDomain: "letterplay-936d4.firebaseapp.com",
    projectId: "letterplay-936d4",
    storageBucket: "letterplay-936d4.appspot.com",
    messagingSenderId: "494932771981",
    appId: "1:494932771981:web:3116c9109567aa9c6a0ec4",
    measurementId: "G-XKM052VYPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export let auth = getAuth();



export function createUsera(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}

const provider = new GoogleAuthProvider();
  export function loginGoogle(){
    signInWithRedirect(auth, provider);
  }