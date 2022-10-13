import { Avatar, Card, Typography } from '@material-tailwind/react';
import React from 'react';
import swal from 'sweetalert';
import equipmentImg from '../../../assets/images/equipment_img.png';
import MotionDiv from '../../../Components/Shared/MotionDiv';
import EquipmentClearance from '../ApplyClearance/EquipmentClearance';

const EquipmentClearanceCard = ({
  equipmentApplicationData,
  equipmentApplyPageOpen,
  setEquipmentApplyPageOpen,
  equipmentApplicationRefetch,
}) => {
  const handleEquipmentApplicationPendingCheck = () => {
    if (
      equipmentApplicationData.result.length > 0 &&
      !equipmentApplicationData.result[0].status.isRejected
    ) {
      swal({
        title: 'Already Applied for Equipment Clearance!',
        text: "You have already applied for Equipment Clearance and the application is pending. So, you can't reapply unless get rejection.",
        icon: 'error',
        button: 'Close',
      });
    } else {
      setEquipmentApplyPageOpen(false);
    }
  };
  return (
    <div>
      {equipmentApplyPageOpen ? (
        <MotionDiv>
          <Card
            onClick={handleEquipmentApplicationPendingCheck}
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
              Click to apply for equipments clearance.
            </Typography>
          </Card>
        </MotionDiv>
      ) : (
        <EquipmentClearance
          equipmentApplyPageOpen={equipmentApplyPageOpen}
          setEquipmentApplyPageOpen={setEquipmentApplyPageOpen}
          equipmentApplicationRefetch={equipmentApplicationRefetch}
        />
      )}
    </div>
  );
};

export default EquipmentClearanceCard;
