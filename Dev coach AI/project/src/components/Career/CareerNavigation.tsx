import React from 'react';
import { TrendingUp, Users, Target, BarChart3 } from 'lucide-react';

interface CareerNavigationProps {
  activeSection: 'overview' | 'skills' | 'networking' | 'goals';
  onSectionChange: (section: 'overview' | 'skills' | 'networking' | 'goals') => void;
}

const CareerNavigation: React.FC<CareerNavigationProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    {
      id: 'overview' as const,
      label: 'Overview',
      icon: BarChart3,
      description: 'Complete career dashboard'
    },
    {
      id: 'skills' as const,
      label: 'Skills',
      icon: TrendingUp,
      description: 'Development progress'
    },
    {
      id: 'networking' as const,
      label: 'Networking',
      icon: Users,
      description: 'Professional connections'
    },
    {
      id: 'goals' as const,
      label: 'Goals',
      icon: Target,
      description: 'Career objectives'
    }
  ];

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      {/* Desktop Navigation */}
      <div className="hidden sm:flex space-x-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 touch-manipulation ${
              activeSection === section.id
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <section.icon className="w-4 h-4" />
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg text-xs font-medium transition-all duration-200 touch-manipulation ${
                activeSection === section.id
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <div className="text-center">
                <div className="font-medium">{section.label}</div>
                <div className="text-xs opacity-75">{section.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerNavigation;