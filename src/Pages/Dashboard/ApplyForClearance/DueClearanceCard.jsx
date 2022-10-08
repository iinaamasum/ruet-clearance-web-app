import { Avatar, Card, Typography } from '@material-tailwind/react';
import React from 'react';
import dueImg from '../../../assets/images/dueImg.png';
import MotionDiv from '../../../Components/Shared/MotionDiv';
import DueClearance from '../ApplyClearance/DueClearance';

const DueClearanceCard = ({ dueApplyPageOpen, setDueApplyPageOpen }) => {
  return (
    <div>
      {dueApplyPageOpen ? (
        <MotionDiv>
          <Card
            onClick={() => setDueApplyPageOpen(!dueApplyPageOpen)}
            style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px',
            }}
            className="w-full flex flex-row items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all duration-150 mt-5"
          >
            <Avatar
              src={dueImg}
              alt="avatar"
              variant="circular"
              className="border-[1px] border-gray-300"
            />
            <Typography variant="paragraph">
              Click to add details of your paid dues via Rupali Bank.
            </Typography>
          </Card>
        </MotionDiv>
      ) : (
        <DueClearance
          dueApplyPageOpen={dueApplyPageOpen}
          setDueApplyPageOpen={setDueApplyPageOpen}
        />
      )}
    </div>
  );
};

export default DueClearanceCard;
