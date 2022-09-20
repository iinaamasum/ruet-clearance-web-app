import NavBar from '../../Components/Shared/NavBar';
import './StudentHome.css';
import StudentHomeLeftSide from './StudentHomeLeftSide';
import StudentHomeRightSide from './StudentHomeRightSide';

const StudentHome = () => {
  return (
    <section className="">
      <NavBar />
      <div className="flex justify-center gap-x-5 max-w-[1200px] mx-auto pt-[80px] relative">
        <div className="hidden md:block md:w-[300px] lg:w-[400px]">
          <StudentHomeLeftSide />
        </div>
        <div className="w-full">
          <StudentHomeRightSide />
        </div>
      </div>
    </section>
  );
};

export default StudentHome;
