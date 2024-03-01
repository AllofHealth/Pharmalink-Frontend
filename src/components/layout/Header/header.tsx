"use client";
import { Icon } from "@/components/icon/Icon";
import Sidebar from "@/components/sidebar/Sidebar";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleSystemAdminSidebar } from "@/lib/redux/slices/modals/modalSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [sidebarContainer, setSidebarContainer] = useState<HTMLElement | null>(
    null
  );

  const isSidebarOpen = useSelector(
    (state: RootState) => state.modal.isSidebarOpen
  );
  console.log(isSidebarOpen);

  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSystemAdminSidebar());
  };

  useEffect(() => {
    if (sidebarRef.current) {
      setSidebarContainer(sidebarRef.current);
    }
  }, [isSidebarOpen]);

  return (
    <>
      <header className="flex justify-between items-center px-7 lg:px-14">
        <Icon
          name="AllofHealthLogo"
          className="w-32 h-20 lg:w-auto lg:h-auto"
        />
        <Icon
          name="Menu"
          className="lg:hidden"
          onClick={() => handleToggleSidebar()}
        />
      </header>
      <div ref={sidebarRef}>
        <Sidebar container={sidebarContainer!} />
      </div>
    </>
  );
};

export default Header;
