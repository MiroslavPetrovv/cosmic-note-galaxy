import React from 'react';
import { Plus, Trash2, Sparkles, ArrowLeft, X, Save, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TemplateSelector } from './TemplateSelector';
import { getLastSavedTime } from '@/hooks/useAutoSave';

interface ToolbarProps {
  onAddNote: () => void;
  onDeleteSelected: () => void;
  onNavigateToGalaxies?: () => void;
  onUseTemplate?: (template: any) => void;
  viewMode: 'galaxies' | 'notes';
  currentGalaxy?: string | null;
  linkingMode?: boolean;
  onCancelLinking?: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddNote,
  onDeleteSelected,
  onNavigateToGalaxies,
  onUseTemplate,
  viewMode,
  currentGalaxy,
  linkingMode,
  onCancelLinking,
}) => {
  return (
    <Card className="flex items-center gap-2 p-2 bg-card/80 backdrop-blur-sm border-galaxy-node-border shadow-galaxy-node">
      {onNavigateToGalaxies && (
        <Button
          onClick={onNavigateToGalaxies}
          size="sm"
          variant="outline"
          className="border-galaxy-node-border"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Galaxies
        </Button>
      )}
      
      {onUseTemplate && viewMode === 'galaxies' && (
        <TemplateSelector 
          onSelectTemplate={onUseTemplate}
          trigger={
            <Button
              size="sm"
              variant="outline"
              className="border-galaxy-node-border"
            >
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </Button>
          }
        />
      )}
      
      <Button
        onClick={onAddNote}
        size="sm"
        className="bg-galaxy-node hover:bg-galaxy-node-border text-galaxy-node-border hover:text-card"
        disabled={viewMode === 'galaxies'}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Note
      </Button>
      
      <Button
        onClick={onDeleteSelected}
        size="sm"
        variant="outline"
        className="border-galaxy-node-border hover:bg-destructive hover:text-destructive-foreground"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </Button>

      {linkingMode && onCancelLinking && (
        <Button
          onClick={onCancelLinking}
          size="sm"
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel Link
        </Button>
      )}
      
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-1 text-galaxy-glow min-w-0">
          <Sparkles className="h-3 w-3 flex-shrink-0" />
          <span className="text-xs font-medium truncate">
            {viewMode === 'galaxies' ? 'Galaxy View' : 'Note View'}
          </span>
        </div>
        
        {linkingMode && (
          <Badge variant="secondary" className="text-xs flex-shrink-0">
            Linking Mode
          </Badge>
        )}
        
        <div className="flex items-center gap-1 text-muted-foreground">
          <Save className="h-3 w-3" />
          <span className="text-xs">Auto-save</span>
        </div>
      </div>
    </Card>
  );
};