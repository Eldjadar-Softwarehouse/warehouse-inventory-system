import React from "react";

const OtpModal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-8 z-10 max-w-sm lg:max-w-md xl:max-w-md 2xl:max-w-md">
        <div className="flex justify-between items-center mb-2">
          <img src="/icons/otp.svg" alt="otp" />
          <img
            className="cursor-pointer"
            src="/icons/close-fill.svg"
            alt="close-fill"
            onClick={onClose}
          />
        </div>
        <h2 className="mb-2">OTP</h2>
        <h6 className="mb-6">Check Your Email For OTP Code.</h6>

        <input
          className="mb-8 border rounded p-2 w-full"
          type="number"
          placeholder="Enter OTP"
        />
        <button className="bg-sage w-full py-3 px-4 rounded-lg text-white hover:bg-blue-hv">
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
