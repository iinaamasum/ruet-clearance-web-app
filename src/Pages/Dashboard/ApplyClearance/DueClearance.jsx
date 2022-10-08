import {
  Button,
  Card,
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import MotionDiv from '../../../Components/Shared/MotionDiv';

const DueClearance = ({ dueApplyPageOpen, setDueApplyPageOpen }) => {
  const [remainDue, setRemainDue] = useState('default');
  const [remainEquipment, setRemainEquipment] = useState('default');
  const [isChecked, setIsChecked] = useState(true);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (remainDue === 'default') {
      toast.error('Due field not selected.');
      return;
    }
    if (remainDue === 'yes' && !data.dueReason) {
      toast.error('Due Reason field not filled yet.');
      return;
    }

    if (remainDue === 'yes' && data.amount <= 0) {
      toast.error(
        'You have selected remain due but do not enter amount or entered negative amount.'
      );
      return;
    }
    const isNumberCheck = +data.amount;
    if (remainDue === 'yes' && !isNumberCheck) {
      toast.error('You have entered wrong amount.');
      return;
    }
    if (remainDue === 'yes' && !data.transactionID) {
      toast.error(
        'You have selected remain due but do not paid yet. If paid, enter the transaction ID.'
      );
      return;
    }

    if (!data.amount) data.amount = 0;
    if (!data.transactionID) data.transactionID = 'Not Applicable';

    const deptApply = {
      dueReason: data.dueReason,
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
    alert(JSON.stringify(deptApply));
    setDueApplyPageOpen(!dueApplyPageOpen);
  };
  return (
    <MotionDiv>
      <Card className="w-full px-4 py-3 mt-5">
        <Typography
          color="purple"
          variant="h3"
          className="my-1 text-center name__text__gradient"
        >
          Due Clearance Form
        </Typography>
        <form
          id="dept-apply"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full xsm:w-[80%] sm:w-[60%] md:w-[90%] lg:w-[80%] mx-auto"
        >
          <>
            {/* due-> remain or not  */}
            <div className="mt-[24px] relative">
              <Select
                onChange={(val) => {
                  setRemainDue(val);
                }}
                size="lg"
                label="Select Due Option"
              >
                <Option value="yes">I had due and paid by Rupali Bank</Option>
                <Option value="no">I don't have any due.</Option>
              </Select>
            </div>
            {/* due section  */}
            {remainDue === 'yes' && remainDue !== 'default' ? (
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
                    label="Pay slip No.(Rupali Bank)"
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
