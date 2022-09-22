import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AllRoutes from './AllRoute';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="bg-primaryWhite w-full min-h-screen">
      <AllRoutes />
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white',
              fontWeight: 600,
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white',
              fontWeight: 600,
            },
          },
        }}
      />
    </div>
  );
}

export default App;
