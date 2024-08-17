import React from 'react'
import Sidebar from '@/components/sidebar/Sidebar'

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
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
    );
  }
  