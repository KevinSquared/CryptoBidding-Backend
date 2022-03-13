import express from 'express'
import cors from 'cors'
import http from 'http';
import { Server as socketio } from 'socket.io';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const app = express();
const server = http.createServer(app);
app.use(cors());

// Setup server socket
const io = new socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

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

// Game state
const games = {}

io.on('connection', (socket) => {
  console.log('connection!', socket.id)

  socket.on('disconnect', (reason) => {
    console.log('disconnect:', reason);
  });

  // New game started or joined
  socket.on('startGame', (data) => {
    const { roomCode, nickname } = data
    const room = io.of(`/${roomCode}`)
    // Find out which game it is and get its current state
    if (!games[roomCode]) {
      games[roomCode] = {
        players: [],
        status: 'notStarted',
        namespace: room,
      }
    }

    games[roomCode].players.push({ nickname })

    // Tell other clients in namespace that a new player has joined their lobby
    io.sockets.emit('newPlayer', games[roomCode].players)
  });

  // Start from lobby
  socket.on('start', (data) => {
    const { roomCode } = data

    games[roomCode].status = 'started'

    io.sockets.emit('started')
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
