import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCkb0ZzV0z0oC2VB3ccKkl1HRwTLNngzpE",
  authDomain: "quwwahealth-89eb7.firebaseapp.com",
  projectId: "quwwahealth-89eb7",
  storageBucket: "quwwahealth-89eb7.firebasestorage.app",
  messagingSenderId: "330970704198",
  appId: "1:330970704198:web:e5dd9a1515f0fc02485d47",
  measurementId: "G-0R8V0GP9VE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Export other Firebase services as needed
// export const db = getFirestore(app);
// export const storage = getStorage(app);
