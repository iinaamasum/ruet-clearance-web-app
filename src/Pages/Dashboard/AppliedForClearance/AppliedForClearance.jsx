import { Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import LoadingComponent from '../../../Components/Shared/LoadingComponent';
import auth from '../../../firebase.config';
import EditApplicationModal from './EditApplicationModal';

const AppliedForClearance = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [user, userLoading] = useAuthState(auth);
  const [deleteModalId, setDeleteModalId] = useState('');
  const [editModalId, setEditModalId] = useState('');

  const {
    data: dueApplicationData,
    isLoading: isLoadingDue,
    isError: isErrorDue,
  } = useQuery(['dueApplicationData', user], async () => {
    return await axios
      .get(
        `http://localhost:5001/api/v1/student/due-clearance-apply?email=${user.email}`
      )
      .then((res) => res.data.result[0]);
  });

  const {
    data: equipmentApplicationData,
    isLoading: isLoadingEquipment,
    isError: isErrorEquipment,
  } = useQuery(['equipmentApplicationData', user], async () => {
    return await axios
      .get(
        `http://localhost:5001/api/v1/student/equipment-clearance-apply?email=${user.email}`
      )
      .then((res) => res.data.result[0]);
  });

  if (isLoadingDue || userLoading || isLoadingEquipment) {
    return <LoadingComponent />;
  }
  if (isErrorDue || isErrorEquipment) {
    toast.error('Error Occurred. Please check internet. ' + isErrorDue.message);
  }

  const {
    due,
    dueReason,
    status: dueStatus,
    _id: dueDataId,
  } = dueApplicationData;
  const { equipmentName, equipmentReturnedTo, returnedCode } =
    equipmentApplicationData.equipment;
  const { status: equipmentStatus } = equipmentApplicationData;

  const handleOpenEditModal = () => setOpenEditModal(!openEditModal);
  const handleOpenDeleteModal = (deletionId) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success',
          button: 'Close',
        });
      } else {
        swal('Your imaginary file is safe!', {
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
      {dueStatus.isPending && (
        <div className="overflow-x-auto styled-table">
          <table className="w-full">
            <caption className="text-2xl my-2 font-semibold">
              Due Clearance Application
            </caption>
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th className="max-w-[50px]">Serial</th>
                <th>Due Reason</th>
                <th>Transaction</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}

              <tr>
                <th className="max-w-[50px]">1</th>
                <td>
                  {dueReason.map((d, i) => (
                    <p key={i} className="font-medium">
                      {d}
                    </p>
                  ))}
                </td>
                <td className="text-sm">
                  <p>Paid: {due.amount}</p>
                  <p>TrxID: {due.transactionID}</p>
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
                        handleOpenDeleteModal(dueDataId);
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
      {equipmentStatus.isPending && (
        <div className="overflow-x-auto styled-table">
          <table className="w-full">
            <caption className="text-2xl my-2 font-semibold">
              Equipment Clearance Application
            </caption>
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th className="max-w-[50px]">Serial</th>
                <th>Equipments</th>
                <th>Receiver</th>
                <th>Codes</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}

              <tr>
                <th className="max-w-[50px]">{1}</th>
                <td>
                  {equipmentName.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
                </td>
                <td>
                  {equipmentReturnedTo.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
                </td>
                <td>
                  {returnedCode.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
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
          <caption className="text-2xl my-2 font-semibold">
            Dept/Hall/Administrative Clearance Application
          </caption>
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="max-w-[50px]">Serial</th>
              <th>Applied For</th>
              <th>Transaction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {data.map((d, i) => (
              <tr key={i}>
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
