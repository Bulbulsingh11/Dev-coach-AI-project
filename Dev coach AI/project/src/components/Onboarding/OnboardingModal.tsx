import React from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle, Target, TrendingUp, Calendar, Zap } from 'lucide-react';
import { useUserOnboarding } from '../../hooks/useUserOnboarding';

const OnboardingModal: React.FC = () => {
  const { 
    onboardingState, 
    showOnboarding, 
    setShowOnboarding,
    completeOnboarding, 
    nextStep, 
    previousStep, 
    skipOnboarding 
  } = useUserOnboarding();

  if (!showOnboarding) return null;

  const steps = [
    {
      title: "Welcome to DevCoach AI! 🎉",
      icon: CheckCircle,
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Your Personal Development Journey Starts Here
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We're excited to help you grow professionally and personally. Your dashboard is currently empty because you're just getting started - and that's perfect!
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Starting Fresh:</strong> All your metrics, progress bars, and scores begin at zero. As you engage with the platform, these will grow to reflect your real progress.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Track Your Daily Progress",
      icon: Calendar,
      content: (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">
            Daily Check-ins Build Your Foundation
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Rate your mood, energy, and focus</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">These scores will populate your weekly progress chart</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Log accomplishments and challenges</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Build a record of your growth over time</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Set tomorrow's goals</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stay focused and intentional each day</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              💡 <strong>Tip:</strong> Start with your first daily check-in to see your dashboard come to life!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Set Meaningful Goals",
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">
            Goals Give Direction to Your Growth
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Career advancement goals</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Leadership skills, networking, promotions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Learning objectives</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Courses, books, certifications</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Personal development</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Habits, wellness, productivity</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <p className="text-sm text-green-700 dark:text-green-300">
              🎯 <strong>Your progress bars are empty now</strong> - they'll fill up as you make progress on your goals!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Boost Your Productivity",
      icon: Zap,
      content: (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">
            Tools to Maximize Your Efficiency
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Pomodoro Timer</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Focus in 25-minute bursts with breaks</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Productivity techniques</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Time blocking, GTD, Eisenhower Matrix</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Daily routines</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Morning and evening optimization</p>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
            <h4 className="font-medium text-indigo-900 dark:text-indigo-300 mb-2">Ready to Begin?</h4>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-3">
              Your journey starts with small, consistent actions. Here's what to do first:
            </p>
            <ol className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
              <li>1. Complete your first daily check-in</li>
              <li>2. Set 1-2 initial goals</li>
              <li>3. Try a Pomodoro session</li>
              <li>4. Explore the learning resources</li>
            </ol>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[onboardingState.currentStep - 1];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              {Array.from({ length: onboardingState.totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index < onboardingState.currentStep
                      ? 'bg-indigo-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Step {onboardingState.currentStep} of {onboardingState.totalSteps}
            </span>
          </div>
          <button
            onClick={() => setShowOnboarding(false)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              {currentStepData.title}
            </h2>
          </div>
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex space-x-2">
            {onboardingState.currentStep > 1 && (
              <button
                onClick={previousStep}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}
            <button
              onClick={skipOnboarding}
              className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm"
            >
              Skip tour
            </button>
          </div>

          <div className="flex space-x-3">
            {onboardingState.currentStep < onboardingState.totalSteps ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={completeOnboarding}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                <span>Get Started</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;