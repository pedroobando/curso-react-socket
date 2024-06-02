import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react';
import { ISocket, SocketContext } from '../context';
import { Weight } from '../interfaces/weight.interface';

export const MonitoPeso: FC = () => {
  const [monitorName, setMonitorName] = useState<string>('');
  const [monitorWeight, setMonitorWeight] = useState<number>(0);

  const { socket } = useContext(SocketContext) as ISocket;

  useEffect(() => {
    socket.on('weight', (data: Weight) => {
      setMonitorWeight(data.weight ? data.weight : 0);
    });

    return () => {
      socket.off('weight');
    };
  }, [socket]);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setMonitorName(newName);
  };

  const onSubmitName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (monitorName && monitorName.length >= 2) {
      socket.emit('nuevo-peso', { weight: monitorWeight, name: monitorName });
      setMonitorName('');
    }
  };

  return (
    <div className="card">
      <img src="/balanza.webp" className="card-img-top" alt="Monitor de balanza" />
      <div className="card-body">
        <form onSubmit={onSubmitName} className="d-flex flex-column gap-3">
          <h5 className="card-title text-danger h1">Peso: {monitorWeight}</h5>
          <p className="card-text">Tome un peso y agreguelo a la lista de pesadas.</p>
          <input
            type="text"
            className="form-control "
            onChange={onChangeName}
            value={monitorName}
          />
          <button className="btn btn-primary" type="submit">
            Tomar Peso
          </button>
        </form>
      </div>
    </div>
  );
};
