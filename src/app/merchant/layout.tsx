import React from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import Submenu from '@/components/home/submenu';

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex">
          <div className="flex w-1/4">
              <Sidebar />
          </div>
          <div className="flex w-1/5">
              <Submenu />
          </div>
          <div className="flex w-3/4">
              {children}
          </div>
      </div>
    );
  }