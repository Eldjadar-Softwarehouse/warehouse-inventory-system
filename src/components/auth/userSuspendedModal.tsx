import React from "react";

const UserSuspendedModal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm lg:max-w-md xl:max-w-md 2xl:max-w-md">
        <img src="/icons/warning-error.svg" alt="warning-error" />
        <h2 className="mb-4">Account Suspended</h2>
        <h5 className="text-sage mb-2">Important</h5>
        <p className="text-red mb-2">Your account has been temporarily locked due to too many failed login attempts. Please reset your password.</p>
        <h6 className="mb-8">Please forgot your password</h6>
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

export default UserSuspendedModal;
