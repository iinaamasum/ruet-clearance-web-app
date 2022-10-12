import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AlternativeNavbar from '../../Components/Shared/AlternativeNavbar';
import LoadingComponent from '../../Components/Shared/LoadingComponent';
import MotionDiv from '../../Components/Shared/MotionDiv';
import auth from '../../firebase.config';

const TeacherProfileInfo = () => {
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
  const [user, userLoading] = useAuthState(auth);
  const [userExists, setUserExists] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      async function userFetch() {
        const userFound = await axios
          .get(
            `http://localhost:5001/api/v1/teacher/profile-info?email=${user.email}`
          )
          .then((res) => res.data);

        if (userFound.status === 'success') {
          navigate('/teacher-dashboard');
        }
      }

      userFetch();
    }
  }, [user, navigate, userExists]);

  if (userLoading) {
    return <LoadingComponent />;
  }

  const onSubmit = async (data) => {
    if (!faculty || !dept) {
      toast.error('Please select faculty and dept');
      return;
    }
    const userInfo = {
      ...data,
      faculty,
      dept,
      email: user.email,
    };
    try {
      const postTeacherInfo = await axios
        .post('http://localhost:5001/api/v1/teacher/profile-info', userInfo)
        .then((res) => res.data);
      if (postTeacherInfo.error.keyValue) {
        toast.error(
          JSON.stringify(postTeacherInfo.error.keyValue) +
            ' is already registered.'
        );
      } else setUserExists(postTeacherInfo);
    } catch (error) {
      console.log(error);
      toast.error(
        JSON.stringify(error.error.keyValue) + ' is already registered.'
      );
    }
  };

  console.log(userExists);

  return (
    <>
      <AlternativeNavbar>updateProfilePage</AlternativeNavbar>
      <MotionDiv>
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
                id="teacher-profile-info"
                onSubmit={handleSubmit(onSubmit)}
                className=""
              >
                {/* Name input section  */}
                <div className="relative">
                  <Input
                    label="Full Name"
                    size="lg"
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
                {/* Contact number input section  */}
                <div className="mt-[24px] relative">
                  <Input
                    label="Contact Number"
                    size="lg"
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
                form="teacher-profile-info"
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
      </MotionDiv>
    </>
  );
};
export default TeacherProfileInfo;
