import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

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

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Connect to emulators in development
if (import.meta.env.MODE === 'development') {
  try {
    console.log('Development environment detected, connecting to emulators...');
    
    // Connect to Auth emulator
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    console.log('Connected to Auth emulator');
    
    // Connect to Firestore emulator
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('Connected to Firestore emulator');
    
    // Connect to Storage emulator
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Connected to Storage emulator');
    
    console.log('Successfully connected to all Firebase emulators');
  } catch (error) {
    console.error('Error connecting to emulators:', error);
  }
}

export { db, auth, storage };
