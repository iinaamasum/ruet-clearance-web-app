import { Button, Tooltip } from '@material-tailwind/react';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const ClearanceRejection = ({
  dueApplicationData,
  othersApplicationData,
  equipmentApplicationData,
}) => {
  let othersRejectedApplicationData = [];
  othersApplicationData?.result.forEach((d) => {
    if (d.status.isRejected) othersRejectedApplicationData.push(d);
  });

  const rejectedOthersClearance = othersRejectedApplicationData.map((d) => {
    if (d.status.isRejected) return true;
  });
  return (
    <>
      {/* due clearance */}
      {dueApplicationData.result?.[0] &&
        dueApplicationData.result[0].status.isRejected && (
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
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}

                <tr className="last:border-b-[2px] last:border-[#ef5350]">
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
                    {/* <div className="flex items-center justify-center gap-x-1">
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
                          handleOpenDeleteModal(
                            dueApplicationData.result[0]._id,
                            'Due Application'
                          );
                        }}
                        variant="filled"
                        size="sm"
                        color="red"
                        className="h-[30px] flex justify-center items-center"
                      >
                        Delete
                      </Button>
                    </div> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      {/* Equipment clearance  */}

      {equipmentApplicationData?.result[0] &&
        equipmentApplicationData.result[0].status.isRejected && (
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
                  <th>Codes</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* <!-- row 1 --> */}

                <tr className="last:border-b-[2px] last:border-[#ef5350]">
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
                    {/* <div className="flex items-center justify-center gap-x-1">
                      <Button
                        variant="filled"
                        color="indigo"
                        size="sm"
                        className="h-[30px] flex justify-center items-center"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          handleOpenDeleteModal(
                            equipmentApplicationData.result[0]._id,
                            'Equipment Application'
                          )
                        }
                        variant="filled"
                        size="sm"
                        color="red"
                        className="h-[30px] flex justify-center items-center"
                      >
                        Delete
                      </Button>
                    </div> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      {othersRejectedApplicationData.length > 0 && rejectedOthersClearance && (
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
                <th>Got</th>
                <th>Pending</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {othersRejectedApplicationData.map((d, i) => (
                <tr
                  key={i}
                  className="last:border-b-[2px] last:border-[#ef5350]"
                >
                  <th className="max-w-[50px]">{i + 1}</th>
                  <td>{d.appliedFor}</td>

                  <td className="text-sm flex items-center justify-start">
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
                  <td className="text-sm">
                    <p>
                      {d.totalSections}{' '}
                      {d.appliedFor.includes('Hall')
                        ? ' Halls'
                        : d.appliedFor.includes('Faculty')
                        ? ' Depts'
                        : ' Admin Sectors'}
                    </p>
                  </td>
                  <td>Congrats</td>
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
