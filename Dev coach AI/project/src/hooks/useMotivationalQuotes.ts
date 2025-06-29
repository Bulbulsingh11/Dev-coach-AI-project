import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface QuoteNotificationSettings {
  enabled: boolean;
  time: string; // Format: "HH:MM"
  lastShown: string; // ISO date string
}

const careerQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't be afraid to give up the good to go for the great.",
  "The way to get started is to quit talking and begin doing.",
  "If you really look closely, most overnight successes took a long time.",
  "The secret of getting ahead is getting started.",
  "It's not whether you get knocked down, it's whether you get up.",
  "Failure is simply the opportunity to begin again, this time more intelligently.",
  "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It is during our darkest moments that we must focus to see the light.",
  "Believe you can and you're halfway there.",
  "The only impossible journey is the one you never begin."
];

export const useMotivationalQuotes = () => {
  const [settings, setSettings] = useLocalStorage<QuoteNotificationSettings>('quoteSettings', {
    enabled: true,
    time: '09:00',
    lastShown: ''
  });

  const [showQuoteNotification, setShowQuoteNotification] = useState(false);
  const [todayQuote, setTodayQuote] = useState('');
  const [favoriteQuotes, setFavoriteQuotes] = useLocalStorage<string[]>('favoriteQuotes', []);

  // Get today's quote based on date
  const getTodayQuote = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return careerQuotes[dayOfYear % careerQuotes.length];
  };

  // Check if we should show the notification
  const shouldShowNotification = () => {
    if (!settings.enabled) return false;
    
    const today = new Date().toISOString().split('T')[0];
    const lastShown = settings.lastShown.split('T')[0];
    
    // Don't show if already shown today
    if (today === lastShown) return false;
    
    const now = new Date();
    const [hours, minutes] = settings.time.split(':').map(Number);
    const notificationTime = new Date();
    notificationTime.setHours(hours, minutes, 0, 0);
    
    // Show if current time is past notification time
    return now >= notificationTime;
  };

  useEffect(() => {
    const quote = getTodayQuote();
    setTodayQuote(quote);

    // Check if we should show notification
    if (shouldShowNotification()) {
      setShowQuoteNotification(true);
    }

    // Set up interval to check for notification time
    const interval = setInterval(() => {
      if (shouldShowNotification()) {
        setShowQuoteNotification(true);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [settings]);

  const dismissQuoteNotification = () => {
    setShowQuoteNotification(false);
    setSettings(prev => ({
      ...prev,
      lastShown: new Date().toISOString()
    }));
  };

  const toggleQuoteNotifications = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      enabled
    }));
  };

  const setNotificationTime = (time: string) => {
    setSettings(prev => ({
      ...prev,
      time
    }));
  };

  const addToFavorites = (quote: string) => {
    if (!favoriteQuotes.includes(quote)) {
      setFavoriteQuotes(prev => [...prev, quote]);
    }
  };

  const removeFromFavorites = (quote: string) => {
    setFavoriteQuotes(prev => prev.filter(q => q !== quote));
  };

  const getRandomQuote = () => {
    return careerQuotes[Math.floor(Math.random() * careerQuotes.length)];
  };

  return {
    todayQuote,
    showQuoteNotification,
    dismissQuoteNotification,
    settings,
    toggleQuoteNotifications,
    setNotificationTime,
    favoriteQuotes,
    addToFavorites,
    removeFromFavorites,
    getRandomQuote,
    allQuotes: careerQuotes
  };
};