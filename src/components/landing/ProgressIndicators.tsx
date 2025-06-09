
import React from 'react';

const ProgressIndicators: React.FC = () => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
        />
      ))}
    </div>
  );
};

export default ProgressIndicators;
