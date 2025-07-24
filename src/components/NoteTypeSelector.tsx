import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Lightbulb, FileText, Calendar, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NoteType = 'task' | 'idea' | 'resource' | 'deadline' | 'note';

interface NoteTypeInfo {
  id: NoteType;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  description: string;
}

const noteTypes: NoteTypeInfo[] = [
  {
    id: 'task',
    name: 'Task',
    icon: CheckSquare,
    color: 'hsl(217, 91%, 60%)',
    description: 'Action items and to-dos'
  },
  {
    id: 'idea',
    name: 'Idea',
    icon: Lightbulb,
    color: 'hsl(45, 93%, 58%)',
    description: 'Creative thoughts and concepts'
  },
  {
    id: 'resource',
    name: 'Resource',
    icon: FileText,
    color: 'hsl(142, 69%, 58%)',
    description: 'References, links, and materials'
  },
  {
    id: 'deadline',
    name: 'Deadline',
    icon: Calendar,
    color: 'hsl(0, 84%, 60%)',
    description: 'Important dates and milestones'
  },
  {
    id: 'note',
    name: 'Note',
    icon: Circle,
    color: 'hsl(210, 40%, 60%)',
    description: 'General notes and observations'
  },
];

interface NoteTypeSelectorProps {
  selectedType: NoteType;
  onTypeChange: (type: NoteType) => void;
  trigger?: React.ReactNode;
}

export const NoteTypeSelector: React.FC<NoteTypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange, 
  trigger 
}) => {
  const selectedTypeInfo = noteTypes.find(type => type.id === selectedType);
  const SelectedIcon = selectedTypeInfo?.icon || Circle;

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger || (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
          >
            <SelectedIcon className="h-4 w-4" style={{ color: selectedTypeInfo?.color }} />
            {selectedTypeInfo?.name || 'Note Type'}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4">
          <h4 className="font-medium text-sm text-muted-foreground mb-3">
            Choose Note Type
          </h4>
          <div className="space-y-2">
            {noteTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <button
                  key={type.id}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg border transition-all duration-200",
                    "hover:bg-accent hover:border-accent-foreground/20",
                    isSelected 
                      ? "bg-accent border-accent-foreground/20" 
                      : "border-border"
                  )}
                  onClick={() => onTypeChange(type.id)}
                >
                  <Icon 
                    className="h-5 w-5 mt-0.5 flex-shrink-0" 
                    style={{ color: type.color }}
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{type.name}</span>
                      {isSelected && (
                        <Badge variant="secondary" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const getNoteTypeInfo = (type: NoteType): NoteTypeInfo => {
  return noteTypes.find(t => t.id === type) || noteTypes[4]; // Default to 'note'
};

export const getNoteTypeIcon = (type: NoteType) => {
  const typeInfo = getNoteTypeInfo(type);
  return typeInfo.icon;
};

export const getNoteTypeColor = (type: NoteType) => {
  const typeInfo = getNoteTypeInfo(type);
  return typeInfo.color;
};