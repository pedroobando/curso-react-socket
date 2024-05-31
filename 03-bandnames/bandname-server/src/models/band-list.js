const Band = require('./band');

class BandList {
  constructor() {
    this.bands = [
      new Band('Metalica'),
      new Band('Kiss'),
      new Band('Iron Maden'),
      new Band('AC/DC'),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return newBand;
  }

  removeBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increaseVote(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) band.vote += 1;
      return band;
    });
  }

  changeName(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) band.name = newName;
      return band;
    });
  }
}

module.exports = BandList;
