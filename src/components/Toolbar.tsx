import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Sparkles } from 'lucide-react';

interface ToolbarProps {
  onAddNote: () => void;
  onDeleteSelected: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onAddNote, onDeleteSelected }) => {
  return (
    <div className="flex gap-2 bg-card/80 backdrop-blur-sm rounded-lg p-2 border border-galaxy-node-border shadow-galaxy-node">
      <Button
        variant="outline"
        size="sm"
        onClick={onAddNote}
        className="gap-2 hover:shadow-galaxy-glow transition-all duration-300"
      >
        <Plus className="h-4 w-4" />
        Add Note
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onDeleteSelected}
        className="gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive hover:shadow-galaxy-glow transition-all duration-300"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>

      <div className="flex items-center gap-2 px-3 py-1 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 text-galaxy-glow" />
        <span className="font-medium">Galaxy Mind</span>
      </div>
    </div>
  );
};