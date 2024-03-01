import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/index";
import { Icon } from "@/components/icon/Icon";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleDashboardSidebarOpen } from "@/lib/redux/slices/modals/modalSlice";
import Icons from "../icon/Icons";
import Image from "next/image";

const HomepageSidebar = ({ container }: { container: HTMLElement }) => {
  const dispatch = useDispatch();

  const isDashboardSidebarOpen = useSelector(
    (state: RootState) => state.modal.isDashboardSidebarOpen
  );

  const handleToggleModal = () => {
    dispatch(toggleDashboardSidebarOpen());
  };

  return (
    <Modal open={isDashboardSidebarOpen} onOpenChange={handleToggleModal}>
      <Modal.Portal container={container}>
        <Modal.Content className="fixed right-0 top-0 z-30 h-full w-full max-w-[18rem]  overflow-scroll rounded-xl bg-gradient-to-b from-teal-600 to-green-900 px-8 py-10 shadow focus:outline-none data-[state=open]:animate-contentShow">
          <div className="flex flex-col gap-2 mx-auto">
            <div className="self-end w-max">
              <Modal.Close className="flex h-6 w-6 items-center justify-center rounded-full bg-bca-grey-1.5">
                <Icon name="closeBtn" />
              </Modal.Close>
            </div>

            <Image
              src="/assets/images/all-of-health-logo.png"
              alt="All of health"
              width={159}
              height={93}
              className="mx-auto"
            />
            <div className="flex flex-col gap-6 px-4 py-8 rounded-[20px] text-3xl font-semibold text-center">
              <span className="text-center">Home</span>
              <span className="text-center">Services</span>
              <span className="text-center">About us</span>
              <span className="text-center">Contact</span>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default HomepageSidebar;
