"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";


const Sidebar: React.FC = () => {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [selectItem, setSelectedItem] = useState(false);
  const [menuItem, setMenuItem] = useState<any>([]);

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
  };

  const handleClick = () => {
    setSelectedItem(true);
  };

  useEffect (() => {
    let menu = localStorage.getItem("menuData")
    if (menu) {setMenuItem(menu)}
  },[menuItem])

  console.log(userData);
  console.log(menuItem);

  return (
    <div>
      <div className="fixed top-0 left-0 h-screen w-56 bg-gray-6 p-4">
        <div>
          <div>
            <img
              className="w-max h-max mx-auto mb-10"
              src="/icons/logo-blue.svg"
              alt="logo"
            />  
          </div>
          <div className="mb-10">
            <h3 className="text-gray-1 text-xs">Menu</h3>
            <ul>
              <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-4 group">
                {/* {menuItem.map((groupItem: any, groupIndex: any) => (
                  <Link href={groupItem.feature.subMenuRoot} onClick={handleClick} key={groupItem.feature.subMenu} className="font-normal">
                    <img
                      className="mr-2 hidden group-hover:block"
                      src="/icons/sidebar/hover/profile.svg"
                      alt="{menu} hover"
                    />
                    <img
                      className="mr-2 block group-hover:hidden"
                      src="/icons/sidebar/default/profile.svg"
                      alt={groupItem.feature.subMenu}
                    />
                    <span className="ml-2 transition-opacity duration-300 delay-200 text-sm text-black group-hover:font-bold">
                      {groupItem.feature.subMenu}
                    </span>
                  </Link>
                ))} */}
                {menuItem.map((groupItem: any, groupIndex: any) => (
                <div key={groupIndex} className="group">
                  <h2>{groupItem.group}</h2>
                  {groupItem.feature.map((featureItem: any, featureIndex: any) => (
                    <div key={featureIndex} className="feature">
                      <h3>{featureItem.subMenu}</h3>
                      <a href={featureItem.subMenuRoute}>
                        {featureItem.subMenuRoute}
                      </a>
                      {featureItem.extended && featureItem.feature.length > 0 && (
                        <div className="extended-features">
                          {featureItem.feature.map((subFeatureItem: any, subFeatureIndex: any) => (
                            <div key={subFeatureIndex} className="sub-feature">
                              <h4>{subFeatureItem.subMenu}</h4>
                              <a href={subFeatureItem.subMenuRoute}>
                                {subFeatureItem.subMenuRoute}
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              </div>
              </ul>
            </div>
            <div className="mt-10 mb-10 border-t-2">
              <ul>
                <h3 className="text-gray-1 text-xs size mt-5">Account</h3>
                <div>
                  <Link href="/profile" onClick={handleClick} className="font-normal">
                    <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-4 group">
                      <img
                        className="mr-2 block group-hover:hidden"
                        src="/icons/sidebar/default/profile.svg"
                        alt="Profile"
                      />
                      <img
                        className="mr-2 hidden group-hover:block"
                        src="/icons/sidebar/hover/profile.svg"
                        alt="Profile Hover"
                      />
                      <span className="ml-2 transition-opacity duration-300 delay-200 text-sm text-black group-hover:font-bold">
                        Profile
                      </span>
                    </div>
                  </Link>
                  <Link href="/messages" onClick={handleClick} className="font-normal">
                    <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-4 group">
                      <img
                        className="mr-2 block group-hover:hidden"
                        src="/icons/sidebar/default/message.svg"
                        alt="Messages"
                      />
                      <img
                        className="mr-2 hidden group-hover:block"
                        src="/icons/sidebar/hover/message.svg"
                        alt="Messages Hover"
                      />
                      <span className="ml-2 transition-opacity duration-300 delay-200 text-sm text-black group-hover:font-bold">
                        Messages
                      </span>
                    </div>
                  </Link>
                </div>
              </ul>
            </div>
            <div className="flex flex-col justify mb-0 pb-0 border-t-2 absolute bottom-3 w-48">
              <ul>
                <div>
                  <Link href="/settings" onClick={handleClick} className="font-normal">
                    <div className="flex items-center py-2.5 px-4 mt-5 rounded transition duration-300 hover:bg-gray-4 group">
                      <img
                        className="mr-2 block group-hover:hidden"
                        src="/icons/sidebar/default/setting.svg"
                        alt="Settings"
                      />
                      <img
                        className="mr-2 hidden group-hover:block"
                        src="/icons/sidebar/hover/setting.svg"
                        alt="Settings Hover"
                      />
                      <span className="ml-2 transition-opacity duration-300 delay-200 text-sm text-black group-hover:font-bold">
                        Settings
                      </span>
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="font-normal w-full">
                    <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-4 group">
                      <img
                        className="mr-2 block group-hover:hidden"
                        src="/icons/sidebar/default/logout.svg"
                        alt="Logout"
                      />
                      <img
                        className="mr-2 hidden group-hover:block"
                        src="/icons/sidebar/hover/logout.svg"
                        alt="Logout Hover"
                      />
                      <span className="ml-2 transition-opacity duration-300 delay-200 text-sm text-black group-hover:font-bold">
                        Logout
                      </span>
                    </div>
                  </button>
                </div>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;