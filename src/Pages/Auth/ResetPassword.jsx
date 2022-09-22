import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AlternativeNavbar from '../../Components/Shared/AlternativeNavbar';
import LoadingComponent from '../../Components/Shared/LoadingComponent';
import MotionDiv from '../../Components/Shared/MotionDiv';
import auth from '../../firebase.config';

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (data) => {
    try {
      await sendPasswordResetEmail(data.email);
      if (!error?.message) toast.success('Reset Link sent to your email');
    } catch (error) {
      toast.error(error.message);
      error.message = '';
    }
  };

  if (sending) {
    return <LoadingComponent />;
  }
  if (error?.message) {
    toast.error(error.message);
    error.message = '';
  }
  return (
    <>
      <AlternativeNavbar />
      <MotionDiv>
        <section className="flex justify-center pt-[100px] md:pt-[135px] px-2">
          <Card className="w-full md:w-[800px] md:px-[32px]">
            <CardHeader
              variant="gradient"
              color="red"
              className="mb-4 flex items-center justify-center h-28 text-center"
            >
              <Typography variant="h3" color="white" className="">
                Reset Password
              </Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4 w-full md:w-[80%] mx-auto">
              <Typography
                variant="h2"
                color="initial"
                className="text-center my-2 md:my-4"
              >
                Reset Form
              </Typography>
              <form
                id="reset-form"
                onSubmit={handleSubmit(onSubmit)}
                className=""
              >
                {/* email section  */}
                <div className="relative">
                  <Input
                    label="Email"
                    size="lg"
                    color="red"
                    autoComplete="off"
                    className="bg-secondaryWhite"
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Please enter a valid email address.',
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                        message: 'Invalid Email Provided !!!',
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
              </form>
              <Button
                form="reset-form"
                type="submit"
                variant="gradient"
                color="red"
                className="mt-3 text-base md:text-lg py-2 capitalize tracking-wide"
              >
                Reset Password
              </Button>
              <div className="">
                <Typography variant="small" className="flex justify-center">
                  Already have an account?
                  <Link
                    to="/"
                    className="ml-1 font-bold text-blue-600 hover:underline"
                  >
                    LogIn Now
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
};
