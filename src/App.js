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
    <div className="w-full min-h-[100.1vh]">
      <AllRoutes />
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          success: {
            style: {
              background: '#009879',
              color: 'white',
              fontWeight: 600,
            },
          },
          error: {
            style: {
              background: '#ef5350',
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
