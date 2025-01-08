// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqL-G9YF4xfJTzqFJqFXwwlLVRDwITvZg",
  authDomain: "supplynex-b6b32.firebaseapp.com",
  projectId: "supplynex-b6b32",
  storageBucket: "supplynex-b6b32.appspot.com",
  messagingSenderId: "1096525068843",
  appId: "1:1096525068843:web:c5a9d5a6d2d4c0d8f1e8a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
