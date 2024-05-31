import { Manager, Socket, io } from 'socket.io-client';

export const connectToServer = () => {
  // const namespace = 'http://localhost:3001/socket.io/socket.io.js';
  const namespace = 'http://localhost:3001';
  const socket = io(namespace);

  // const manager = new Manager(namespace);
  // const socket = manager.socket('/');
  // addListener(socket);
  return socket;
  // console.log({ socket });
};

const addListener = (socket: Socket) => {
  socket.on('connect', () => console.log('connected'));

  socket.on('disconnect', () => console.log('disconnect'));
};
