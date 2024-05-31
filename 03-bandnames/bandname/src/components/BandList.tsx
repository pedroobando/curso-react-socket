import { FC, FormEvent, useEffect, useState } from 'react';
import { type Band } from '../interfaces';

interface Prop {
  data: Band[];
  onVotar: (id: string) => void;
  onBorrar: (id: string) => void;
  onCambiarNombre: (id: string, name: string) => void;
}

export const BandList: FC<Prop> = ({ data, onVotar, onBorrar, onCambiarNombre }) => {
  const [bands, setBands] = useState<Band[]>(data);
  const [changeName, setChangeName] = useState<boolean>(false);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const onChangeName = (event: FormEvent<HTMLInputElement>, id: string) => {
    const newName = event.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) band.name = newName;
        return band;
      })
    );
    setChangeName(true);
  };

  const onBlurName = (id: string, name: string) => {
    //todo: Disparar los eventos del lostfocus
    if (changeName) {
      console.log(id, name);
      onCambiarNombre(id, name);
      setChangeName(false);
    }
  };

  const crearRows = () => {
    // console.log(bands);
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => onVotar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            type="text"
            onChange={(event) => onChangeName(event, band.id)}
            onBlur={() => onBlurName(band.id, band.name)}
          />
        </td>
        <td>
          <h4>{band.vote}</h4>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => onBorrar(band.id)}>
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
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
