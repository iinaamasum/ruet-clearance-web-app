import React, { useState } from 'react';
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
    <div className="overflow-x-auto rounded-xl text-center py-2">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead className="border-b-2 text-center">
          <tr className="">
            <th className="text-semibold text-indigo-500">Serial</th>
            <th className="text-semibold text-indigo-500">Applied For</th>
            <th className="text-semibold text-indigo-500">Transaction</th>
            <th className="text-semibold text-indigo-500">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
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
                    style={{ height: '25px', minHeight: '20px' }}
                    className="btn px-3 text-[12px]"
                  >
                    Edit
                  </label>
                  <label
                    htmlFor="confirm-delete-modal"
                    style={{ height: '25px', minHeight: '20px' }}
                    className="btn px-3 text-[12px] bg-red-800 border-0  hover:bg-red-400"
                  >
                    Delete
                  </label>
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
      <div className="">
        <input
          type="checkbox"
          id="confirm-delete-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <label
              htmlFor="confirm-delete-modal"
              className="btn btn-sm btn-circle absolute right-2 top-3 lowercase"
            >
              x
            </label>
            <h3 className="font-bold text-lg text-red-500 mt-5">
              Confirm Deletion
            </h3>
            <p className="py-4">Are you sure to delete the application?</p>
            <div className="modal-action mt-2">
              <label
                htmlFor="confirm-delete-modal"
                style={{ height: '35px', minHeight: '35px' }}
                className="btn px-5 text-[12px]"
              >
                No
              </label>
              <label
                htmlFor="confirm-delete-modal"
                style={{ height: '35px', minHeight: '35px' }}
                className="btn px-5 text-[12px] bg-red-800 border-0  hover:bg-red-400"
              >
                Yes
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedForClearance;
