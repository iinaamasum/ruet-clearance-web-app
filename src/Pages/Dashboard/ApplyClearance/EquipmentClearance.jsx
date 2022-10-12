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

const EquipmentClearance = ({
  equipmentApplyPageOpen,
  setEquipmentApplyPageOpen,
}) => {
  const [remainEquipment, setRemainEquipment] = useState('default');
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
    if (remainEquipment === 'yes' && !data.returnedCode) {
      toast.error(
        'Please enter the code that is given by the teacher or staff for returning the equipments.'
      );
      return;
    }

    if (!data.equipmentName) data.equipmentName = 'Not Applicable';
    if (!data.returnedCode) data.returnedCode = 'Not Applicable';
    if (!data.equipmentReturnedTo) data.equipmentReturnedTo = 'Not Applicable';

    const remainEquipmentNames = data.equipmentName.split(',');
    for (let i = 0; i < remainEquipmentNames.length; i++) {
      remainEquipmentNames[i] = remainEquipmentNames[i].trim();
    }

    const equipmentReturnToNames = data.equipmentReturnedTo.split(',');
    for (let i = 0; i < equipmentReturnToNames.length; i++) {
      equipmentReturnToNames[i] = equipmentReturnToNames[i].trim();
    }

    const returnCodes = data.returnedCode.split(',');
    for (let i = 0; i < returnCodes.length; i++) {
      returnCodes[i] = returnCodes[i].trim();
    }

    const equipmentClearanceApplication = {
      studentRoll: studentInfo.allStudentInfo[0].roll,
      studentEmail: studentInfo.allStudentInfo[0].email,
      equipment: {
        remainEquipment: remainEquipment,
        equipmentName: remainEquipmentNames,
        equipmentReturnedTo: equipmentReturnToNames,
        returnedCode: returnCodes,
      },
      status: {
        isApproved: false,
        isRejected: false,
        isPending: true,
        rejectionReason: '',
      },
    };
    try {
      const postEquipmentApplyRes = await axios
        .post(
          'http://localhost:5001/api/v1/student/equipment-clearance-apply',
          equipmentClearanceApplication
        )
        .then((res) => res.data);
      console.log(postEquipmentApplyRes);
    } catch (error) {
      toast.error(
        "Can't post data. Please check connections. " + error.message
      );
    }
    setEquipmentApplyPageOpen(!equipmentApplyPageOpen);
  };
  return (
    <MotionDiv>
      <Card className="w-full px-4 py-3 mt-5">
        <Typography color="black" variant="h3" className="my-1 text-center">
          Equipment Clearance Form
        </Typography>
        <form
          id="dept-apply"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full xsm:w-[80%] sm:w-[60%] md:w-[90%] lg:w-[80%] mx-auto"
        >
          <>
            {/* Equipment-> remain or not  */}
            <div className="mt-[18px] relative">
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
                    label="Equipment Name (If many, use comma)"
                    size="lg"
                    color="blue"
                    type="text"
                    className="bg-secondaryWhite"
                    {...register('equipmentName')}
                  />
                </div>
                <div className="mt-[24px]">
                  <Input
                    label="Returned To (Teacher/Staff Name Short Form. If many, use comma)"
                    size="lg"
                    color="blue"
                    type="text"
                    className="bg-secondaryWhite"
                    {...register('equipmentReturnedTo')}
                  />
                </div>
                <div className="mt-[24px]">
                  <Input
                    label="Returned Slip Code (If many, use comma)"
                    size="lg"
                    color="blue"
                    type="text"
                    className="bg-secondaryWhite uppercase"
                    {...register('returnedCode')}
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
