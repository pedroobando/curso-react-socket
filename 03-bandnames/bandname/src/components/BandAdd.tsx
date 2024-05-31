import { FC, useState } from 'react';

interface Props {
  onAgregar: (name: string) => void;
}

export const BandAdd: FC<Props> = ({ onAgregar }) => {
  const [bandNames, setBandNames] = useState<string>('');

  const onChangeName = (event: any) => {
    const newName = event.target.value;
    setBandNames(newName);
  };

  const onSubmitName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (bandNames && bandNames.length >= 2) {
      onAgregar(bandNames);
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
