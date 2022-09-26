import { Button } from '@material-tailwind/react';
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
                  >
                    <Button size="sm" color="blue" className="px-2 py-1">
                      Edit
                    </Button>
                  </label>
                  <Button color="red" className="px-2 py-1" size="sm">
                    delete
                  </Button>
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
