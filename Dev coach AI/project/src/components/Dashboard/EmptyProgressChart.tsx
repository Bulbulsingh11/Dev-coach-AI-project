import React from 'react';

interface EmptyProgressChartProps {
  onStartCheckin: () => void;
}

const EmptyProgressChart: React.FC<EmptyProgressChartProps> = ({ onStartCheckin }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Progress</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <span className="text-gray-400 dark:text-gray-500">Mood</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <span className="text-gray-400 dark:text-gray-500">Focus</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <span className="text-gray-400 dark:text-gray-500">Energy</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-64 flex items-center justify-center">
        {/* Empty chart background */}
        <div className="absolute inset-0 flex items-end justify-between px-4">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="flex items-end space-x-1">
                <div className="w-3 h-4 bg-gray-200 dark:bg-gray-700 rounded-t"></div>
                <div className="w-3 h-4 bg-gray-200 dark:bg-gray-700 rounded-t"></div>
                <div className="w-3 h-4 bg-gray-200 dark:bg-gray-700 rounded-t"></div>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{day}</span>
            </div>
          ))}
        </div>

        {/* Empty state content */}
        <div className="text-center z-10 bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No Data Yet</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Complete daily check-ins to see your progress trends
          </p>
          <button
            onClick={onStartCheckin}
            className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start First Check-in
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyProgressChart;