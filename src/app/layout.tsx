import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bangla",
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Track essential product prices across local markets.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body
        className={`${notoSansBengali.className} min-h-full`}
        cz-shortcut-listen="true"
      >
        <Navbar />
        <main className="mt-20 container mx-auto">{children}</main>
      </body>
    </html>
  );
}
