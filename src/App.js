import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login.jsx';
import { ResetPassword } from './Pages/Auth/ResetPassword.jsx';
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
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
