// "use client";
import Footer from "@/components/layout/Footer/footer";
import Header from "@/components/layout/Header/header";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
