import React from "react";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-[80%] md:w-full border">
      <div className="mb-4">
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Country</span>
          <span className="font-medium">India</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Email</span>
          <span className="font-medium">{user.Email}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>FullName</span>
          <span className="font-medium">{user.FullName}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
