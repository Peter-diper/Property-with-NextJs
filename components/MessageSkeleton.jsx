import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200 animate-pulse">
      {/* Title */}
      <div className="h-7 w-3/4 bg-gray-300 rounded mb-4"></div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded w-10/12"></div>
        <div className="h-4 bg-gray-200 rounded w-8/12"></div>
      </div>

      {/* Details */}
      <ul className="mt-6 space-y-3">
        <li className="flex items-center gap-2">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </li>

        <li className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </li>

        <li className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
        </li>

        <li className="flex items-center gap-2">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </li>
      </ul>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <div className="h-9 w-28 bg-gray-300 rounded-md"></div>
        <div className="h-9 w-20 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
