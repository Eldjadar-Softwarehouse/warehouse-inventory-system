// components/Sidebar.tsx
import React from 'react';
import { MenuItem, dynamicMenuItems } from "./menuItems";
import Link from 'next/link';

interface SidebarMenu {
  menu: MenuItem[],
}

const Sidebar: React.FC<SidebarMenu> = () => {
  const dynamicMenu = dynamicMenuItems

  return (
    <div>
      <div className="fixed top-0 left-0 h-screen w-64 bg-[#F4F4F6] p-4">
        <div>
          <div>
            <img
              className="w-max h-max mx-auto mb-10"
              src="/images/logo-blue.png"
              alt="logo"
            />  
          </div>
          <div className="mb-10">
            <h3 className="text-base text-[#7C7B84]">Menu</h3>
            <ul>
              {dynamicMenu?.map((item) => (
                <Link href={item.url} key={item.id}>
                  <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-700">
                    <img
                      className="w-18 h-18 mr-2"
                      src={item.icon}
                      alt={item.label}
                    />
                    <span className="ml-2 transition-opacity duration-300 delay-200 text-black">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}
              </ul>
            </div>
            <hr />
            <div className="mt-10 mb-10">
              <ul>
                <h3 className="text-base text-[#7C7B84]">Account</h3>
                  <div>
                    <Link href="/profile">
                    <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-700">
                      <img
                        className="w-18 h-18 mr-2"
                        src="/images/profile.png"
                        alt="Profile"
                        />
                      <span className="ml-2 transition-opacity duration-300 delay-200 text-black">
                        Profile
                      </span>
                      </div>
                    </Link>
                    <Link href="/messages">
                    <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-700">
                      <img
                        className="w-18 h-18 mr-2"
                        src="/images/messages.png"
                        alt="Messages"
                        />
                      <span className="ml-2 transition-opacity duration-300 delay-200 text-black">
                        Messages
                      </span>
                      </div>
                    </Link>
                  </div>
                  <div className="fixed bottom-0">
                    <Link href="/settings">
                    <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-700">
                      <img
                        className="w-18 h-18 mr-2"
                        src="/images/settings.png"
                        alt="Settings"
                        />
                      <span className="ml-2 transition-opacity duration-300 delay-200 text-black">
                        Settings
                      </span>
                      </div>
                    </Link>
                    <Link href="/logout">
                    <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-700">
                      <img
                        className="w-18 h-18 mr-2"
                        src="/images/logout.png"
                        alt="Logout"
                        />
                      <span className="ml-2 transition-opacity duration-300 delay-200 text-black">
                        Logout
                      </span>
                      </div>
                    </Link>
                  </div>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;