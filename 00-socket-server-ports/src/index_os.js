const net = require('net');
const os = require('os');

// Obtener la dirección IP del servidor
const interfaces = os.networkInterfaces();
let ipAddress;

Object.keys(interfaces).forEach((interfaceName) => {
  interfaces[interfaceName].forEach((interface) => {
    // Filtrar solo las direcciones IPv4 y que no sean la dirección de loopback
    if (interface.family === 'IPv4' && !interface.internal) {
      ipAddress = interface.address;
    }
  });
});

// console.log('Dirección IP del servidor:', ipAddress);

// Configuración del servidor
const SERVER_PORT = 8080; // Puerto en el que el servidor escuchará las conexiones

// Crear el servidor
const server = net.createServer((socket) => {
  console.log('Cliente conectado');

  // Manejar los datos recibidos del cliente
  socket.on('data', (data) => {
    console.log('Mensaje del cliente:', data.toString());

    // Enviar una respuesta al cliente
    socket.write(data.toString());
  });

  // Manejar la desconexión del cliente
  socket.on('end', () => {
    console.log('Cliente desconectado');
  });
});

// Escuchar en el puerto especificado
server.listen(SERVER_PORT, () => {
  console.log(`Servidor escuchando http://${ipAddress}:${SERVER_PORT}`);
});
