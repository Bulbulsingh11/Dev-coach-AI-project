import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthScreen from './components/Auth/AuthScreen';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import DailyCheckin from './components/DailyCheckin/DailyCheckin';
import Career from './components/Career/Career';
import Productivity from './components/Productivity/Productivity';
import PersonalGrowth from './components/PersonalGrowth/PersonalGrowth';
import Settings from './components/Settings/Settings';
import DarkModeAuditReport from './components/DarkModeAudit/DarkModeAuditReport';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { useUserOnboarding } from './hooks/useUserOnboarding';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);
  const [showAuditReport, setShowAuditReport] = useState(false);
  const { initializeNewUser } = useUserOnboarding();

  // Check for existing authentication on app load
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
    }

    // Check for audit report URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('audit') === 'darkmode') {
      setShowAuditReport(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    
    // Check if this is a new user signup
    const userJustSignedUp = localStorage.getItem('userJustSignedUp');
    if (userJustSignedUp === 'true') {
      initializeNewUser();
    }
  };

  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userJustSignedUp');
    localStorage.removeItem('onboardingState');
    localStorage.removeItem('dailyCheckins');
    localStorage.removeItem('userGoals');
    localStorage.removeItem('userProgress');
    localStorage.removeItem('weeklyStats');
    localStorage.removeItem('userPreferences');
    
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setShowSettings(false);
    setShowAuditReport(false);
  };

  const handleNavigate = (section: string) => {
    if (section === 'audit-report') {
      setShowAuditReport(true);
      return;
    }
    setActiveTab(section);
    setShowAuditReport(false);
  };

  const renderContent = () => {
    if (showAuditReport) {
      return <DarkModeAuditReport />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'checkin':
        return <DailyCheckin />;
      case 'career':
        return <Career />;
      case 'productivity':
        return <Productivity />;
      case 'growth':
        return <PersonalGrowth />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {!isAuthenticated ? (
          <AuthScreen onAuthSuccess={handleAuthSuccess} />
        ) : (
          <>
            <Header 
              activeTab={showAuditReport ? 'audit' : activeTab} 
              onTabChange={setActiveTab}
              onSettingsClick={() => setShowSettings(true)}
              onLogout={handleLogout}
            />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
              {showAuditReport && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowAuditReport(false)}
                    className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>← Back to Application</span>
                  </button>
                </div>
              )}
              {renderContent()}
            </main>

            {showSettings && (
              <Settings onClose={() => setShowSettings(false)} />
            )}

            {/* PWA Install Prompt */}
            <PWAInstallPrompt />

            {/* Debug Access to Audit Report */}
            {process.env.NODE_ENV === 'development' && (
              <div className="fixed bottom-4 right-4 z-50">
                <button
                  onClick={() => setShowAuditReport(!showAuditReport)}
                  className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                  title="Toggle Dark Mode Audit Report"
                >
                  🌙
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;