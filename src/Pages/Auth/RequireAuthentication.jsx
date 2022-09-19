import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingComponent } from '../../Components/Shared/LoadingComponent';
import auth from '../../firebase.config';

export const RequireAuthentication = ({ children }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    return toast.error(error.message);
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};
