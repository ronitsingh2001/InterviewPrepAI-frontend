import React from "react";

function SessionLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 mb:px-0 animate-pulse">
        {[...Array(9)].map((i,idx) => (
            <div key={idx} className="bg-gray-200 border border-gray-300/40 rounded-xl h-[170px]"></div>
        ))}
    </div>
  );
}

export default SessionLoader;
