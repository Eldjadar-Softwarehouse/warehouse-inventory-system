import React from 'react'
import StoreProvider from '@/lib/StoreProvider'
import Sidebar from '@/components/sidebar/sidebar'
import { Inter } from 'next/font/google';

const roboto = Inter({
    subsets: ["latin"],
});

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <StoreProvider >
        <div className="flex">
            <div className="flex-1/4 w-64">
                <Sidebar />
            </div>
            <div className="flex-1/4 w-64">

            </div>
            <div className="flex-2/4 w-2/4">
                {children}
            </div>
        </div>
      </StoreProvider>
    );
  }
  