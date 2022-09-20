import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import error404 from '../../assets/images/Error-404.png';
import NavBar from './NavBar';

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-[90px]">
      <NavBar />
      <div className="flex justify-center items-center gap-x-6 h-[80vh] max-w-[1200px] mx-auto">
        <div className="">
          <Typography variant="h2" color="red">
            Page Not Found
          </Typography>
          <Typography variant="p" color="gray" className="text-sm">
            Oooppssss Nothing here. It seems your are trying to access
            unavailable page. The page maybe under development. Please click the
            below button to comeback.
          </Typography>
          <Button
            onClick={() => navigate(-1)}
            color="blue"
            size="lg"
            className="py-2 my-4"
          >
            Go Home
          </Button>
        </div>
        <img className="h-[80vh]" src={error404} alt="" />
      </div>
    </section>
  );
};

export default Error404;
