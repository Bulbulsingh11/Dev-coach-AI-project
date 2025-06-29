import React from 'react';
import { Plus } from 'lucide-react';

interface EmptyRecentActivityProps {
  onStartActivity: () => void;
}

const EmptyRecentActivity: React.FC<EmptyRecentActivityProps> = ({ onStartActivity }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No Activity Yet</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 max-w-xs mx-auto">
          Your activities will appear here as you complete check-ins, set goals, and use productivity tools
        </p>
        <button
          onClick={onStartActivity}
          className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Complete First Check-in
        </button>
      </div>
    </div>
  );
};

export default EmptyRecentActivity;