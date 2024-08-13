import React, { useState } from "react";

const PinModal = ({ isOpen, onClose }: any) => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < pin.length - 1) {
        const nextInput = document.getElementById(`pin-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
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
          <img src="/icons/pin.svg" alt="pin" />
          <img
            className="cursor-pointer"
            src="/icons/close-fill.svg"
            alt="close-fill"
            onClick={onClose}
          />
        </div>
        <h2 className="mb-2">PIN</h2>
        <h6 className="mb-6">Enter the 6-digit code your PIN.</h6>
        <div className="flex justify-center gap-2 mb-8">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-input-${index}`}
              type="password"
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

export default PinModal;
