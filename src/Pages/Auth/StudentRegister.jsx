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
import AlternativeNavbar from '../../Components/Shared/AlternativeNavbar';

export default function StudentRegister() {
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
      <AlternativeNavbar />
      <section className="flex justify-center pt-[80px] px-2">
        <Card className="w-full md:w-[800px] md:px-[32px]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 flex items-center justify-center h-28 text-center"
          >
            <Typography variant="h3" color="white" className="">
              Register as a student
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4 w-full md:w-[80%] mx-auto">
            <Typography
              variant="h2"
              color="initial"
              className="text-center my-2 md:my-4"
            >
              Register
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
              <div className="mt-[24px] relative">
                <Input
                  label="Password"
                  size="lg"
                  autoComplete="off"
                  className="bg-secondaryWhite"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required.',
                    },
                    pattern: {
                      value: /(?=.*[!#$%&?^*@~() "])(?=.{8,})/,
                      message: 'Invalid Email Provided !!!',
                    },
                  })}
                />
                <label className="text-xs flex absolute top-[44px] left-[3px]">
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
                      message: 'Password is required.',
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                      message: 'Invalid Email Provided !!!',
                    },
                  })}
                />
                <label className="text-xs flex absolute top-[44px] left-[3px]">
                  {errors.c_password?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.c_password.message}
                    </span>
                  )}
                  {errors.c_password?.type === 'pattern' && (
                    <span className="label-text-alt text-red-500">
                      {errors.c_password.message}
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
                Don't have an account?
                <Link
                  to="/"
                  className="ml-1 font-bold text-blue-600 hover:underline"
                >
                  Log In Now
                </Link>
              </Typography>
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
