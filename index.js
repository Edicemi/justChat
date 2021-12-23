const express = require('express');
const http = require('http');
const path = require('path');
const cors = require("cors");
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const formatMessage = require('./lib/message');
const {userJoin, getUser, getRoomUsers,userLeaves } = require('./lib/users')
const assistName = 'JustChat Help'
//staticFolder
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());
//connection
io.on('connection', socket=> {
    socket.on('joinRoom', ({username, room})=> {
     const user = userJoin(socket.id, username, room);

        socket.join(user.room);
        
        socket.emit('message', formatMessage(assistName,'Welcome to JustChat'));
        //user connection broadcast
        socket.broadcast.to(user.room).emit('message', formatMessage(assistName,`${user.username} has joined the chat`)
        
        );
        //info to users and rooms
io.to(user.room).emit('roomUsers', {
    room: user.room,
    users: getRoomUsers(user.room)
}); 
    });


       //disconnection
socket.on('disconnect', () => {
    const user = userLeaves(socket.id);
    if (user) {
io.to(user.room).emit('message', formatMessage(assistName,`${user.username} just left the chat`)

);

//info to users and rooms
io.to(user.room).emit('roomUsers', {
    room: user.room,
    users: getRoomUsers(user.room)
});
    }    
});

    //catch message
    socket.on('chatMessage', msg => {
const user = getUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
});

//server
server.listen(process.env.PORT, _ => { 
    console.log(`Engine started on PORT: ${process.env.PORT}`);
});