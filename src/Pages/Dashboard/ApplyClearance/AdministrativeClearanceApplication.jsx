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
import { Link } from 'react-router-dom';
import MotionDiv from '../../../Components/Shared/MotionDiv';

const AdministrativeClearanceApplication = ({ click, setClick }) => {
  const [remainDue, setRemainDue] = useState('default');
  const [remainEquipment, setRemainEquipment] = useState('default');
  const [isChecked, setIsChecked] = useState(true);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (remainDue === 'default') {
      toast.error('Due field not selected.');
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
    if (remainEquipment === 'default') {
      toast.error('Equipment field not selected.');
      return;
    }
    if (remainEquipment === 'yes' && !data.equipmentName) {
      toast.error(
        'You have selected remain equipment but do not enter the equipment name.'
      );
      return;
    }
    if (!data.amount) data.amount = 0;
    if (!data.equipmentName) data.equipmentName = '';
    if (!data.transactionID) data.transactionID = '';

    const adminClearanceApply = {
      due: {
        remainDue: remainDue,
        amount: +data.amount,
        transactionID: data.transactionID?.toUpperCase(),
      },
      equipment: {
        remainEquipment: remainEquipment,
        equipmentName: data.equipmentName,
      },
    };
    alert(JSON.stringify(adminClearanceApply));
  };
  return (
    <MotionDiv>
      <Card className="w-full px-4 py-5">
        <Typography
          color="purple"
          variant="h3"
          className="my-3 text-center name__text__gradient"
        >
          {click.adminClick} Dept. Clearance
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
                <Option value="yes">I have due</Option>
                <Option value="no">I don't have any due.</Option>
              </Select>
            </div>
            {/* due section  */}
            {remainDue === 'yes' && remainDue !== 'default' ? (
              <>
                <div className="mt-[24px]">
                  <Input
                    label="Due"
                    size="lg"
                    color="blue"
                    type="text"
                    className="bg-secondaryWhite"
                    {...register('amount')}
                  />
                </div>
                <div className="mt-[24px]">
                  <Input
                    label="Transaction ID or Pay slip No.(Rupali Bank)"
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
          <>
            {/* Equipment-> remain or not  */}
            <div className="mt-[24px] relative">
              <Select
                onChange={(val) => {
                  setRemainEquipment(val);
                }}
                size="lg"
                label="University Equipment"
              >
                <Option value="yes">I have returnable equipment</Option>
                <Option value="no">
                  I don't have any returnable equipment.
                </Option>
              </Select>
            </div>
            {/* equipment section  */}
            {remainEquipment === 'yes' && remainEquipment !== 'default' ? (
              <div className="mt-[24px]">
                <Input
                  label="Equipment Name"
                  size="lg"
                  color="blue"
                  type="text"
                  className="bg-secondaryWhite"
                  {...register('equipmentName')}
                />
              </div>
            ) : (
              ''
            )}
          </>
          <div className="-ml-2.5 h-4 text-sm md:text-base">
            <Checkbox
              defaultChecked
              onChange={() => setIsChecked(!isChecked)}
              label="I agree that provided info are correct"
            />
          </div>

          <div className="flex gap-x-2 my-5">
            <Button
              onClick={() => setClick({ ...click, adminClick: '' })}
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
        <div className="mb-2">
          <Typography variant="paragraph" className="flex justify-center">
            Want to pay due of {click.adminClick} Dept?
            <Link
              to="/"
              className="ml-1 font-bold text-blue-600 hover:underline"
            >
              Pay Now
            </Link>
          </Typography>
        </div>
      </Card>
    </MotionDiv>
  );
};
export default AdministrativeClearanceApplication;
