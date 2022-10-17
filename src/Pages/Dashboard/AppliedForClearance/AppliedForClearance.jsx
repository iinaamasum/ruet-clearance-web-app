import { Button, Tooltip } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import swal from 'sweetalert';
import EditApplicationModal from './EditApplicationModal';

const AppliedForClearance = ({
  dueApplicationData,
  dueApplicationRefetch,
  equipmentApplicationData,
  equipmentApplicationRefetch,
  othersApplicationData,
  othersApplicationRefetch,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editModalId, setEditModalId] = useState('');

  const handleOpenEditModal = () => setOpenEditModal(!openEditModal);
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
            `https://ruet-clearance-system-server.vercel.app/api/v1/student/${delApplyFor}/${deletionId}`
          )
          .then((res) => res.data);
        dueApplicationRefetch();
        equipmentApplicationRefetch();
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
            `https://ruet-clearance-system-server.vercel.app/api/v1/student/hall-faculty-admin-clearance-apply/${deletionId}`
          )
          .then((res) => res.data);
        othersApplicationRefetch();
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

  let othersPendingApplicationData = [];
  othersApplicationData?.result.forEach((d) => {
    if (d.status.isPending) othersPendingApplicationData.push(d);
  });

  let duePendingApplicationData = [];
  dueApplicationData?.result.forEach((d) => {
    if (d.status.isPending) duePendingApplicationData.push(d);
  });

  let equipmentPendingApplicationData = [];
  equipmentApplicationData?.result.forEach((d) => {
    if (d.status.isPending) equipmentPendingApplicationData.push(d);
  });

  console.log(othersPendingApplicationData);

  return (
    <>
      {/* due clearance */}
      {duePendingApplicationData?.[0] &&
        duePendingApplicationData[0].appliedFor.includes('Due') && (
          <div className="overflow-x-auto styled-table">
            <table className="w-full">
              <caption className="text-2xl text-[#546e7a] my-2 font-semibold">
                Due Clearance Application
              </caption>
              {/* <!-- head --> */}
              <thead>
                <tr className="bg-[#546e7a] text-center text-white">
                  <th className="max-w-[50px]">Serial</th>
                  <th>Reason</th>
                  <th>Amount</th>
                  <th>TransactionID</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}

                <tr className="last:border-b-[2px] last:border-[#546e7a]">
                  <th className="max-w-[50px]">1</th>
                  <td>
                    {duePendingApplicationData[0].dueReason.map((d, i) => (
                      <p key={i} className="font-medium">
                        {d}
                      </p>
                    ))}
                  </td>
                  <td className="text-sm">
                    {duePendingApplicationData[0].due.amount} TK
                  </td>
                  <td className="text-sm">
                    {duePendingApplicationData[0].due.transactionID}
                  </td>
                  <td className="text-sm">
                    <p>Pending</p>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-x-1">
                      <Button
                        variant="filled"
                        color="indigo"
                        size="sm"
                        className="h-[30px] flex justify-center items-center"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          handleOpenDeleteModal(
                            duePendingApplicationData[0]._id,
                            'Due Application'
                          );
                        }}
                        variant="filled"
                        size="sm"
                        color="red"
                        className="h-[30px] flex justify-center items-center"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      {/* Equipment clearance  */}

      {equipmentPendingApplicationData?.[0] &&
        equipmentPendingApplicationData[0].appliedFor.includes('Equipment') && (
          <div className="overflow-x-auto styled-table">
            <table className="w-full">
              <caption className="text-2xl text-[#546e7a] my-2 font-semibold">
                Equipment Clearance Application
              </caption>
              {/* <!-- head --> */}
              <thead>
                <tr className="bg-[#546e7a] text-center text-white">
                  <th className="max-w-[50px]">Serial</th>
                  <th>Equipments</th>
                  <th>Receiver</th>
                  <th>Codes</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* <!-- row 1 --> */}

                <tr className="last:border-b-[2px] last:border-[#546e7a]">
                  <th className="max-w-[50px]">{1}</th>
                  <td>
                    {equipmentApplicationData.result[0].equipment.equipmentName.map(
                      (d, i) => (
                        <p key={i}>{d}</p>
                      )
                    )}
                  </td>
                  <td>
                    {equipmentApplicationData.result[0].equipment.equipmentReturnedTo.map(
                      (d, i) => (
                        <p key={i}>{d}</p>
                      )
                    )}
                  </td>
                  <td className="uppercase">
                    {equipmentApplicationData.result[0].equipment.returnedCode.map(
                      (d, i) => (
                        <p key={i}>{d}</p>
                      )
                    )}
                  </td>
                  <td>Pending</td>
                  <td>
                    <div className="flex items-center justify-center gap-x-1">
                      <Button
                        variant="filled"
                        color="indigo"
                        size="sm"
                        className="h-[30px] flex justify-center items-center"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          handleOpenDeleteModal(
                            equipmentApplicationData.result[0]._id,
                            'Equipment Application'
                          )
                        }
                        variant="filled"
                        size="sm"
                        color="red"
                        className="h-[30px] flex justify-center items-center"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      {/* hall faculty admin */}
      {othersPendingApplicationData.length > 0 && (
        <div className="overflow-x-auto styled-table">
          <table className="w-full">
            <caption className="text-2xl text-[#546e7a] my-2 font-semibold">
              Dept/Hall/Administrative Clearance Application
            </caption>
            {/* <!-- head --> */}
            <thead>
              <tr className="bg-[#546e7a] text-center text-white">
                <th className="max-w-[50px]">Serial</th>
                <th>Applied For</th>
                <th>Got</th>
                <th>Pending</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {othersPendingApplicationData.map((d, i) => (
                <tr
                  key={i}
                  className="last:border-b-[2px] last:border-[#546e7a]"
                >
                  <th className="max-w-[50px]">{i + 1}</th>
                  <td>{d.appliedFor}</td>

                  <td className="text-sm flex items-center justify-start">
                    <p className="inline-flex justify-center items-center gap-x-2">
                      {d.getClearanceSections.length}{' '}
                      {d.appliedFor.includes('Hall')
                        ? ' Halls'
                        : d.appliedFor.includes('Faculty')
                        ? ' Depts'
                        : ' Admin Sectors'}
                      <Tooltip
                        content={
                          d.getClearanceSections.length === 0
                            ? 'None'
                            : d.getClearanceSections.map(
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
                  <td>
                    <div className="flex items-center justify-center gap-x-1">
                      <Button
                        onClick={() =>
                          handleDeleteOthersApplication(d._id, d.appliedFor)
                        }
                        variant="filled"
                        size="sm"
                        color="red"
                        className="h-[30px] flex justify-center items-center"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openEditModal && editModalId && (
        <EditApplicationModal
          openEditModal={openEditModal}
          handleOpenEditModal={handleOpenEditModal}
        />
      )}
    </>
  );
};

export default AppliedForClearance;
