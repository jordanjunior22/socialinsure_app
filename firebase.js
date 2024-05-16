// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGbTzm8xgovG5UdKs2X7sRux8rNZvtJgQ",
  authDomain: "social-insure-d86ce.firebaseapp.com",
  projectId: "social-insure-d86ce",
  storageBucket: "social-insure-d86ce.appspot.com",
  messagingSenderId: "831355481902",
  appId: "1:831355481902:web:eb9a447107975fc23294bf"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase}