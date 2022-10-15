import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React from 'react';
import swal from 'sweetalert';

const EquipmentApplicationsTable = ({
  filteredApplicationsData,
  refetchFilterApplicationsData,
  applicationType,
}) => {
  const handleOpenDeleteModal = (deletionId, deleteApplication) => {
    swal({
      title: 'Are you sure?',
      text: `--${deleteApplication}-- will be deleted. Once deleted, you will not be able to recover this application!`,
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        let delApplyFor;
        if (deleteApplication.toLowerCase().includes('due')) {
          delApplyFor = 'due-clearance-apply';
        } else if (deleteApplication.toLowerCase().includes('equipment')) {
          delApplyFor = 'equipment-clearance-apply';
        }
        if (!delApplyFor) return;
        const deleteResponse = await axios
          .delete(
            `http://localhost:5001/api/v1/student/${delApplyFor}/${deletionId}`
          )
          .then((res) => res.data);
        if (deleteResponse.result) {
          swal(`Success! --${deleteApplication}-- is successfully deleted.`, {
            icon: 'success',
            button: 'Close',
          });
        } else {
          swal(
            `Can't delete the --${deleteApplication}--. Please check connections.`,
            {
              icon: 'error',
              button: 'Close',
            }
          );
        }
      } else {
        swal('Oww! Your application is just return from destroying process.', {
          icon: 'error',
          button: 'Close',
        });
      }
    });
  };

  const handleDeleteOthersApplication = (deletionId, deleteApplication) => {
    swal({
      title: 'Are you sure?',
      text: `--${deleteApplication}-- will be deleted. Once deleted, you will not be able to recover this application!`,
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const deleteResponse = await axios
          .delete(
            `http://localhost:5001/api/v1/student/hall-faculty-admin-clearance-apply/${deletionId}`
          )
          .then((res) => res.data);

        if (deleteResponse.result) {
          swal(`Success! --${deleteApplication}-- is successfully deleted.`, {
            icon: 'success',
            button: 'Close',
          });
        } else {
          swal(
            `Can't delete the --${deleteApplication}--. Please check connections.`,
            {
              icon: 'error',
              button: 'Close',
            }
          );
        }
      } else {
        swal('Oww! Your application is just return from destroying process.', {
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
            <th>Equipments</th>
            <th>ReturnTo</th>
            <th>ReturnCodes</th>
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
                {d?.equipment?.equipmentName.map((equipment) => (
                  <p key={equipment} className="text-sm">
                    {equipment}
                  </p>
                ))}
              </td>
              <td className="text-sm">
                {d?.equipment?.equipmentReturnedTo.map((equipment) => (
                  <p key={equipment} className="text-sm">
                    {equipment}
                  </p>
                ))}
              </td>
              <td className="text-sm">
                {d?.equipment?.returnedCode.map((equipment) => (
                  <p key={equipment} className="text-sm">
                    {equipment}
                  </p>
                ))}
              </td>

              <td className="text-sm">
                <p>Pending</p>
              </td>
              <td>
                <div className="flex items-center justify-center gap-x-1">
                  <Button
                    // onClick={() => {
                    //   handleOpenDeleteModal(
                    //     dueApplicationData.result[0]._id,
                    //     'Due Application'
                    //   );
                    // }}
                    variant="filled"
                    size="sm"
                    color="blue"
                    className="h-[30px] flex justify-center items-center"
                  >
                    Action
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

export default EquipmentApplicationsTable;
