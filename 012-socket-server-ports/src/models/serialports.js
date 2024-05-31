class SerialPorts {
  constructor(serialport, parser, io) {
    this.sport = serialport;
    this.parser = parser;
    this.io = io;
    this.serialEvents();
  }

  serialEvents() {
    // Indica que se ablio el puerto
    this.sport.on('open', () => {
      console.log('Puerto serial abierto');
    });

    // Evento para manejar errores
    this.sport.on('error', (err) => {
      console.error(err.message);
    });

    this.io.on('connection', (socket) => {
      // Maneja la data que lee el puerto
      console.log(`Cliente WebSocket conectado. ${socket.id}`);
      this.parser.on('data', (data) => {
        try {
          console.log('read:', data);
          socket.emit('tara', data);

          // socket.on('mensaje-to-server', (data) => {
          //   console.log(data);
          //   this.io.emit('mensaje-from-server', data);
          // });
        } catch (error) {
          console.error('Error:', error.message);
        }
      });

      socket.on('disconnect', () => {
        console.log('Cliente WebSocket desconectado.');
      });
    });

    // On connection
    // this.io.on('connection', (socket) => {
    //   // Escuchar evento: mensaje-to-server
    //   socket.on('mensaje-to-server', (data) => {
    //     console.log(data);
    //     this.io.emit('mensaje-from-server', data);
    //   });
    // });
  }
}

module.exports = SerialPorts;
