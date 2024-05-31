const BandList = require('./band-list');

class Sockets {
  constructor(io) {
    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      // Escuchar eventos
      console.log('Cliente Conectado', socket.id);

      //* Emitir al cliente todas las bandas acturales
      socket.emit('current-bands', this.bandList.getBands());

      //? Votar-banda
      socket.on('votar-banda', (id) => {
        this.bandList.increaseVote(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      //? Borrar-banda
      socket.on('borrar-banda', (id) => {
        this.bandList.removeBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      //? cambiar-nombre-banda
      socket.on('cambiar-nombre-banda', ({ id, name }) => {
        this.bandList.changeName(id, name);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      //? nueva-banda
      socket.on('nueva-banda', ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
