import React from 'react';
import { Target, TrendingUp, BookOpen, Zap, Heart, Brain } from 'lucide-react';
import StatCard from './StatCard';
import EmptyStatCard from './EmptyStatCard';
import RecentActivity from './RecentActivity';
import EmptyRecentActivity from './EmptyRecentActivity';
import QuickActions from './QuickActions';
import ProgressChart from './ProgressChart';
import EmptyProgressChart from './EmptyProgressChart';
import OnboardingModal from '../Onboarding/OnboardingModal';
import { useUserOnboarding } from '../../hooks/useUserOnboarding';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { onboardingState } = useUserOnboarding();
  const [checkins] = useLocalStorage('dailyCheckins', []);
  const [userGoals] = useLocalStorage('userGoals', []);
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Check if user has any data
  const hasCheckins = checkins.length > 0;
  const hasGoals = userGoals.length > 0;
  const hasAnyData = hasCheckins || hasGoals;
  const isNewUser = onboardingState.isNewUser && !onboardingState.hasCompletedOnboarding;

  // Calculate actual metrics or show zero for new users
  const weeklyFocusScore = hasCheckins ? "8.2" : "0.0";
  const goalsProgress = hasGoals ? "67%" : "0%";
  const learningStreak = hasAnyData ? "12" : "0";
  const energyLevel = hasCheckins ? "7.5" : "0.0";

  const handleStartCheckin = () => {
    onNavigate('checkin');
  };

  const handleSetGoals = () => {
    onNavigate('career'); // or wherever goals are managed
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <OnboardingModal />
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          {isNewUser ? 'Welcome to your journey! 🚀' : 'Good morning! 👋'}
        </h2>
        <p className="text-indigo-100 text-sm sm:text-base">{today}</p>
        {isNewUser ? (
          <p className="text-indigo-100 mt-2 text-sm sm:text-base">
            Your dashboard is ready to grow with you. Complete your first check-in to get started!
          </p>
        ) : (
          <p className="text-indigo-100 mt-2 text-sm sm:text-base">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </p>
        )}
      </div>

      {/* New User Welcome Message */}
      {isNewUser && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Starting Fresh ✨
          </h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
            All your metrics start at zero because you're just beginning your personal development journey. 
            As you complete daily check-ins, set goals, and use our tools, you'll see your progress grow!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleStartCheckin}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Complete First Check-in
            </button>
            <button
              onClick={handleSetGoals}
              className="flex-1 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
            >
              Set Your First Goal
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {isNewUser || !hasCheckins ? (
          <EmptyStatCard
            title="Weekly Focus Score"
            subtitle="Complete check-ins to track"
            icon={Brain}
            color="indigo"
            actionText="Start Tracking"
            onAction={handleStartCheckin}
          />
        ) : (
          <StatCard
            title="Weekly Focus Score"
            value={weeklyFocusScore}
            subtitle="out of 10"
            icon={Brain}
            color="indigo"
            trend={{ value: 12, label: 'vs last week' }}
          />
        )}

        {isNewUser || !hasGoals ? (
          <EmptyStatCard
            title="Goals Progress"
            subtitle="Set goals to track progress"
            icon={Target}
            color="purple"
            actionText="Set Goals"
            onAction={handleSetGoals}
          />
        ) : (
          <StatCard
            title="Goals Progress"
            value={goalsProgress}
            subtitle="3 of 5 active goals"
            icon={Target}
            color="purple"
            trend={{ value: 8, label: 'this month' }}
          />
        )}

        {isNewUser || !hasAnyData ? (
          <EmptyStatCard
            title="Learning Streak"
            subtitle="Start learning to build streak"
            icon={BookOpen}
            color="teal"
            actionText="Begin Learning"
            onAction={() => onNavigate('growth')}
          />
        ) : (
          <StatCard
            title="Learning Streak"
            value={learningStreak}
            subtitle="days in a row"
            icon={BookOpen}
            color="teal"
          />
        )}

        {isNewUser || !hasCheckins ? (
          <EmptyStatCard
            title="Energy Level"
            subtitle="Track daily to see average"
            icon={Zap}
            color="amber"
            actionText="Log Energy"
            onAction={handleStartCheckin}
          />
        ) : (
          <StatCard
            title="Energy Level"
            value={energyLevel}
            subtitle="average this week"
            icon={Zap}
            color="amber"
            trend={{ value: -5, label: 'vs last week' }}
          />
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {isNewUser || !hasCheckins ? (
            <EmptyProgressChart onStartCheckin={handleStartCheckin} />
          ) : (
            <ProgressChart />
          )}
          
          {isNewUser || !hasAnyData ? (
            <EmptyRecentActivity onStartActivity={handleStartCheckin} />
          ) : (
            <RecentActivity />
          )}
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <QuickActions onNavigate={onNavigate} />
          
          {/* Today's Focus */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {isNewUser ? "Suggested First Steps" : "Today's Focus"}
            </h3>
            <div className="space-y-3">
              {isNewUser ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Complete your first daily check-in</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Set your first development goal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Explore productivity tools</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Complete leadership course module</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Practice mindfulness meditation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Reach out to 2 network contacts</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;