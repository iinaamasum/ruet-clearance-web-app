import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useEffect } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import AlternativeNavbar from '../../Components/Shared/AlternativeNavbar';
import LoadingComponent from '../../Components/Shared/LoadingComponent';
import MotionDiv from '../../Components/Shared/MotionDiv';
import auth from '../../firebase.config.js';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signInWithEmailAndPassword, formUser, formLoading, formError] =
    useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
    toast.success('got u');
  };
  useEffect(() => {
    const currentUser = user || formUser;
    if (currentUser) {
      navigate('/student-profile-update');
    }
  }, [user, formUser, navigate]);

  if (formLoading) {
    return <LoadingComponent />;
  }
  if (formError) {
    toast.error(formError.message);
  }
  return (
    <>
      <AlternativeNavbar />
      <MotionDiv>
        <section className="flex justify-center pt-[100px] md:pt-[135px] px-2">
          <Card className="w-full md:w-[800px] md:px-[32px]">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 flex items-center justify-center h-28 text-center"
            >
              <Typography variant="h3" color="white" className="">
                Welcome to RUET Clearance System
              </Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4 w-full md:w-[80%] mx-auto">
              <Typography
                variant="h2"
                color="initial"
                className="text-center my-2 md:my-4"
              >
                Login
              </Typography>
              <form
                id="login-form"
                onSubmit={handleSubmit(onSubmit)}
                className=""
              >
                {/* email section  */}
                <div className="relative">
                  <Input
                    label="Email"
                    size="lg"
                    className=""
                    {...register('email', {
                      required: {
                        value: true,
                        message: '⚠ Please enter a valid email address.',
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                        message: '⚠ Invalid Email Provided',
                      },
                    })}
                  />
                  <label className="text-xs flex absolute top-[44px] left-[3px]">
                    {errors.email?.type === 'required' && (
                      <span className="label-text-alt text-red-600">
                        {errors.email.message}
                      </span>
                    )}
                    {errors.email?.type === 'pattern' && (
                      <span className="label-text-alt text-red-600">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
                {/* password section  */}
                <div className="mt-[24px] relative">
                  <Input
                    label="Password"
                    size="lg"
                    {...register('password', {
                      required: {
                        value: true,
                        message: '⚠ Password is required.',
                      },
                      pattern: {
                        value: /(?=.*[!#$%&?^*@~() "])(?=.{8,})/,
                        message:
                          '⚠ Password length should be 8 including a special char',
                      },
                    })}
                  />
                  <label className="text-xs flex absolute top-[44px] left-[3px]">
                    {errors.password?.type === 'required' && (
                      <span className="label-text-alt text-red-600">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === 'pattern' && (
                      <span className="label-text-alt text-red-600">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                </div>
              </form>
              <Button
                form="login-form"
                type="submit"
                variant="gradient"
                className="mt-3 text-base md:text-lg py-2 capitalize tracking-wide"
              >
                Log In
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
                  Don't have an account?
                  <Link
                    to="/register-student"
                    className="ml-1 font-bold text-blue-600 hover:underline"
                  >
                    Register Now
                  </Link>
                </Typography>
              </div>
            </CardBody>
          </Card>
        </section>
      </MotionDiv>
    </>
  );
}
