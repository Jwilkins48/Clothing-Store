import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbVKMayIDQOPoVRILn2qzpHmxb4YKfaSo",
  authDomain: "market-c4fb2.firebaseapp.com",
  projectId: "market-c4fb2",
  storageBucket: "market-c4fb2.appspot.com",
  messagingSenderId: "825151953558",
  appId: "1:825151953558:web:d5ec1d0bc80a373ee480b7",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
