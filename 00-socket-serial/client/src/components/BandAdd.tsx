import { FC, useContext, useState } from 'react';
import { ISocket, SocketContext } from '../context';

export const BandAdd: FC = () => {
  const [bandNames, setBandNames] = useState<string>('');
  const { socket } = useContext(SocketContext) as ISocket;

  const onChangeName = (event: any) => {
    const newName = event.target.value;
    setBandNames(newName);
  };

  const onSubmitName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (bandNames && bandNames.length >= 2) {
      socket.emit('nueva-banda', { name: bandNames });
      setBandNames('');
    }
  };

  return (
    <>
      <h4>Agregar bandas</h4>
      <form onSubmit={(e) => onSubmitName(e)}>
        <input
          className="form-control"
          onChange={onChangeName}
          value={bandNames}
          type="text"
          placeholder="Nombre de nueva banda"
        />
      </form>
    </>
  );
};
