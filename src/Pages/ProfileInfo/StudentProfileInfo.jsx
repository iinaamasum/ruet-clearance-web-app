import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import AlternativeNavbar from '../../Components/Shared/AlternativeNavbar';
import auth from '../../firebase.config';

const StudentProfileInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [faculty, setFaculty] = useState('');
  const [dept, setDept] = useState('');
  const allDept = {
    ECE: ['CSE', 'EEE', 'ECE', 'ETE'],
    CE: ['CE', 'Arch', 'URP', 'BECM'],
    ME: ['ME', 'IPE', 'GCE', 'MTE', 'MSE', 'CFPE'],
  };
  const [user] = useAuthState(auth);

  const onSubmit = (data) => {
    const userInfo = {
      ...data,
      faculty,
      dept,
      email: user.email,
    };
    alert(JSON.stringify(userInfo));
  };

  return (
    <section className="overflow-hidden">
      <AlternativeNavbar>updateProfilePage</AlternativeNavbar>
      <section className="flex justify-center pb-[20px] pt-[100px] md:pt-[115px] px-2">
        <Card className="w-full md:w-[800px] md:px-[32px]">
          <CardBody className="flex flex-col gap-4 w-full md:w-[80%] mx-auto">
            <Typography
              variant="h2"
              color="initial"
              className="text-center my-2 md:my-4"
            >
              Profile Info
            </Typography>
            <form
              id="register-student"
              onSubmit={handleSubmit(onSubmit)}
              className=""
            >
              {/* Name input section  */}
              <div className="relative">
                <Input
                  label="Full Name"
                  size="lg"
                  autoComplete="off"
                  className="bg-secondaryWhite"
                  {...register('name', {
                    required: {
                      value: true,
                      message: '⚠ Please provide your name.',
                    },
                  })}
                />
                <label className="text-xs flex absolute top-[44px] left-[3px]">
                  {errors.name?.type === 'required' && (
                    <span className="label-text-alt text-red-600">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
              {/* dept selection section  */}
              <div className="mt-[24px] relative">
                <Select
                  onChange={(val) => {
                    setFaculty(val);
                    console.log(val);
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
              <div className="mt-[24px] relative">
                <Select
                  onChange={(val) => {
                    setDept(val);
                    console.log(val);
                  }}
                  size="lg"
                  label="Select Dept"
                >
                  {faculty === 'Electrical & Computer Engineering' ? (
                    allDept.ECE.map((d) => <Option value={d}>{d}</Option>)
                  ) : faculty === 'Mechanical Engineering' ? (
                    allDept.ME.map((d) => <Option value={d}>{d}</Option>)
                  ) : faculty === 'Civil Engineering' ? (
                    allDept.CE.map((d) => <Option value={d}>{d}</Option>)
                  ) : (
                    <Option value={null}>
                      Please select the faculty first
                    </Option>
                  )}
                </Select>
              </div>
              {/* series input section  */}
              <div className="mt-[24px] relative">
                <Input
                  label="Series (Example 19)"
                  size="lg"
                  autoComplete="off"
                  type="number"
                  className="bg-secondaryWhite"
                  {...register('series', {
                    required: {
                      value: true,
                      message: '⚠ Series is required',
                    },
                    pattern: {
                      value: /^[0-9]{2}$/i,
                      message:
                        '⚠ Invalid series. Series example "19", "20", "18"',
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
              {/* Roll input section  */}
              <div className="mt-[24px] relative">
                <Input
                  label="Student Roll"
                  size="lg"
                  autoComplete="off"
                  type="number"
                  className="bg-secondaryWhite"
                  {...register('roll', {
                    required: {
                      value: true,
                      message: '⚠ Roll number is required',
                    },
                    pattern: {
                      value: /^[0-9]{6,7}$/i,
                      message: '⚠ Invalid Roll Number Provided',
                    },
                  })}
                />
                <label className="text-xs flex absolute top-[44px] left-[3px]">
                  {errors.roll?.type === 'required' && (
                    <span className="label-text-alt text-red-600">
                      {errors.roll.message}
                    </span>
                  )}
                  {errors.roll?.type === 'pattern' && (
                    <span className="label-text-alt text-red-600">
                      {errors.roll.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Contact number input section  */}
              <div className="mt-[24px] relative">
                <Input
                  label="Contact Number"
                  size="lg"
                  autoComplete="off"
                  type="number"
                  className="bg-secondaryWhite"
                  {...register('contact_number', {
                    required: {
                      value: true,
                      message: '⚠ Contact number is required',
                    },
                    pattern: {
                      value: /^[0-9]{11}$/i,
                      message: '⚠ Provide 11 digits cell number',
                    },
                  })}
                />
                <label className="text-xs flex absolute top-[44px] left-[3px]">
                  {errors.contact_number?.type === 'required' && (
                    <span className="label-text-alt text-red-600">
                      {errors.contact_number.message}
                    </span>
                  )}
                  {errors.contact_number?.type === 'pattern' && (
                    <span className="label-text-alt text-red-600">
                      {errors.contact_number.message}
                    </span>
                  )}
                </label>
              </div>
            </form>
            <Button
              form="register-student"
              type="submit"
              variant="gradient"
              style={{
                background: '#263238e8',
              }}
              className="mt-3 text-base md:text-lg py-2 capitalize tracking-wide mb-4"
            >
              Update Info
            </Button>
          </CardBody>
        </Card>
      </section>
    </section>
  );
};

export default StudentProfileInfo;
