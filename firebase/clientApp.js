// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe-PKxFLFrKJErOncl4-xT2B3zdhmHdgs",
  authDomain: "nextmes-3c963.firebaseapp.com",
  projectId: "nextmes-3c963",
  storageBucket: "nextmes-3c963.appspot.com",
  messagingSenderId: "548549337880",
  appId: "1:548549337880:web:1a7a6c9b146769560b346d",
  measurementId: "G-HM9W5HTJF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
//const analytics=getAnalytics(app);
export { db, storage };