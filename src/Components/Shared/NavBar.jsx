import {
  Button,
  IconButton,
  MobileNav,
  Typography,
} from '@material-tailwind/react';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import auth from '../../firebase.config';

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/student-dashboard" className="flex items-center">
          Clearance
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/semester-result" className="flex items-center">
          Result
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/report-error" className="flex items-center">
          Report Error
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/payment-help" className="flex items-center">
          Payment Help
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/about" className="flex items-center">
          About
        </Link>
      </Typography>
    </ul>
  );

  return (
    <section
      style={{
        boxShadow: 'rgb(228 232 247 / 40%) 0px 0px 80px',
      }}
      className="w-full py-1 px-2 lg:px-8  bg-[rgba(255,255,255,0.86)] fixed top-0 z-50"
    >
      <div className="flex items-center justify-between text-blue-gray-900 max-w-[1200px] mx-auto">
        <Link
          to="/"
          className="mr-4 cursor-pointer font-medium flex justify-center items-center"
        >
          <img
            src={logo}
            alt="ruet-logo"
            className="h-12 w-14 md:h-16 md:w-20 mr-2"
          />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <Button
          onClick={() => signOut(auth)}
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
        >
          <span>Log Out</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav} className="">
        {navList}
        <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Log Out</span>
        </Button>
      </MobileNav>
    </section>
  );
}
