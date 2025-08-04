import React from 'react';

function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-t-1 border-r-1 border-orange-500" />
    </div>
  );
}

export default SpinnerLoader;
