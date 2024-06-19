import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import GrantAccessToRecord from "@/components/modal/patient/grantAccessToRecord";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleGrantAccessToRecord } from "@/lib/redux/slices/modals/modalSlice";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DoctorProfile = () => {
  const doctorProfile = useSelector(
    (state: RootState) => state.doctor.currentDoctor
  );
  const grantAccessToRecordRef = useRef<HTMLDivElement | null>(null);
  const [grantAccessToRecordContainer, setGrantAccessToRecordContainer] =
    useState<HTMLElement | null>(null);

  const dispatch = useDispatch();

  const isGrantAccessToRecordModalOpen = useSelector(
    (state: RootState) => state.modal.isAcessGrantedToRecordModalOpen
  );

  const handleToggleActionNeeded = () => {
    dispatch(toggleGrantAccessToRecord());
  };

  useEffect(() => {
    if (grantAccessToRecordRef.current) {
      setGrantAccessToRecordContainer(grantAccessToRecordRef.current);
    }
  }, [isGrantAccessToRecordModalOpen]);

  return (
    <div>
      <h1 className="font-bold lg:text-3xl lg:mb-6">Doctor&apos;s Profile</h1>
      <div>
        <Image
          src="/assets/images/patient_img.jpg"
          alt="Face card"
          width={94}
          height={94}
          className="rounded-[50%] w-[94px] h-[94px] object-center object-cover mb-2"
        />
        <h2 className="font-bold lg:text-3xl mb-2">{doctorProfile?.name}</h2>
        <p className="text-xs lg:text-base text-gray-7">
          {doctorProfile?.specialty}
        </p>
        <div className="flex gap-4 items-center my-2">
          <Icon name="StarBlue" />
          <Icon name="StarBlue" />
          <Icon name="StarBlue" />
          <Icon name="StarBlue" />
          <span className="text-blue9 text-sm">4.0</span>
        </div>
        <article className="border rounded py-4 max-w-[944px] mb-6">
          <h2 className="px-6 text-base font-semibold border-b pb-2">
            About Specialist
          </h2>
          <p className="py-4 px-6">Doctor description....</p>
        </article>
        <Button
          variant="secondary"
          className="mx-auto"
          onClick={() => handleToggleActionNeeded()}
        >
          Grant Access to your record
        </Button>
      </div>
      <div ref={grantAccessToRecordRef}>
        <GrantAccessToRecord
          container={grantAccessToRecordContainer!}
          title="Action Needed"
        />
      </div>
    </div>
  );
};

export default DoctorProfile;
