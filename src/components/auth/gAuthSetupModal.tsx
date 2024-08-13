"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { newGAuthSetup } from "@/lib/user/userSlice";

const GAuthSetupModal = ({ isOpen, onClose }: any) => {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [authImg, setAuthImg] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isAuth, setIsAuth] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setAuthImg(userData.setupUrl);
  }, [userData]);

  useEffect(() => {
    if (authImg) {
      try {
        const base64Data = authImg.split(",")[1];
        const qrUrl = createBlobUrl(base64Data);
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error("Failed to create QR code URL:", error);
      }
    }
  }, [authImg]);

  useEffect(() => {
    if (userData.isError) {
      let message = userData.errorMessage;
      if (message.startsWith("!")) {
        message = message.substring(1).trim();
      }
      setErrorMessage(message);
    }
  }, [userData]);

  const createBlobUrl = (base64Data: string) => {
    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error decoding base64 string:", error);
      return "";
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        const nextInput = document.getElementById(`auth-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`auth-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  if (!isOpen) return null;

  const handleVerify = () => {
    const tempToken = userData.tempToken;
    const gcode = code.join("");

    dispatch(newGAuthSetup({ tempToken, gcode }))
      .unwrap()
      .then((response) => {
        if (response.status.status === 1) {
          setIsAuth(true);
        }
      })
      .catch((error) => {
        console.error("Failed to fetched sign in:", error);
      });
  };

  const handleClose = () => {
    onClose();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-8 z-10 max-w-sm lg:max-w-md xl:max-w-md 2xl:max-w-md">
        <div className="flex justify-between items-center mb-2">
          <img src="/icons/gauth.svg" alt="gauth" />
          <img
            className="cursor-pointer"
            src="/icons/close-fill.svg"
            alt="close-fill"
            onClick={onClose}
          />
        </div>
        <h2 className="mb-2">Authenticator</h2>
        <h6 className="mb-6">Open Authenticator and scan barcode.</h6>
        {isAuth ? (
          <div className="flex flex-col items-center my-8 gap-8">
            <img
              className="h-16 w-16"
              src="/icons/checklist.svg"
              alt="checklist"
            />
            <h6 className="text-green-500">OTP code entered correctly.</h6>
          </div>
        ) : (
          <>
            <div className="relative mb-6">
              <img src="/images/scan.png" alt="scan" />
              <div className="absolute inset-0 flex items-center justify-center">
                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
              </div>
            </div>
            <div className="flex justify-center mb-2">
              <h6>Enter the code</h6>
            </div>
            <div className="flex justify-center gap-2 mb-8">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`auth-input-${index}`}
                  type="text"
                  className="border rounded p-2 text-center w-12"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            {userData.isError && errorMessage !== "" && (
              <div className="flex mb-8 gap-4 justify-center">
                <img src="/icons/info-error.svg" alt="info-error" />
                <h6 className="text-red">{errorMessage}</h6>
              </div>
            )}
          </>
        )}
        {isAuth ? (
          <button
            className="bg-sage w-full py-3 px-4 rounded-lg text-white hover:bg-blue-hv"
            onClick={handleClose}
          >
            Close
          </button>
        ) : (
          <button
            className="flex items-center justify-center bg-sage w-full py-3 px-4 rounded-lg text-white hover:bg-blue-hv"
            onClick={handleVerify}
          >
            {userData.isLoading ? (
              <img
                className="w-8 h-8"
                src="/images/loading.gif"
                alt="loading"
              />
            ) : (
              `Verify`
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GAuthSetupModal;
