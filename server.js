const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

// Connecting
io.on('connection', (socket) => {
    console.log("New connection detected...");
    
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => { console.log(`Conectado na porta: ${PORT}`) });
