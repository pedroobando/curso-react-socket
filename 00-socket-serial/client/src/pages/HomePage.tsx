import { FC } from 'react';

import { MonitoPeso, MonitorList, OnlineState } from '../components';

export const HomePage: FC = () => {
  return (
    <div className="container">
      <div className="alert">
        <p>
          <span className="me-2">Service Status:</span>

          <OnlineState />
        </p>
      </div>

      <h1>Lector Peso</h1>
      <hr />

      <div className="d-flex flex-column flex-lg-row  gap-4 align-items-start">
        <MonitoPeso />
        <MonitorList />
      </div>
    </div>
  );
};
