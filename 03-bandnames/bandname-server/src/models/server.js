const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
// const { Server: socketio } = require('socket.io');
const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = http.createServer(this.app);

    //* Configuraciones de Sockets

    this.io = socketio(this.server, { cors: { origin: '*' } });
  }

  middleware() {
    //* Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    //* Habilitacion de Cors
    this.app.use(
      cors({
        origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001', '*'],
      })
    );
  }

  configurarSocket() {
    new Sockets(this.io);
  }

  executed() {
    //* Inicializar Middleware
    this.middleware();

    //* Configurar Socket
    this.configurarSocket();

    //* Inicializar server
    this.server.listen(this.port, () => {
      console.log(`Servidor WebSocket escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
