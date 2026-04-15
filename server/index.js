const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const GameEngine = require('./gameEngine');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static(path.join(__dirname, '../client/public')));

const PORT = process.env.PORT || 5000;
const gameRooms = {};

io.on('connection', (socket) => {
  console.log('New player connected:', socket.id);

  socket.on('createRoom', (playerName) => {
    const roomId = Math.random().toString(36).substr(2, 9);
    gameRooms[roomId] = {
      id: roomId,
      players: [{ id: socket.id, name: playerName }],
      gameState: null,
      maxPlayers: 6
    };
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log(`Room created: ${roomId}`);
  });

  socket.on('joinRoom', (roomId, playerName) => {
    if (gameRooms[roomId]) {
      const room = gameRooms[roomId];
      if (room.players.length < room.maxPlayers) {
        room.players.push({ id: socket.id, name: playerName });
        socket.join(roomId);
        io.to(roomId).emit('playerJoined', room.players);
        console.log(`${playerName} joined room ${roomId}`);
      } else {
        socket.emit('roomFull');
      }
    } else {
      socket.emit('roomNotFound');
    }
  });

  socket.on('startGame', (roomId, numPlayers) => {
    if (gameRooms[roomId]) {
      const room = gameRooms[roomId];
      const players = room.players.slice(0, numPlayers);
      room.gameState = new GameEngine(players);
      io.to(roomId).emit('gameStarted', room.gameState.getGameState());
      console.log(`Game started in room ${roomId}`);
    }
  });

  socket.on('playCard', (roomId, cardIndex) => {
    if (gameRooms[roomId] && gameRooms[roomId].gameState) {
      const room = gameRooms[roomId];
      const result = room.gameState.playCard(socket.id, cardIndex);
      if (result.success) {
        io.to(roomId).emit('gameStateUpdated', room.gameState.getGameState());
      } else {
        socket.emit('error', result.message);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
