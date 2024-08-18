import React from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import Submenu from '@/components/home/submenu';
import Header from '@/components/home/header';

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <div>
        <div className="fixed w-full h-screen justify-between bg-[url('/images/bg-login.png')] bg-no-repeat bg-cover bg-fixed opacity-50">
        </div>
        <div className="flex flex-col">
            <Header />
        </div>
        <div className="flex flex-row">
          <div className="flex w-64">
              <Sidebar />
          </div>
          <div className="flex ml-64">
              <Submenu />
          </div>
          <div className="flex ml-112">
              {children}
          </div>
        </div>
      </div>
    );
  }