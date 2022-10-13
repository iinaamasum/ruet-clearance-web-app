import { Avatar, Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import adminImg from '../../../assets/images/admin_img.jpeg';
import facultyImg from '../../../assets/images/dept_img.jpeg';
import hallImg from '../../../assets/images/hall_img.webp';
import DueClearanceCard from './DueClearanceCard';
import EquipmentClearanceCard from './EquipmentClearanceCard';

const ApplyForClearance = ({
  dueApplicationData,
  equipmentApplicationData,
  dueApplicationRefetch,
  equipmentApplicationRefetch,
}) => {
  const [dueApplyPageOpen, setDueApplyPageOpen] = useState(true);
  const [equipmentApplyPageOpen, setEquipmentApplyPageOpen] = useState(true);

  return (
    <section className="mb-10">
      <Card
        style={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px',
        }}
        className="w-full flex flex-row items-center gap-4 px-4 py-1 rounded-md mt-3"
      >
        <Typography variant="paragraph">
          Want to see the list of the student who have dues or returnable
          equipments?{' '}
          <Link
            to="/student-dashboard"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Click Here
          </Link>
        </Typography>
      </Card>

      <DueClearanceCard
        dueApplicationData={dueApplicationData}
        dueApplyPageOpen={dueApplyPageOpen}
        setDueApplyPageOpen={setDueApplyPageOpen}
        dueApplicationRefetch={dueApplicationRefetch}
      />
      <EquipmentClearanceCard
        equipmentApplicationData={equipmentApplicationData}
        equipmentApplyPageOpen={equipmentApplyPageOpen}
        setEquipmentApplyPageOpen={setEquipmentApplyPageOpen}
        equipmentApplicationRefetch={equipmentApplicationRefetch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <Card
          onClick={() => setDueApplyPageOpen(false)}
          style={{
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px',
          }}
          className="w-full flex flex-col items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all duration-150 mt-5 text-center"
        >
          <Avatar
            src={facultyImg}
            alt="avatar"
            variant="circular"
            className="border-[1px] border-gray-300 h-16 w-16"
          />
          <Typography variant="h5">Faculty Clearance</Typography>
        </Card>
        <Card
          onClick={() => setDueApplyPageOpen(false)}
          style={{
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px',
          }}
          className="w-full flex flex-col items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all duration-150 mt-5"
        >
          <Avatar
            src={hallImg}
            alt="avatar"
            variant="circular"
            className="border-[1px] border-gray-300 h-16 w-16"
          />
          <Typography variant="h5">Hall Clearance</Typography>
        </Card>
        <Card
          onClick={() => setDueApplyPageOpen(false)}
          style={{
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px',
          }}
          className="w-full flex flex-col items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all duration-150 mt-5"
        >
          <Avatar
            src={adminImg}
            alt="avatar"
            variant="circular"
            className="border-[1px] border-gray-300 h-16 w-16"
          />
          <Typography variant="h5">Admin Clearance</Typography>
        </Card>
      </div>
    </section>
  );
};

export default ApplyForClearance;
