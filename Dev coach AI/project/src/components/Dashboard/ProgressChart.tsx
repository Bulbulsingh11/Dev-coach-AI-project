import React from 'react';

const ProgressChart: React.FC = () => {
  const data = [
    { day: 'Mon', mood: 8, focus: 7, energy: 6 },
    { day: 'Tue', mood: 7, focus: 8, energy: 7 },
    { day: 'Wed', mood: 9, focus: 9, energy: 8 },
    { day: 'Thu', mood: 6, focus: 6, energy: 5 },
    { day: 'Fri', mood: 8, focus: 8, energy: 7 },
    { day: 'Sat', mood: 9, focus: 7, energy: 9 },
    { day: 'Sun', mood: 8, focus: 6, energy: 8 }
  ];

  const maxValue = 10;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Progress</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Mood</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Focus</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Energy</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between px-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="flex items-end space-x-1">
                <div
                  className="w-3 bg-indigo-500 rounded-t transition-all duration-300 hover:bg-indigo-600"
                  style={{ height: `${(item.mood / maxValue) * 200}px` }}
                ></div>
                <div
                  className="w-3 bg-purple-500 rounded-t transition-all duration-300 hover:bg-purple-600"
                  style={{ height: `${(item.focus / maxValue) * 200}px` }}
                ></div>
                <div
                  className="w-3 bg-teal-500 rounded-t transition-all duration-300 hover:bg-teal-600"
                  style={{ height: `${(item.energy / maxValue) * 200}px` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;