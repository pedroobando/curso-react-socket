const net = require('net');
const socketIo = require('socket.io');
const http = require('http');

// Crear servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor Socket.io\n');
});

// Inicializar Socket.io
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Cliente WebSocket conectado.');

  // Aquí puedes manejar eventos específicos de WebSocket
  socket.on('disconnect', () => {
    console.log('Cliente WebSocket desconectado.');
  });
});

// Crear servidor TCP para el ESP32
const tcpServer = net.createServer((socket) => {
  console.log('Cliente TCP conectado.');

  socket.on('data', (data) => {
    console.log('Datos recibidos del cliente TCP:', data.toString());

    // Emitir los datos a todos los clientes WebSocket
    io.emit('arduinoData', data.toString());
  });

  socket.on('end', () => {
    console.log('Cliente TCP desconectado.');
  });

  socket.on('error', (err) => {
    console.error('Error en el socket TCP:', err.message);
  });
});

// Escuchar en el puerto 3000 para conexiones TCP
const TCP_PORT = 8080;
tcpServer.listen(TCP_PORT, () => {
  console.log(`Servidor TCP escuchando en el puerto ${TCP_PORT}`);
});

// Escuchar en el puerto 3001 para conexiones WebSocket
const WS_PORT = 3001;
server.listen(WS_PORT, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${WS_PORT}`);
});
