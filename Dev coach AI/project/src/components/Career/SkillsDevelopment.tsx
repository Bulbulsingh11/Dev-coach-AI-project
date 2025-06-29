import React from 'react';
import { TrendingUp } from 'lucide-react';

interface Skill {
  skill: string;
  level: number;
  target: number;
}

interface SkillsDevelopmentProps {
  skills: Skill[];
}

const SkillsDevelopment: React.FC<SkillsDevelopmentProps> = ({ skills }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills Development</h3>
      </div>
      <div className="space-y-4">
        {skills.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.skill}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.level}% / {item.target}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${item.level}%` }}
              ></div>
              {/* Target indicator */}
              <div 
                className="absolute top-0 h-2 w-1 bg-gray-400 dark:bg-gray-500 rounded-full"
                style={{ left: `${item.target}%`, transform: 'translateX(-50%)' }}
                title={`Target: ${item.target}%`}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Current: {item.level}%</span>
              <span>Target: {item.target}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDevelopment;