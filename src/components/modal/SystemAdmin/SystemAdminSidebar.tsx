import { useDispatch, useSelector } from "react-redux";
import Modal from "..";
import { Icon } from "@/components/icon/Icon";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleSystemAdminSidebar } from "@/lib/redux/slices/modals/modalSlice";
import { setSystemAdminCurrentTab } from "@/lib/redux/slices/systemAdmin/systemAdminSlice";

const SystemAdminSidebar = ({ container }: { container: HTMLElement }) => {
  const dispatch = useDispatch();

  const isSystemAdminSidebarOpen = useSelector(
    (state: RootState) => state.modal.isSystemAdminSidebarOpen
  );

  const handleToggleModal = () => {
    dispatch(toggleSystemAdminSidebar());
  };

  return (
    <Modal open={isSystemAdminSidebarOpen} onOpenChange={handleToggleModal}>
      <Modal.Portal container={container}>
        <Modal.Content className="fixed right-0 top-0 z-30 h-full w-full max-w-[18rem]  overflow-scroll rounded-xl bg-gray-4 px-8 py-10 shadow focus:outline-none data-[state=open]:animate-contentShow">
          <div className="flex flex-col gap-2">
            <Modal.Close className="flex h-6 w-6 items-center justify-center rounded-full bg-bca-grey-1.5">
              <Icon name="closeBtn" />
            </Modal.Close>
            <div className="flex flex-col gap-6 bg-gray-4 px-4 py-8 rounded-[20px]">
              <h3 className="text-xl font-bold mb-4">
                System Admin&apos;s Menu
              </h3>
              <span
                className="flex items-center gap-4"
                onClick={() =>
                  dispatch(setSystemAdminCurrentTab("ApproveInstitution"))
                }
              >
                <Icon name="Institution" />
                Approve Institution
              </span>
              <span
                className="flex items-center gap-4"
                onClick={() =>
                  dispatch(setSystemAdminCurrentTab("DesignateRoles"))
                }
              >
                <Icon name="DesignateRoles" />
                Designate Roles
              </span>

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

export default SystemAdminSidebar;
