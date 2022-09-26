import React from 'react';

const ClearanceRejection = () => {
  const data = [
    {
      appliedFor: 'ECE Dept',
      due: {
        amount: 272,
        transactionID: 'AJ5454SAKJ',
      },
      status: {
        isApproved: true,
        isRejected: false,
        isPending: false,
        rejectionReason: {
          title: 'Wrong Info Provided',
          description:
            'You are guilty for not returning varsity materials. Return it then apply again.',
        },
      },
    },
    {
      appliedFor: 'CSE Dept',
      due: {
        amount: 72,
        transactionID: 'AJ544SAKJ',
      },
      status: {
        isApproved: true,
        isRejected: true,
        isPending: true,
        rejectionReason: {
          title: 'Wrong Info Provided',
          description:
            'You are guilty for not returning varsity materials. Return it then apply again.',
        },
      },
    },
    {
      appliedFor: 'EEE Dept',
      due: {
        amount: 22,
        transactionID: 'AJ5454SAKJ',
      },
      status: {
        isApproved: true,
        isRejected: true,
        isPending: true,
        rejectionReason: {
          title: 'Wrong Info Provided',
          description:
            'You are guilty for not returning varsity materials. Return it then apply again.',
        },
      },
    },
    {
      appliedFor: 'MSE Dept',
      due: {
        amount: 27,
        transactionID: 'A5454SAKJ',
      },
      status: {
        isApproved: true,
        isRejected: true,
        isPending: true,
        rejectionReason: {
          title: 'Wrong Info Provided',
          description:
            'You are guilty for not returning varsity materials. Return it then apply again.',
        },
      },
    },
  ];
  return (
    <div className="overflow-x-auto rounded-xl text-center py-2">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead className="border-b-2 text-center">
          <tr className="">
            <th className="text-semibold text-indigo-500">Serial</th>
            <th className="text-semibold text-indigo-500">Applied For</th>
            <th className="text-semibold text-indigo-500">Transaction</th>
            <th className="text-semibold text-indigo-500">Reason</th>
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
                <label
                  htmlFor="rejection-details-modal"
                  style={{ height: '25px', minHeight: '20px' }}
                  className="btn px-3 text-[12px] bg-red-800 border-0  hover:bg-red-400"
                >
                  Details
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
        <input
          type="checkbox"
          id="rejection-details-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <label
              htmlFor="rejection-details-modal"
              className="btn btn-sm btn-circle absolute right-2 top-3 lowercase"
            >
              x
            </label>
            <h3 className="font-bold text-lg mt-5">
              Congratulations random Internet user!
            </h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
            <div className="modal-action mt-2">
              <label
                htmlFor="rejection-details-modal"
                style={{ height: '35px', minHeight: '35px' }}
                className="btn px-5 text-[12px]"
              >
                Close
              </label>
              {/* <label
                htmlFor="rejection-details-modal"
                style={{ height: '35px', minHeight: '35px' }}
                className="btn px-5 text-[12px] bg-red-800 border-0  hover:bg-red-400"
              >
                Yes
              </label> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearanceRejection;
