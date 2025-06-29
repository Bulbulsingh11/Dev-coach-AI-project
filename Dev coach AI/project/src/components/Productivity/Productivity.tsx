import React, { useState } from 'react';
import { Timer, Clock, Target, CheckCircle, Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';
import { initialRecommendations } from '../../data/mockData';

interface ProductivityProps {
  onNavigate?: (section: string) => void;
}

const Productivity: React.FC<ProductivityProps> = ({ onNavigate }) => {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState(0);

  const handleBackToDashboard = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const productivityRecommendations = initialRecommendations.filter(r => r.type === 'productivity');

  const techniques = [
    {
      name: 'Pomodoro Technique',
      description: 'Work in 25-minute focused bursts',
      effectiveness: 85,
      timeRequired: '25 min',
      difficulty: 'Easy'
    },
    {
      name: 'Time Blocking',
      description: 'Schedule specific times for different activities',
      effectiveness: 78,
      timeRequired: '15 min setup',
      difficulty: 'Medium'
    },
    {
      name: 'Getting Things Done',
      description: 'Capture, clarify, organize, reflect, engage',
      effectiveness: 82,
      timeRequired: '30 min setup',
      difficulty: 'Hard'
    },
    {
      name: 'Eisenhower Matrix',
      description: 'Prioritize tasks by urgency and importance',
      effectiveness: 75,
      timeRequired: '10 min',
      difficulty: 'Easy'
    }
  ];

  const routines = [
    {
      type: 'Morning',
      title: 'Power Start Routine',
      duration: '60 minutes',
      activities: [
        'Review daily goals (5 min)',
        'Quick meditation (10 min)',
        'Priority task planning (15 min)',
        'Energy-boosting exercise (20 min)',
        'Healthy breakfast (10 min)'
      ]
    },
    {
      type: 'Evening',
      title: 'Reflection & Recovery',
      duration: '45 minutes',
      activities: [
        'Daily accomplishments review (10 min)',
        'Tomorrow\'s priority setting (10 min)',
        'Gratitude journaling (10 min)',
        'Reading or learning (15 min)'
      ]
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setPomodoroTime(25 * 60);
    setIsRunning(false);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsRunning(false);
      setCurrentSession(prev => prev + 1);
      alert('Pomodoro session complete! Take a break.');
      setPomodoroTime(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime]);

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
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
      <div className="bg-gradient-to-r from-teal-600 to-indigo-600 rounded-lg p-4 sm:p-6 text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Productivity Enhancement</h2>
        <p className="text-teal-100 text-sm sm:text-base">Boost your efficiency with proven techniques and tools</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Pomodoro Timer */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <Timer className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pomodoro Timer</h3>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-full text-white mb-4 sm:mb-6 shadow-lg">
                <span className="text-2xl sm:text-4xl font-bold">{formatTime(pomodoroTime)}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <button
                  onClick={toggleTimer}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors touch-manipulation ${
                    isRunning 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-teal-500 hover:bg-teal-600 text-white'
                  }`}
                >
                  {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isRunning ? 'Pause' : 'Start'}</span>
                </button>
                <button
                  onClick={resetTimer}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors touch-manipulation"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sessions completed today: {currentSession}</p>
            </div>
          </div>

          {/* Productivity Techniques */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <Target className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended Techniques</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techniques.map((technique, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">{technique.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{technique.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Effectiveness</span>
                      <span className="font-medium text-gray-900 dark:text-white">{technique.effectiveness}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-indigo-500 h-1.5 rounded-full"
                        style={{ width: `${technique.effectiveness}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Time: {technique.timeRequired}</span>
                      <span>Difficulty: {technique.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Routines */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <Clock className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Optimized Routines</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {routines.map((routine, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">{routine.title}</h4>
                    <span className="text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                      {routine.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Duration: {routine.duration}</p>
                  <div className="space-y-2">
                    {routine.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Today's Focus */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Focus</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Deep Work Session</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">2 hours blocked for strategic planning</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm font-medium text-green-900 dark:text-green-300">Admin Tasks</p>
                <p className="text-xs text-green-600 dark:text-green-400">30 minutes for email and scheduling</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <p className="text-sm font-medium text-purple-900 dark:text-purple-300">Learning Time</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">1 hour for skill development</p>
              </div>
            </div>
          </div>

          {/* Productivity Stats - RESET TO ZERO */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Productivity Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Focus Time Today</span>
                <span className="font-semibold text-gray-900 dark:text-white">0.0h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</span>
                <span className="font-semibold text-gray-900 dark:text-white">0/0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Pomodoros</span>
                <span className="font-semibold text-gray-900 dark:text-white">{currentSession}/0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency Score</span>
                <span className="font-semibold text-gray-900 dark:text-white">0%</span>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Insights</h3>
            <div className="space-y-4">
              {productivityRecommendations.slice(0, 2).map((rec) => (
                <div key={rec.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{rec.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productivity;