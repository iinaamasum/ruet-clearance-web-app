import { Typography } from '@material-tailwind/react';
import ruetGate from '../../../assets/images/ruet-main-gate.jpg';
import student from '../../../assets/images/student.png';
import '../StudentHome.css';

const StudentHomeLeftSide = () => {
  return (
    <div
      style={{
        boxShadow: 'rgb(228 232 247 / 60%) 5px 0px 80px',
      }}
      className="flex-col items-center hidden md:block md:w-[300px] lg:w-[400px] min-h-screen bg-[#dddeee4d]"
    >
      <div className="flex flex-col items-center justify-center mb-10 w-full">
        <img
          className="w-32 h-32 rounded-full bg-white mt-5"
          src={student}
          alt=""
        />
        <div className="text-center w-full rounded-lg my-3 py-2">
          <Typography variant="h3" className="name__text__gradient">
            Md. Masum Mia
          </Typography>
          <Typography variant="paragraph" className="text-[15px]">
            19 Series
          </Typography>
          <Typography variant="paragraph" className="text-[15px]">
            0186439548
          </Typography>
          <Typography variant="paragraph" className="text-[15px]">
            iinaamasum@gamil.com
          </Typography>
          <Typography variant="paragraph" className="text-[15px]">
            Computer Science and Engineering
          </Typography>
        </div>
      </div>
      <div className="w-full text-center mb-10">
        <img
          className="w-[90%] mx-auto rounded-lg"
          src={ruetGate}
          alt="ruet-main-gate"
        />
        <Typography variant="h5" className="text-lg leading-5 mt-2">
          Rajshahi University of Engineering & Technology.
        </Typography>
        <Typography variant="paragraph" color="initial" className="text-sm">
          Want to visit our official site?{' '}
          <a
            href="https://www.ruet.ac.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Click here
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default StudentHomeLeftSide;
