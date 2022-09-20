import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login.jsx';
import { ResetPassword } from './Pages/Auth/ResetPassword.jsx';
import StudentRegister from './Pages/Auth/StudentRegister.jsx';
import TeacherRegister from './Pages/Auth/TeacherRegister.jsx';
import StudentHome from './Pages/Dashboard/StudentHome.jsx';
import StudentProfileInfo from './Pages/ProfileInfo/StudentProfileInfo.jsx';
import TeacherProfileInfo from './Pages/ProfileInfo/TeacherProfileInfo.jsx';

function App() {
  return (
    <div className="bg-primaryWhite w-full min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-student" element={<StudentRegister />} />
        <Route path="/register-teacher" element={<TeacherRegister />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/student-profile-update"
          element={<StudentProfileInfo />}
        />
        <Route
          path="/teacher-profile-update"
          element={<TeacherProfileInfo />}
        />
        <Route path="/student-dashboard" element={<StudentHome />} />
      </Routes>
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
