import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bangla",
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর — The Market Journal",
  description:
    "Track essential product prices across local markets with Bazar Dor.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-theme="light">
      <body
        className={`${notoSansBengali.className} antialiased bg-[#F4F0E7] text-[#20221E]`}
      >
        <Navbar />
        <main className="mt-44 min-h-100vh">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#FBF9F4",
              color: "#20221E",
              border: "1px solid #DCD6C9",
              borderRadius: "12px",
              fontSize: "13px",
            },
            success: {
              iconTheme: {
                primary: "#42634A",
                secondary: "#FBF9F4",
              },
            },
            error: {
              iconTheme: {
                primary: "#A54538",
                secondary: "#FBF9F4",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
