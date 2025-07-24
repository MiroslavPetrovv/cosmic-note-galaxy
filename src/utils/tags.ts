export interface Tag {
  id: string;
  name: string;
  color: string;
  category: 'priority' | 'type' | 'status' | 'custom';
}

export const defaultTags: Tag[] = [
  // Priority tags
  { id: 'high', name: 'High Priority', color: 'hsl(0, 84%, 60%)', category: 'priority' },
  { id: 'medium', name: 'Medium Priority', color: 'hsl(45, 93%, 58%)', category: 'priority' },
  { id: 'low', name: 'Low Priority', color: 'hsl(120, 60%, 50%)', category: 'priority' },
  
  // Type tags
  { id: 'task', name: 'Task', color: 'hsl(217, 91%, 60%)', category: 'type' },
  { id: 'idea', name: 'Idea', color: 'hsl(262, 83%, 58%)', category: 'type' },
  { id: 'resource', name: 'Resource', color: 'hsl(142, 69%, 58%)', category: 'type' },
  { id: 'deadline', name: 'Deadline', color: 'hsl(346, 87%, 43%)', category: 'type' },
  
  // Status tags
  { id: 'todo', name: 'To Do', color: 'hsl(210, 40%, 60%)', category: 'status' },
  { id: 'inprogress', name: 'In Progress', color: 'hsl(45, 93%, 58%)', category: 'status' },
  { id: 'completed', name: 'Completed', color: 'hsl(120, 60%, 50%)', category: 'status' },
  { id: 'blocked', name: 'Blocked', color: 'hsl(0, 84%, 60%)', category: 'status' },
  
  // Custom category tags
  { id: 'project', name: 'Project', color: 'hsl(262, 52%, 47%)', category: 'custom' },
  { id: 'learning', name: 'Learning', color: 'hsl(200, 94%, 55%)', category: 'custom' },
  { id: 'brainstorming', name: 'Brainstorming', color: 'hsl(295, 76%, 65%)', category: 'custom' },
  { id: 'research', name: 'Research', color: 'hsl(173, 58%, 39%)', category: 'custom' },
];

export const getTagById = (id: string): Tag | undefined => {
  return defaultTags.find(tag => tag.id === id);
};

export const getTagsByCategory = (category: Tag['category']): Tag[] => {
  return defaultTags.filter(tag => tag.category === category);
};

export const createCustomTag = (name: string, color: string): Tag => {
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    color,
    category: 'custom'
  };
};