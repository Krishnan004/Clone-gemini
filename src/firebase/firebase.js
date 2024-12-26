// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEtnOCJtb14xrvjYQtpXFo4-HmQkKcjV4",
  authDomain: "authentication-4095d.firebaseapp.com",
  projectId: "authentication-4095d",
  storageBucket: "authentication-4095d.appspot.com", // Fix for storageBucket URL
  messagingSenderId: "537224780983",
  appId: "1:537224780983:web:39548c67d19ec62d204132",
  measurementId: "G-TCHJG7V8S4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { auth, app };
