// Esta aplicacion es la que corre con el cliente de romana

const Server = require('./models/server');
require('dotenv').config();
const server = new Server();
server.executed();
