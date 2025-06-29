import React from 'react';
import { Users } from 'lucide-react';

interface NetworkingGoal {
  goal: string;
  progress: number;
}

interface NetworkingProgressProps {
  goals: NetworkingGoal[];
}

const NetworkingProgress: React.FC<NetworkingProgressProps> = ({ goals }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Networking Goals</h3>
      </div>
      <div className="space-y-4">
        {goals.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.goal}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkingProgress;