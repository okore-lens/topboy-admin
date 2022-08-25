// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8YeJA_K0B9WBejCmmwB_x9hNkl8Td0RY",
  authDomain: "topboy-nation.firebaseapp.com",
  databaseURL:
    "https://topboy-nation-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "topboy-nation",
  storageBucket: "topboy-nation.appspot.com",
  messagingSenderId: "1018473419007",
  appId: "1:1018473419007:web:59ce728646a4ca1d047cca",
  measurementId: "G-7B1M82P9EG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const projStorage = firebase.storage();
const projFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, projFirestore, projStorage, timestamp };
