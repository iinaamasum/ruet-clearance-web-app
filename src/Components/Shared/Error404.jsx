import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import error404 from '../../assets/images/Error-404.png';
import MotionDiv from './MotionDiv';
import NavBar from './NavBar';

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-[90px]">
      <NavBar />
      <MotionDiv>
        <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-x-6  lg:h-[80vh] max-w-[1200px] mx-auto">
          <img
            className="h-[50vh] md:h-[60vh] lg:h-[80vh]"
            src={error404}
            alt=""
          />
          <div className="text-center md:text-start px-4 lg:px-0">
            <Typography variant="h2" color="red">
              Page Not Found
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              className="text-sm max-w-[400px] md:w-full mx-auto"
            >
              Oooppssss Nothing here. It seems your are trying to access
              unavailable page. The page maybe under development. Please click
              the below button to comeback.
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
        </div>
      </MotionDiv>
    </section>
  );
};

export default Error404;
