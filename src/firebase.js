import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

console.log(process.env.REACT_APP_API_KEY)
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCVmeBw8-7ULPugYopE1mt94QBLJvCk1NI",
  authDomain: "farm-easy-79db7.firebaseapp.com",
  projectId: "farm-easy-79db7",
  storageBucket: "farm-easy-79db7.appspot.com",
  messagingSenderId: "209993747199",
  appId: "1:209993747199:web:fc8d00c729d458a2f99aca",
  measurementId: "G-GRLZ7BMGQM"
};


const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);