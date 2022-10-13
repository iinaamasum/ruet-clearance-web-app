import {
  Button,
  Card,
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingComponent from '../../../Components/Shared/LoadingComponent';
import MotionDiv from '../../../Components/Shared/MotionDiv';
import auth from '../../../firebase.config';

const DueClearance = ({
  dueApplyPageOpen,
  setDueApplyPageOpen,
  dueApplicationRefetch,
}) => {
  const [remainDue, setRemainDue] = useState('default');
  const [isChecked, setIsChecked] = useState(true);
  const { register, handleSubmit } = useForm();
  const [user, userLoading] = useAuthState(auth);

  const {
    data: studentInfo,
    isLoading,
    isError,
  } = useQuery(
    ['studentInfo', user],
    async () =>
      await axios
        .get(
          `http://localhost:5001/api/v1/student/profile-info?email=${user.email}`
        )
        .then((res) => res.data)
  );

  if (userLoading || isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    toast.error(
      "Can't get user info. Please check internet connection. " +
        isError.message
    );
  }

  const onSubmit = async (data) => {
    if (remainDue === 'default') {
      toast.error('Due field not selected.');
      return;
    }
    if (remainDue === 'Yes' && !data.dueReason) {
      toast.error('Due Reason field not filled yet.');
      return;
    }

    if (remainDue === 'Yes' && data.amount <= 0) {
      toast.error(
        'You have selected remain due but do not enter amount or entered negative amount.'
      );
      return;
    }
    const isNumberCheck = +data.amount;
    if (remainDue === 'Yes' && !isNumberCheck) {
      toast.error('You have entered wrong amount.');
      return;
    }
    if (remainDue === 'Yes' && !data.transactionID) {
      toast.error(
        'You have selected remain due but do not paid yet. If paid, enter the transaction ID.'
      );
      return;
    }

    if (!data.amount) data.amount = 0;
    if (!data.transactionID) data.transactionID = 'Not Applicable';
    if (!data.dueReason) data.dueReason = 'Not Applicable';

    const allDueReason = data.dueReason.split(',');
    for (var i = 0; i < allDueReason.length; i++) {
      allDueReason[i] = allDueReason[i].trim();
    }

    const dueClearanceApplication = {
      studentRoll: studentInfo.allStudentInfo[0].roll,
      studentEmail: studentInfo.allStudentInfo[0].email,
      dueReason: [...allDueReason],
      due: {
        remainDue: remainDue,
        amount: +data.amount,
        transactionID: data.transactionID?.toUpperCase(),
      },
      status: {
        isApproved: false,
        isRejected: false,
        isPending: true,
        rejectionReason: '',
      },
    };

    try {
      const dueApplyRes = await axios
        .post(
          'http://localhost:5001/api/v1/student/due-clearance-apply',
          dueClearanceApplication
        )
        .then((res) => res.data);
      dueApplicationRefetch();
      if (dueApplyRes.status === 'success') {
        toast.success('Successfully applied for due clearance.');
      } else {
        toast.error("Can't apply for clearance. Please check connections.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Can't apply for clearance. Please check connections. " + error
      );
    }
    setDueApplyPageOpen(true);
  };
  return (
    <MotionDiv>
      <Card className="w-full px-4 py-3 mt-5">
        <Typography color="black" variant="h3" className="my-1 text-center">
          Due Clearance Form
        </Typography>
        <form
          id="dept-apply"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full xsm:w-[80%] sm:w-[60%] md:w-[90%] lg:w-[80%] mx-auto"
        >
          <>
            {/* due-> remain or not  */}
            <div className="mt-[18px] relative">
              <Select
                onChange={(val) => {
                  setRemainDue(val);
                }}
                size="lg"
                label="Select Due Option"
              >
                <Option value="Yes">I had due and paid by Rupali Bank</Option>
                <Option value="No">I don't have any due.</Option>
              </Select>
            </div>
            {/* due section  */}
            {remainDue === 'Yes' && remainDue !== 'default' ? (
              <>
                <div className="mt-[24px]">
                  <Input
                    label="Due Reason (If many, enter with comma)"
                    size="lg"
                    color="blue"
                    type="text"
                    className="bg-secondaryWhite"
                    {...register('dueReason')}
                  />
                </div>
                <div className="mt-[24px]">
                  <Input
                    label="Amount"
                    size="lg"
                    color="blue"
                    type="text"
                    className="bg-secondaryWhite"
                    {...register('amount')}
                  />
                </div>
                <div className="mt-[24px]">
                  <Input
                    label="Pay slip No. (Rupali Bank)"
                    size="lg"
                    color="blue"
                    type="text"
                    className="bg-secondaryWhite uppercase"
                    {...register('transactionID')}
                  />
                </div>
              </>
            ) : (
              ''
            )}
          </>
          <div className="-ml-2.5 h-4">
            <Checkbox
              defaultChecked
              onChange={() => setIsChecked(!isChecked)}
              label="I agree that provided info are correct"
            />
          </div>

          <div className="flex gap-x-2 my-5">
            <Button
              onClick={() => setDueApplyPageOpen(!dueApplyPageOpen)}
              variant="gradient"
              color="red"
              className="w-full mt-3 text-base md:text-lg py-2 capitalize tracking-wide"
            >
              Cancel
            </Button>
            {isChecked ? (
              <Button
                form="dept-apply"
                type="submit"
                variant="gradient"
                color="indigo"
                className="w-full mt-3 text-base md:text-lg py-2 capitalize tracking-wide"
              >
                Apply Now
              </Button>
            ) : (
              <Button
                disabled
                className="w-full mt-3 text-base md:text-lg py-2 capitalize tracking-wide"
              >
                Apply Now
              </Button>
            )}
          </div>
        </form>
      </Card>
    </MotionDiv>
  );
};

export default DueClearance;
