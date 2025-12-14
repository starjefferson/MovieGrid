// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ3Y9Smc6Wg7FspYukBrv8Q0HQiJVsGQs",
  authDomain: "moviegrid-8725a.firebaseapp.com",
  projectId: "moviegrid-8725a",
  storageBucket: "moviegrid-8725a.firebasestorage.app",
  messagingSenderId: "1018843877824",
  appId: "1:1018843877824:web:72b9cd603c1859434eb825"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };