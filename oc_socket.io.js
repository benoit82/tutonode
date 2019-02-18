var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer((req, res) => {
    fs.readFile('./index.html', 'utf-8', (error, content) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', (socket) => {
    socket.emit('message', 'Vous êtes bien connecté !');
    //connection d'un client
    socket.broadcast.emit('message', 'Un autre client vient de se connecter !');
    //stockage du pseudo reçu
    socket.on('petit_nouveau', (pseudo) => {
        socket.pseudo = pseudo;
    });
    
    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', (message) => {
        socket.emit('message', 'Tu as dit : ' + message);
        socket.broadcast.emit('message', socket.pseudo + ' : ' + message);
    });
    
});


server.listen(8080);