"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";


const Submenu: React.FC = (selectedMenu) => {
  const router = useRouter();
  //const userData = useAppSelector((state) => state.user);
  //const dispatch = useAppDispatch();
  const [menuItem, setMenuItem] = useState<any>([]);
  const [subnav, setSubnav] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    sessionStorage.getItem('selectedItem') || '/profile'
  );

  const showSubnav = () => setSubnav(!subnav);

  const handleClick = (url: any) => {
    setSelectedItem(url);
  };

  useEffect (() => {
    if (menuItem.length == 0){
    let menu = localStorage.getItem("menuData")
    if (menu) {setMenuItem(JSON.parse(menu))}
      
    }
  },[])

  return (
    <div>
      <div className="fixed top-0 h-full left-60 ml-5 w-48">
        <ul>
            <h3 className="mt-5 font-bold">My Account</h3>
            <div className="mt-16">
                <Link href="/profile" onClick={() => handleClick('/profile')} className="font-normal">
                <div className="flex py-2.5 px-4 rounded transition duration-300 hover:bg-gray-4 group">
                    <span className="ml-2 transition-opacity duration-300 delay-200 text-sm text-black group-hover:font-bold">
                    Profile
                    </span>
                </div>
                </Link>
                <Link href="/profile/security" onClick={() => handleClick('/profile/security')} className="font-normal">
                <div className="flex py-2.5 px-4 rounded transition duration-300 hover:bg-gray-4 group">
                    <span className="ml-2 transition-opacity duration-300 delay-200 text-sm text-black group-hover:font-bold">
                    Security
                    </span>
                </div>
                </Link>
            </div>
        </ul>
      </div>
    </div>
  );
};

export default Submenu;