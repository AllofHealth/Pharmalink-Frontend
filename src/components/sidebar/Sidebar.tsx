import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal";
import { Icon } from "@/components/icon/Icon";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleSystemAdminSidebar } from "@/lib/redux/slices/modals/modalSlice";
import { setSystemAdminCurrentTab } from "@/lib/redux/slices/systemAdmin/systemAdminSlice";
import { usePathname } from "next/navigation";
import { setInstitutionCurrentTab } from "@/lib/redux/slices/institution/institutionSlice";
import { setDoctorCurrentTab } from "@/lib/redux/slices/doctor/doctorSlice";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import { setPharmacistCurrentTab } from "@/lib/redux/slices/pharmacist/pharmacistSlice";

const Sidebar = ({ container }: { container: HTMLElement }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const isSidebarOpen = useSelector(
    (state: RootState) => state.modal.isSidebarOpen
  );

  const handleToggleModal = () => {
    dispatch(toggleSystemAdminSidebar());
  };

  const sidebarTitle = pathname.includes("system-admin")
    ? "System Admin's Menu"
    : pathname.includes("institution")
    ? "Institution's Menu"
    : pathname.includes("patient")
    ? "Patient's Menu"
    : pathname.includes("pharmacist")
    ? "Pharmacist's Menu"
    : "Doctor's Menu";

  return (
    <Modal open={isSidebarOpen} onOpenChange={handleToggleModal}>
      <Modal.Portal container={container}>
        <Modal.Content className="fixed right-0 top-0 z-30 h-full w-full max-w-[18rem]  overflow-scroll rounded-xl bg-gray-4 px-8 py-10 shadow focus:outline-none data-[state=open]:animate-contentShow">
          <div className="flex flex-col gap-2">
            <Modal.Close className="flex h-6 w-6 items-center justify-center rounded-full bg-bca-grey-1.5">
              <Icon name="closeBtn" />
            </Modal.Close>
            <div className="flex flex-col gap-6 bg-gray-4 px-4 py-8 rounded-[20px]">
              <h3 className="text-xl font-bold mb-4">{sidebarTitle}</h3>
              {pathname.includes("system-admin") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() =>
                    dispatch(setSystemAdminCurrentTab("ApproveInstitution"))
                  }
                >
                  <Icon name="Institution" />
                  Approve Institution
                </span>
              ) : null}
              {pathname.includes("system-admin") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() =>
                    dispatch(setSystemAdminCurrentTab("DesignateRoles"))
                  }
                >
                  <Icon name="DesignateRoles" />
                  Designate Roles
                </span>
              ) : null}
              {pathname.includes("institution") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setInstitutionCurrentTab("Overview"))}
                >
                  <Icon name="Overview" />
                  Overview
                </span>
              ) : null}
              {pathname.includes("institution") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setInstitutionCurrentTab("Wallet"))}
                >
                  <Icon name="Wallet" />
                  Wallet
                </span>
              ) : null}
              {pathname.includes("institution") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setInstitutionCurrentTab("Privacy"))}
                >
                  <Icon name="Privacy" />
                  Privacy and Security
                </span>
              ) : null}
              {/* {Doctor} */}

              {pathname.includes("doctor") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setDoctorCurrentTab("Overview"))}
                >
                  <Icon name="Overview" />
                  Overview
                </span>
              ) : null}
              {pathname.includes("doctor") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setDoctorCurrentTab("Approvals"))}
                >
                  <Icon name="Privacy" />
                  Approvals
                </span>
              ) : null}
              {pathname.includes("doctor") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setDoctorCurrentTab("Wallet"))}
                >
                  <Icon name="Wallet" />
                  Wallet
                </span>
              ) : null}
              {pathname.includes("doctor") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setDoctorCurrentTab("Privacy"))}
                >
                  <Icon name="Privacy" />
                  Privacy and Security
                </span>
              ) : null}

              {/* Patient */}
              {pathname.includes("patient") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPatientCurrentTab("Overview"))}
                >
                  <Icon name="Overview" />
                  Overview
                </span>
              ) : null}
              {pathname.includes("patient") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPatientCurrentTab("Prescription"))}
                >
                  <Icon name="Prescription" />
                  Prescription
                </span>
              ) : null}
              {pathname.includes("patient") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPatientCurrentTab("Find Doctor"))}
                >
                  <Icon name="FindDoctor" />
                  Find Doctor
                </span>
              ) : null}

              {pathname.includes("patient") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPatientCurrentTab("Wallet"))}
                >
                  <Icon name="Wallet" />
                  Wallet
                </span>
              ) : null}
              {pathname.includes("patient") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() =>
                    dispatch(setPatientCurrentTab("Family Registration"))
                  }
                >
                  <Icon name="FamilyReg" />
                  Family Registration
                </span>
              ) : null}
              {pathname.includes("patient") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPatientCurrentTab("Emergency"))}
                >
                  <Icon name="Emergency" />
                  Emergency
                </span>
              ) : null}
              {pathname.includes("patient") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPatientCurrentTab("Privacy"))}
                >
                  <Icon name="Privacy" />
                  Privacy and Security
                </span>
              ) : null}

              {/* {Pharmacist} */}
              {pathname.includes("pharmacist") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPharmacistCurrentTab("Overview"))}
                >
                  <Icon name="Overview" />
                  Overview
                </span>
              ) : null}
              {pathname.includes("pharmacist") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() =>
                    dispatch(setPharmacistCurrentTab("Prescription"))
                  }
                >
                  <Icon name="Prescription" />
                  Prescription
                </span>
              ) : null}
              {pathname.includes("pharmacist") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPharmacistCurrentTab("Inventory"))}
                >
                  <Icon name="FindDoctor" />
                  Inventory
                </span>
              ) : null}
              {pathname.includes("pharmacist") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPharmacistCurrentTab("Wallet"))}
                >
                  <Icon name="Wallet" />
                  Wallet
                </span>
              ) : null}

              {pathname.includes("pharmacist") ? (
                <span
                  className="flex items-center gap-4"
                  onClick={() => dispatch(setPharmacistCurrentTab("Privacy"))}
                >
                  <Icon name="Privacy" />
                  Privacy and Security
                </span>
              ) : null}
              <span className="flex items-center gap-4 mt-40">
                <Icon name="LogOut" />
                Log Out
              </span>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default Sidebar;
