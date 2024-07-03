// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1I0s5bsVmNqjvP2-i8tOCKHHkOJvvwW4",
    authDomain: "netflixgpt-6a79b.firebaseapp.com",
    projectId: "netflixgpt-6a79b",
    storageBucket: "netflixgpt-6a79b.appspot.com",
    messagingSenderId: "234509001448",
    appId: "1:234509001448:web:25d62b9dafd222bf541f5d",
    measurementId: "G-81P90DTMH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(); 