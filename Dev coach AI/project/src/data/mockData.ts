import { Recommendation, Resource, Goal } from '../types';

export const initialRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'productivity',
    title: 'Implement the Pomodoro Technique',
    description: 'Based on your focus patterns, try working in 25-minute focused bursts with 5-minute breaks.',
    actionItems: [
      'Download a Pomodoro timer app',
      'Schedule 4 pomodoros for your most important tasks',
      'Take proper breaks between sessions'
    ],
    priority: 9,
    category: 'Time Management'
  },
  {
    id: '2',
    type: 'career',
    title: 'Strengthen Your Network',
    description: 'Expand your professional network to unlock new opportunities.',
    actionItems: [
      'Reach out to 3 colleagues this week',
      'Join a professional association in your field',
      'Attend virtual networking events'
    ],
    priority: 8,
    category: 'Networking'
  },
  {
    id: '3',
    type: 'learning',
    title: 'Develop Leadership Skills',
    description: 'Focus on building leadership capabilities for career advancement.',
    actionItems: [
      'Read "The 7 Habits of Highly Effective People"',
      'Practice active listening in meetings',
      'Volunteer to lead a small project'
    ],
    priority: 7,
    category: 'Leadership'
  }
];

export const initialResources: Resource[] = [
  {
    id: '1',
    title: 'Atomic Habits',
    type: 'book',
    description: 'A comprehensive guide to building good habits and breaking bad ones.',
    category: 'Personal Development',
    rating: 4.8,
    estimatedTime: '6 hours'
  },
  {
    id: '2',
    title: 'Deep Work',
    type: 'book',
    description: 'Learn how to focus without distraction on cognitively demanding tasks.',
    category: 'Productivity',
    rating: 4.7,
    estimatedTime: '8 hours'
  },
  {
    id: '3',
    title: 'The Power of Now',
    type: 'book',
    description: 'A guide to spiritual enlightenment and mindfulness.',
    category: 'Mindfulness',
    rating: 4.6,
    estimatedTime: '7 hours'
  }
];

export const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Complete Leadership Course',
    description: 'Finish the online leadership certification program',
    category: 'career',
    priority: 'high',
    deadline: '2025-03-15',
    progress: 35,
    status: 'active',
    milestones: [
      { id: '1', title: 'Complete Module 1', completed: true, completedDate: '2025-01-05' },
      { id: '2', title: 'Complete Module 2', completed: true, completedDate: '2025-01-12' },
      { id: '3', title: 'Complete Module 3', completed: false },
      { id: '4', title: 'Final Project', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Read 12 Books This Year',
    description: 'Read one book per month focusing on personal and professional development',
    category: 'learning',
    priority: 'medium',
    deadline: '2025-12-31',
    progress: 8,
    status: 'active',
    milestones: [
      { id: '1', title: 'Book 1: Atomic Habits', completed: true, completedDate: '2025-01-15' },
      { id: '2', title: 'Book 2: Deep Work', completed: false }
    ]
  }
];

export const motivationalQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it."
];