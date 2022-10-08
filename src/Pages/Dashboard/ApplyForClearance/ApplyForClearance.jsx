import { Avatar, Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import adminImg from '../../../assets/images/admin_img.jpeg';
import deptImg from '../../../assets/images/dept_img.jpeg';

import equipmentImg from '../../../assets/images/equipment_img.png';
import hallImg from '../../../assets/images/hall_img.webp';
import MotionDiv from '../../../Components/Shared/MotionDiv';
import DueClearanceCard from './DueClearanceCard';

const ApplyForClearance = () => {
  const allDept = [
    {
      department: 'CSE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'EEE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'ECE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'ETE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'CE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'Arch',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'URP',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'BECM',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'ME',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'IPE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'GCE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'MTE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'MSE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'CFPE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'Chem',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'Math',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'Phy',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'Hum',
      rejection: false,
      approved: false,
      applied: false,
    },
  ];
  const allHall = [
    {
      hallName: 'Deshratna Sheikh Hasina Hall',
      rejection: false,
      approved: false,
      applied: false,
    },

    {
      hallName: 'Bangabandhu Sheikh Mujibur Rahman Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Shahid Lt. Selim Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Shahid Shahidul Islam Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Shahid President Ziaur Rahman Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Shahid Abdul Hamid Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Tin Shed Hall (Extension)',
      rejection: false,
      approved: false,
      applied: false,
    },
  ];
  const adminBuilding = [
    {
      branchName: 'Administrative Branch',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      branchName: 'Accounts Branch',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      branchName: 'Education Branch',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      branchName: 'Student Welfare',
      rejection: false,
      approved: false,
      applied: false,
    },
  ];

  const [dueDone, setDueDone] = useState(false);

  const [dueApplyPageOpen, setDueApplyPageOpen] = useState(true);
  const [equipmentApplyPageOpen, setEquipmentApplyPageOpen] = useState(false);

  return (
    <>
      {!dueDone ? (
        <MotionDiv>
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
            dueApplyPageOpen={dueApplyPageOpen}
            setDueApplyPageOpen={setDueApplyPageOpen}
          />

          <Card
            onClick={() => setEquipmentApplyPageOpen(!equipmentApplyPageOpen)}
            style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px',
            }}
            className="w-full flex flex-row items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all duration-150 mt-5"
          >
            <Avatar
              src={equipmentImg}
              alt="avatar"
              variant="circular"
              className="border-[1px] border-gray-300"
            />
            <Typography variant="paragraph">
              Click to add details of already returned equipment to the
              university.
            </Typography>
          </Card>
        </MotionDiv>
      ) : (
        <MotionDiv>
          <Card
            onClick={() => setEquipmentApplyPageOpen(false)}
            style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px',
            }}
            className="w-full flex flex-row items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all duration-150 mt-3"
          >
            <Avatar
              src={deptImg}
              alt="avatar"
              variant="circular"
              className="border-[1px] border-gray-300"
            />
            <Typography variant="paragraph">
              Click to apply for the departmental clearance.
            </Typography>
          </Card>
          <Card
            // onClick={() => setCreateWork(!createWork)}
            style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px',
            }}
            className="w-full flex flex-row items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all duration-150 mt-5"
          >
            <Avatar
              src={hallImg}
              alt="avatar"
              variant="circular"
              className="border-[1px] border-gray-300"
            />
            <Typography variant="paragraph">
              Click to apply for the hall clearance. university.
            </Typography>
          </Card>
          <Card
            // onClick={() => setCreateWork(!createWork)}
            style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px',
            }}
            className="w-full flex flex-row items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all duration-150 mt-5"
          >
            <Avatar
              src={adminImg}
              alt="avatar"
              variant="circular"
              className="border-[1px] border-gray-300"
            />
            <Typography variant="paragraph">
              Click to apply for the administrative clearance. university.
            </Typography>
          </Card>
        </MotionDiv>
      )}
    </>
  );
};

export default ApplyForClearance;
