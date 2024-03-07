import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDINZ0ZA_iYI0qGymSo1HZcUqWfA9hjSk",
    authDomain: "geo-fencing-app-9bf21.firebaseapp.com",
    projectId: "geo-fencing-app-9bf21",
    storageBucket: "geo-fencing-app-9bf21.appspot.com",
    messagingSenderId: "563413029671",
    appId: "1:563413029671:web:4d9cb98e2d1aa6948d4f02"
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app)

export { app, firebaseAuth, firestoreDB };


