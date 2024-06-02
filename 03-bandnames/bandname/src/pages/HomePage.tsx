import { FC } from 'react';

import { BandAdd, BandList, OnlineState } from '../components';
import { BandChart } from '../components/BandChart';

export const HomePage: FC = () => {
  return (
    <div className="container">
      <div className="alert">
        <p>
          <span className="me-2">Service Status:</span>

          <OnlineState />
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />
      <div className="row">
        <div className="col">
          <BandChart />
        </div>
      </div>

      <div className="row gx-4">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
};
