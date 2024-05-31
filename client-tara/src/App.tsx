import { useEffect, useState } from 'react';
import './App.css';
import { connectToServer } from './connectToServer';
const App = () => {
  const [onLine, setOnLine] = useState<boolean>(false);
  const [clientConnect, setClientConnect] = useState<string[]>([]);

  useEffect(() => {
    const sockt = connectToServer();
    sockt.on('connect', () => {
      setOnLine(true);
      console.log('Cliente conectado');
    });
    sockt.on('disconnect', () => {
      setOnLine(false);
      console.log('Cliente desconectado');
    });

    sockt.on('tara', (clients: string[]) => {
      setClientConnect(clients);
      console.log(clients);
    });

    sockt.on('romana01', (serialData: string) => {
      // setClientConnect(clients);
      console.log(serialData);
    });
  }, []);

  return (
    <>
      <h1>Romanero Cliente</h1>
      <span>Cliente {onLine ? 'Conectado' : 'Desconectado'}</span>
      <h4 style={{ marginTop: '3em' }}>Lista de Clientes</h4>
      <ul>
        {clientConnect.map((conecctCli) => {
          return <li key={conecctCli}>{conecctCli}</li>;
        })}
      </ul>
    </>
  );
};

export default App;
