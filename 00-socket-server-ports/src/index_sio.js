const express = require('express');

const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', () => {
  console.log('Cliente Conectado.!');
});
server.listen(8080, () => {
  console.log(`Server runing at port: 8080`);
});
