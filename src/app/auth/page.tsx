"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import PinModal from "@/components/auth/pinModal";
import OtpModal from "@/components/auth/otpModal";
import GAuthModal from "@/components/auth/gAuthModal";
import GAuthSetupModal from "@/components/auth/gAuthSetupModal";

const securityComponents: Record<string, string> = {
  PIN: "PinModal",
  OTP: "OtpModal",
  GAuth: "GAuthModal",
};

const AuthPage: React.FC = () => {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user);

  const [modalOpen, setModalOpen] = useState<{
    PinModal: boolean;
    OtpModal: boolean;
    GAuthModal: boolean;
  }>({
    PinModal: false,
    OtpModal: false,
    GAuthModal: false,
  });
  const [setupModalOpen, setSetupModalOpen] = useState(false);

  useEffect(() => {
    if (!userData.isSignin) {
      router.push("/login");
    }
  }, [userData, router]);

  const handleOpenModal = (modalName: string) => {
    setModalOpen((prev) => ({ ...prev, [modalName]: true }));
  };

  const handleCloseModal = (modalName: string) => {
    setModalOpen((prev) => ({ ...prev, [modalName]: false }));
  };

  const handleSetupModalOpen = () => {
    setSetupModalOpen(true);
  };

  const closeModal = () => {
    setSetupModalOpen(false);
  };

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
              {userData.security.map((security: string) => {
                const Component = securityComponents[security];
                return (
                  <div
                    key={security}
                    className="flex justify-between border border-gray-1 py-3 px-6 rounded-lg hover:cursor-pointer hover:bg-gray-4 hover:bg-opacity-50"
                    onClick={() => handleOpenModal(Component)}
                  >
                    <div className="flex gap-3">
                      <img
                        src={`/icons/${security.toLowerCase()}.svg`}
                        alt={security.toLowerCase()}
                      />
                      <div className="flex flex-col gap-1">
                        <h5>{security}</h5>
                        <h6>Protect your account with {security}</h6>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <img
                        src="/icons/arrow-right-fill.svg"
                        alt="arrow-right-fill"
                      />
                    </div>
                  </div>
                );
              })}
              {userData.isSetup && (
                <>
                  <div
                    key="setupGAuth"
                    className="flex justify-between border border-gray-1 py-3 px-6 rounded-lg hover:cursor-pointer hover:bg-gray-4 hover:bg-opacity-50"
                    onClick={() => handleSetupModalOpen()}
                  >
                    <div className="flex gap-3">
                      <img src={`/icons/gauth.svg`} alt="gauth" />
                      <div className="flex flex-col gap-1">
                        <h5>Authenticator</h5>
                        <h6>Protect your account with Authenticator</h6>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <img
                        src="/icons/arrow-right-fill.svg"
                        alt="arrow-right-fill"
                      />
                    </div>
                  </div>
                </>
              )}
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
      <PinModal
        isOpen={modalOpen.PinModal}
        onClose={() => handleCloseModal("PinModal")}
      />
      <OtpModal
        isOpen={modalOpen.OtpModal}
        onClose={() => handleCloseModal("OtpModal")}
      />
      <GAuthModal
        isOpen={modalOpen.GAuthModal}
        onClose={() => handleCloseModal("GAuthModal")}
      />
      <GAuthSetupModal isOpen={setupModalOpen} onClose={closeModal} />

    </>
  );
};

export default AuthPage;
