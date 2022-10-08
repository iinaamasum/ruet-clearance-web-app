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

const EquipmentClearance = ({
  equipmentApplyPageOpen,
  setEquipmentApplyPageOpen,
}) => {
  const [remainEquipment, setRemainEquipment] = useState('default');
  const [isChecked, setIsChecked] = useState(true);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
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

    if (!data.equipmentName) data.equipmentName = 'Not Applicable';
    if (!data.equipmentReturnedTo) data.equipmentReturnedTo = 'Not Applicable';

    const deptApply = {
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
    setEquipmentApplyPageOpen(!equipmentApplyPageOpen);
  };
  return (
    <MotionDiv>
      <Card className="w-full px-4 py-3 mt-5">
        <Typography
          color="purple"
          variant="h3"
          className="my-1 text-center name__text__gradient"
        >
          Equipment Clearance Form
        </Typography>
        <form
          id="dept-apply"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full xsm:w-[80%] sm:w-[60%] md:w-[90%] lg:w-[80%] mx-auto"
        >
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
              onClick={() => setEquipmentApplyPageOpen(!equipmentApplyPageOpen)}
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
export default EquipmentClearance;
