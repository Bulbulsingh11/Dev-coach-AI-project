import React from 'react';
import { CheckCircle, Target, TrendingUp, BookOpen } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (section: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const actions = [
    {
      id: 'checkin',
      title: 'Daily Check-in',
      description: 'Log your mood and progress',
      icon: CheckCircle,
      color: 'indigo'
    },
    {
      id: 'goals',
      title: 'View Goals',
      description: 'Track your objectives',
      icon: Target,
      color: 'purple'
    },
    {
      id: 'productivity',
      title: 'Productivity Tools',
      description: 'Boost your efficiency',
      icon: TrendingUp,
      color: 'teal'
    },
    {
      id: 'growth',
      title: 'Learning Resources',
      description: 'Expand your knowledge',
      icon: BookOpen,
      color: 'amber'
    }
  ];

  const colorClasses = {
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 active:bg-indigo-200 dark:active:bg-indigo-900/40',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 active:bg-purple-200 dark:active:bg-purple-900/40',
    teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/30 active:bg-teal-200 dark:active:bg-teal-900/40',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 active:bg-amber-200 dark:active:bg-amber-900/40'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onNavigate(action.id)}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 touch-manipulation ${
              colorClasses[action.color as keyof typeof colorClasses]
            }`}
          >
            <div className="flex items-center space-x-3">
              <action.icon className="w-5 h-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm sm:text-base">{action.title}</p>
                <p className="text-xs sm:text-sm opacity-75 truncate">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;