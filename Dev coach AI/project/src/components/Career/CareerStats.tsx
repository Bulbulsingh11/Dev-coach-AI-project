import React from 'react';

const CareerStats: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Career Stats</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Years Experience</span>
          <span className="font-semibold text-gray-900 dark:text-white">0.0</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Network Size</span>
          <span className="font-semibold text-gray-900 dark:text-white">0</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Skills Mastered</span>
          <span className="font-semibold text-gray-900 dark:text-white">0</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Goals Achieved</span>
          <span className="font-semibold text-gray-900 dark:text-white">0/0</span>
        </div>
      </div>
    </div>
  );
};

export default CareerStats;