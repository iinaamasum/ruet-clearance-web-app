import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import LoadingComponent from '../../Components/Shared/LoadingComponent';
import MotionDiv from '../../Components/Shared/MotionDiv';
import TeacherNavbar from '../../Components/Shared/TeacherNavbar';
import auth from '../../firebase.config';
import DashboardLeft from './DashboardPart/DashboardLeft';
import DashboardRight from './DashboardPart/DashboardRight';

const TeacherDashboard = () => {
  const [faculty, setFaculty] = useState('');
  const [dept, setDept] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [searchFilter, setSearchFilter] = useState({
    apiMiddle: '',
    dept: '',
    series: '',
  });

  const [user, userLoading] = useAuthState(auth);

  const {
    data: filteredApplicationsData,
    isLoading,
    isError,
    refetch: refetchFilterApplicationsData,
  } = useQuery(
    ['filteredApplicationsData', searchFilter.apiMiddle],
    async () => {
      return await axios
        .get(
          `http://localhost:5001/api/v1/student/${searchFilter.apiMiddle}?studentSeries=${searchFilter.series}&studentDept=${searchFilter.dept}`
        )
        .then((res) => res.data);
    },
    {
      retry: 1,
    }
  );

  if (isLoading || userLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    toast.error("Can't get data. Please check connections. " + isError);
  }

  const onSubmit = async (data) => {
    if (!faculty) {
      toast.error('Please select faculty option.');
      return;
    }
    if (!dept) {
      toast.error('Please select dept option.');
      return;
    }
    if (!applicationType) {
      toast.error('Please select clearance type option.');
      return;
    }
    if (!data.series) {
      toast.error('Please enter series.');
      return;
    }

    const apiMiddle = applicationType.includes('Due')
      ? 'due-clearance-apply'
      : applicationType.includes('Equipment')
      ? 'equipment-clearance-apply'
      : 'hall-faculty-admin-clearance-apply';

    setSearchFilter({ ...searchFilter, dept, series: data.series, apiMiddle });
  };
  return (
    <>
      <TeacherNavbar />
      <section>
        <MotionDiv>
          <div className="lg:flex justify-center w-full max-w-[1500px] mx-auto gap-x-5">
            <div
              style={{
                boxShadow: 'rgb(228 232 247 / 60%) 5px 0px 80px',
              }}
              className="flex-col items-center w-full lg:max-w-[450px] lg:min-h-[100vh] h-full bg-[#dddeee4d] pt-[100px] px-5"
            >
              <DashboardLeft
                faculty={faculty}
                setFaculty={setFaculty}
                dept={dept}
                setDept={setDept}
                onSubmit={onSubmit}
                setApplicationType={setApplicationType}
              />
            </div>
            <div className="w-full lg:max-w-[1000px] mx-auto mt-[50px] lg:mt-[100px]">
              <DashboardRight
                filteredApplicationsData={filteredApplicationsData}
                refetchFilterApplicationsData={refetchFilterApplicationsData}
                applicationType={applicationType}
              />
            </div>
          </div>
        </MotionDiv>
      </section>
    </>
  );
};

export default TeacherDashboard;
