"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { signIn } from "@/lib/user/userSlice";
import UserSuspendedModal from "@/components/auth/userSuspendedModal";

const LoginPage = () => {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(signIn({ username, password }))
      .unwrap()
      .then((response) => {
        if (response.status.status === 1) {
          router.push("/auth");
        }
      })
      .catch((error) => {
        console.error("Failed to fetched sign in:", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userData.isError) {
      let message = userData.errorMessage;
      if (message.startsWith("!")) {
        message = message.substring(1).trim();
      }
      if (message === "user has been suspended") {
        message = "";
        setIsModalOpen(true);
      }
      setErrorMessage(message);
    }
  }, [userData]);

  return (
    <div className="w-screen h-screen flex flex-row overflow-hidden">
      <div className="w-full h-screen flex flex-col justify-between bg-[url('/images/bg-login.png')] bg-no-repeat bg-cover">
        <div className="flex">
          <img
            className="px-4 md:px-16 lg:px-16 2xl:px-16 py-4"
            src="/images/logo.png"
            alt="logo"
          />
        </div>
        <div className="flex flex-col px-4 md:px-28 lg:px-28 2xl:px-28 max-w-3xl gap-8">
          <div className="flex gap-1">
            <h1>Inventory Login Portal - Manage Your Stock and Supplies.</h1>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-1 mb-2">
                <h5>Username</h5>
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="appearance-none shadow-md border-2 rounded-md w-full h-[65px] py-2 px-3 leading-tight focus:outline-none focus:border-sage focus:shadow-blue-hv"
                placeholder="Enter Username"
              />
            </div>
            <div className="mb-2 relative">
              <label htmlFor="password" className="block text-gray-1 mb-2">
                <h5>Password</h5>
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="appearance-none shadow-md border-2 rounded-md w-full h-[65px] py-2 px-3 leading-tight focus:outline-none focus:border-sage focus:shadow-blue-hv pr-10"
                placeholder="Enter Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pt-8 pr-3"
                onClick={togglePasswordVisibility}
              >
                <img
                  src={
                    passwordVisible
                      ? "/icons/eye-open.svg"
                      : "/icons/eye-close.svg"
                  }
                  alt="Toggle Password Visibility"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="flex mb-4 gap-4">
              {userData.isError && errorMessage !== "" && (
                <>
                  <img src="/icons/info-error.svg" alt="info-error" />
                  <h6 className="text-red">{errorMessage}</h6>
                </>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <h6>Having trouble logging in? Click </h6>
                <Link href="/forgot-password">
                  <h6>Forgot Password?</h6>
                </Link>
              </div>
              <button
                type="submit"
                className="bg-sage w-[105px] h-[40px] text-white py-2 px-4 rounded flex items-center justify-center hover:bg-blue-hv focus:outline-none focus:shadow-outline"
              >
                {userData.isLoading ? (
                  <img
                    className="w-8 h-8"
                    src="/images/loading.gif"
                    alt="loading"
                  />
                ) : (
                  <img
                    src="/icons/arrow-right-line.svg"
                    alt="arrow-right-line"
                  />
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="flex h-[147px]" />
      </div>
      <div className="min-w-[40%] hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex 2x:flex py-8 pr-16">
        <img
          className="w-full"
          src="images/login-animate.png"
          alt="login-animate"
        />
      </div>

      <UserSuspendedModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LoginPage;
