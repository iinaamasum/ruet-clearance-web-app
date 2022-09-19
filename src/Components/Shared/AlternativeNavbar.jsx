import { Typography } from '@material-tailwind/react';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import auth from '../../firebase.config';

export default function AlternativeNavbar({ children }) {
  return (
    <section
      style={{
        boxShadow: 'rgb(228 232 247 / 40%) 0px 0px 80px',
      }}
      className="w-full py-1 px-2 lg:px-8  bg-[rgba(255,255,255,0.86)] fixed top-0 z-50"
    >
      <div className="flex items-center justify-between text-blue-gray-900 max-w-[1024px] mx-auto">
        <Link
          to="/"
          className="mr-4 cursor-pointer font-normal flex justify-center items-center"
        >
          <img
            src={logo}
            alt="ruet-logo"
            className="h-12 w-14 md:h-16 md:w-20 mr-2"
          />
        </Link>

        {children === 'studentRegPage' ? (
          <>
            <Typography
              variant="small"
              className="flex justify-center text-[12px] xsm:text-base"
            >
              Want to join as Teacher?
              <Link
                to="/register-teacher"
                className="ml-1 font-bold text-blue-600 hover:underline"
              >
                Teacher Registration
              </Link>
            </Typography>
          </>
        ) : children === 'teacherRegPage' ? (
          <>
            <Typography
              variant="small"
              className="flex justify-center text-[12px] xsm:text-base"
            >
              Want to join as Student?
              <Link
                to="/register-student"
                className="ml-1 font-bold text-blue-600 hover:underline"
              >
                Student Registration
              </Link>
            </Typography>
          </>
        ) : children === 'updateProfilePage' ? (
          <>
            <Typography
              variant="small"
              className="flex justify-center text-[12px] xsm:text-base"
            >
              Want to switch account?
              <Link
                to="/"
                onClick={() => signOut(auth)}
                className="ml-1 font-bold text-blue-600 hover:underline"
              >
                LogIn Now
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="small"
              className="flex justify-center text-[12px] xsm:text-base"
            >
              Don't have an account?
              <Link
                to="/register-student"
                className="ml-1 font-bold text-blue-600 hover:underline"
              >
                Register Now
              </Link>
            </Typography>
          </>
        )}
      </div>
    </section>
  );
}
