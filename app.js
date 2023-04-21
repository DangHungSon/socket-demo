const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = []

io.on('connection', (socket) => {
    const username = socket.handshake.query.username
    socket.on('message', (data) => {
        console.log(data.message)
        const message = {
            message: data.message,
            senderUsername: data.senderUsername,
            sentAt: Date.now().toString()
        }
        messages.push(message)
        io.emit('message', message)
    })
    socket.on('typing', (data) => {
        console.log(data)
        io.emit('typing', data)
    })
});

server.listen(3000, () => { console.log('listening on *:3000'); });