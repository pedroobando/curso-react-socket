const { v4: uuid } = require('uuid');

class Weight {
  constructor(weight, name) {
    this.id = uuid();
    this.name = name;
    this.weight = weight;
  }
}

module.exports = Weight;
