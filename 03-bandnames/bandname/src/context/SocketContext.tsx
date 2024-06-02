import { FC, ReactNode, createContext } from 'react';
import { useSocket } from '../hooks';
import { Socket } from 'socket.io-client';

export interface ISocket {
  socket: Socket;
  online: boolean;
}

export const SocketContext = createContext<ISocket | null>(null);

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { socket, online } = useSocket('ws://192.168.1.103:3001/');

  return <SocketContext.Provider value={{ online, socket }}> {children}</SocketContext.Provider>;
};
