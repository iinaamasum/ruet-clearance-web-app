import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
