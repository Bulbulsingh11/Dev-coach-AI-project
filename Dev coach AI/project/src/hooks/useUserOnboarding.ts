import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface OnboardingState {
  isNewUser: boolean;
  hasCompletedOnboarding: boolean;
  currentStep: number;
  totalSteps: number;
}

export const useUserOnboarding = () => {
  const [onboardingState, setOnboardingState] = useLocalStorage<OnboardingState>('onboardingState', {
    isNewUser: true,
    hasCompletedOnboarding: false,
    currentStep: 1,
    totalSteps: 4
  });

  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user just signed up
    const userJustSignedUp = localStorage.getItem('userJustSignedUp');
    if (userJustSignedUp === 'true') {
      setShowOnboarding(true);
      localStorage.removeItem('userJustSignedUp');
    }
  }, []);

  const initializeNewUser = () => {
    // Clear any existing data for new users
    localStorage.removeItem('dailyCheckins');
    localStorage.removeItem('userGoals');
    localStorage.removeItem('userProgress');
    localStorage.removeItem('weeklyStats');
    
    // Mark as new user
    setOnboardingState({
      isNewUser: true,
      hasCompletedOnboarding: false,
      currentStep: 1,
      totalSteps: 4
    });
    
    setShowOnboarding(true);
  };

  const completeOnboarding = () => {
    setOnboardingState(prev => ({
      ...prev,
      isNewUser: false,
      hasCompletedOnboarding: true
    }));
    setShowOnboarding(false);
  };

  const nextStep = () => {
    setOnboardingState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps)
    }));
  };

  const previousStep = () => {
    setOnboardingState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }));
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  return {
    onboardingState,
    showOnboarding,
    setShowOnboarding,
    initializeNewUser,
    completeOnboarding,
    nextStep,
    previousStep,
    skipOnboarding
  };
};