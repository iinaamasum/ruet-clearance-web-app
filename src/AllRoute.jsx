import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Error404 from './Components/Shared/Error404.jsx';
import Login from './Pages/Auth/Login.jsx';
import RequireAuthentication from './Pages/Auth/RequireAuthentication';
import { ResetPassword } from './Pages/Auth/ResetPassword.jsx';
import StudentRegister from './Pages/Auth/StudentRegister.jsx';
import TeacherRegister from './Pages/Auth/TeacherRegister.jsx';
import StudentHome from './Pages/Dashboard/StudentHome.jsx';
import StudentProfileInfo from './Pages/ProfileInfo/StudentProfileInfo.jsx';
import TeacherProfileInfo from './Pages/ProfileInfo/TeacherProfileInfo.jsx';

const AllRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <RequireAuthentication>
              <StudentHome />
            </RequireAuthentication>
          }
        />
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
        <Route
          path="/student-dashboard"
          element={
            <RequireAuthentication>
              <StudentHome />
            </RequireAuthentication>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AllRoutes;
