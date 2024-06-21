import Modal from "../modal";
import { Icon } from "@/components/icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/lib/redux/rootReducer";
import { toggleGrantAccessToSpecificRecordsModal } from "@/lib/redux/slices/modals/modalSlice";
import type { AllDoctor } from "@/lib/types";
import { approveFamilyMemberMedicalRecordAccess } from "@/actions/contract/patient/patient.service.c";
import useAxios from "@/lib/hooks/useAxios";
import { requestMedicalRecordApproval } from "@/lib/mutations/patient";
import { useAccount } from "wagmi";
import { setApprovalType } from "@/lib/redux/slices/patient/patientSlice";

const GrantAccessToSpecificRecordsModal = ({
  container,
  title,
  medicalRecords,
  doctor,
}: {
  container: HTMLElement;
  title: string;
  medicalRecords: number[];
  doctor: AllDoctor | null;
}) => {
  const dispatch = useDispatch();
  const { axios } = useAxios({});
  const { address } = useAccount();

  const isGrantAccessToSpecificRecordsModalOpen = useSelector(
    (state: RootState) => state.modal.isGrantAccessToSpecificRecordsModalOpen
  );

  const handleToggleModal = () => {
    dispatch(toggleGrantAccessToSpecificRecordsModal());
  };

  const handleRequestApprovalForMedicalRecord = async (
    approvalType: string
  ) => {
    if (!address || !doctor?.walletAddress) {
      console.error("Address or doctor wallet address is undefined");
      return;
    }
    try {
      await requestMedicalRecordApproval({
        axios,
        dispatch,
        records: medicalRecords,
        patientAddress: address,
        doctorAddress: doctor.walletAddress,
        approvalType,
      });
      dispatch(setApprovalType(approvalType));
    } catch (error) {
      console.error("Error requesting medical record approval", error);
    }
  };

  return (
    <Modal
      open={isGrantAccessToSpecificRecordsModalOpen}
      onOpenChange={handleToggleModal}
    >
      <Modal.Portal container={container}>
        <Modal.Content className="fixed left-1/2 top-1/2 z-30 min-h-[174px] lg:max-h-[814px] lg:w-full w-[307px] lg:max-w-[34.06rem] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 lg:p-8 text-bca-grey-8 shadow focus:outline-none data-[state=open]:animate-contentShow lg:py-16">
          <div className="flex flex-col gap-2">
            <div className="self-end">
              <Modal.Close className="flex h-6 w-6 items-center justify-center rounded-full bg-bca-grey-1.5">
                <Icon name="closeBtn" />
              </Modal.Close>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <Modal.Title className="w-[80%] lg:mt-6 mx-auto text-sm lg:text-2xl text-center font-bold leading-8">
                {title}
              </Modal.Title>
              <p className="lg:my-2 text-[10px] lg:text-base">
                Give {doctor?.name} access to {medicalRecords?.length} of your
                medical records:
              </p>
            </div>

            <div className="flex items-center justify-between gap-2">
              <Modal.Close
                className="w-[200px] lg:w-[250px] h-[30px] lg:h-auto rounded-[40px] bg-white px-4 lg:py-3 lg:text-sm font-semibold text-black hover:shadow focus:outline-none focus-visible:rounded-[40px] disabled:bg-gray-1 text-[10px] border border-black"
                onClick={() => handleRequestApprovalForMedicalRecord("FULL")}
              >
                View and Modify
              </Modal.Close>
              <Modal.Close
                className="w-[200px] lg:w-[250px] h-[30px] lg:h-auto rounded-[40px] bg-blue2 px-4 lg:py-3 lg:text-sm font-semibold text-white hover:shadow focus:outline-none focus-visible:rounded-[40px] disabled:bg-gray-1 text-[10px]"
                onClick={() => handleRequestApprovalForMedicalRecord("READ")}
              >
                View Only
              </Modal.Close>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default GrantAccessToSpecificRecordsModal;
