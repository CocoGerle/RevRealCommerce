import type { Metadata } from "next";
import { AdminNavbar } from "./components/adminNavbar";
import { AdminBurgerBar } from "./components/adminBurgerBar";

// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <ProductContextProvider> */}
      <div style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
        <AdminNavbar />
        <div className="flex m-auto w-[1280px]">
          <AdminBurgerBar />
          {children}
        </div>
      </div>
      {/* </ProductContextProvider> */}
    </>
  );
}
