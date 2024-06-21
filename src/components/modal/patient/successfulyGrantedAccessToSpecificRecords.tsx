import Modal from "../modal";
import { Icon } from "@/components/icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/lib/redux/rootReducer";
import { toggleSuccessfullyGrantedAccessToSpecificRecordsModal } from "@/lib/redux/slices/modals/modalSlice";
import Image from "next/image";
import type { AllDoctor } from "@/lib/types";

const SuccessfullyGrantedAccessToSpecificRecordsModal = ({
  container,
  title,
  doctor,
}: {
  container: HTMLElement;
  title: string;
  doctor: AllDoctor | null;
}) => {
  const dispatch = useDispatch();
  const accessType = useSelector(
    (state: RootState) => state.patient.approvalType
  );

  const isSuccessfullyGrantedAccessToSpecificRecordsModalOpen = useSelector(
    (state: RootState) =>
      state.modal.isSuccessfullyGrantedAccessToSpecificRecordsModalOpen
  );

  const handleToggleModal = () => {
    dispatch(toggleSuccessfullyGrantedAccessToSpecificRecordsModal());
  };

  return (
    <Modal
      open={isSuccessfullyGrantedAccessToSpecificRecordsModalOpen}
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
              <Image
                src="/assets/images/success.png"
                alt="Success"
                width={96}
                height={96}
                className="mx-auto w-8 h-8 lg:w-auto lg:h-auto"
              />
              <Modal.Title className="w-[80%] lg:mt-6 mx-auto text-sm lg:text-2xl text-center font-bold leading-8">
                {title}
              </Modal.Title>
              <p className="lg:my-2 text-[10px] lg:text-base">
                You have successfully given {doctor?.name} access to{" "}
                {accessType === "FULL" ? "VIEW AND MODIFY" : "VIEW"} your
                medical records
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Modal.Close className="w-[100px] lg:w-[250px] h-[30px] lg:h-auto rounded-[40px] bg-blue2 px-4 lg:py-3 lg:text-sm font-semibold text-white hover:shadow focus:outline-none focus-visible:rounded-[40px] disabled:bg-gray-1 text-[10px]">
                Return Home
              </Modal.Close>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default SuccessfullyGrantedAccessToSpecificRecordsModal;
