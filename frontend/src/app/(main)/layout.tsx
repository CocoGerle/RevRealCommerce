import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="min-h-[60vh]">{children}</div>

      <Footer />
      <ToastContainer />
    </div>
  );
}
