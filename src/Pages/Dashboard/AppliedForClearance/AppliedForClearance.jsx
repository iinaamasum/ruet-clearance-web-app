import React, { useState } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';
import swal from 'sweetalert';
import EditApplicationModal from '../Modals/EditApplicationModal';

const AppliedForClearance = () => {
  const [editModal, setEditModal] = useState(false);
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
    {
      appliedFor: 'EEE Dept',
      due: {
        amount: 22,
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
      appliedFor: 'MSE Dept',
      due: {
        amount: 27,
        transactionID: 'A5454SAKJ',
      },
      status: {
        isApproved: false,
        isRejected: false,
        isPending: true,
        rejectionReason: '',
      },
    },
  ];

  const handleDeleteApplication = () => {
    setTimeout(async () => {
      await console.log('object');
    }, 2000);
  };
  return (
    <div className="overflow-x-auto bg-secondaryWhite rounded-xl text-center py-2">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead className="border-b-2">
          <tr className="">
            <th className="text-semibold text-indigo-500">Serial</th>
            <th className="text-semibold text-indigo-500">Applied For</th>
            <th className="text-semibold text-indigo-500">Transaction</th>
            <th className="text-semibold text-indigo-500">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {/* <!-- row 1 --> */}
          {data.map((d, i) => (
            <tr key={i} className="border-t-[1px]">
              <th>{i + 1}</th>
              <td>{d.appliedFor}</td>
              <td className="text-sm">
                <p>Paid: {d.due.amount}</p>
                <p>TrxID: {d.due.transactionID}</p>
              </td>
              <td>
                <div className="flex items-center justify-center gap-x-1">
                  <label
                    htmlFor="edit-application-modal"
                    onClick={() => setEditModal(!editModal)}
                  >
                    <MdOutlinePublishedWithChanges
                      size={33}
                      color="green"
                      className="text-bold cursor-pointer hover:bg-[#dddeee] p-1 rounded-full"
                    />
                  </label>
                  <GoTrashcan
                    onClick={() => {
                      swal({
                        title: 'Are you sure?',
                        text: 'Once deleted, you will not be able to recover this application!',
                        icon: 'warning',
                        buttons: true,
                        dangerMode: true,
                      }).then(async (willDelete) => {
                        if (willDelete) {
                          const result = await handleDeleteApplication();
                          swal('Your application is successfully deleted!', {
                            icon: 'success',
                          });
                        } else {
                          swal('Deletion process canceled by the user', {
                            icon: 'error',
                          });
                        }
                      });
                    }}
                    size={33}
                    color="red"
                    className="text-bold cursor-pointer hover:bg-[#dddeee] p-1 rounded-full"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editModal && (
        <EditApplicationModal
          editModal={editModal}
          setEditModal={setEditModal}
        />
      )}
    </div>
  );
};

export default AppliedForClearance;
