import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
    apiKey: "AIzaSyB-gaQbN11HFxQNqRuHzCX98ilb48vHhNc",
    authDomain: "smartypeex.firebaseapp.com",
    projectId: "smartypeex",
    storageBucket: "smartypeex.appspot.com",
    messagingSenderId: "197294829926",
    appId: "1:197294829926:web:99fe7bba9b1140149a18a7",
};

const app = initializeApp(config);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
