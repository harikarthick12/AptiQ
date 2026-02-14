
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ_IbXOGA0KdDmCqzpUEnAhKM3s4B9dV4",
    authDomain: "harikarthick-70eed.firebaseapp.com",
    projectId: "harikarthick-70eed",
    storageBucket: "harikarthick-70eed.firebasestorage.app",
    messagingSenderId: "886086950564",
    appId: "1:886086950564:web:1a0e13227120d7f08ed031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
