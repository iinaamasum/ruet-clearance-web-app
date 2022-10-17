import { Button, Tooltip } from '@material-tailwind/react';
import axios from 'axios';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import swal from 'sweetalert';

const OthersApplicationsTable = ({
  filteredApplicationsData,
  refetchFilterApplicationsData,
  applicationType,
}) => {
  const handleApproveApplicationModal = (
    applicationId,
    applicationFor,
    userRoll,
    userEmail
  ) => {
    swal({
      title: 'Are you sure?',
      text: `--${applicationFor}-- will be approved which is applied by ${userEmail} and roll: ${userRoll}.`,
      icon: 'warning',
      buttons: ['Cancel', 'Approve'],
      dangerMode: true,
    }).then(async (willReject) => {
      if (willReject) {
        const updateData = {
          status: {
            isPending: false,
            isApproved: true,
            isRejected: false,
            rejectionReason: '',
          },
        };
        const approveResponse = await axios
          .patch(
            `https://ruet-clearance-system-server.vercel.app/api/v1/student/hall-faculty-admin-clearance-apply/${applicationId}`,
            updateData
          )
          .then((res) => res.data);

        if (approveResponse.status === 'success') {
          swal(`Success! --${applicationFor}-- is successfully approved.`, {
            icon: 'success',
            button: 'Close',
          });
        } else {
          swal(
            `Can't approve the --${applicationFor}--. Please check connections.`,
            {
              icon: 'error',
              button: 'Close',
            }
          );
        }
        refetchFilterApplicationsData();
      } else {
        swal('Oww! Your application is just return from approval process.', {
          icon: 'error',
          button: 'Close',
        });
      }
    });
  };

  const handleRejectApplicationModal = (
    applicationId,
    applicationFor,
    userRoll,
    userEmail
  ) => {
    swal({
      title: 'Are you sure?',
      text: `--${applicationFor}-- will be rejected which is applied by ${userEmail} and roll: ${userRoll}.`,
      icon: 'warning',
      buttons: ['Cancel', 'Reject Application'],
      dangerMode: true,
    }).then(async (willUpdate) => {
      if (willUpdate) {
        const updateData = {
          status: {
            isPending: false,
            isApproved: false,
            isRejected: true,
            rejectionReason: '',
          },
        };
        const rejectionResponse = await axios
          .patch(
            `https://ruet-clearance-system-server.vercel.app/api/v1/student/hall-faculty-admin-clearance-apply/${applicationId}`,
            updateData
          )
          .then((res) => res.data);

        if (rejectionResponse.status === 'success') {
          swal(`Success! --${applicationFor}-- is successfully rejected.`, {
            icon: 'success',
            button: 'Close',
          });
        } else {
          swal(
            `Can't reject the --${applicationFor}--. Please check connections.`,
            {
              icon: 'error',
              button: 'Close',
            }
          );
        }
        refetchFilterApplicationsData();
      } else {
        swal('Oww! Your application is just return from rejection process.', {
          icon: 'error',
          button: 'Close',
        });
      }
    });
  };

  let filterPendingApplicationData = [];
  filteredApplicationsData?.result.forEach((d) => {
    if (d.status.isPending) filterPendingApplicationData.push(d);
  });

  console.log(filterPendingApplicationData);

  return (
    <div className="overflow-x-auto styled-table">
      <table className="w-full">
        <caption className="text-2xl text-[#546e7a] my-2 font-semibold">
          {applicationType || 'Options Not Selected'}
        </caption>
        {/* <!-- head --> */}
        <thead>
          <tr className="bg-[#546e7a] text-center text-white">
            <th className="max-w-[50px]">Serial</th>
            <th>StudentInfo</th>
            <th>AppliedFor</th>
            <th>Got Clearance</th>
            <th>Need Approval</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {filterPendingApplicationData.map((d, i) => (
            <tr
              key={d._id}
              className="last:border-b-[2px] last:border-[#546e7a]"
            >
              <th className="max-w-[50px]">{i + 1}</th>
              <td>
                <div key={i} className="">
                  <p className="font-medium text-lg capitalize">
                    {d.studentName}
                  </p>
                  <p className="font-medium capitalize">{d.studentRoll}</p>
                  <p className="font-medium">
                    {d.studentDept} {d.studentSeries}
                  </p>
                  <p className="font-medium">{d.studentContactInfo}</p>
                  <p className="font-medium">{d.studentEmail}</p>
                </div>
              </td>
              <td className="text-sm">
                <p>{d.appliedFor}</p>
              </td>
              <td className="text-sm">
                <p className="inline-flex justify-center items-center gap-x-2">
                  {d?.getClearanceSections.length}{' '}
                  {d?.appliedFor.includes('Hall')
                    ? ' Halls'
                    : d.appliedFor.includes('Faculty')
                    ? ' Depts'
                    : ' Admin Sectors'}
                  <Tooltip
                    content={
                      d?.getClearanceSections.length === 0
                        ? 'None'
                        : d?.getClearanceSections.map(
                            (dept, i, arr) =>
                              `${dept}${i !== arr.length - 1 ? ', ' : ' '}`
                          )
                    }
                  >
                    <Button className="bg-transparent p-0 m-0 shadow-none">
                      <AiOutlineEye
                        as={Button}
                        size={22}
                        color="#109879"
                        className="font-bold cursor-pointer"
                      />
                    </Button>
                  </Tooltip>
                </p>
              </td>
              <td className="text-sm">
                <p>
                  {d.totalSections}{' '}
                  {d.appliedFor.includes('Hall')
                    ? ' Halls'
                    : d.appliedFor.includes('Faculty')
                    ? ' Depts'
                    : ' Admin Sectors'}
                </p>
              </td>

              <td className="text-sm">
                <p>Pending</p>
              </td>
              <td>
                <div className="flex items-center justify-center gap-x-1">
                  <Button
                    onClick={() => {
                      handleApproveApplicationModal(
                        d._id,
                        d.appliedFor,
                        d.studentRoll,
                        d.studentEmail
                      );
                    }}
                    variant="filled"
                    size="sm"
                    color="blue"
                    className="h-[30px] flex justify-center items-center"
                  >
                    Approve{' '}
                  </Button>
                  <Button
                    onClick={() => {
                      handleRejectApplicationModal(
                        d._id,
                        d.appliedFor,
                        d.studentRoll,
                        d.studentEmail
                      );
                    }}
                    variant="filled"
                    size="sm"
                    color="red"
                    className="h-[30px] flex justify-center items-center"
                  >
                    Reject
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OthersApplicationsTable;
