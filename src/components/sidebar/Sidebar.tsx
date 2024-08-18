"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

const Sidebar: React.FC = () => {
  const router = useRouter();
  //const userData = useAppSelector((state) => state.user);
  //const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState(false);
  const [menuItem, setMenuItem] = useState<any>([]);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
  };

  const handleClick = () => {
    setSelectedItem(!selectIedtem);
  };

  useEffect (() => {
    if (menuItem.length == 0){
    let menu = localStorage.getItem("menuData")
    if (menu) {setMenuItem(JSON.parse(menu))}
      
    }
  },[])

  //console.log(userData);
  console.log('A');
  console.log(menuItem.length);

  return (
    <div>
      <div className="fixed top-0 left-0 h-screen overflow-y-scroll overflow-x-hidden w-64 p-4 bg-gray-6">
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
                {/* {menuItem.map((menu: any) => (
                  <Link href="">
                    <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-4 group font-normal">
                      <img
                        className="mr-2 hidden group-hover:block"
                        //src={`/icons/sidebar/hover/${menu.group}.svg`}
                        src={`/icons/sidebar/hover/dashboard.svg`}
                        alt={`${menu.group} hover`}
                        />
                      <img
                        className="mr-2 block group-hover:hidden"
                        //src={`/icons/sidebar/default/${menu.group}.svg`}
                        src={`/icons/sidebar/default/dashboard.svg`}
                        alt={menu.group}
                        />
                      <div>
                      {menu.feature.map((feature: any) => (
                        <div>
                          {menu.feature.length > 1 ? (
                            <Link
                            href={feature.subMenuRoute}
                            onClick={handleClick}
                            key={feature.subMenu}
                            >
                            </Link>
                          ) : null}
                        </div>
                      ))}
                      </div>
                      <span className="ml-2 transition-opacity duration-300 delay-200 text-sm text-black group-hover:font-bold">
                        {menu.group}
                      </span>
                    </div>
                  </Link>
                ))} */}
                  {menuItem.map((menu: any) => (
                    <div>
                      {menu.feature.length == 1 ? (
                        <div>
                          {menu.feature.map((feature: any) => (
                            <div>
                              <Link
                                href={feature.subMenuRoute}
                                onClick={toggleSubMenu}
                                key={feature.subMenu}
                                className="font-normal"
                              >
                                <div className="flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-4 group">
                                  <img
                                    className="mr-2 hidden group-hover:block"
                                    //src={`/icons/sidebar/hover/${menu.group}.svg`}
                                  src={`/icons/sidebar/hover/dashboard.svg`}
                                    alt={`${feature.subMenu} hover`}
                                  />
                                  <img
                                    className="mr-2 block group-hover:hidden"
                                    //src={`/icons/sidebar/default/${menu.group}.svg`}
                                    src={`/icons/sidebar/default/dashboard.svg`}
                                    alt={feature.subMenu}
                                  />
                                  <span className="ml-2 transition-opacity duration-300 delay-200 text-sm text-black group-hover:font-bold">
                                    {menu.group}
                                  </span>
                                </div>
                              </Link>
                            </div>
                          ))
                        }
                      </div>) : null}
                    </div>
                  ))}
              </ul>
            </div>
            <div className="mt-10 mb-10 border-t-2">
              <ul>
                <h3 className="text-gray-1 text-xs mt-5">Account</h3>
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
            <div className="flex flex-col justify mb-0 pb-0 border-t-2 bottom-3 w-48">
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
