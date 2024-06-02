import { FC, useContext, useEffect, useState } from 'react';
import { type Weight } from '../interfaces';
import { ISocket, SocketContext } from '../context';

export const MonitorList: FC = () => {
  const [weights, setWeights] = useState<Weight[]>([]);

  const { socket } = useContext(SocketContext) as ISocket;

  useEffect(() => {
    socket.on('todos-los-pesos', (data: Weight[]) => {
      setWeights(data);
    });

    return () => {
      socket.off('todos-los-pesos');
    };
  }, [socket]);

  const onBorrar = (id: string) => {
    socket.emit('borrar-peso', id);
  };

  const crearRows = () => {
    return weights.map((bruto) => (
      <tr key={bruto.id}>
        <td>
          <label htmlFor="" className="text-primary">
            {bruto.weight}
          </label>
        </td>
        <td>
          <label htmlFor="">{bruto.name}</label>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => onBorrar(bruto.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>Peso</th>
            <th>Nombre</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
