import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA80z0SzPuW5bHfVhnUU6_5_jHnBMm9XGk",
  authDomain: "fir-tutorial-aa96c.firebaseapp.com",
  projectId: "fir-tutorial-aa96c",
  storageBucket: "fir-tutorial-aa96c.appspot.com",
  messagingSenderId: "1047025310637",
  appId: "1:1047025310637:web:2d9150327ddc3d808cdf24",
  measurementId: "G-S2H55X9X47",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
