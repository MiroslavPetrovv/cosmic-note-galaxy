import { Node, Edge } from '@xyflow/react';

// Default galaxy data
export const getDefaultGalaxies = (): Node[] => [
  {
    id: 'galaxy-js',
    type: 'galaxy',
    position: { x: 200, y: 200 },
    data: { 
      name: 'JavaScript',
      noteCount: 3,
      theme: 'royal'
    },
  },
  {
    id: 'galaxy-design',
    type: 'galaxy',
    position: { x: 500, y: 100 },
    data: { 
      name: 'Design',
      noteCount: 2,
      theme: 'cosmic'
    },
  },
  {
    id: 'galaxy-projects',
    type: 'galaxy',
    position: { x: 300, y: 400 },
    data: { 
      name: 'Projects',
      noteCount: 4,
      theme: 'stellar'
    },
  },
];

export const getDefaultGalaxyNotes = (): { [key: string]: Node[] } => ({
  'galaxy-js': [
    {
      id: 'js-1',
      type: 'note',
      position: { x: 250, y: 150 },
      data: { 
        title: 'React Hooks',
        content: 'useState, useEffect, useCallback - the essential hooks for modern React development.',
        theme: 'royal',
        galaxy: 'JavaScript'
      },
    },
    {
      id: 'js-2',
      type: 'note',
      position: { x: 550, y: 200 },
      data: { 
        title: 'Async/Await',
        content: 'Modern way to handle asynchronous operations in JavaScript.',
        theme: 'royal',
        galaxy: 'JavaScript'
      },
    },
    {
      id: 'js-3',
      type: 'note',
      position: { x: 100, y: 350 },
      data: { 
        title: 'ES6 Features',
        content: 'Arrow functions, destructuring, template literals, and more.',
        theme: 'royal',
        galaxy: 'JavaScript'
      },
    },
  ],
  'galaxy-design': [
    {
      id: 'design-1',
      type: 'note',
      position: { x: 200, y: 200 },
      data: { 
        title: 'Color Theory',
        content: 'Understanding color harmony and psychology in design.',
        theme: 'cosmic',
        galaxy: 'Design'
      },
    },
    {
      id: 'design-2',
      type: 'note',
      position: { x: 450, y: 300 },
      data: { 
        title: 'Typography',
        content: 'The art of arranging type to make written language legible and appealing.',
        theme: 'cosmic',
        galaxy: 'Design'
      },
    },
  ],
  'galaxy-projects': [
    {
      id: 'proj-1',
      type: 'note',
      position: { x: 300, y: 150 },
      data: { 
        title: 'Mind Map App',
        content: 'Building a galaxy-themed mind mapping application.',
        theme: 'stellar',
        galaxy: 'Projects'
      },
    },
    {
      id: 'proj-2',
      type: 'note',
      position: { x: 150, y: 300 },
      data: { 
        title: 'Portfolio Website',
        content: 'Creating a personal portfolio to showcase work.',
        theme: 'stellar',
        galaxy: 'Projects'
      },
    },
    {
      id: 'proj-3',
      type: 'note',
      position: { x: 500, y: 250 },
      data: { 
        title: 'Learning Goals',
        content: 'Track progress on learning new technologies.',
        theme: 'stellar',
        galaxy: 'Projects'
      },
    },
    {
      id: 'proj-4',
      type: 'note',
      position: { x: 350, y: 400 },
      data: { 
        title: 'Team Collaboration',
        content: 'Best practices for working with development teams.',
        theme: 'stellar',
        galaxy: 'Projects'
      },
    },
  ],
});

// Update galaxy note counts based on actual notes
export const updateGalaxyNoteCounts = (galaxies: Node[], galaxyNotes: { [key: string]: Node[] }): Node[] => {
  return galaxies.map(galaxy => ({
    ...galaxy,
    data: {
      ...galaxy.data,
      noteCount: galaxyNotes[galaxy.id]?.length || 0
    }
  }));
};