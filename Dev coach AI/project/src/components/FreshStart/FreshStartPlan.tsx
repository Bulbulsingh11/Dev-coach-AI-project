import React, { useState } from 'react';
import { CheckCircle, Target, BookOpen, Users, Clock, Star, TrendingUp, Award, Calendar, Lightbulb } from 'lucide-react';

const FreshStartPlan: React.FC = () => {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setCompletedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const assessmentAreas = [
    {
      id: 'skills',
      title: 'Skills Inventory',
      icon: TrendingUp,
      items: [
        'List all technical skills (even basic ones)',
        'Identify soft skills (communication, teamwork, problem-solving)',
        'Note any certifications or training completed',
        'Assess proficiency level (beginner, intermediate, advanced)',
        'Identify transferable skills from any experience'
      ]
    },
    {
      id: 'education',
      title: 'Educational Background',
      icon: BookOpen,
      items: [
        'Document formal education (degrees, diplomas, certificates)',
        'List relevant coursework or training programs',
        'Note any online courses or self-study completed',
        'Identify knowledge gaps in your target field',
        'Consider additional education or training needs'
      ]
    },
    {
      id: 'experience',
      title: 'Work & Life Experience',
      icon: Award,
      items: [
        'Document all work experience (including part-time, volunteer)',
        'List leadership roles or responsibilities',
        'Note any project management or team collaboration',
        'Identify achievements and accomplishments',
        'Consider life experiences that demonstrate skills'
      ]
    },
    {
      id: 'interests',
      title: 'Personal Interests & Strengths',
      icon: Star,
      items: [
        'Identify your natural talents and abilities',
        'List activities you enjoy and excel at',
        'Note areas where you learn quickly',
        'Consider personality traits that are career assets',
        'Identify your core values and motivations'
      ]
    },
    {
      id: 'resources',
      title: 'Available Resources',
      icon: Lightbulb,
      items: [
        'Assess time available for learning/development (hours per week)',
        'Determine budget for courses, certifications, or tools',
        'Identify support network (mentors, friends, family)',
        'List available learning resources (library, online platforms)',
        'Consider workspace and equipment needs'
      ]
    }
  ];

  const immediateGoals = [
    {
      id: 'skills-dev',
      title: 'Basic Skill Development',
      timeframe: '3-6 months',
      icon: TrendingUp,
      goals: [
        'Choose 2-3 core skills to develop based on career interests',
        'Complete beginner-level courses in chosen areas',
        'Practice skills through small projects or exercises',
        'Join online communities related to your field of interest',
        'Document learning progress and create a portfolio'
      ]
    },
    {
      id: 'entry-positions',
      title: 'Entry-Level Position Targets',
      timeframe: '3-6 months',
      icon: Target,
      goals: [
        'Research entry-level positions in your field of interest',
        'Identify common requirements and qualifications',
        'Create a list of 10-15 target companies',
        'Understand typical career progression paths',
        'Set realistic salary expectations for entry-level roles'
      ]
    },
    {
      id: 'certifications',
      title: 'Essential Training & Certifications',
      timeframe: '3-6 months',
      icon: Award,
      goals: [
        'Identify industry-standard certifications for your field',
        'Research free or low-cost certification options',
        'Create a study plan for 1-2 key certifications',
        'Join study groups or find study partners',
        'Schedule certification exams within 6 months'
      ]
    },
    {
      id: 'networking',
      title: 'Building Professional Network',
      timeframe: '3-6 months',
      icon: Users,
      goals: [
        'Create professional profiles (LinkedIn, industry platforms)',
        'Attend virtual networking events and webinars',
        'Connect with 5-10 professionals in your target field',
        'Join professional associations or online communities',
        'Reach out to potential mentors or advisors'
      ]
    },
    {
      id: 'routine',
      title: 'Daily Routine Structure',
      timeframe: 'Immediate',
      icon: Clock,
      goals: [
        'Establish consistent wake-up and sleep times',
        'Block 1-2 hours daily for learning and skill development',
        'Create a dedicated workspace for professional activities',
        'Set weekly goals and review progress regularly',
        'Maintain work-life balance and self-care practices'
      ]
    }
  ];

  const actionSteps = [
    {
      id: 'daily',
      title: 'Daily Learning Objectives',
      icon: Calendar,
      steps: [
        'Dedicate 1-2 hours to skill development',
        'Read industry news and trends (30 minutes)',
        'Practice new skills through exercises or projects',
        'Connect with one new professional contact',
        'Update learning journal with progress and insights'
      ]
    },
    {
      id: 'weekly',
      title: 'Weekly Milestone Targets',
      icon: CheckCircle,
      steps: [
        'Complete one course module or chapter',
        'Apply for 2-3 relevant positions or opportunities',
        'Attend one networking event or webinar',
        'Update resume and portfolio with new skills',
        'Review and adjust learning plan based on progress'
      ]
    },
    {
      id: 'monthly',
      title: 'Monthly Progress Reviews',
      icon: TrendingUp,
      steps: [
        'Assess skill development progress against goals',
        'Update professional profiles and portfolios',
        'Seek feedback from mentors or peers',
        'Adjust learning plan based on industry changes',
        'Celebrate achievements and set new challenges'
      ]
    }
  ];

  const beginnerResources = [
    {
      category: 'Free Learning Platforms',
      resources: [
        'Coursera (audit courses for free)',
        'edX (free courses from universities)',
        'Khan Academy (foundational skills)',
        'YouTube (tutorials and explanations)',
        'Codecademy (programming basics)'
      ]
    },
    {
      category: 'Professional Development',
      resources: [
        'LinkedIn Learning (free trial)',
        'Google Career Certificates',
        'IBM SkillsBuild',
        'Microsoft Learn',
        'AWS Training and Certification'
      ]
    },
    {
      category: 'Networking & Community',
      resources: [
        'LinkedIn professional networking',
        'Meetup.com for local events',
        'Reddit communities for your field',
        'Discord servers for professionals',
        'Industry-specific forums and groups'
      ]
    },
    {
      category: 'Career Planning Tools',
      resources: [
        'O*NET Interest Profiler (career exploration)',
        'Bureau of Labor Statistics (job outlook)',
        'Glassdoor (salary and company research)',
        'Indeed Career Guide',
        'Local career counseling services'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Fresh Start Development Plan</h1>
        <p className="text-green-100">A comprehensive guide for beginning your personal and professional development journey from ground zero</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Progress</h2>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedSections.length / (assessmentAreas.length + immediateGoals.length + actionSteps.length)) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {completedSections.length} / {assessmentAreas.length + immediateGoals.length + actionSteps.length} sections completed
          </span>
        </div>
      </div>

      {/* 1. Current Situation Assessment */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">1. Assess Your Current Situation</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start by taking an honest inventory of where you are right now. This assessment will help you identify your starting point and available resources.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessmentAreas.map((area) => (
            <div key={area.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <area.icon className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{area.title}</h3>
                </div>
                <button
                  onClick={() => toggleSection(area.id)}
                  className={`p-2 rounded-full transition-colors ${
                    completedSections.includes(area.id)
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {area.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Immediate Goals */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">2. Define Your Immediate Goals (Next 3-6 Months)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Set realistic, achievable goals for the next 3-6 months. These should be specific, measurable, and aligned with your long-term career aspirations.
        </p>
        
        <div className="space-y-6">
          {immediateGoals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <goal.icon className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                    <span className="text-sm text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
                      {goal.timeframe}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleSection(goal.id)}
                  className={`p-2 rounded-full transition-colors ${
                    completedSections.includes(goal.id)
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {goal.goals.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Action Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">3. Specific Action Steps</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Break down your goals into actionable daily, weekly, and monthly tasks. Consistency is key to building momentum and achieving your objectives.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {actionSteps.map((step) => (
            <div key={step.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <step.icon className="w-6 h-6 text-teal-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <button
                  onClick={() => toggleSection(step.id)}
                  className={`p-2 rounded-full transition-colors ${
                    completedSections.includes(step.id)
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {step.steps.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Beginner-Friendly Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">4. Beginner-Friendly Resources</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start with these accessible, often free resources designed for beginners. Many offer certificates upon completion and can help build your initial portfolio.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beginnerResources.map((category, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{category.category}</h3>
              <ul className="space-y-2">
                {category.resources.map((resource, resourceIndex) => (
                  <li key={resourceIndex} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Success Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-300 mb-4">💡 Success Tips for Your Fresh Start</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Start Small & Build Momentum</h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Begin with 30-60 minutes of learning daily. Consistency beats intensity when building new habits.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Document Everything</h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Keep a learning journal and build a portfolio. Even small projects demonstrate your growth and commitment.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Connect with Others</h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Join communities, find study partners, and don't hesitate to ask questions. Everyone started somewhere.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Celebrate Progress</h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Acknowledge every milestone, no matter how small. Progress is progress, and every step counts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshStartPlan;