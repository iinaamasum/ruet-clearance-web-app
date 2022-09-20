import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react';
import ruetGate from '../../assets/images/ruet-main-gate.jpg';
import NavBar from '../../Components/Shared/NavBar';

const StudentHome = () => {
  const data = [
    {
      label: 'Home',
      value: 'html',
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: 'In Progress',
      value: 'react',
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },

    {
      label: 'Got Clearance',
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
    <section className="">
      <NavBar />
      <Tabs
        id="custom-animation"
        value="html"
        className="flex max-w-[1200px] mx-auto"
      >
        <TabsHeader
          style={{
            boxShadow: 'rgb(228 232 247 / 60%) 5px 0px 80px',
          }}
          className="flex-col w-[400px] min-h-screen pt-[80px]"
        >
          <div className="w-full text-center mb-10">
            <img
              className="w-[400px] rounded-lg"
              src={ruetGate}
              alt="ruet-main-gate"
            />
            <Typography variant="h5">
              Welcome to RUET Clearance System.
            </Typography>
            <Typography variant="p" color="initial">
              Want to visit our official site?{' '}
              <a
                href="https://www.ruet.ac.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Click here
              </a>
            </Typography>
          </div>

          <Typography variant="h5" className="text-center mb-3">
            Dashboard
          </Typography>
          {data.map(({ label, value }) => (
            <Tab className="" key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
          className="pt-[80px]"
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </section>
  );
};

export default StudentHome;
