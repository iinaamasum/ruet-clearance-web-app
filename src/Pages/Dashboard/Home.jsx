import { Button, Card, Tooltip, Typography } from '@material-tailwind/react';

const Home = () => {
  const allDept = [
    {
      department: 'CSE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'EEE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'ECE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'ETE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'CE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'Arch',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'URP',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'BECM',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'ME',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'IPE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'GCE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'MTE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'MSE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      department: 'CFPE',
      rejection: false,
      approved: false,
      applied: false,
    },
  ];

  const allHall = [
    {
      hallName: 'Deshratna Sheikh Hasina Hall',
      rejection: false,
      approved: false,
      applied: false,
    },

    {
      hallName: 'Bangabandhu Sheikh Mujibur Rahman Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Shahid Lt. Selim Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Shahid Shahidul Islam Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Shahid President Ziaur Rahman Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Shahid Abdul Hamid Hall',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      hallName: 'Tin Shed Hall (Extension)',
      rejection: false,
      approved: false,
      applied: false,
    },
  ];

  return (
    <>
      <Card className="w-full px-4 py-2">
        <Typography variant="h4" className="my-3">
          Request for Faculty Clearance
        </Typography>
        <div className="flex justify-start flex-wrap gap-x-3 gap-y-2">
          {allDept.map((dept, i) => (
            <Tooltip key={i} content={`Click to Apply for ${dept.department}`}>
              <Button
                color={`${
                  i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'red' : 'green'
                }`}
              >
                {dept.department}
              </Button>
            </Tooltip>
          ))}
        </div>
      </Card>
      <Card className="w-full px-4 py-2 my-5">
        <Typography variant="h4" className="my-3">
          Request for Faculty Clearance
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
          {allHall.map((hall, i) => (
            <Tooltip key={i} content={`Click to Apply for ${hall.hallName}`}>
              <Button
                color={`${
                  i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'red' : 'green'
                }`}
                className="px-2"
              >
                {hall.hallName}
              </Button>
            </Tooltip>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Home;
