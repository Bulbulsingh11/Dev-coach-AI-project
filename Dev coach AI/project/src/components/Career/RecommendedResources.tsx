import React from 'react';
import { ExternalLink } from 'lucide-react';

const RecommendedResources: React.FC = () => {
  const resources = [
    {
      title: 'LinkedIn Learning',
      description: 'Leadership courses',
      url: '#'
    },
    {
      title: 'Coursera',
      description: 'Strategic thinking',
      url: '#'
    },
    {
      title: 'Harvard Business Review',
      description: 'Management insights',
      url: '#'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended Resources</h3>
      <div className="space-y-3">
        {resources.map((resource, index) => (
          <a 
            key={index}
            href={resource.url} 
            className="block p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {resource.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{resource.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecommendedResources;