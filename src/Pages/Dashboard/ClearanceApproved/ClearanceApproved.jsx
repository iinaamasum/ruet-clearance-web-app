import { Button, Tooltip } from '@material-tailwind/react';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const ClearanceApproved = ({
  dueApplicationData,
  othersApplicationData,
  equipmentApplicationData,
}) => {
  let othersApprovedApplicationData = [];
  othersApplicationData?.result.forEach((d) => {
    if (d.status.isApproved) othersApprovedApplicationData.push(d);
  });
  const approvedOthersClearance = othersApprovedApplicationData.map((d) => {
    if (d.status.isPending) return true;
  });

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
                  <th>Remarks</th>
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
                    <p>Approved</p>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-x-1">
                      Congrats 🎉
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
                  <th>Status</th>
                  <th>Remarks</th>
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
                  <td>Approved</td>
                  <td>
                    <div className="flex items-center justify-center gap-x-1">
                      Congrats 🎉
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      {othersApprovedApplicationData.length > 0 && approvedOthersClearance && (
        <div className="overflow-x-auto styled-table">
          <table className="w-full">
            <caption className="text-2xl text-[#009879] my-2 font-semibold">
              Dept/Hall/Administrative Clearance Application
            </caption>
            {/* <!-- head --> */}
            <thead>
              <tr className="bg-[#009879] text-center text-white">
                <th className="max-w-[50px]">Serial</th>
                <th>Applied For</th>
                <th>Approved</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {othersApprovedApplicationData.map((d, i) => (
                <tr
                  key={i}
                  className="last:border-b-[2px] last:border-[#009879]"
                >
                  <th className="max-w-[50px]">{i + 1}</th>
                  <td>{d.appliedFor}</td>

                  <td className="text-sm">
                    <p className="inline-flex justify-center items-center gap-x-2">
                      {d.getClearanceSections.length}{' '}
                      {d.appliedFor.includes('Hall')
                        ? ' Halls'
                        : d.appliedFor.includes('Faculty')
                        ? ' Depts'
                        : ' Admin Sectors'}
                      <Tooltip
                        content={
                          d.getClearanceSections.length === 0
                            ? 'None'
                            : d.getClearanceSections.map(
                                (dept, i, arr) =>
                                  `${dept}${i !== arr.length - 1 ? ', ' : ' '}`
                              )
                        }
                      >
                        <Button className="bg-transparent p-0 m-0 shadow-none">
                          <AiOutlineEye
                            as={Button}
                            size={22}
                            color="#109879"
                            className="font-bold cursor-pointer"
                          />
                        </Button>
                      </Tooltip>
                    </p>
                  </td>
                  <td>Congrats 🎉</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default ClearanceApproved;
