"use client";

import React, { useState } from 'react'
import Image from 'next/image'

const Header = () => {
    const [notificationDropdown, setNotificationDropdown] = useState(false);

    return (
        <div className="w-auto h-auto">
            <div className="flex justify-end ml-256 border-gray-200 pr-10">
                <button 
                    className="justify-center mr-4 mt-5 z-10" 
                    onClick={() => setNotificationDropdown(!notificationDropdown)}
                >
                    <img
                    src="/icons/home/notification.svg"
                    alt="Notification"
                    />
                </button>
                {notificationDropdown ? (
                    <NotificationDropdown />
                ) : null}
                <div className="relative mt-5">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <img
                        src="/icons/home/search.svg"
                        />
                    </div>
                <input
                    type="search"
                    placeholder="Search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                </div>
            </div>
        </div>
    )
}

const NotificationDropdown = () => {
    return (
        <div id="dropdownNotification" className="absolute z-20 mt-16 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
        <div className="px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0">
                <img className="rounded-full" src="/icons/logo-blue.svg" alt="Jese image" />
            </div>
            <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
            </div>
            </a>

            <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">

            </a>

        </div>
        <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
            <div className="inline-flex items-center">
            <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">

            </svg>
            View all
            </div>
        </a>
        </div>
    )
}

export default Header