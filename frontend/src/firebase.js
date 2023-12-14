import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC5nTka1Iua690o73hj6KZc-Q1ur0NPfZw",
  authDomain: "paper-recommender-4ad54.firebaseapp.com",
  projectId: "paper-recommender-4ad54",
  storageBucket: "paper-recommender-4ad54.appspot.com",
  messagingSenderId: "306992161449",
  appId: "1:306992161449:web:53341c8ac0587ab7c4bfb8",
  measurementId: "G-5D6REEJGPD",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)