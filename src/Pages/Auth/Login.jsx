import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Shared/Navbar';

export default function Example() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert('hi');
  };
  return (
    <>
      <Navbar />
      <section className="flex justify-center pt-[96px] px-2">
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
              <div className="">
                <Input
                  label="Email"
                  size="lg"
                  className=""
                  autoComplete="off"
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
                <label className="text-xs flex my-[2px]">
                  {errors.email?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === 'pattern' && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              {/* password section  */}
              <div className="mt-3">
                <Input
                  label="Password"
                  size="lg"
                  autoComplete="off"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required.',
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                      message: 'Invalid Email Provided !!!',
                    },
                  })}
                />
                <label className="text-xs flex my-[2px]">
                  {errors.password?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === 'pattern' && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
            </form>
            <Button form="login-form" type="submit" variant="gradient">
              Sign In
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
                  to="/register"
                  className="ml-1 font-bold text-blue-600 hover:underline"
                >
                  Register Now
                </Link>
              </Typography>
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
