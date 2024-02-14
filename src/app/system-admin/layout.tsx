// "use client";
import Footer from "@/components/layout/Footer/footer";
import Header from "@/components/layout/Header/header";

export default function SystemAdminLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
