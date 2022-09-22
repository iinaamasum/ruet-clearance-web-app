import { Button } from '@material-tailwind/react';
import React from 'react';
import swal from 'sweetalert';

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
    <div className="overflow-x-auto bg-secondaryWhite rounded-xl text-center py-2">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead className="border-b-2">
          <tr className="">
            <th className="text-semibold text-indigo-500">Serial</th>
            <th className="text-semibold text-indigo-500">Applied For</th>
            <th className="text-semibold text-indigo-500">Transaction</th>
            <th className="text-semibold text-indigo-500">Reason</th>
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
                <Button
                  onClick={() => {
                    console.log();
                    swal({
                      title: `${d.status?.rejectionReason?.title}`,
                      text: `${d.status?.rejectionReason?.description}`,
                      icon: 'error',
                      button: true,
                      dangerMode: true,
                    });
                  }}
                  size="sm"
                  color="red"
                  className=""
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClearanceRejection;
