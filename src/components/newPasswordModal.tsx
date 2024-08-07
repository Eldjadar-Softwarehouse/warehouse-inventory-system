import React from "react";

const NewPasswordModal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm lg:max-w-md xl:max-w-md 2xl:max-w-md">
        <img src="/icons/checklist.svg" alt="checklist" />
        <h2 className="mb-4">New password activated.</h2>
        <p className="mb-2">Your password has been changed. Enjoy access with your new password. Always keep it confidential.</p>
        <h6 className="mb-8">Log in now to access your account.</h6>
        <button
          onClick={onClose}
          className="bg-sage w-full py-3 px-4 rounded-lg text-white hover:bg-blue-hv"
        >
          Go to login
        </button>
      </div>
    </div>
  );
};

export default NewPasswordModal;
