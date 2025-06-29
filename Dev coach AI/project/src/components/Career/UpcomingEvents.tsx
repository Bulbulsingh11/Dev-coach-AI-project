import React from 'react';

const UpcomingEvents: React.FC = () => {
  const events = [
    {
      title: 'Tech Leadership Summit',
      date: 'March 15, 2025',
      color: 'blue'
    },
    {
      title: 'Industry Networking Mixer',
      date: 'March 22, 2025',
      color: 'purple'
    },
    {
      title: 'Career Fair 2025',
      date: 'April 5, 2025',
      color: 'teal'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-300',
    teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-900 dark:text-teal-300'
  };

  const dateColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    teal: 'text-teal-600 dark:text-teal-400'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className={`p-3 rounded-lg ${colorClasses[event.color as keyof typeof colorClasses]}`}>
            <p className="text-sm font-medium">{event.title}</p>
            <p className={`text-xs ${dateColorClasses[event.color as keyof typeof dateColorClasses]}`}>
              {event.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;