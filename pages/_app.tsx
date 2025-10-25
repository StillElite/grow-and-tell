import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import Modal from 'react-modal';
import { BedProvider } from '../src/context/BedContext';
import { nunito } from '../src/styles/font';
import { Toaster } from 'react-hot-toast';
import { toastOptions } from '../src/utils/toastOptions';
import { PlantingHistoryProvider } from '../src/context/PlantingHistoryContext';
import { CompostProvider } from '../src/context/CompostContext';
import { TaskProvider } from '../src/context/TaskContext';
Modal.setAppElement('#__next');

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={nunito.className}>
      <BedProvider>
        <CompostProvider>
          <PlantingHistoryProvider>
            <TaskProvider>
              <Component {...pageProps} />
              <Toaster position='bottom-right' toastOptions={toastOptions} />
            </TaskProvider>
          </PlantingHistoryProvider>
        </CompostProvider>
      </BedProvider>
    </div>
  );
};

export default App;
