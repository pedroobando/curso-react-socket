const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const { SerialPort, ReadlineParser, DelimiterParser, ByteLengthParser } = require('serialport');

// const Sockets = require('./sockets');
const LSerialPort = require('./serialports');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = http.createServer(this.app);

    //* Configuraciones de Sockets
    this.io = socketio(this.server, { cors: { origin: '*' } });

    //* Configuracion de SerialPort
    this.portSerial = new SerialPort({
      path: process.env.SERIALPORT,
      baudRate: +process.env.BAUDRATE,
    });

    //? el delimiter DISPLAY: ' ='
    this.parserSerial = this.portSerial.pipe(new DelimiterParser({ delimiter: '\n' }));
    // this.parserSerial = this.portSerial.pipe(new ByteLengthParser({ length: 8 }));
    // this.parserSerial = this.portSerial.pipe(new ReadlineParser({ delimiter: '\n' }));
  }

  middleware() {
    //* Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    //* Habilitacion de Cors
    this.app.use(
      cors({
        origin: ['http://localhost:5173', `http://localhost:${this.port}`, '*'],
      })
    );
  }

  // configurarSocket() {
  //   new Sockets(this.io);
  // }

  configurarSerial() {
    new LSerialPort(this.portSerial, this.parserSerial, this.io);
  }

  executed() {
    //* Inicializar Middleware
    this.middleware();

    //* Configurar Socket
    // this.configurarSocket();

    //* Configurar SerialPorts
    this.configurarSerial();

    //* Inicializar server
    this.server.listen(this.port, () => {
      console.log(`Servidor WebSocket escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
