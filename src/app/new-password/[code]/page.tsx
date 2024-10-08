"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { newPassword, resetErrorState } from "@/lib/user/userSlice";
import NewPasswordModal from "@/components/auth/newPasswordModal";

const NewPasswordPage = () => {
  const router = useRouter();
  const params = useParams();
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleCPasswordChange = (e: any) => {
    setCPassword(e.target.value);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(newPassword({ password, cpassword, code }))
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
    const urlCode = params["code"];

    if (Array.isArray(urlCode)) {
      setCode(urlCode[0] || "");
    } else {
      setCode(urlCode || "");
    }
  }, [params]);

  useEffect(() => {
    dispatch(resetErrorState());
  }, [dispatch]);

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
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-1 mb-2">
                <h5>New Password</h5>
              </label>
              <input
                type={newPasswordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="appearance-none shadow-md border-2 rounded-md w-full h-[65px] py-2 px-3 leading-tight focus:outline-none focus:border-sage focus:shadow-blue-hv pr-10"
                placeholder="Enter New Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pt-8 pr-3"
                onClick={toggleNewPasswordVisibility}
              >
                <img
                  src={
                    newPasswordVisible
                      ? "/icons/eye-open.svg"
                      : "/icons/eye-close.svg"
                  }
                  alt="Toggle Password Visibility"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-1 mb-2">
                <h5>Confirm Password</h5>
              </label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="cpassword"
                value={cpassword}
                onChange={handleCPasswordChange}
                className="appearance-none shadow-md border-2 rounded-md w-full h-[65px] py-2 px-3 leading-tight focus:outline-none focus:border-sage focus:shadow-blue-hv pr-10"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pt-8 pr-3"
                onClick={toggleConfirmPasswordVisibility}
              >
                <img
                  src={
                    confirmPasswordVisible
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
            <div className="flex items-center justify-end">
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
          src="/images/fogot-password-animate.png"
          alt="fogot-password-animate"
        />
      </div>

      <NewPasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default NewPasswordPage;
