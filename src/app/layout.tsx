import type { Metadata } from "next";
import { Monda } from "next/font/google";
import "./globals.css";
import { Navbar } from "./Navbar";

const monda = Monda({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Deadlock Market",
  description: "The Ultimate CSGO Skin Marketplace",
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
