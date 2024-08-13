"use client";

import { useEffect, useState } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

const DashboardPage = () => {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div>
      <p>DashboardPage</p>
      
      <button
        className="bg-red text-white p-2 border-2 rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
