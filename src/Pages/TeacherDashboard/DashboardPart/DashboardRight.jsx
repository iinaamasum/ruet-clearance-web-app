import { Typography } from '@material-tailwind/react';
import React from 'react';
import DueApplicationsTable from '../ApplicationsTable/DueApplicationsTable';
import EquipmentApplicationsTable from '../ApplicationsTable/EquipmentApplicationsTable';
import OthersApplicationsTable from '../ApplicationsTable/OthersApplicationsTable';

const DashboardRight = ({
  filteredApplicationsData,
  refetchFilterApplicationsData,
  applicationType,
}) => {
  console.log(applicationType, filteredApplicationsData);
  console.log(filteredApplicationsData?.result[0]?.appliedFor.includes('hall'));
  return (
    <section>
      <div className="mt-3 hidden lg:block mb-2 md:my-3">
        <Typography variant="h2" className="text-center leading-9">
          Welcome to RUET Clearance System
        </Typography>
      </div>
      {applicationType.includes('Due') &&
        filteredApplicationsData?.result.length > 0 &&
        filteredApplicationsData?.result[0]?.appliedFor.includes('Due') && (
          <DueApplicationsTable
            applicationType={applicationType}
            filteredApplicationsData={filteredApplicationsData}
            refetchFilterApplicationsData={refetchFilterApplicationsData}
          />
        )}
      {applicationType.includes('Equipment') &&
        filteredApplicationsData?.result.length > 0 &&
        filteredApplicationsData?.result[0]?.appliedFor.includes(
          'Equipment'
        ) && (
          <EquipmentApplicationsTable
            applicationType={applicationType}
            filteredApplicationsData={filteredApplicationsData}
            refetchFilterApplicationsData={refetchFilterApplicationsData}
          />
        )}
      {applicationType.includes('Hall') &&
        filteredApplicationsData?.result.length > 0 &&
        (filteredApplicationsData?.result[0]?.appliedFor.includes('Hall') ||
          filteredApplicationsData?.result[0]?.appliedFor.includes('Admin') ||
          filteredApplicationsData?.result[0]?.appliedFor.includes(
            'Faculty'
          )) && (
          <OthersApplicationsTable
            applicationType={applicationType}
            filteredApplicationsData={filteredApplicationsData}
            refetchFilterApplicationsData={refetchFilterApplicationsData}
          />
        )}
    </section>
  );
};

export default DashboardRight;
