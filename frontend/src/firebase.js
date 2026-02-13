
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these with your actual keys from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAhm9wxnLyyxeHQ9pizOVpiz1KFrKamRhU",
    authDomain: "aptiq-c7b71.firebaseapp.com",
    projectId: "aptiq-c7b71",
    storageBucket: "aptiq-c7b71.firebasestorage.app",
    messagingSenderId: "179663532627",
    appId: "1:179663532627:web:87bf7913e8ef69e7220ca6",
    measurementId: "G-7S0M0BG5Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
