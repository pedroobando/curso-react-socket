import { FC, ReactNode, createContext } from 'react';
import { useSocket } from '../hooks';
import { Socket } from 'socket.io-client';

export interface ISocket {
  socket: Socket;
  online: boolean;
}

export const SocketContext = createContext<ISocket | null>(null);

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wsserver_uri = import.meta.env.VITE_WSSERVER_URI;
  const wsserver_port = import.meta.env.VITE_WSSERVER_PORT;
  const wsconecction_uri = `${wsserver_uri}:${wsserver_port}/`;

  const { socket, online } = useSocket(wsconecction_uri);

  return <SocketContext.Provider value={{ online, socket }}>{children}</SocketContext.Provider>;
};
