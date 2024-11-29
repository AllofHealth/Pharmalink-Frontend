import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/index";
import { Icon } from "@/components/icon/Icon";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleDashboardSidebarOpen } from "@/lib/redux/slices/modals/modalSlice";
import Icons from "../icon/Icons";
import Image from "next/image";
import Link from "next/link";
import Button from "../button/Button";

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
        <Modal.Content className="fixed right-0 top-0 z-30 h-full w-full sm:max-w-[18rem] overflow-y-scroll rounded-xl bg-[#F6F6F6] px-8 py-10 shadow focus:outline-none data-[state=open]:animate-contentShow">
          <div className="flex flex-col gap-2 mx-auto">
            <div className="self-end w-max">
              <Modal.Close className="flex h-6 w-6 items-center justify-center rounded-full bg-bca-grey-1.5">
                <Icon name="closeBtn" />
              </Modal.Close>
            </div>

            <Icon name="AllofHealthLogo" className="mx-auto" />

            <div className="flex flex-col gap-8 px-4 pb-8 rounded-[20px] text-3xl font-semibold text-center">
              <span className="text-center">Home</span>
              <span className="text-center">Services</span>
              <span className="text-center">About us</span>
              <span className="text-center">Contact</span>
              <Link href={"/sign-in"} className="mx-auto">
                <Button variant="homepage" className="rounded-[40px] h-14">
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default HomepageSidebar;
