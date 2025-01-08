// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtykCqaohaWbwEYpY0i7CkdUwmCi6s3pQ",
  authDomain: "supplynex-b6b32.firebaseapp.com",
  projectId: "supplynex-b6b32",
  storageBucket: "supplynex-b6b32.appspot.com",
  messagingSenderId: "243805338086",
  appId: "1:243805338086:web:fff765b2d2e1d7dcb07e27",
  measurementId: "G-783W7Q15GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Configure authentication persistence
auth.setPersistence('LOCAL');

// Add authorized domains
const authorizedDomains = [
  'supplynex-b6b32.web.app',
  'supplynex-b6b32.firebaseapp.com',
  'localhost'
];

export { app, analytics, auth, db, authorizedDomains };
