import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";

const roboto = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Warehouse Inventory System",
  description: "Website apps for warehouse inventory system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider >
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
