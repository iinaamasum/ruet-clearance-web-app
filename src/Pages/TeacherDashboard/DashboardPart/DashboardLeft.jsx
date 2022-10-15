import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { GoSearch } from 'react-icons/go';

const DashboardLeft = ({
  faculty,
  setFaculty,
  setDept,
  onSubmit,
  setApplicationType,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const allDept = {
    ECE: ['CSE', 'EEE', 'ECE', 'ETE'],
    CE: ['CE', 'Arch', 'URP', 'BECM'],
    ME: ['ME', 'IPE', 'GCE', 'MTE', 'MSE', 'CFPE'],
  };
  return (
    <div>
      <div className="mt-3 block lg:hidden my-3 md:mb-10">
        <Typography variant="h2" className="text-center leading-9">
          Welcome to RUET Clearance System
        </Typography>
      </div>
      <form
        id="application-data"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 lg:mt-0"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-5">
          {/* faculty section  */}
          <div className="relative">
            <Select
              onChange={(val) => {
                setFaculty(val);
              }}
              size="lg"
              label="Select Faculty"
            >
              <Option value="Electrical & Computer Engineering">
                Electrical & Computer Engineering
              </Option>
              <Option value="Civil Engineering">Civil Engineering</Option>
              <Option value="Mechanical Engineering">
                Mechanical Engineering
              </Option>
            </Select>
          </div>
          {/* dept selection section  */}

          <div className="mt-[24px] sm:mt-0 lg:mt-[24px] relative">
            <Select
              onChange={(val) => {
                setDept(val);
              }}
              size="lg"
              label="Select Dept"
            >
              {faculty === 'Electrical & Computer Engineering' ? (
                allDept.ECE.map((d) => (
                  <Option key={d} value={d}>
                    {d}
                  </Option>
                ))
              ) : faculty === 'Mechanical Engineering' ? (
                allDept.ME.map((d) => (
                  <Option key={d} value={d}>
                    {d}
                  </Option>
                ))
              ) : faculty === 'Civil Engineering' ? (
                allDept.CE.map((d) => (
                  <Option key={d} value={d}>
                    {d}
                  </Option>
                ))
              ) : (
                <Option value={null}>Please select the faculty first</Option>
              )}
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-5">
          {/* series input section  */}
          <div className="mt-[24px]">
            <Select
              onChange={(val) => {
                setApplicationType(val);
              }}
              size="lg"
              label="Select Clearance Options"
            >
              <Option value="Due Clearance">Due Clearance Application</Option>
              <Option value="Equipments Clearance">
                Equipments Clearance Application
              </Option>
              <Option value="Hall, Faculty & Admin Clearance">
                Hall, Faculty & Admin Clearance Application
              </Option>
            </Select>
          </div>
          <div className="mt-[24px] relative">
            <Input
              label="Series (Example 19)"
              size="lg"
              type="number"
              className="bg-secondaryWhite"
              {...register('series', {
                required: {
                  value: true,
                  message: '⚠ Series is required',
                },
                pattern: {
                  value: /^[0-9]{2}$/i,
                  message: '⚠ Invalid series. Series example "19", "20", "18"',
                },
              })}
            />
            <label className="text-xs flex absolute top-[44px] left-[3px]">
              {errors.series?.type === 'required' && (
                <span className="label-text-alt text-red-600">
                  {errors.series.message}
                </span>
              )}
              {errors.series?.type === 'pattern' && (
                <span className="label-text-alt text-red-600">
                  {errors.series.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <div className="mt-[24px] w-full text-center">
          <Button
            form="application-data"
            type="submit"
            variant="gradient"
            color="blue"
            className="text-base md:text-lg py-2 capitalize tracking-wide w-full max-w-[450px]"
          >
            Submit
          </Button>
        </div>
      </form>
      <div className="flex justify-between items-center my-3 w-[90%] mx-auto">
        <div className="border-b-2 border-gray-500 w-full"></div>
        <p className="mx-auto text-center text-gray-500 font-semibold px-2">
          OR
        </p>
        <div className="border-b-2 border-gray-500 w-full"></div>
      </div>
      {/* Roll input section  */}
      <div className="mt-[24px] flex items-center justify-center w-full">
        <div className="w-[450px]">
          <Input
            label="Search By Student Roll"
            icon={<GoSearch />}
            size="lg"
            type="number"
            className="bg-secondaryWhite w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLeft;
