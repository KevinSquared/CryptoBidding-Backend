const express = require('express');
const app = express();
let cors = require('cors');

const http = require('http');
const server = http.createServer(app);

app.use(cors());

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyC-b-vtqtRoAlCE5IcozByUBwKwtYHkVOI",
  authDomain: "cryptobidding.firebaseapp.com",
  projectId: "cryptobidding",
  storageBucket: "cryptobidding.appspot.com",
  messagingSenderId: "1084164782834",
  appId: "1:1084164782834:web:4778dbd7bd2ddf057dee6b",
  measurementId: "G-QCBPXD3YV5"
});

const db = getFirestore();

server.listen(80);