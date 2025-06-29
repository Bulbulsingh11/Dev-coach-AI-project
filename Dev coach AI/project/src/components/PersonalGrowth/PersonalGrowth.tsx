import React, { useState } from 'react';
import { BookOpen, Target, TrendingUp, Award, ExternalLink, Star, Map, ArrowLeft } from 'lucide-react';
import { initialResources, initialGoals, motivationalQuotes } from '../../data/mockData';
import FreshStartPlan from '../FreshStart/FreshStartPlan';

interface PersonalGrowthProps {
  onNavigate?: (section: string) => void;
}

const PersonalGrowth: React.FC<PersonalGrowthProps> = ({ onNavigate }) => {
  const [activeView, setActiveView] = useState<'overview' | 'freshstart'>('overview');
  const learningGoals = initialGoals.filter(g => g.category === 'learning');
  const todayQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleBackToDashboard = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  // RESET TO DEFAULT VALUES - All metrics set to zero/starting values
  const weeklyObjectives = [
    { title: 'Complete 2 online courses', progress: 0, deadline: '3 days left' },
    { title: 'Read 1 leadership book', progress: 0, deadline: '5 days left' },
    { title: 'Practice meditation daily', progress: 0, deadline: '2 days left' },
    { title: 'Network with 3 professionals', progress: 0, deadline: '4 days left' }
  ];

  const learningAreas = [
    { area: 'Leadership', level: 'Beginner', progress: 0, courses: 0 },
    { area: 'Communication', level: 'Beginner', progress: 0, courses: 0 },
    { area: 'Technology', level: 'Beginner', progress: 0, courses: 0 },
    { area: 'Finance', level: 'Beginner', progress: 0, courses: 0 }
  ];

  if (activeView === 'freshstart') {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setActiveView('overview')}
            className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Personal Growth</span>
          </button>
        </div>
        <FreshStartPlan />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
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
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Personal Growth</h2>
        <p className="text-amber-100">Continuous learning and self-improvement journey</p>
      </div>

      {/* Fresh Start Plan CTA */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-indigo-500 rounded-lg">
            <Map className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
              Starting from Ground Zero?
            </h3>
            <p className="text-indigo-700 dark:text-indigo-300 mb-4">
              Get a comprehensive fresh start plan for both personal and professional development. 
              Perfect for beginners or anyone looking to restart their growth journey.
            </p>
            <button
              onClick={() => setActiveView('freshstart')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              View Fresh Start Plan
            </button>
          </div>
        </div>
      </div>

      {/* Daily Motivation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Motivation</h3>
        </div>
        <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic text-center py-4">
          "{todayQuote}"
        </blockquote>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Objectives */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-6">
              <Target className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Learning Objectives</h3>
            </div>
            <div className="space-y-4">
              {weeklyObjectives.map((objective, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{objective.title}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{objective.progress}%</span>
                      <span className="text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded">
                        {objective.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${objective.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Areas */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Areas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningAreas.map((area, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{area.area}</h4>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                        {area.level}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{area.courses} courses</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">{area.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
                        style={{ width: `${area.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Learning Goals</h3>
            </div>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No Learning Goals Set</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 max-w-xs mx-auto">
                Start your learning journey by setting your first educational goal
              </p>
              <button className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Set First Goal
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievement Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievement Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Learning Streak</span>
                <span className="font-semibold text-gray-900 dark:text-white">0 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Books Read</span>
                <span className="font-semibold text-gray-900 dark:text-white">0/0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Courses Completed</span>
                <span className="font-semibold text-gray-900 dark:text-white">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Skill Certificates</span>
                <span className="font-semibold text-gray-900 dark:text-white">0</span>
              </div>
            </div>
          </div>

          {/* Recommended Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended Resources</h3>
            <div className="space-y-3">
              {initialResources.slice(0, 3).map((resource) => (
                <div key={resource.id} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{resource.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{resource.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                          {resource.type}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{resource.estimatedTime}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No Achievements Yet</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                Complete courses and reach milestones to earn your first achievements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalGrowth;