import type { Metadata } from "next";
import { Monda } from "next/font/google";
import "./globals.css";
import { Navbar } from "./Navbar";

const monda = Monda({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Dlock.shop",
  description: "Buy, sell, trade and view millions of deadlock skins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={monda.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
