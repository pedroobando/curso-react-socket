import { SocketProvider } from './context';
import { HomePage } from './pages/HomePage';

export const BandNameApp = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};
