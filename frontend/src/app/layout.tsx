"use client";
import "./globals.css";
import { UserContextProvider } from "@/components/utils/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserContextProvider>
        <body>
          <div>{children}</div>
          <ToastContainer />
        </body>
      </UserContextProvider>
    </html>
  );
}
