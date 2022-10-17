import { Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import ruetGate from '../../../assets/images/ruet-main-gate.jpg';
import student from '../../../assets/images/student.png';
import LoadingComponent from '../../../Components/Shared/LoadingComponent';
import auth from '../../../firebase.config';
import '../StudentHome.css';

const StudentHomeLeftSide = () => {
  const [user, userLoading] = useAuthState(auth);
  const {
    data: studentInfoDetails,
    isLoading,
    isError,
  } = useQuery(['studentInfoDetails', user], async () => {
    return await axios
      .get(
        `https://ruet-clearance-system-server.vercel.app/api/v1/student/profile-info?email=${user.email}`
      )
      .then((res) => res.data.allStudentInfo[0]);
  });

  if (isLoading || userLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    toast.error(isError);
  }
  const { name, contact_number, dept, email, faculty, roll, series } =
    studentInfoDetails;
  return (
    <div
      style={{
        boxShadow: 'rgb(228 232 247 / 60%) 5px 0px 80px',
      }}
      className="flex-col items-center hidden lg:block lg:w-[400px] min-h-[100vh] h-full bg-[#dddeee4d] pt-[60px] md:pt-[100px]"
    >
      <div className="flex flex-col items-center justify-center mb-10 w-full">
        <img
          className="w-32 h-32 rounded-full bg-white mt-5"
          src={student}
          alt=""
        />
        <div className="text-center w-full rounded-lg my-3 py-2">
          <Typography variant="h3" className="name__text__gradient capitalize">
            {name}
          </Typography>
          <Typography variant="paragraph" className="text-[15px] capitalize">
            {roll}
          </Typography>
          <Typography variant="paragraph" className="text-[15px] capitalize">
            {series} Series, {dept}
          </Typography>
          <Typography variant="paragraph" className="text-[15px]">
            {contact_number}
          </Typography>
          <Typography variant="paragraph" className="text-[15px]">
            {email}
          </Typography>
          <Typography variant="paragraph" className="text-[15px] capitalize">
            {faculty}
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
        <Typography variant="paragraph" className="text-sm">
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
