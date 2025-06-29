import React from 'react';
import { CheckCircle, Target, BookOpen, TrendingUp } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: '1',
      type: 'goal',
      title: 'Completed leadership course module 2',
      time: '2 hours ago',
      icon: Target,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: '2',
      type: 'checkin',
      title: 'Completed daily check-in',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      id: '3',
      type: 'learning',
      title: 'Started reading "Deep Work"',
      time: '2 days ago',
      icon: BookOpen,
      color: 'text-teal-600 dark:text-teal-400'
    },
    {
      id: '4',
      type: 'productivity',
      title: 'Used Pomodoro technique for 4 sessions',
      time: '3 days ago',
      icon: TrendingUp,
      color: 'text-amber-600 dark:text-amber-400'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;