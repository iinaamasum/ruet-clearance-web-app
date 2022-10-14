import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fragment } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import LoadingComponent from '../../../Components/Shared/LoadingComponent';
import auth from '../../../firebase.config';

const ApplyClearanceModal = ({
  applyModalOpen,
  applyFor,
  handleApplyModalOpen,
  othersApplicationRefetch,
}) => {
  const [user, userLoading] = useAuthState(auth);
  const {
    data: studentInfoDetails,
    isLoading,
    isError,
  } = useQuery(['studentInfoDetails', user], async () => {
    return await axios
      .get(
        `http://localhost:5001/api/v1/student/profile-info?email=${user.email}`
      )
      .then((res) => res.data.allStudentInfo[0]);
  });

  if (isLoading || userLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    toast.error(isError);
  }

  const { name, roll, contact_number, dept, email, faculty, series } =
    studentInfoDetails;

  const handleApplyHallFacultyAdminApplication = async (reason) => {
    const totalSections = reason.includes('Faculty')
      ? 16
      : reason.includes('Hall')
      ? 7
      : 4;
    const postDoc = {
      appliedFor: reason,
      status: {
        isPending: true,
        isApproved: false,
        isRejected: false,
        rejectionReason: '',
      },
      studentName: name,
      studentEmail: email,
      studentRoll: roll,
      studentFaculty: faculty,
      studentDept: dept,
      studentSeries: series,
      studentContactInfo: contact_number,
      totalSections,
      getClearanceSections: [],
    };

    try {
      const postRes = await axios
        .post(
          `http://localhost:5001/api/v1/student/hall-faculty-admin-clearance-apply`,
          postDoc
        )
        .then((res) => res.data);

      if (postRes.status === 'success') {
        toast.success('Congrats! Your application is successfully submitted.');
      } else {
        toast.error(
          "Failed! Can't register the application. Check connections."
        );
      }
    } catch (error) {
      toast.error('Something went wrong. Check connections. ' + error.message);
    }
    othersApplicationRefetch();
    handleApplyModalOpen();
  };
  return (
    <Fragment>
      <Dialog
        className="min-w-[360px] sm:min-w-[600px]"
        open={applyModalOpen}
        size="md"
        handler={handleApplyModalOpen}
      >
        <DialogHeader className="text-3xl flex items-center justify-center capitalize">
          {applyFor}
        </DialogHeader>
        <DialogBody divider className="flex flex-col px-10">
          <p>Dear Sir,</p>

          <p className="mt-2">
            With all due respect, I wish to obtain clearance from all
            {applyFor.includes('Faculty')
              ? ' departments '
              : applyFor.includes('Hall')
              ? ' halls '
              : ' administrative sectors '}
            of the university as I have paid all of my debts and had no
            returnable equipments. Please forward my application to the
            respective
            {applyFor.includes('Faculty')
              ? ' Department Heads '
              : applyFor.includes('Hall')
              ? ' Hall Provosts '
              : ' Administrative Officials '}{' '}
            in charge of processing it and issue clearance.
          </p>

          <p className="mt-4 capitalize">Regards, {name}</p>
          <p>Email: {email}</p>
          <p>Roll: {roll}</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleApplyModalOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleApplyHallFacultyAdminApplication(applyFor)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default ApplyClearanceModal;
