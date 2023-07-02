
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvJcKAYarDB4SXz4sSiyBAl-M1pHMAE0M",
    authDomain: "avan-app-user.firebaseapp.com",
    projectId: "avan-app-user",
    storageBucket: "avan-app-user.appspot.com",
    messagingSenderId: "491641339263",
    appId: "1:491641339263:web:7715897ba33a81c80b6e4a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, app };