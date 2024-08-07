"use client";

import React, { useState } from "react";

const GAuthModal = ({ isOpen, onClose }: any) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

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
        <button className="bg-sage w-full py-3 px-4 rounded-lg text-white hover:bg-blue-hv">
          Verify
        </button>
      </div>
    </div>
  );
};

export default GAuthModal;
