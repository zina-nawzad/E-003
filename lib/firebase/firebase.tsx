import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuukG0fkmvvVnmF-03m7jgu9RKfIHvm8E",
  authDomain: "wedding003-8020c.firebaseapp.com",
  projectId: "wedding003-8020c",
  storageBucket: "wedding003-8020c.firebasestorage.app",
  messagingSenderId: "480280770810",
  appId: "1:480280770810:web:3db1da2d497141cf72b143",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);