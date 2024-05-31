import { FC, useEffect, useState } from 'react';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import { io } from 'socket.io-client';
import { type Band } from './interfaces';

const connectSocketServer = () => {
  const socket = io('ws://192.168.1.103:3001/', {});
  return socket;
};

export const App: FC = () => {
  const [socket] = useState(connectSocketServer());
  const [Online, setOnline] = useState<boolean>(false);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => setOnline(false));
  }, [socket]);

  useEffect(() => {
    socket.on('current-bands', (data: Band[]) => {
      // console.log(data);
      setBands(data);
    });
  }, [socket]);

  const votarBand = (id: string) => {
    socket.emit('votar-banda', id);
  };

  const borrarBand = (id: string) => {
    socket.emit('borrar-banda', id);
  };

  const cambiarNombreBand = (id: string, name: string) => {
    socket.emit('cambiar-nombre-banda', { id, name });
  };

  const agregarBand = (name: string) => {
    socket.emit('nueva-banda', { name });
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status:
          {Online ? (
            <span className="ml-1 text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />
      <div className="row gx-4">
        <div className="col-8">
          <BandList
            data={bands}
            onVotar={votarBand}
            onBorrar={borrarBand}
            onCambiarNombre={cambiarNombreBand}
          />
        </div>
        <div className="col-4">
          <BandAdd onAgregar={agregarBand} />
        </div>
      </div>
    </div>
  );
};
