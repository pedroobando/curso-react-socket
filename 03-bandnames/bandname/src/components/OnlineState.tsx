import { useContext } from 'react';
import { ISocket, SocketContext } from '../context';

export const OnlineState = () => {
  const { online } = useContext(SocketContext) as ISocket;

  return online ? (
    <span className="badge bg-success">Online</span>
  ) : (
    <span className="badge bg-danger">Offline</span>
  );
};
