"use client";

import Toogle from '@/components/interaction/toogle';
import React, { useState } from 'react'

const Profile = () => {
  const [usingGoogleAuth, setUsingGoogleAuth] = useState(false);
  const [usingPin, setUsingPin] = useState(false);
  const [usingOTP, setUsingOTP] = useState(false);

  const handleResetButton = () => {
    const fileInput = document.getElementById('profile-picture-input');
    fileInput?.click();
  };

  const handleGoogleAuthClick = () => {
    setUsingGoogleAuth(!usingGoogleAuth);
  };

  const handlePinClick = () => {
    setUsingPin(!usingPin);
  };

  const handleOTPClick = () => {
    setUsingOTP(!usingOTP);
  };

  return (
    <div className="fixed h-3/5 w-4/6 left-112 right-10 top-15 mt-5 border-solid border-2 rounded-3xl bg-white">
      <div className="flex ml-10 mt-10 mr-10">
        <div className="flex w-full">
          <div className="flex flex-grow flex-col">
            <span className="font-bold text-base mb-5">
              Security
            </span>
            <span className="font-bold text-sm">
              Reset Security
            </span>
            <span className="text-sm text-gray-1 mt-1">
              Set up security to default settings
            </span>
          </div>
          <div className="justify-end text-xs pt-12">
            <button
              className="bg-red text-white hover:bg-gray-1 px-2 py-2 rounded z-10 text-xs w-24"
              onClick={handleResetButton}
              >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="ml-10 mt-5 mr-10  border-t-2">
        <div className="flex w-full mt-5">
          <div className="flex flex-grow flex-col">
            <span className="font-bold text-sm">
              Google Authenticator
            </span>
            <span className="text-sm text-gray-1 mt-1">
              Update your detail here
            </span>
          </div>
          <Toogle onChange={handleGoogleAuthClick} />
        </div>
        <div className="flex w-full mt-5">
          <div className="flex flex-grow flex-col">
            <span className="font-bold text-sm">
              PIN
            </span>
            <span className="text-sm text-gray-1 mt-1">
              Update your detail here
            </span>
          </div>
          <Toogle onChange={handlePinClick} />
        </div>
        <div className="flex w-full mt-5">
          <div className="flex flex-grow flex-col">
            <span className="font-bold text-sm">
              OTP
            </span>
            <span className="text-sm text-gray-1 mt-1">
              Update your detail here
            </span>
          </div>
          <Toogle onChange={handleOTPClick} />
        </div>
      </div>
    </div>
  )
}

export default Profile