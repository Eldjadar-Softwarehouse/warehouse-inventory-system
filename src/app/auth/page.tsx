"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

const securityComponents = {
  PIN: (
    <div className="flex justify-between border border-gray-4 py-3 px-6 rounded-md">
      <div className="flex gap-3">
        <img src="/icons/pin.svg" alt="pin" />
        <div className="flex flex-col gap-1">
          <h5>PIN</h5>
          <h6>Protect your account with PIN</h6>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img src="/icons/arrow-right-line.svg" alt="arrow-right-line" />
      </div>
    </div>
  ),
  OTP: (
    <div className="flex justify-between border border-gray-4 py-3 px-6 rounded-md">
      <div className="flex gap-3">
        <img src="/icons/otp.svg" alt="otp" />
        <div className="flex flex-col gap-1">
          <h5>OTP</h5>
          <h6>Protect your account with email 2FA</h6>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img src="/icons/arrow-right-line.svg" alt="arrow-right-line" />
      </div>
    </div>
  ),
  GAuth: (
    <div className="flex justify-between border border-gray-4 py-3 px-6 rounded-md">
      <div className="flex gap-3">
        <img src="/icons/gauth.svg" alt="gauth" />
        <div className="flex flex-col gap-1">
          <h5>Authenticator</h5>
          <h6>Protect your account with Google Authenticator</h6>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img src="/icons/arrow-right-line.svg" alt="arrow-right-line" />
      </div>
    </div>
  ),
};

const DashboardPage = () => {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!userData.isSignin) {
      router.push("/login");
    }
  }, [userData]);

  return (
    <>
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
              <h1>Set up Google Authenticator for enhanced security.</h1>
            </div>
            <div className="flex flex-col gap-4 ">
              {userData.security.map((security) => (
                <div key={security}>{securityComponents[security]}</div>
              ))}
            </div>
          </div>
          <div className="flex h-[147px]" />
        </div>
        <div className="min-w-[40%] hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex 2x:flex py-8 pr-16">
          <img
            className="w-full"
            src="images/2fa-animate.png"
            alt="login-animate"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
