// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBa4T7yZQuDr9O2uBouBwoaBMTEaHAiGnU",
  authDomain: "tickets-73a3c.firebaseapp.com",
  databaseURL: "https://tickets-73a3c-default-rtdb.firebaseio.com",
  projectId: "tickets-73a3c",
  storageBucket: "tickets-73a3c.appspot.com",
  messagingSenderId: "756219131285",
  appId: "1:756219131285:web:87fa82d270fa5d67cd329c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

export { auth, database, storage };
