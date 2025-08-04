import React from "react";

function SkeletonLoader() {
  return (
    <div className="space-y-2 animate-pulse p-4">
      <div className="h-6 w-1/3 bg-gray-200 rounded" />
      <div className="h-4 w-2/3 bg-gray-300 rounded" />
      <div className="h-4 w-1/2 bg-gray-100 rounded" />
      <div className="h-32 w-full bg-gray-300 rounded" />

      <div className="h-6 w-1/3 bg-gray-200 rounded" />
      <div className="h-4 w-2/3 bg-gray-300 rounded" />
      <div className="h-4 w-1/2 bg-gray-100 rounded" />
      <div className="h-32 w-full bg-gray-300 rounded" />

      <div className="h-6 w-1/3 bg-gray-200 rounded" />
      <div className="h-4 w-2/3 bg-gray-300 rounded" />
      <div className="h-4 w-1/2 bg-gray-100 rounded" />
      <div className="h-32 w-full bg-gray-300 rounded" />
    </div>
  );
}

export default SkeletonLoader;
