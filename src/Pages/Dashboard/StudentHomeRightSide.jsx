import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react';
import './StudentHome.css';

const StudentHomeRightSide = () => {
  const data = [
    {
      label: 'Home',
      value: 'home',
      desc: `It really matters and then like it really doesn't matter.
        What matters is the people who are sparked by it. And the people 
        who are like offended by it, it doesn't matter.`,
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
    <Tabs className="" id="custom-animation" value="home">
      <div className="my-5">
        <Typography variant="h2" className="name__text__gradient">
          Welcome to RUET Clearance System
        </Typography>
        <Typography variant="h4">
          Hello, <span className="text-orange-600">Md. Masum</span>{' '}
        </Typography>
      </div>
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
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
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default StudentHomeRightSide;
