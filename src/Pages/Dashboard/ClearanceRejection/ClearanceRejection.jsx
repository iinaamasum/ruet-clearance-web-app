import { Button } from '@material-tailwind/react';
import React from 'react';
import toast from 'react-hot-toast';

const ClearanceRejection = ({
  dueApplicationData,
  othersApplicationData,
  equipmentApplicationData,
}) => {
  let othersRejectionApplicationData = [];
  othersApplicationData?.result.forEach((d) => {
    if (d.status.isRejected) othersRejectionApplicationData.push(d);
  });

  let dueRejectionApplicationData = [];
  dueApplicationData?.result.forEach((d) => {
    if (d.status.isRejected) dueRejectionApplicationData.push(d);
  });

  let equipmentRejectionApplicationData = [];
  equipmentApplicationData?.result.forEach((d) => {
    if (d.status.isRejected) equipmentRejectionApplicationData.push(d);
  });

  return (
    <>
      {/* due clearance */}
      {dueRejectionApplicationData?.[0] &&
        dueRejectionApplicationData[0].appliedFor.includes('Due') && (
          <div className="overflow-x-auto styled-table">
            <table className="w-full">
              <caption className="text-2xl text-[#ef5350] my-2 font-semibold">
                Due Clearance Rejection
              </caption>
              {/* <!-- head --> */}
              <thead>
                <tr className="bg-[#ef5350] text-center text-white">
                  <th className="max-w-[50px]">Serial</th>
                  <th>Due Reason</th>
                  <th>Amount</th>
                  <th>TransactionID</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {dueApplicationData?.result.map((data, i) => (
                  <tr className="last:border-b-[2px] last:border-[#ef5350]">
                    <th className="max-w-[50px]">{i + 1}</th>
                    <td>
                      {data.dueReason.map((d, i) => (
                        <p key={i} className="font-medium">
                          {d}
                        </p>
                      ))}
                    </td>
                    <td className="text-sm">{data.due.amount} TK</td>
                    <td className="text-sm">{data.due.transactionID}</td>
                    <td className="text-sm">
                      <p>Wrong Info</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* Equipment clearance  */}

      {equipmentRejectionApplicationData?.[0] &&
        equipmentRejectionApplicationData[0].appliedFor.includes(
          'Equipment'
        ) && (
          <div className="overflow-x-auto styled-table">
            <table className="w-full">
              <caption className="text-2xl text-[#ef5350] my-2 font-semibold">
                Equipment Clearance Rejection
              </caption>
              {/* <!-- head --> */}
              <thead>
                <tr className="bg-[#ef5350] text-center text-white">
                  <th className="max-w-[50px]">Serial</th>
                  <th>Equipments</th>
                  <th>Receiver</th>
                  <th>Rejection Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* <!-- row 1 --> */}
                {equipmentApplicationData.result.map((data, i) => (
                  <tr className="last:border-b-[2px] last:border-[#ef5350]">
                    <th className="max-w-[50px]">{i + 1}</th>
                    <td>
                      {data.equipment.equipmentName.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </td>
                    <td>
                      {data.equipment.equipmentReturnedTo.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </td>

                    <td>Left Equipments</td>
                    <td className="flex items-center justify-center">
                      <Button
                        onClick={() => {
                          toast('Under development');
                        }}
                        variant="filled"
                        size="sm"
                        color="red"
                        className="h-[30px] flex justify-center items-center"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {othersRejectionApplicationData.length > 0 && (
        <div className="overflow-x-auto styled-table">
          <table className="w-full">
            <caption className="text-2xl text-[#ef5350] my-2 font-semibold">
              Dept/Hall/Administrative Clearance Application
            </caption>
            {/* <!-- head --> */}
            <thead>
              <tr className="bg-[#ef5350] text-center text-white">
                <th className="max-w-[50px]">Serial</th>
                <th>Applied For</th>
                <th>Rejection Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {othersRejectionApplicationData.map((d, i) => (
                <tr
                  key={i}
                  className="last:border-b-[2px] last:border-[#ef5350]"
                >
                  <th className="max-w-[50px]">{i + 1}</th>
                  <td>{d.appliedFor}</td>

                  <td className="text-sm">
                    <p className="inline-flex justify-center items-center gap-x-2">
                      Wrong Info
                    </p>
                  </td>
                  <td className="flex items-center justify-center">
                    <Button
                      onClick={() => {
                        toast('Under development');
                      }}
                      variant="filled"
                      size="sm"
                      color="red"
                      className="h-[30px] flex justify-center items-center"
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ClearanceRejection;
