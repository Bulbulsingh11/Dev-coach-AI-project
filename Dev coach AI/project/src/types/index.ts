export interface User {
  id: string;
  name: string;
  email: string;
  industry: string;
  currentRole: string;
  careerGoals: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    dailyCheckin: boolean;
    motivationalMessages: boolean;
    goalReminders: boolean;
    time: string;
  };
  workingHours: {
    start: string;
    end: string;
  };
  focusAreas: string[];
}

export interface DailyCheckin {
  id: string;
  date: string;
  mood: number; // 1-10
  energy: number; // 1-10
  focus: number; // 1-10
  stress: number; // 1-10
  accomplishments: string[];
  challenges: string[];
  tomorrowGoals: string[];
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'career' | 'personal' | 'health' | 'learning';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  progress: number;
  milestones: Milestone[];
  status: 'active' | 'completed' | 'paused';
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedDate?: string;
}

export interface Recommendation {
  id: string;
  type: 'career' | 'productivity' | 'learning' | 'wellbeing';
  title: string;
  description: string;
  actionItems: string[];
  priority: number;
  category: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'book' | 'course' | 'article' | 'video' | 'podcast';
  url?: string;
  description: string;
  category: string;
  rating: number;
  estimatedTime: string;
}