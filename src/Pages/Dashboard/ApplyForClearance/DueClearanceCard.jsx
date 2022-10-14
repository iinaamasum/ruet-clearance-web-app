import { Avatar, Card, Typography } from '@material-tailwind/react';
import React from 'react';
import swal from 'sweetalert';
import dueImg from '../../../assets/images/dueImg.png';
import MotionDiv from '../../../Components/Shared/MotionDiv';
import DueClearance from '../ApplyClearance/DueClearance';

const DueClearanceCard = ({
  dueApplicationData,
  dueApplyPageOpen,
  setDueApplyPageOpen,
  dueApplicationRefetch,
}) => {
  const handleDueApplicationPendingCheck = () => {
    if (
      dueApplicationData.result.length > 0 &&
      !dueApplicationData.result[0].status.isRejected
    ) {
      swal({
        title: 'Already Applied for Due Clearance!',
        text: "You have already applied for Due Clearance and the application is pending. So, you can't reapply unless get rejection or delete the previous application.",
        icon: 'error',
        button: 'Close',
      });
    } else {
      setDueApplyPageOpen(false);
    }
  };

  return (
    <div>
      {dueApplyPageOpen ? (
        <MotionDiv>
          <Card
            onClick={handleDueApplicationPendingCheck}
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
              Click to apply for due clearance.
            </Typography>
          </Card>
        </MotionDiv>
      ) : (
        <DueClearance
          dueApplyPageOpen={dueApplyPageOpen}
          setDueApplyPageOpen={setDueApplyPageOpen}
          dueApplicationRefetch={dueApplicationRefetch}
        />
      )}
    </div>
  );
};

export default DueClearanceCard;
