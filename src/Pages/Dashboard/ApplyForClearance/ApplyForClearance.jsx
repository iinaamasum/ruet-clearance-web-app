import { Avatar, Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import adminImg from '../../../assets/images/admin_img.jpeg';
import facultyImg from '../../../assets/images/dept_img.jpeg';
import hallImg from '../../../assets/images/hall_img.webp';
import ApplyClearanceModal from './ApplyClearanceModal';
import DueClearanceCard from './DueClearanceCard';
import EquipmentClearanceCard from './EquipmentClearanceCard';

const ApplyForClearance = ({
  dueApplicationData,
  equipmentApplicationData,
  dueApplicationRefetch,
  equipmentApplicationRefetch,
  othersApplicationData,
  othersApplicationRefetch,
}) => {
  const [dueApplyPageOpen, setDueApplyPageOpen] = useState(true);
  const [equipmentApplyPageOpen, setEquipmentApplyPageOpen] = useState(true);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyFor, setApplyFor] = useState('');

  const handleApplyModalOpen = (reason, data) => {
    let pendingApplication = [];
    data?.result?.forEach((d) => {
      if (
        d.appliedFor === reason &&
        (d.status.isPending || d.status.isApproved)
      ) {
        pendingApplication.push(d);
      }
    });
    if (pendingApplication?.length > 0) {
      swal({
        title: `Already Applied for ${reason}!`,
        text: `You have already applied for ${reason} and the application is pending or you just got clearance from the sector. So, you can't reapply unless get rejection or delete the previous application.`,
        icon: 'error',
        button: 'Close',
      });
    } else {
      setApplyFor(reason);
      setApplyModalOpen(!applyModalOpen);
    }
  };

  return (
    <>
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
            onClick={() =>
              handleApplyModalOpen('Faculty Clearance', othersApplicationData)
            }
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
            onClick={() =>
              handleApplyModalOpen('Hall Clearance', othersApplicationData)
            }
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
            onClick={() =>
              handleApplyModalOpen(
                'Administrative Clearance',
                othersApplicationData
              )
            }
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

      {applyModalOpen && applyFor && (
        <ApplyClearanceModal
          applyFor={applyFor}
          applyModalOpen={applyModalOpen}
          handleApplyModalOpen={handleApplyModalOpen}
          othersApplicationRefetch={othersApplicationRefetch}
        />
      )}
    </>
  );
};

export default ApplyForClearance;
