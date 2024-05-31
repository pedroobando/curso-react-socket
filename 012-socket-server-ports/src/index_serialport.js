// Esta aplicacion es la que corre con el cliente de romana

const express = require('express');
const app = express();

const net = require('net');

const server = require('http').createServer(app);

const io = require('socket.io')(server);

const { SerialPort, ReadlineParser } = require('serialport');

const port = new SerialPort({ path: '/dev/ttyUSB1', baudRate: 9600 });

const parser = port.pipe(new ReadlineParser());

app.use(express.static(__dirname + '/public'));

port.on('open', () => {
  console.log('Puerto serial abierto');
});

// Evento para manejar errores
port.on('error', (err) => {
  console.error('Error en el puerto serial:', err.message);
});

// Evento para cuando se reciba un dato
// parser.on('data', (data) => {
//   console.log('Dato recibido:', data);
//   io.emit('tara', { message: data.toString(), date: new Date() });
// });

io.on('connection', (socket) => {
  socket.emit('mensaje-bienvenida', 'bienvenido al servidor');
  console.log(`Cliente WebSocket conectado. ${socket.id}`);
  // Aquí puedes manejar eventos específicos de WebSocket

  // socket.on('tara', (data) => {
  //   console.log(data);
  // });

  // Lectura de la puerto serial
  parser.on('data', (data) => {
    console.log('Dato recibido:', data);
    socket.emit('tara', { message: data.toString(), date: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('Cliente WebSocket desconectado.');
  });
});

// Crear servidor TCP para el ESP32
// const tcpServer = net.createServer((socket) => {
//   console.log(`Cliente TCP conectado. `);
//   io.emit('mensaje-bienvenida', 'bienvenido al servidor');

//   socket.on('data', (data) => {
//     console.log('Datos recibidos del cliente TCP:', data.toString());

//     // Emitir los datos a todos los clientes WebSocket
//     io.emit('arduinoData', { message: data.toString(), date: new Date() });
//   });

//   socket.on('end', () => {
//     console.log('Cliente TCP desconectado.');
//   });

//   socket.on('error', (err) => {
//     console.error('Error en el socket TCP:', err.message);
//   });
// });

// Escuchar en el puerto 3000 para conexiones TCP
// const TCP_PORT = 1234;
// tcpServer.listen(TCP_PORT, () => {
//   console.log(`Servidor TCP escuchando en el puerto ${TCP_PORT}`);
// });

// Escuchar en el puerto 3001 para conexiones WebSocket
const WS_PORT = 3001;
server.listen(WS_PORT, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${WS_PORT}`);
});
