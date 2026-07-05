import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBarC2KOHCDam3UCEXASFKKc0jG30qBzeQ",
  authDomain: "otrojuegowebparaportafolio.firebaseapp.com",
  projectId: "otrojuegowebparaportafolio",
  storageBucket: "otrojuegowebparaportafolio.firebasestorage.app",
  messagingSenderId: "736705932738",
  appId: "1:736705932738:web:a807ae4c2bf3add6887a5b",
  measurementId: "G-G3FR8Q13C4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

