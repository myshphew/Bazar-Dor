import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

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
        className={`${notoSansBengali.className} min-h-full flex flex-col`}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
