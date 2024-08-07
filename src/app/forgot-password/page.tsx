"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { forgotPassword } from "@/lib/user/userSlice";
import ForgotPasswordModal from "@/components/forgotPasswordModal";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(forgotPassword({ username }))
      .unwrap()
      .then((response) => {
        if (response.status.status === 1) {
          setIsModalOpen(true);
        }
      })
      .catch((error) => {
        console.error("Failed to fetched forgot password:", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  useEffect(() => {
    if (userData.isError) {
      let message = userData.errorMessage;
      if (message.startsWith("!")) {
        message = message.substring(1).trim();
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
          <h1>Please Reset on This Page to Regain Access.</h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-2">
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
            <div className="flex mb-4 gap-4">
              {userData.isError && errorMessage !== "" && (
                <>
                  <img src="/icons/info-error.svg" alt="info-error" />
                  <h6 className="text-red">{errorMessage}</h6>
                </>
              )}
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-sage w-[105px] h-[40px] text-white py-2 px-4 rounded flex items-center justify-center hover:bg-blue-hv focus:outline-none focus:shadow-outline"
              >
                {userData.isLoading ? (
                  <p>LOADING</p>
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
          src="images/fogot-password-animate.png"
          alt="fogot-password-animate"
        />
      </div>

      <ForgotPasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ForgotPasswordPage;
