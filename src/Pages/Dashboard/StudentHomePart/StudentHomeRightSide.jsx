import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import student from '../../../assets/images/student.png';
import LoadingComponent from '../../../Components/Shared/LoadingComponent';
import auth from '../../../firebase.config';
import AppliedForClearance from '../AppliedForClearance/AppliedForClearance';
import ApplyForClearance from '../ApplyForClearance/ApplyForClearance';
import ClearanceApproved from '../ClearanceApproved/ClearanceApproved';
import ClearanceRejection from '../ClearanceRejection/ClearanceRejection';
import '../StudentHome.css';

const StudentHomeRightSide = () => {
  const [user, userLoading] = useAuthState(auth);

  const {
    data: dueApplicationData,
    isLoading: isLoadingDue,
    isError: isErrorDue,
    refetch: dueApplicationRefetch,
  } = useQuery(
    ['dueApplicationData', user],
    async () => {
      return await axios
        .get(
          `http://localhost:5001/api/v1/student/due-clearance-apply?studentEmail=${user.email}`
        )
        .then((res) => res.data);
    },
    {
      retry: 1,
    }
  );

  const {
    data: othersApplicationData,
    isLoading: isLoadingOthers,
    isError: isErrorOthers,
    refetch: othersApplicationRefetch,
  } = useQuery(
    ['othersApplicationData', user],
    async () => {
      return await axios
        .get(
          `http://localhost:5001/api/v1/student/hall-faculty-admin-clearance-apply?studentEmail=${user.email}`
        )
        .then((res) => res.data);
    },
    {
      retry: 1,
    }
  );

  const {
    data: equipmentApplicationData,
    isLoading: isLoadingEquipment,
    isError: isErrorEquipment,
    refetch: equipmentApplicationRefetch,
  } = useQuery(
    ['equipmentApplicationData', user],
    async () => {
      return await axios
        .get(
          `http://localhost:5001/api/v1/student/equipment-clearance-apply?studentEmail=${user.email}`
        )
        .then((res) => res.data);
    },
    {
      retry: 1,
    }
  );

  if (isLoadingDue || userLoading || isLoadingEquipment || isLoadingOthers) {
    return <LoadingComponent />;
  }
  if (isErrorDue || isErrorEquipment || isErrorOthers) {
    toast.error('Error Occurred. Please check internet. ' + isErrorDue.message);
  }

  console.log(othersApplicationData);

  const data = [
    {
      label: 'Apply',
      value: 'apply',
    },
    {
      label: 'Applied',
      value: 'applied',
    },
    {
      label: 'Approved',
      value: 'approved',
    },
    {
      label: 'Rejected',
      value: 'rejected',
    },
  ];

  return (
    <Tabs
      className="px-1 xsm:px-4 pt-[60px] md:pt-[100px]"
      id="custom-animation"
      value="apply"
    >
      <div className="mt-3 mb-2 md:my-3">
        <Typography variant="h2" className="text-center leading-9">
          Welcome to RUET Clearance System
        </Typography>
      </div>
      <div className="mb-3 p-3 flex justify-between items-center lg:hidden bg-secondaryWhite rounded-xl">
        <div className="">
          <Typography variant="h4" className="leading-8">
            Hello, <span className="text-orange-600">Md. Masum</span>{' '}
          </Typography>
          <Typography
            variant="paragraph"
            className="text-indigo-600 font-medium leading-5"
          >
            '19 Series
          </Typography>
          <Typography
            variant="paragraph"
            className="text-indigo-600 font-medium leading-5"
          >
            01864393548
          </Typography>
          <Typography
            variant="paragraph"
            className="text-indigo-600 font-medium leading-5"
          >
            iinaamasum@gmail.com
          </Typography>
        </div>
        <img className="w-24 h-24 rounded-full bg-white" src={student} alt="" />
      </div>
      <TabsHeader className="">
        {data.map(({ label, value }) => (
          <Tab className="text-[13px] xsm:text-base" key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        <TabPanel className="px-0 py-2" value="apply">
          <ApplyForClearance
            dueApplicationRefetch={dueApplicationRefetch}
            equipmentApplicationRefetch={equipmentApplicationRefetch}
            dueApplicationData={dueApplicationData}
            equipmentApplicationData={equipmentApplicationData}
            othersApplicationData={othersApplicationData}
            othersApplicationRefetch={othersApplicationRefetch}
          />
        </TabPanel>
        <TabPanel className="px-0 py-2" value="applied">
          <AppliedForClearance
            dueApplicationRefetch={dueApplicationRefetch}
            equipmentApplicationRefetch={equipmentApplicationRefetch}
            dueApplicationData={dueApplicationData}
            equipmentApplicationData={equipmentApplicationData}
            othersApplicationData={othersApplicationData}
            othersApplicationRefetch={othersApplicationRefetch}
          />
        </TabPanel>
        <TabPanel className="px-0 py-2" value="approved">
          <ClearanceApproved
            dueApplicationData={dueApplicationData}
            equipmentApplicationData={equipmentApplicationData}
            othersApplicationData={othersApplicationData}
          />
        </TabPanel>
        <TabPanel className="px-0 py-2" value="rejected">
          <ClearanceRejection
            dueApplicationData={dueApplicationData}
            equipmentApplicationData={equipmentApplicationData}
            othersApplicationData={othersApplicationData}
          />
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default StudentHomeRightSide;
