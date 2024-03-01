"use client";
import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import Footer from "@/components/layout/Footer/footer";
import HomepageSidebar from "@/components/sidebar/homepageSidebar";
import type { RootState } from "@/lib/redux/rootReducer";
import { toggleDashboardSidebarOpen } from "@/lib/redux/slices/modals/modalSlice";
import AboutAllofHealth from "@/page_components/homepage/AboutAllOfHealth";
import GetStarted from "@/page_components/homepage/GetStarted";
import Hero from "@/page_components/homepage/Hero";
import OurMainServices from "@/page_components/homepage/OurMainServices";
import OurQualifiedDoctors from "@/page_components/homepage/OurQualifiedDoctors";
import OurTeam from "@/page_components/homepage/OurTeam";
import SubscribeNewsLetters from "@/page_components/homepage/SubscribeNewsLetters";
import Testimonials from "@/page_components/homepage/Testimonials";
import WhyAllofHealth from "@/page_components/homepage/WhyAllofHealth";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [sidebarContainer, setSidebarContainer] = useState<HTMLElement | null>(
    null
  );

  const isDashboardSidebarOpen = useSelector(
    (state: RootState) => state.modal.isDashboardSidebarOpen
  );

  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleDashboardSidebarOpen());
  };

  useEffect(() => {
    if (sidebarRef.current) {
      setSidebarContainer(sidebarRef.current);
    }
  }, [isDashboardSidebarOpen]);

  return (
    <main>
      <header className="flex justify-between items-center px-6">
        <Icon
          name="AllofHealthLogo"
          className="w-32 h-20 lg:w-auto lg:h-auto"
        />
        <Icon
          name="Menu"
          className="lg:hidden"
          onClick={() => handleToggleSidebar()}
        />
        <nav className="lg:flex gap-6 items-center hidden">
          <ul className="flex gap-6 items-center">
            <li className="cursor-pointer hover:border-b-2 hover:pb-4">Home</li>
            <li className="cursor-pointer hover:border-b-2 hover:pb-4">
              Services
            </li>
            <li className="cursor-pointer hover:border-b-2 hover:pb-4">
              About us
            </li>
            <li className="cursor-pointer hover:border-b-2 hover:pb-4">
              Contact
            </li>
          </ul>
          <Button variant="homepage" className="rounded-[40px] h-14">
            Connect Wallet
          </Button>
        </nav>
      </header>
      <Hero />
      <WhyAllofHealth />
      <OurMainServices />
      <OurQualifiedDoctors />
      <AboutAllofHealth />
      <OurTeam />
      <GetStarted />
      <Testimonials />
      <SubscribeNewsLetters />
      <Footer />
      <div ref={sidebarRef}>
        <HomepageSidebar container={sidebarContainer!} />
      </div>
    </main>
  );
}
