import { Button, Card, Input, Typography } from '@material-tailwind/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const DeptClearanceApplication = ({ click, setClick }) => {
  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {};
  return (
    <Card className="w-full px-4 py-5">
      <Typography color="purple" variant="h3" className="mb-2 text-center">
        {click.deptClick} Dept. Clearance
      </Typography>
      <form
        id="reset-form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full xsm:w-[80%] sm:w-[60%] md:w-[90%] lg:w-[80%] mx-auto"
      >
        {/* email section  */}
        <div className="relative">
          <Input
            label="Email"
            size="lg"
            color="red"
            autoComplete="off"
            className="bg-secondaryWhite"
          />
        </div>
        <div className="mt-2">
          <Typography variant="paragraph" className="flex justify-center">
            Want to pay due of {click.deptClick} Dept?
            <Link
              to="/"
              className="ml-1 font-bold text-blue-600 hover:underline"
            >
              Pay Now
            </Link>
          </Typography>
        </div>
        <div className="flex gap-x-2">
          <Button
            onClick={() => setClick({ ...click, deptClick: '' })}
            variant="gradient"
            color="red"
            className="w-full mt-3 text-base md:text-lg py-2 capitalize tracking-wide"
          >
            Cancel
          </Button>
          <Button
            form="reset-form"
            type="submit"
            variant="gradient"
            color="blue"
            className="w-full mt-3 text-base md:text-lg py-2 capitalize tracking-wide"
          >
            Apply Now
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DeptClearanceApplication;
