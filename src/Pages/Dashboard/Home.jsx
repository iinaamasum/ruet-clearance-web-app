import { Button, Card, Tooltip, Typography } from '@material-tailwind/react';

const Home = () => {
  const allDept = [
    {
      val: 'CSE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'EEE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'ECE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'ETE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'CE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'Arch',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'URP',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'BECM',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'ME',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'IPE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'GCE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'MTE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'MSE',
      rejection: false,
      approved: false,
      applied: false,
    },
    {
      val: 'CFPE',
      rejection: false,
      approved: false,
      applied: false,
    },
  ];
  return (
    <Card className="w-full px-4 py-2">
      <Typography variant="h4" className="my-3">
        Request for Faculty Clearance
      </Typography>
      <div className="flex justify-start flex-wrap gap-x-3 gap-y-2">
        {allDept.map((dept, i) => (
          <Tooltip key={i} content={`Click to Apply for ${dept.val}`}>
            <Button
              color={`${i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'red' : 'green'}`}
            >
              {dept.val}
            </Button>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
};

export default Home;
