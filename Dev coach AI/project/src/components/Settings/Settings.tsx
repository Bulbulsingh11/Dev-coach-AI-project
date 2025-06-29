import React, { useState } from 'react';
import { User, Bell, Clock, Target, Save, Star } from 'lucide-react';
import { UserPreferences } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMotivationalQuotes } from '../../hooks/useMotivationalQuotes';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('userPreferences', {
    notifications: {
      dailyCheckin: true,
      motivationalMessages: true,
      goalReminders: true,
      time: '09:00'
    },
    workingHours: {
      start: '09:00',
      end: '17:00'
    },
    focusAreas: ['leadership', 'productivity', 'communication']
  });

  const { 
    settings: quoteSettings, 
    toggleQuoteNotifications, 
    setNotificationTime,
    favoriteQuotes,
    removeFromFavorites
  } = useMotivationalQuotes();

  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    alert('Settings saved successfully!');
    onClose();
  };

  const focusAreaOptions = [
    'leadership', 'productivity', 'communication', 'technology', 
    'finance', 'marketing', 'health', 'creativity', 'networking'
  ];

  // Custom Toggle Component with proper dark mode support
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 dark:bg-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'quotes', label: 'Daily Quotes', icon: Star },
                { id: 'schedule', label: 'Schedule', icon: Clock },
                { id: 'goals', label: 'Goals & Focus', icon: Target }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="max-h-[70vh] overflow-y-auto">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Industry
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Marketing</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Role
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your current role"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Daily Check-in Reminders</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get reminded to complete your daily check-in</p>
                      </div>
                      <Toggle
                        checked={preferences.notifications.dailyCheckin}
                        onChange={(checked) => setPreferences(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, dailyCheckin: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Goal Reminders</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about upcoming goal deadlines</p>
                      </div>
                      <Toggle
                        checked={preferences.notifications.goalReminders}
                        onChange={(checked) => setPreferences(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, goalReminders: checked }
                        }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Notification Time
                      </label>
                      <input
                        type="time"
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        value={preferences.notifications.time}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, time: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'quotes' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Motivational Quotes</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Enable Daily Quotes</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive career-focused motivational quotes</p>
                      </div>
                      <Toggle
                        checked={quoteSettings.enabled}
                        onChange={(checked) => toggleQuoteNotifications(checked)}
                      />
                    </div>
                    
                    {quoteSettings.enabled && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Quote Notification Time
                        </label>
                        <input
                          type="time"
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                          value={quoteSettings.time}
                          onChange={(e) => setNotificationTime(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          You'll receive a daily motivational quote at this time
                        </p>
                      </div>
                    )}

                    {favoriteQuotes.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Favorite Quotes</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {favoriteQuotes.map((quote, index) => (
                            <div key={index} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <p className="text-sm text-gray-700 dark:text-gray-300 italic flex-1 pr-2">"{quote}"</p>
                              <button
                                onClick={() => removeFromFavorites(quote)}
                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Working Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        value={preferences.workingHours.start}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          workingHours: { ...prev.workingHours, start: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        value={preferences.workingHours.end}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          workingHours: { ...prev.workingHours, end: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'goals' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Focus Areas</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Select the areas you want to focus on for personalized recommendations.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {focusAreaOptions.map((area) => (
                      <label key={area} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
                          checked={preferences.focusAreas.includes(area)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPreferences(prev => ({
                                ...prev,
                                focusAreas: [...prev.focusAreas, area]
                              }));
                            } else {
                              setPreferences(prev => ({
                                ...prev,
                                focusAreas: prev.focusAreas.filter(a => a !== area)
                              }));
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;