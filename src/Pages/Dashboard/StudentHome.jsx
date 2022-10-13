import MotionDiv from '../../Components/Shared/MotionDiv';
import NavBar from '../../Components/Shared/NavBar';
import './StudentHome.css';
import StudentHomeLeftSide from './StudentHomePart/StudentHomeLeftSide';
import StudentHomeRightSide from './StudentHomePart/StudentHomeRightSide';

const StudentHome = () => {
  return (
    <section className="overflow-hidden">
      <NavBar />
      <MotionDiv>
        <div className="flex justify-center gap-x-5 max-w-[1200px] mx-auto relative">
          <div className="hidden lg:block lg:w-[400px]">
            <StudentHomeLeftSide />
          </div>
          <div className="w-full">
            <StudentHomeRightSide />
          </div>
        </div>
      </MotionDiv>
    </section>
  );
};

export default StudentHome;
