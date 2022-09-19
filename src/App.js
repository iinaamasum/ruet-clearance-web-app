import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login.jsx';
import StudentRegister from './Pages/Auth/StudentRegister.jsx';
import TeacherRegister from './Pages/Auth/TeacherRegister.jsx';

function App() {
  return (
    <div className="bg-primaryWhite w-full min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-student" element={<StudentRegister />} />
        <Route path="/register-teacher" element={<TeacherRegister />} />
      </Routes>
    </div>
  );
}

export default App;
