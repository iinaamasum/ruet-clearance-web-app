import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react';
import student from '../../assets/images/student.png';
import Home from './Home';
import './StudentHome.css';

const StudentHomeRightSide = () => {
  const data = [
    {
      label: 'Home',
      value: 'home',
      desc: `${Home}`,
    },
    {
      label: 'Applied',
      value: 'react',
      desc: `Because it's about motivating the doers. Because I'm here
        to follow my dreams and inspire other people to follow their dreams, too.`,
    },

    {
      label: 'Approved',
      value: 'vue',
      desc: `We're not always in the position that we want to be at.
        We're constantly growing. We're constantly making mistakes. We're 
        constantly trying to express ourselves and actualize our dreams.`,
    },

    {
      label: 'Rejected',
      value: 'angular',
      desc: `Because it's about motivating the doers. Because I'm here
        to follow my dreams and inspire other people to follow their dreams, too.`,
    },

    {
      label: 'Payment',
      value: 'svelte',
      desc: `We're not always in the position that we want to be at.
        We're constantly growing. We're constantly making mistakes. We're 
        constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <Tabs className="px-4 w-full" id="custom-animation" value="home">
      <div className="mt-5 mb-2 md:my-5">
        <Typography variant="h2" className="name__text__gradient">
          Welcome to RUET Clearance System
        </Typography>
        <Typography variant="h4" className="hidden md:block">
          Hello, <span className="text-orange-600">Md. Masum</span>{' '}
        </Typography>
      </div>
      <div className="mb-3 p-3 flex justify-between items-center md:hidden bg-secondaryWhite rounded-xl">
        <div className="">
          <Typography variant="h4" className="leading-8">
            Hello, <span className="text-orange-600">Md. Masum</span>{' '}
          </Typography>
          <Typography
            variant="paragraph"
            className="text-indigo-600 font-medium leading-5"
          >
            '19 Series
          </Typography>
          <Typography
            variant="paragraph"
            className="text-indigo-600 font-medium leading-5"
          >
            01864393548
          </Typography>
          <Typography
            variant="paragraph"
            className="text-indigo-600 font-medium leading-5"
          >
            iinaamasum@gmail.com
          </Typography>
        </div>
        <img className="w-24 h-24 rounded-full bg-white" src={student} alt="" />
      </div>
      <TabsHeader className="">
        {data.map(({ label, value }) => (
          <Tab className="text-[13px] xsm:text-base" key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        <TabPanel className="px-0 py-5" value="home">
          <Home />
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default StudentHomeRightSide;
