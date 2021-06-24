const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/user');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName='ChatBot';

app.use(express.static(path.join(__dirname,'public')));

io.on('connection', socket =>{

    socket.on('joinRoom',({username, room}) =>{
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        socket.emit('message',formatMessage( botName, 'Bienvenido al chat'));
            
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} Entro al chat`));
        
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`Estos son los usuarios actuales: ${getRoomUsers(user.room).map((user,index, array) => {return user.username})}`))

        //Examen practico//
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`La cantidad de usuarios conectados es: ${getRoomUsers(user.room).length}`))
        //Fin del examen//

        //practica 11
        io.to(user.room).emit('roomUsers', {room:user.room, users: getRoomUsers(user.room)});
        //fin 11
    });
    socket.on('chatMessage', msg =>{
        const user = getCurrentUser(socket.id);
       
        console.log(msg);
        
        io.to(user.room).emit('message', formatMessage(`${user.username}`, msg));
    });

    //practica 11
    socket.on('disconect', () =>{
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName,`${user.username} ah salido del chat` ));

            io.to(user.room).emit('roomUsers', {room:user.room, users: getRoomUsers(user.room)});
        }
    });
    //fin practica 11

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
