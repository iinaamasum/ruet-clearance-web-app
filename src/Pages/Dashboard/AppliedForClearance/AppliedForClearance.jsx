import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import EditApplicationModal from './EditApplicationModal';

const AppliedForClearance = ({
  dueApplicationData,
  dueApplicationRefetch,
  equipmentApplicationData,
  equipmentApplicationRefetch,
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
            `http://localhost:5001/api/v1/student/${delApplyFor}/${deletionId}`
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

  const data = [
    {
      appliedFor: 'ECE Dept',
      due: {
        amount: 272,
        transactionID: 'AJ5454SAKJ',
      },
      status: {
        isApproved: false,
        isRejected: false,
        isPending: true,
        rejectionReason: '',
      },
    },
    {
      appliedFor: 'CSE Dept',
      due: {
        amount: 72,
        transactionID: 'AJ544SAKJ',
      },
      status: {
        isApproved: false,
        isRejected: false,
        isPending: true,
        rejectionReason: '',
      },
    },
  ];
  return (
    <>
      {/* due clearance */}
      {dueApplicationData.result?.[0] &&
        dueApplicationData.result[0].status.isPending && (
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
                    {dueApplicationData.result[0].dueReason.map((d, i) => (
                      <p key={i} className="font-medium">
                        {d}
                      </p>
                    ))}
                  </td>
                  <td className="text-sm">
                    {dueApplicationData.result[0].due.amount} TK
                  </td>
                  <td className="text-sm">
                    {dueApplicationData.result[0].due.transactionID}
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
                            dueApplicationData.result[0]._id,
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

      {equipmentApplicationData?.result[0] &&
        equipmentApplicationData.result[0].status.isPending && (
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
      <div className="overflow-x-auto styled-table">
        <table className="w-full">
          <caption className="text-2xl text-[#546e7a] my-2 font-semibold">
            Dept/Hall/Administrative Clearance Application
          </caption>
          {/* <!-- head --> */}
          <thead>
            <tr className="bg-[#546e7a] text-center text-white">
              <th className="max-w-[50px]">Serial</th>
              <th>Applied</th>
              <th>Transaction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {data.map((d, i) => (
              <tr key={i} className="last:border-b-[2px] last:border-[#546e7a]">
                <th className="max-w-[50px]">{i + 1}</th>
                <td>{d.appliedFor}</td>
                <td className="text-sm">
                  <p>Paid: {d.due.amount}</p>
                  <p>TrxID: {d.due.transactionID}</p>
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
