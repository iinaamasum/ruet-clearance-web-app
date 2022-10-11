import { Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import MotionDiv from '../../../Components/Shared/MotionDiv';
import DueClearanceCard from './DueClearanceCard';
import EquipmentClearanceCard from './EquipmentClearanceCard';

const ApplyForClearance = () => {
  const [dueApplyPageOpen, setDueApplyPageOpen] = useState(true);
  const [equipmentApplyPageOpen, setEquipmentApplyPageOpen] = useState(true);

  return (
    <section className="mb-10">
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
        <EquipmentClearanceCard
          equipmentApplyPageOpen={equipmentApplyPageOpen}
          setEquipmentApplyPageOpen={setEquipmentApplyPageOpen}
        />
      </MotionDiv>
    </section>
  );
};

export default ApplyForClearance;
