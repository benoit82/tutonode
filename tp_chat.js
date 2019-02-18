var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

// Chargement du fichier tp_chat.html affiché au client
app.get('/', (req, res) => {
    res.render('tp_chat.ejs');
});



// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
    //nouveau client connecté
    socket.on('nouveau_client', (pseudo) => {
        socket.pseudo = pseudo;
        socket.broadcast.emit('message', '<i>' + socket.pseudo + ' vient de se connecter !</i>');
    });


    // gestion des msg
    socket.on('message', (message) => {
        socket.broadcast.emit('message', '<strong>' + socket.pseudo +' :</strong> '  + message);
        socket.emit('message', '<strong>Vous :</strong> ' + message);
    });
});

server.listen(8080);