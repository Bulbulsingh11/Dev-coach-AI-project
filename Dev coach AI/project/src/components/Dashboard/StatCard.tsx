import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'indigo' | 'purple' | 'teal' | 'amber' | 'rose';
  trend?: {
    value: number;
    label: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, color, trend }) => {
  const colorClasses = {
    indigo: 'bg-indigo-500 text-indigo-100',
    purple: 'bg-purple-500 text-purple-100',
    teal: 'bg-teal-500 text-teal-100',
    amber: 'bg-amber-500 text-amber-100',
    rose: 'bg-rose-500 text-rose-100'
  };

  const trendColorClasses = {
    indigo: 'text-indigo-600 dark:text-indigo-400',
    purple: 'text-purple-600 dark:text-purple-400',
    teal: 'text-teal-600 dark:text-teal-400',
    amber: 'text-amber-600 dark:text-amber-400',
    rose: 'text-rose-600 dark:text-rose-400'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-all duration-200 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{title}</p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs sm:text-sm font-medium ${trendColorClasses[color]}`}>
                {trend.value > 0 ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1 truncate">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[color]} flex-shrink-0`}>
          <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;