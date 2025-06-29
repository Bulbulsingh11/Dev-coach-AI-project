import React from 'react';
import { Target } from 'lucide-react';
import { Recommendation } from '../../types';

interface CareerRecommendationsProps {
  recommendations: Recommendation[];
}

const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ recommendations }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="w-5 h-5 text-teal-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
      </div>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white">{rec.title}</h4>
              <span className="text-xs bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-2 py-1 rounded">
                Priority {rec.priority}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Action Items:</p>
              {rec.actionItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRecommendations;