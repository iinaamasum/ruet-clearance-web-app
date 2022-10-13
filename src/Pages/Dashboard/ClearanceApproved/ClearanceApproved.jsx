import { Button } from '@material-tailwind/react';
import React from 'react';

const ClearanceApproved = ({
  dueApplicationData,
  dueApplicationRefetch,
  equipmentApplicationData,
  equipmentApplicationRefetch,
}) => {
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
        isApproved: true,
        isRejected: false,
        isPending: false,
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
        isApproved: true,
        isRejected: false,
        isPending: false,
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
        isApproved: true,
        isRejected: false,
        isPending: false,
        rejectionReason: '',
      },
    },
  ];
  return (
    <>
      {/* due clearance  */}
      {dueApplicationData.result?.[0] &&
        dueApplicationData.result[0].status.isApproved && (
          <div className="overflow-x-auto styled-table">
            <table className="w-full">
              <caption className="text-2xl my-2 font-semibold">
                Due Clearance Approved
              </caption>
              {/* <!-- head --> */}
              <thead>
                <tr className="bg-[#009879] text-center text-white">
                  <th className="max-w-[50px]">Serial</th>
                  <th>Due Reason</th>
                  <th>Amount</th>
                  <th>TransactionID</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}

                <tr className="last:border-b-[2px] last:border-[#009879]">
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
                      congrats
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      {/* Equipment clearance  */}
      {equipmentApplicationData?.result[0] &&
        equipmentApplicationData.result[0].status.isApproved && (
          <div className="overflow-x-auto styled-table">
            <table className="w-full">
              <caption className="text-2xl my-2 font-semibold">
                Equipment Clearance Approved
              </caption>
              {/* <!-- head --> */}
              <thead>
                <tr className="bg-[#009879] text-center text-white">
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

                <tr className="last:border-b-[2px] last:border-[#009879]">
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
                      congrats
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
            Dept/Hall/Administrative Clearance Approved
          </caption>
          {/* <!-- head --> */}
          <thead>
            <tr className="bg-[#009879] text-center text-white">
              <th className="max-w-[50px]">Serial</th>
              <th>Applied For</th>
              <th>Transaction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {data.map((d, i) => (
              <tr key={i} className="last:border-b-[2px] last:border-[#009879]">
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
    </>
  );
};
export default ClearanceApproved;
