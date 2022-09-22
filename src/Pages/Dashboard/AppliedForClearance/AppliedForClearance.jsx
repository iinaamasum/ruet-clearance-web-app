import React from 'react';
import { GoTrashcan } from 'react-icons/go';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';

const AppliedForClearance = () => {
  const data = [
    {
      appliedFor: 'ECE Dept',
      status: {
        paid: 272,
        transactionID: 'AJ5454SAKJ',
      },
    },
    {
      appliedFor: 'CSE Dept',
      status: {
        paid: 72,
        transactionID: 'AJ544SAKJ',
      },
    },
    {
      appliedFor: 'EEE Dept',
      status: {
        paid: 22,
        transactionID: 'AJ5454SAKJ',
      },
    },
    {
      appliedFor: 'MSE Dept',
      status: {
        paid: 27,
        transactionID: 'A5454SAKJ',
      },
    },
  ];
  return (
    <div className="overflow-x-auto bg-secondaryWhite rounded-xl text-center py-2">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead className="border-b-2">
          <tr className="">
            <th className="text-semibold text-indigo-500">Serial</th>
            <th className="text-semibold text-indigo-500">Applied For</th>
            <th className="text-semibold text-indigo-500">Status</th>
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
                <p>Paid: {d.status.paid}</p>
                <p>TrxID: {d.status.transactionID}</p>
              </td>
              <td>
                <div className="flex items-center justify-center gap-x-1">
                  <MdOutlinePublishedWithChanges
                    size={33}
                    color="green"
                    className="text-bold cursor-pointer hover:bg-[#dddeee] p-1 rounded-full"
                  />
                  <GoTrashcan
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
    </div>
  );
};

export default AppliedForClearance;
