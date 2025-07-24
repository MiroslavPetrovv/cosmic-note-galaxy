import { Node } from '@xyflow/react';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'project' | 'learning' | 'brainstorming' | 'research';
  galaxies: Node[];
  galaxyNotes: { [key: string]: Node[] };
}

export const templates: Template[] = [
  {
    id: 'project-planning',
    name: 'Project Planning',
    description: 'Organize project phases, tasks, and deadlines',
    category: 'project',
    galaxies: [
      {
        id: 'galaxy-planning',
        type: 'galaxy',
        position: { x: 200, y: 150 },
        data: { 
          name: 'Planning',
          noteCount: 3,
          theme: 'royal',
          tags: ['project', 'planning']
        },
      },
      {
        id: 'galaxy-execution',
        type: 'galaxy',
        position: { x: 450, y: 150 },
        data: { 
          name: 'Execution',
          noteCount: 4,
          theme: 'stellar',
          tags: ['project', 'development']
        },
      },
      {
        id: 'galaxy-review',
        type: 'galaxy',
        position: { x: 325, y: 350 },
        data: { 
          name: 'Review & Testing',
          noteCount: 2,
          theme: 'cosmic',
          tags: ['project', 'qa']
        },
      },
    ],
    galaxyNotes: {
      'galaxy-planning': [
        {
          id: 'plan-1',
          type: 'note',
          position: { x: 100, y: 100 },
          data: { 
            title: 'Project Requirements',
            content: 'Define scope, objectives, and success criteria',
            theme: 'royal',
            noteType: 'task',
            tags: ['requirements', 'planning'],
            priority: 'high'
          },
        },
        {
          id: 'plan-2',
          type: 'note',
          position: { x: 300, y: 150 },
          data: { 
            title: 'Timeline & Milestones',
            content: 'Key deadlines and project phases',
            theme: 'royal',
            noteType: 'deadline',
            tags: ['timeline', 'milestones'],
            priority: 'high'
          },
        },
        {
          id: 'plan-3',
          type: 'note',
          position: { x: 200, y: 300 },
          data: { 
            title: 'Resource Allocation',
            content: 'Team members, budget, and tools needed',
            theme: 'royal',
            noteType: 'resource',
            tags: ['resources', 'budget'],
            priority: 'medium'
          },
        },
      ],
      'galaxy-execution': [
        {
          id: 'exec-1',
          type: 'note',
          position: { x: 150, y: 100 },
          data: { 
            title: 'Development Setup',
            content: 'Environment configuration and initial setup',
            theme: 'stellar',
            noteType: 'task',
            tags: ['setup', 'development'],
            priority: 'high'
          },
        },
        {
          id: 'exec-2',
          type: 'note',
          position: { x: 350, y: 120 },
          data: { 
            title: 'Core Features',
            content: 'Implementation of main functionality',
            theme: 'stellar',
            noteType: 'task',
            tags: ['features', 'development'],
            priority: 'high'
          },
        },
        {
          id: 'exec-3',
          type: 'note',
          position: { x: 100, y: 280 },
          data: { 
            title: 'API Integration',
            content: 'Connect external services and APIs',
            theme: 'stellar',
            noteType: 'task',
            tags: ['api', 'integration'],
            priority: 'medium'
          },
        },
        {
          id: 'exec-4',
          type: 'note',
          position: { x: 400, y: 300 },
          data: { 
            title: 'Documentation',
            content: 'User guides and technical documentation',
            theme: 'stellar',
            noteType: 'resource',
            tags: ['documentation', 'guides'],
            priority: 'medium'
          },
        },
      ],
      'galaxy-review': [
        {
          id: 'review-1',
          type: 'note',
          position: { x: 200, y: 150 },
          data: { 
            title: 'Testing Strategy',
            content: 'Unit tests, integration tests, and user acceptance testing',
            theme: 'cosmic',
            noteType: 'task',
            tags: ['testing', 'qa'],
            priority: 'high'
          },
        },
        {
          id: 'review-2',
          type: 'note',
          position: { x: 350, y: 250 },
          data: { 
            title: 'Deployment Plan',
            content: 'Production deployment and rollback strategy',
            theme: 'cosmic',
            noteType: 'deadline',
            tags: ['deployment', 'production'],
            priority: 'high'
          },
        },
      ],
    },
  },
  {
    id: 'learning-path',
    name: 'Learning Path',
    description: 'Structure learning goals and track progress',
    category: 'learning',
    galaxies: [
      {
        id: 'galaxy-fundamentals',
        type: 'galaxy',
        position: { x: 200, y: 200 },
        data: { 
          name: 'Fundamentals',
          noteCount: 3,
          theme: 'cosmic',
          tags: ['learning', 'basics']
        },
      },
      {
        id: 'galaxy-advanced',
        type: 'galaxy',
        position: { x: 500, y: 200 },
        data: { 
          name: 'Advanced Topics',
          noteCount: 3,
          theme: 'nebula',
          tags: ['learning', 'advanced']
        },
      },
      {
        id: 'galaxy-practice',
        type: 'galaxy',
        position: { x: 350, y: 400 },
        data: { 
          name: 'Practice Projects',
          noteCount: 2,
          theme: 'stellar',
          tags: ['learning', 'practice']
        },
      },
    ],
    galaxyNotes: {
      'galaxy-fundamentals': [
        {
          id: 'fund-1',
          type: 'note',
          position: { x: 150, y: 100 },
          data: { 
            title: 'Core Concepts',
            content: 'Basic principles and terminology',
            theme: 'cosmic',
            noteType: 'idea',
            tags: ['concepts', 'basics'],
            priority: 'high'
          },
        },
        {
          id: 'fund-2',
          type: 'note',
          position: { x: 350, y: 150 },
          data: { 
            title: 'Learning Resources',
            content: 'Books, courses, and tutorials',
            theme: 'cosmic',
            noteType: 'resource',
            tags: ['resources', 'materials'],
            priority: 'medium'
          },
        },
        {
          id: 'fund-3',
          type: 'note',
          position: { x: 250, y: 300 },
          data: { 
            title: 'Practice Exercises',
            content: 'Hands-on exercises to reinforce learning',
            theme: 'cosmic',
            noteType: 'task',
            tags: ['practice', 'exercises'],
            priority: 'high'
          },
        },
      ],
      'galaxy-advanced': [
        {
          id: 'adv-1',
          type: 'note',
          position: { x: 200, y: 120 },
          data: { 
            title: 'Advanced Patterns',
            content: 'Complex patterns and best practices',
            theme: 'nebula',
            noteType: 'idea',
            tags: ['patterns', 'advanced'],
            priority: 'medium'
          },
        },
        {
          id: 'adv-2',
          type: 'note',
          position: { x: 400, y: 180 },
          data: { 
            title: 'Real-world Applications',
            content: 'Industry use cases and examples',
            theme: 'nebula',
            noteType: 'resource',
            tags: ['examples', 'industry'],
            priority: 'medium'
          },
        },
        {
          id: 'adv-3',
          type: 'note',
          position: { x: 300, y: 320 },
          data: { 
            title: 'Certification Goals',
            content: 'Professional certifications to pursue',
            theme: 'nebula',
            noteType: 'deadline',
            tags: ['certification', 'goals'],
            priority: 'low'
          },
        },
      ],
      'galaxy-practice': [
        {
          id: 'prac-1',
          type: 'note',
          position: { x: 200, y: 150 },
          data: { 
            title: 'Portfolio Project',
            content: 'Showcase project for portfolio',
            theme: 'stellar',
            noteType: 'task',
            tags: ['portfolio', 'project'],
            priority: 'high'
          },
        },
        {
          id: 'prac-2',
          type: 'note',
          position: { x: 350, y: 250 },
          data: { 
            title: 'Open Source Contribution',
            content: 'Contribute to open source projects',
            theme: 'stellar',
            noteType: 'idea',
            tags: ['opensource', 'contribution'],
            priority: 'medium'
          },
        },
      ],
    },
  },
  {
    id: 'brainstorming',
    name: 'Brainstorming Session',
    description: 'Capture and organize creative ideas',
    category: 'brainstorming',
    galaxies: [
      {
        id: 'galaxy-ideas',
        type: 'galaxy',
        position: { x: 250, y: 150 },
        data: { 
          name: 'Raw Ideas',
          noteCount: 4,
          theme: 'nebula',
          tags: ['brainstorming', 'ideas']
        },
      },
      {
        id: 'galaxy-refined',
        type: 'galaxy',
        position: { x: 450, y: 300 },
        data: { 
          name: 'Refined Concepts',
          noteCount: 2,
          theme: 'royal',
          tags: ['brainstorming', 'refined']
        },
      },
      {
        id: 'galaxy-action',
        type: 'galaxy',
        position: { x: 150, y: 400 },
        data: { 
          name: 'Action Items',
          noteCount: 3,
          theme: 'stellar',
          tags: ['brainstorming', 'action']
        },
      },
    ],
    galaxyNotes: {
      'galaxy-ideas': [
        {
          id: 'idea-1',
          type: 'note',
          position: { x: 100, y: 100 },
          data: { 
            title: 'Initial Concept',
            content: 'First thoughts and rough ideas',
            theme: 'nebula',
            noteType: 'idea',
            tags: ['initial', 'concept'],
            priority: 'medium'
          },
        },
        {
          id: 'idea-2',
          type: 'note',
          position: { x: 300, y: 120 },
          data: { 
            title: 'Alternative Approach',
            content: 'Different way to solve the problem',
            theme: 'nebula',
            noteType: 'idea',
            tags: ['alternative', 'approach'],
            priority: 'medium'
          },
        },
        {
          id: 'idea-3',
          type: 'note',
          position: { x: 200, y: 280 },
          data: { 
            title: 'Inspiration Sources',
            content: 'External references and inspiration',
            theme: 'nebula',
            noteType: 'resource',
            tags: ['inspiration', 'references'],
            priority: 'low'
          },
        },
        {
          id: 'idea-4',
          type: 'note',
          position: { x: 400, y: 250 },
          data: { 
            title: 'Wild Ideas',
            content: 'Creative, out-of-the-box thinking',
            theme: 'nebula',
            noteType: 'idea',
            tags: ['creative', 'wild'],
            priority: 'low'
          },
        },
      ],
      'galaxy-refined': [
        {
          id: 'refined-1',
          type: 'note',
          position: { x: 200, y: 150 },
          data: { 
            title: 'Feasible Solution',
            content: 'Practical and implementable approach',
            theme: 'royal',
            noteType: 'idea',
            tags: ['feasible', 'solution'],
            priority: 'high'
          },
        },
        {
          id: 'refined-2',
          type: 'note',
          position: { x: 350, y: 250 },
          data: { 
            title: 'MVP Features',
            content: 'Minimum viable product features',
            theme: 'royal',
            noteType: 'task',
            tags: ['mvp', 'features'],
            priority: 'high'
          },
        },
      ],
      'galaxy-action': [
        {
          id: 'action-1',
          type: 'note',
          position: { x: 150, y: 100 },
          data: { 
            title: 'Research Phase',
            content: 'Investigate technical feasibility',
            theme: 'stellar',
            noteType: 'task',
            tags: ['research', 'feasibility'],
            priority: 'high'
          },
        },
        {
          id: 'action-2',
          type: 'note',
          position: { x: 300, y: 180 },
          data: { 
            title: 'Prototype Development',
            content: 'Build initial prototype',
            theme: 'stellar',
            noteType: 'task',
            tags: ['prototype', 'development'],
            priority: 'medium'
          },
        },
        {
          id: 'action-3',
          type: 'note',
          position: { x: 200, y: 320 },
          data: { 
            title: 'Stakeholder Review',
            content: 'Present ideas to stakeholders',
            theme: 'stellar',
            noteType: 'deadline',
            tags: ['review', 'presentation'],
            priority: 'medium'
          },
        },
      ],
    },
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: Template['category']): Template[] => {
  return templates.filter(template => template.category === category);
};