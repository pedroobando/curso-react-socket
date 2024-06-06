const WeightList = require('./weight-list');

class SerialPorts {
  constructor(serialport, parser, io) {
    this.sport = serialport;
    this.parser = parser;
    this.io = io;

    this.weightList = new WeightList();
    this.socketEvents();
    this.serialEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      // Maneja la data que lee el puerto
      console.log(`Cliente WebSocket conectado. ${socket.id}`);

      //? Emite todos los pesos al cliente que se conecte
      socket.emit('todos-los-pesos', this.weightList.getWeights());

      //? nueva-banda
      socket.on('nuevo-peso', ({ weight, name }) => {
        this.weightList.addWeight(weight, name);
        this.io.emit('todos-los-pesos', this.weightList.getWeights());
      });

      //? nueva-banda
      socket.on('borrar-peso', (id) => {
        this.weightList.removeWeight(id);
        this.io.emit('todos-los-pesos', this.weightList.getWeights());
      });

      socket.on('disconnect', () => {
        console.log('Cliente WebSocket desconectado.');
      });
    });
  }

  //? Manejador de eventos del puerto serial
  serialEvents() {
    // this.sport.open();

    // Indica que se ablio el puerto
    this.sport.on('open', () => {
      console.log('Puerto serial abierto');
    });

    // Evento para manejar errores
    this.sport.on('error', (err) => {
      console.error(err.message);
    });

    this.parser.on('data', (dataBites) => {
      const decoder = new TextDecoder('utf-8');
      const dataDecode = decoder.decode(dataBites);

      try {
        console.log('read:', dataDecode);
        this.io.emit('weight', { weight: dataDecode });
      } catch (error) {
        console.error('Error:', error.message);
      }
    });
  }
}

module.exports = SerialPorts;
