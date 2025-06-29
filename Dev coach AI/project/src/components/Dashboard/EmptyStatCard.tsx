import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface EmptyStatCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: 'indigo' | 'purple' | 'teal' | 'amber' | 'rose';
  actionText: string;
  onAction: () => void;
}

const EmptyStatCard: React.FC<EmptyStatCardProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  color, 
  actionText, 
  onAction 
}) => {
  const colorClasses = {
    indigo: 'bg-indigo-500 text-indigo-100',
    purple: 'bg-purple-500 text-purple-100',
    teal: 'bg-teal-500 text-teal-100',
    amber: 'bg-amber-500 text-amber-100',
    rose: 'bg-rose-500 text-rose-100'
  };

  const buttonColorClasses = {
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30',
    teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/30',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30',
    rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{title}</p>
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-8 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="w-0 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-400 dark:text-gray-500">0</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{subtitle}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[color]} flex-shrink-0 opacity-50`}>
          <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
      </div>
      <button
        onClick={onAction}
        className={`w-full text-xs sm:text-sm font-medium py-2 px-3 rounded-lg transition-colors ${buttonColorClasses[color]}`}
      >
        {actionText}
      </button>
    </div>
  );
};

export default EmptyStatCard;