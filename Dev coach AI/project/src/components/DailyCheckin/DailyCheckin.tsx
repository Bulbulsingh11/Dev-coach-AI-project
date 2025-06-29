import React, { useState } from 'react';
import { Save, TrendingUp, Heart, Zap, AlertCircle, Plus, X } from 'lucide-react';
import { DailyCheckin as DailyCheckinType } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const DailyCheckin: React.FC = () => {
  const [checkins, setCheckins] = useLocalStorage<DailyCheckinType[]>('dailyCheckins', []);
  const [currentCheckin, setCurrentCheckin] = useState<Partial<DailyCheckinType>>({
    date: new Date().toISOString().split('T')[0],
    mood: 5,
    energy: 5,
    focus: 5,
    stress: 5,
    accomplishments: [],
    challenges: [],
    tomorrowGoals: []
  });

  const [accomplishmentInput, setAccomplishmentInput] = useState('');
  const [challengeInput, setChallengeInput] = useState('');
  const [goalInput, setGoalInput] = useState('');

  const handleSliderChange = (field: string, value: number) => {
    setCurrentCheckin(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (field: 'accomplishments' | 'challenges' | 'tomorrowGoals', value: string) => {
    if (value.trim()) {
      setCurrentCheckin(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()]
      }));
      
      if (field === 'accomplishments') setAccomplishmentInput('');
      if (field === 'challenges') setChallengeInput('');
      if (field === 'tomorrowGoals') setGoalInput('');
    }
  };

  const removeItem = (field: 'accomplishments' | 'challenges' | 'tomorrowGoals', index: number) => {
    setCurrentCheckin(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSave = () => {
    const newCheckin: DailyCheckinType = {
      ...currentCheckin,
      id: Date.now().toString(),
      date: currentCheckin.date!,
      mood: currentCheckin.mood!,
      energy: currentCheckin.energy!,
      focus: currentCheckin.focus!,
      stress: currentCheckin.stress!,
      accomplishments: currentCheckin.accomplishments!,
      challenges: currentCheckin.challenges!,
      tomorrowGoals: currentCheckin.tomorrowGoals!
    };

    setCheckins(prev => [newCheckin, ...prev.filter(c => c.date !== newCheckin.date)]);
    alert('Daily check-in saved successfully!');
  };

  const SliderInput = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon, 
    color,
    description 
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon: React.ElementType;
    color: string;
    description: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">{label}</label>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">({value}/10)</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      <div className="px-2">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider touch-manipulation focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          style={{
            background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(value-1)*11.11}%, #e5e7eb ${(value-1)*11.11}%, #e5e7eb 100%)`,
            WebkitAppearance: 'none',
          }}
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #6366f1;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .dark .slider::-webkit-slider-thumb {
            border: 2px solid #374151;
            background: #6366f1;
          }
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #6366f1;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .dark .slider::-moz-range-thumb {
            border: 2px solid #374151;
          }
        `}</style>
      </div>
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 px-2">
        <span>1</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Daily Check-in</h2>
        
        {/* Wellbeing Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 sm:mb-8">
          <SliderInput
            label="Mood"
            value={currentCheckin.mood!}
            onChange={(value) => handleSliderChange('mood', value)}
            icon={Heart}
            color="text-rose-500"
            description="How are you feeling emotionally today?"
          />
          <SliderInput
            label="Energy Level"
            value={currentCheckin.energy!}
            onChange={(value) => handleSliderChange('energy', value)}
            icon={Zap}
            color="text-amber-500"
            description="How energetic do you feel right now?"
          />
          <SliderInput
            label="Focus"
            value={currentCheckin.focus!}
            onChange={(value) => handleSliderChange('focus', value)}
            icon={TrendingUp}
            color="text-indigo-500"
            description="How well could you concentrate today?"
          />
          <SliderInput
            label="Stress Level"
            value={currentCheckin.stress!}
            onChange={(value) => handleSliderChange('stress', value)}
            icon={AlertCircle}
            color="text-red-500"
            description="How stressed are you feeling?"
          />
        </div>

        {/* Accomplishments */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Accomplishments</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={accomplishmentInput}
              onChange={(e) => setAccomplishmentInput(e.target.value)}
              placeholder="What did you achieve today?"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && addItem('accomplishments', accomplishmentInput)}
            />
            <button
              onClick={() => addItem('accomplishments', accomplishmentInput)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors touch-manipulation"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
          <div className="space-y-2">
            {currentCheckin.accomplishments?.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-3 py-2 rounded-md">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 pr-2">{item}</span>
                <button
                  onClick={() => removeItem('accomplishments', index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 touch-manipulation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Challenges Faced</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={challengeInput}
              onChange={(e) => setChallengeInput(e.target.value)}
              placeholder="What challenges did you encounter?"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && addItem('challenges', challengeInput)}
            />
            <button
              onClick={() => addItem('challenges', challengeInput)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors touch-manipulation"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
          <div className="space-y-2">
            {currentCheckin.challenges?.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 px-3 py-2 rounded-md">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 pr-2">{item}</span>
                <button
                  onClick={() => removeItem('challenges', index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 touch-manipulation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tomorrow's Goals */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tomorrow's Goals</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="What do you want to accomplish tomorrow?"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && addItem('tomorrowGoals', goalInput)}
            />
            <button
              onClick={() => addItem('tomorrowGoals', goalInput)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors touch-manipulation"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
          <div className="space-y-2">
            {currentCheckin.tomorrowGoals?.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-3 py-2 rounded-md">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 pr-2">{item}</span>
                <button
                  onClick={() => removeItem('tomorrowGoals', index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 touch-manipulation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 touch-manipulation"
        >
          <Save className="w-5 h-5" />
          <span>Save Daily Check-in</span>
        </button>
      </div>
    </div>
  );
};

export default DailyCheckin;