import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Users, Target, Award, ExternalLink, Bell, Heart, Star } from 'lucide-react';
import { initialRecommendations } from '../../data/mockData';
import { useMotivationalQuotes } from '../../hooks/useMotivationalQuotes';
import CareerNavigation from './CareerNavigation';
import SkillsDevelopment from './SkillsDevelopment';
import NetworkingProgress from './NetworkingProgress';
import CareerRecommendations from './CareerRecommendations';
import CareerStats from './CareerStats';
import UpcomingEvents from './UpcomingEvents';
import RecommendedResources from './RecommendedResources';

interface CareerProps {
  onNavigate?: (section: string) => void;
}

const Career: React.FC<CareerProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'skills' | 'networking' | 'goals'>('overview');
  const { todayQuote, showQuoteNotification, dismissQuoteNotification } = useMotivationalQuotes();

  const handleBackToDashboard = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const handleSectionChange = (section: 'overview' | 'skills' | 'networking' | 'goals') => {
    setActiveSection(section);
  };

  const careerRecommendations = initialRecommendations.filter(r => r.type === 'career');
  
  // RESET TO DEFAULT VALUES - All metrics set to zero/starting values
  const skillsToImprove = [
    { skill: 'Leadership', level: 0, target: 85 },
    { skill: 'Communication', level: 0, target: 90 },
    { skill: 'Strategic Thinking', level: 0, target: 70 },
    { skill: 'Data Analysis', level: 0, target: 80 }
  ];

  const networkingGoals = [
    { goal: 'Connect with 5 industry leaders', progress: 0 },
    { goal: 'Attend 3 professional events', progress: 0 },
    { goal: 'Join 2 professional associations', progress: 0 },
    { goal: 'Schedule 4 informational interviews', progress: 0 }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'skills':
        return <SkillsDevelopment skills={skillsToImprove} />;
      case 'networking':
        return <NetworkingProgress goals={networkingGoals} />;
      case 'goals':
        return <CareerRecommendations recommendations={careerRecommendations} />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <SkillsDevelopment skills={skillsToImprove} />
              <NetworkingProgress goals={networkingGoals} />
              <CareerRecommendations recommendations={careerRecommendations} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <CareerStats />
              <UpcomingEvents />
              <RecommendedResources />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Motivational Quote Notification */}
      {showQuoteNotification && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 relative animate-slide-up">
          <button
            onClick={dismissQuoteNotification}
            className="absolute top-2 right-2 p-1 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-start space-x-3 pr-8">
            <div className="p-2 bg-amber-500 rounded-lg">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-amber-900 dark:text-amber-300 mb-1">Daily Career Inspiration</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 italic">"{todayQuote}"</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="p-4 sm:p-6">
          {/* Back Button and Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 group touch-manipulation"
                aria-label="Back to Dashboard"
              >
                <div className="p-2 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                  <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
                </div>
                <span className="font-medium">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Career Development</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accelerate your professional growth</p>
              </div>
            </div>
          </div>

          {/* Section Navigation */}
          <CareerNavigation 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange} 
          />
        </div>
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </div>
  );
};

export default Career;