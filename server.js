var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.write('Salut tout le monde !');
    res.end();
});

server.on('close',() => {
    console.log('Bye bye...');
});

server.listen(8080);

server.close(); // arrete le server