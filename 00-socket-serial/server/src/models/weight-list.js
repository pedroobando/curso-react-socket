const Weight = require('./weight');

class WeightList {
  constructor() {
    this.weights = [new Weight(657, 'Ejemplo 01'), new Weight(9547, 'Ejemplo 02')];
  }

  addWeight(weight, name) {
    const newWeight = new Weight(weight, name);
    this.weights.push(newWeight);
    return newWeight;
  }

  removeWeight(id) {
    this.weights = this.weights.filter((weight) => weight.id !== id);
  }

  getWeights() {
    return this.weights;
  }

  changeName(id, newName) {
    this.weights = this.weights.map((weight) => {
      if (weight.id === id) weight.name = newName;
      return weight;
    });
  }
}

module.exports = WeightList;
