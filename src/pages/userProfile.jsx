import React from 'react'
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";

const UserProfile = () => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <img
          className="w-24 h-24 rounded-full border-4 border-blue-500"
          src="https://via.placeholder.com/150"
          alt="User Avatar"
        />

        {/* User Info */}
        <h2 className="mt-4 text-xl font-semibold text-gray-800">Sarah John</h2>
        <p className="text-gray-600">sarah@example.com</p>

        {/* Action Buttons */}
        <div className="mt-4 flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            <FaUserEdit className="mr-2" /> Edit Profile
          </button>
          <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
