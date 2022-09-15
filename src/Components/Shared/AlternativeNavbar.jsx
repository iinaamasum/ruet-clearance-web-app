import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';

export default function AlternativeNavbar() {
  return (
    <section
      style={{
        boxShadow: 'rgb(228 232 247 / 40%) 0px 0px 80px',
      }}
      className="w-full py-1 px-2 lg:px-8  bg-[rgba(255,255,255,0.86)]"
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
        <Typography variant="small" className="flex justify-center">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 font-bold text-blue-600 hover:underline"
          >
            Register Now
          </Link>
        </Typography>
      </div>
    </section>
  );
}
