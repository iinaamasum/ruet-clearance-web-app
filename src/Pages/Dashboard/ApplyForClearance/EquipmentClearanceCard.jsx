import { Avatar, Card, Typography } from '@material-tailwind/react';
import React from 'react';
import equipmentImg from '../../../assets/images/equipment_img.png';
import MotionDiv from '../../../Components/Shared/MotionDiv';
import EquipmentClearance from '../ApplyClearance/EquipmentClearance';

const EquipmentClearanceCard = ({
  equipmentApplyPageOpen,
  setEquipmentApplyPageOpen,
  equipmentApplicationRefetch,
}) => {
  return (
    <div>
      {equipmentApplyPageOpen ? (
        <MotionDiv>
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
