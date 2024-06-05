// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbaU1xcT7plKQYj6wkKeHKtKd51Lug0Uk",
  authDomain: "crud-a2ea5.firebaseapp.com",
  databaseURL: "https://crud-a2ea5-default-rtdb.firebaseio.com",
  projectId: "crud-a2ea5",
  storageBucket: "crud-a2ea5.appspot.com",
  messagingSenderId: "65633150482",
  appId: "1:65633150482:web:a215f05efff7373fc9dacb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
