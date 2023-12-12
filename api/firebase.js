// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCca8YOnb3NRpDejZYcmrXbNWDQXXVePw4",
  authDomain: "whoareyou-c1666.firebaseapp.com",
  projectId: "whoareyou-c1666",
  storageBucket: "whoareyou-c1666.appspot.com",
  messagingSenderId: "355300556137",
  appId: "1:355300556137:web:145700ebc476f17d2551f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }