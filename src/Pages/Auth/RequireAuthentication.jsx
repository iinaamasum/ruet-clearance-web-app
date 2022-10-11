import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingComponent from '../../Components/Shared/LoadingComponent';
import auth from '../../firebase.config';

const RequireAuthentication = ({ children }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    return toast.error('Error...');
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuthentication;
