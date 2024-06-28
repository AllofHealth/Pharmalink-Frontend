import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import ApproveInstitutionModal from "@/components/modal/SystemAdmin/ApproveInstitutionModal";
import AcceptRecordRequest from "@/components/modal/doctor/acceptRecordRequest";
import { useGetDoctorApprovalList } from "@/lib/queries/doctor";
import type { RootState } from "@/lib/redux/rootReducer";
import { setDoctorCurrentTab } from "@/lib/redux/slices/doctor/doctorSlice";
import { toggleApproveRecordRequest } from "@/lib/redux/slices/modals/modalSlice";
import type { Approval } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

const DoctorApprovalsList = () => {
  const { isConnected, address } = useAccount();
  const [currentRecord, setCurrentRecord] = useState<Approval | null>();

  const { loading, doctorApprovalList, error } = useGetDoctorApprovalList({
    address: address ? address : "",
    isConnected,
  });

  const dispatch = useDispatch();
  const approveRecordRequestModalRef = useRef<HTMLDivElement | null>(null);
  const [
    approveRecordRequestModalContainer,
    setapproveRecordRequestModalContainer,
  ] = useState<HTMLElement | null>(null);

  const isApproveRecordRequestModalOpen = useSelector(
    (state: RootState) => state.modal.isApproveRecordRequestModalOpen
  );

  useEffect(() => {
    if (approveRecordRequestModalRef.current) {
      setapproveRecordRequestModalContainer(
        approveRecordRequestModalRef.current
      );
    }
  }, [isApproveRecordRequestModalOpen]);

  const handleRecordApproval = (approval: Approval) => {
    dispatch(toggleApproveRecordRequest());
    setCurrentRecord(approval);
  };
  return (
    <div className="max-w-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold lg:text-3xl lg:mb-6">Approval List</h1>
        <Field id="approval" label="">
          <Input
            id="approval"
            type="search"
            name="approval"
            placeholder="Search"
            className="h-10 w-20 lg:w-auto"
          />
        </Field>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : doctorApprovalList ? (
        <AllOfHealthTable
          labels={["Patient's Name", "Approval type"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {doctorApprovalList?.approvals?.map((approval) => (
            <tr
              className="h-16 text-blue4 font-medium cursor-pointer"
              key={approval._id}
              onClick={() => handleRecordApproval(approval)}
            >
              <td className="pl-2 lg:pl-7 text-xs lg:text-base flex gap-2 items-center mt-4">
                <h3>
                  <Image
                    src={approval.profilePicture}
                    alt="Memoji"
                    width={32}
                    height={32}
                    className="lg:w-16 lg:h-16"
                  />
                </h3>
                {approval.patientName}
              </td>
              <td className=" text-xs lg:text-base">{approval.approvalType}</td>
            </tr>
          ))}
        </AllOfHealthTable>
      ) : error ? (
        <p>Error fetching data..</p>
      ) : null}
      <div ref={approveRecordRequestModalRef}>
        <AcceptRecordRequest
          container={approveRecordRequestModalContainer!}
          title="Record Request Approval"
          record={currentRecord!}
        />
      </div>
    </div>
  );
};

export default DoctorApprovalsList;
