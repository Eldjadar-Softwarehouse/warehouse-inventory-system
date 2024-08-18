import React from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import Submenu from '@/components/home/submenu';

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <div>
        <div className="fixed w-full h-screen justify-between bg-[url('/images/bg-login.png')] bg-no-repeat bg-cover bg-fixed opacity-50">
        </div>
        <div className="w-screen h-screen flex flex-col">
          <div className="flex justify-end ml-256 border-gray-200 pr-10">
            <button className="justify-center mr-4 mt-1">
                <img
                  src="/icons/home/notification.svg"
                  alt="Notification"
                />
            </button>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img
                  src="/icons/home/search.svg"
                />
              </div>
              <input
                type="search"
                placeholder="Search"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
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
      </div>
    );
  }