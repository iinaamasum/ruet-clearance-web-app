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

const EditApplicationModal = ({ editModal, setEditModal }) => {
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
    if (remainEquipment === 'yes' && !data.equipmentReturnedTo) {
      toast.error(
        'Please enter the Teacher or Staff name to whom you returned the equipment.'
      );
      return;
    }
    if (!data.amount) data.amount = 0;
    if (!data.equipmentName) data.equipmentName = 'Not Applicable';
    if (!data.equipmentReturnedTo) data.equipmentReturnedTo = 'Not Applicable';
    if (!data.transactionID) data.transactionID = 'Not Applicable';

    const deptApply = {
      appliedFor: 'click.deptClick',
      dueReason: data.dueReason,
      due: {
        remainDue: remainDue,
        amount: +data.amount,
        transactionID: data.transactionID?.toUpperCase(),
      },
      equipment: {
        remainEquipment: remainEquipment,
        equipmentName: data.equipmentName,
        equipmentReturnedTo: data.equipmentReturnedTo,
      },
      status: {
        isApproved: false,
        isRejected: false,
        isPending: true,
        rejectionReason: '',
      },
    };
    alert(JSON.stringify(deptApply));
    setEditModal(!editModal);
  };

  return (
    <div className="z-[100] mt-24 xsm:mt-0">
      <input
        type="checkbox"
        id="edit-application-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            onClick={() => setEditModal(!editModal)}
            htmlFor="edit-application-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 z-[100]"
          >
            ✕
          </label>
          <Card className="w-full px-4 py-5 shadow-none">
            <Typography
              color="purple"
              variant="h3"
              className="my-3 text-center name__text__gradient"
            >
              {'click.deptClick'} Dept. Clearance
            </Typography>
            <form
              id="edit-application"
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
                    <Option value="yes">
                      I had due and paid by online trasaction
                    </Option>
                    <Option value="yes">
                      I had due and paid by Rupali Bank
                    </Option>
                    <Option value="no">I don't have any due.</Option>
                  </Select>
                </div>
                {/* due section  */}
                {remainDue === 'yes' && remainDue !== 'default' ? (
                  <>
                    <div className="mt-[24px]">
                      <Input
                        label="Due Reason"
                        size="lg"
                        color="blue"
                        type="text"
                        className="bg-secondaryWhite"
                        {...register('dueReason')}
                      />
                    </div>
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
                    <Option value="yes">
                      I had returnable equipment and already returned.
                    </Option>
                    <Option value="no">
                      I don't have any returnable equipment.
                    </Option>
                  </Select>
                </div>
                {/* equipment section  */}
                {remainEquipment === 'yes' && remainEquipment !== 'default' ? (
                  <>
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
                    <div className="mt-[24px]">
                      <Input
                        label="Returned To (Teacher/Staff Name)"
                        size="lg"
                        color="blue"
                        type="text"
                        className="bg-secondaryWhite"
                        {...register('equipmentReturnedTo')}
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
                  onClick={() => setEditModal(!editModal)}
                  variant="gradient"
                  color="red"
                  className="w-full mt-3 text-base md:text-lg py-2 capitalize tracking-wide"
                >
                  Cancel
                </Button>
                {isChecked ? (
                  <Button
                    form="edit-application"
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
        </div>
      </div>
    </div>
  );
};

export default EditApplicationModal;
