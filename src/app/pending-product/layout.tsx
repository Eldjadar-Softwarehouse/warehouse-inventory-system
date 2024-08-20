import React from 'react'
import Sidebar from '@/components/home/sidebar'
import Submenu from '@/components/home/submenu';
import Header from '@/components/home/header';

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <div>
        <div className="fixed w-full h-screen justify-between bg-[url('/images/bg-login.png')] bg-no-repeat bg-cover bg-fixed opacity-50 -z-20">
        </div>
        <div className="block flex-col">
            <Header />
        </div>
        <div className="flex flex-row h-full w-full">
          <div className="flex w-64">
              <Sidebar />
          </div>
          <div className="flex pl-10">
              {children}
          </div>
        </div>
      </div>
    );
  }