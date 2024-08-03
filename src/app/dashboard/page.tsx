"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { increment, decrement } from "@/lib/counter/counterSlice";

const DashboardPage = () => {
  const router = useRouter();
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
  };

  return (
    <div>
      <p>DashboardPage</p>
      <button
        className="bg-blue-400 text-white p-2 border-2 rounded-lg"
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        className="bg-yellow-500 text-white p-2 border-2 rounded-lg"
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
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
