import React from "react";

const ForgotPasswordModal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm lg:max-w-md xl:max-w-md 2xl:max-w-md">
        <img src="/icons/info.svg" alt="info" />
        <h2 className="mb-4">Check Your Email</h2>
        <h5 className="text-sage mb-2">Important</h5>
        <p className="mb-2">We sent you an email with a link and to reset your password.</p>
        <h6 className="mb-8">Check your email now!</h6>
        <button
          onClick={onClose}
          className="bg-sage w-full py-3 px-4 rounded-lg text-white hover:bg-blue-hv"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
