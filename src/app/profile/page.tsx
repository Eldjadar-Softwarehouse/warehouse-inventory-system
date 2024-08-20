"use client";

import React, { useState } from 'react'
import Image from 'next/image'

const Profile = () => {
  const src = "/images/profile-picture.png"
  const [image, setImage] = useState(src);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("Jacob Ventures");
  const [username, setUsername] = useState("Jacob123");
  const [email, setEmail] = useState("Fahritermi@gmail.co.id");

  const handleProfileEdit = ({ name, username, email}: any) => {
    setName(name);
    setUsername(username);
    setEmail(email);
  };

  const handleUpdateProfilePicture = () => {
    const fileInput = document.getElementById('profile-picture-input');
    fileInput?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file === null){
      setFile(file);
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        setImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed h-5/6 w-4/6 left-112 right-10 bottom-10 mt-5 border-solid border-2 rounded-3xl bg-white">
      <div className="fixed h-full w-4/6">
        <img
          className="object-cover w-full"
          src="/images/cover-photo.png"
          alt="cover"
        />
      </div>
      <div className="flex">
        <button
          className="block ml-2 mt-20 py-2 px-4 rounded z-10"
          onClick={handleUpdateProfilePicture}
        >
          <Image
          className="rounded-full object-cover"
          src={image}
          alt="Profile Picture"
          width={150}
          height={150}
          />
        </button>
        <input
          className="hidden z-10"
          type="file"
          id="profile-picture-input"
          accept="image/*"
          onChange={handleFileChange}
        />
        <span className="flex justify-center mt-36 ml-2 font-bold text-xl z-10">
          {name}
        </span>
      </div>
      <div className="flex ml-10 mt-4 mr-10">
        <div className="flex w-full">
          <div className="flex flex-grow flex-col">
            <span className="font-bold text-sm">
              Your Account Details
            </span>
            <span className="text-sm text-gray-1 mt-1">
              Update your detail here
            </span>
          </div>
          <div className="justify-end text-xs">
            <button
              className="bg-black text-white hover:bg-gray-1 px-2 py-2 rounded z-10 text-xs"
              onClick={handleProfileEdit}
              >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="ml-10 mt-5 mr-10  border-t-2">
        <div className="flex w-full mt-5">
          <div className="flex flex-grow flex-col">
            <span className="font-bold text-sm">
              Full Name
            </span>
            <span className="text-sm text-gray-1 mt-1">
              Your Full name will be displayed on your profile
            </span>
          </div>
          <div className="justify-end text-xs w-1/2 mt-1">
            <input
              type="text"
              className="w-full p-2 pl-3 text-sm border rounded"
              value={name}
              onChange={handleProfileEdit}
            />
          </div>
        </div>
        <div className="flex w-full mt-5">
          <div className="flex flex-grow flex-col">
            <span className="font-bold text-sm">
              Username
            </span>
            <span className="text-sm text-gray-1 mt-1">
              Your Username will be displayed on your profile
            </span>
          </div>
          <div className="justify-end text-xs w-1/2 mt-1">
            <input
              type="text"
              className="w-full p-2 pl-3 text-sm border rounded"
              value={username}
            />
          </div>
        </div>
        <div className="flex w-full mt-5">
          <div className="flex flex-grow flex-col">
            <span className="font-bold text-sm">
              Email
            </span>
            <span className="text-sm text-gray-1 mt-1">
              Your Email will be displayed on your profile
            </span>
          </div>
          <div className="justify-end text-xs w-1/2 mt-1">
            <input
              type="text"
              className="w-full p-2 pl-3 text-sm border rounded"
              value={email}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile