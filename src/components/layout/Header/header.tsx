"use client";
import { Icon } from "@/components/icon/Icon";
import SystemAdminSidebar from "@/components/modal/SystemAdmin/SystemAdminSidebar";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleSystemAdminSidebar } from "@/lib/redux/slices/modals/modalSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const systemAdminSidebarRef = useRef<HTMLDivElement | null>(null);
  const [systemAdminSidebarContainer, setSystemAdminSidebarContainer] =
    useState<HTMLElement | null>(null);

  const isSystemAdminSidebarOpen = useSelector(
    (state: RootState) => state.modal.isSystemAdminSidebarOpen
  );
  console.log(isSystemAdminSidebarOpen);

  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSystemAdminSidebar());
  };

  useEffect(() => {
    if (systemAdminSidebarRef.current) {
      setSystemAdminSidebarContainer(systemAdminSidebarRef.current);
    }
  }, [isSystemAdminSidebarOpen]);

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
      <div ref={systemAdminSidebarRef}>
        <SystemAdminSidebar container={systemAdminSidebarContainer!} />
      </div>
    </>
  );
};

export default Header;
