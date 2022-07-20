const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'RoomChat Bot';

// Connecting
io.on('connection', (socket) => {
    console.log("New connection detected...");

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to chat!'));

    // Broadcast when a user connects for everybody except for the connected user
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joinned the chat'));

    // Runs when client disconnects
    socket.on('disconnect', () => {
        // for everyone
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        // console.log("MSG: ", msg);

        // Emit message for everybody
        io.emit('message', formatMessage("USER", msg));
    });

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => { console.log(`Conectado na porta: ${PORT}`) });
