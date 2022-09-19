import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AlternativeNavbar from '../../Components/Shared/AlternativeNavbar';
import auth from '../../firebase.config';

const StudentProfileInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [faculty, setFaculty] = useState('');
  const [dept, setDept] = useState('');
  const allDept = {
    ECE: ['CSE', 'EEE', 'ECE', 'ETE'],
    CE: ['CE', 'Arch', 'URP', 'BECM'],
    ME: ['ME', 'IPE', 'GCE', 'MTE', 'MSE', 'CFPE'],
  };

  const [createUserWithEmailAndPassword, formUser, formLoading, formError] =
    useCreateUserWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
  };

  useEffect(() => {
    const currentUser = user || formUser;
    if (currentUser) {
      console.log(currentUser);
    }
  }, [user, formUser]);

  if (formError) {
    console.log(formError.message);
  }

  if (formLoading) {
    return <p>loading</p>;
  }
  return (
    <section className="overflow-hidden">
      <AlternativeNavbar>studentRegPage</AlternativeNavbar>
      <section className="flex justify-center pt-[80px] px-2">
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
              {/* confirm password section  */}
              <div className="mt-[24px] relative">
                <Input
                  label="Confirm Password"
                  size="lg"
                  autoComplete="off"
                  className="bg-secondaryWhite"
                  {...register('c_password', {
                    required: {
                      value: true,
                      message: '⚠ Confirm Password is required',
                    },
                    validate: (val) => {
                      const { password } = getValues();
                      if (password !== val) {
                        return '⚠ Your passwords do no match';
                      }
                    },
                  })}
                />
                <label className="text-xs flex absolute top-[44px] left-[3px]">
                  {errors.c_password?.type === 'required' && (
                    <span className="label-text-alt text-red-600">
                      {errors.c_password.message}
                    </span>
                  )}
                  {errors.c_password?.type === 'validate' && (
                    <span className="label-text-alt text-red-600">
                      {errors.c_password.message}
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
              className="mt-3 text-base md:text-lg py-2 capitalize tracking-wide"
            >
              Register
            </Button>
            <div className="">
              <Typography variant="small" className="flex justify-center">
                Forgot password?
                <Link
                  to="/reset-password"
                  className="ml-1 font-bold text-blue-600 hover:underline"
                >
                  Reset Password
                </Link>
              </Typography>
              <Typography variant="small" className="flex justify-center">
                Already have an account?
                <Link
                  to="/"
                  className="ml-1 font-bold text-blue-600 hover:underline"
                >
                  LogIn Now
                </Link>
              </Typography>
            </div>
          </CardBody>
        </Card>
      </section>
    </section>
  );
};

export default StudentProfileInfo;
