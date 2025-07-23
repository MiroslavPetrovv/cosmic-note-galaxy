import React, { useState, useCallback, memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit3, Link, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NoteData {
  title: string;
  content: string;
  theme: 'royal' | 'cosmic' | 'stellar' | 'nebula';
  onEdit?: (noteId: string) => void;
  onLink?: (noteId: string) => void;
  onRead?: (noteId: string) => void;
}

const themeStyles = {
  royal: 'border-galaxy-node-border bg-gradient-node shadow-galaxy-glow',
  cosmic: 'border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 shadow-[0_0_30px_rgba(147,51,234,0.3)]',
  stellar: 'border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]',
  nebula: 'border-pink-400 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 shadow-[0_0_30px_rgba(236,72,153,0.3)]',
};

export const NoteNode = memo(({ id, data, selected }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const noteData = data as unknown as NoteData;
  const [title, setTitle] = useState(noteData.title);
  const [content, setContent] = useState(noteData.content);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    // Update the node data would go here in a real app
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
    if (e.key === 'Enter' && e.ctrlKey) {
      setIsEditing(false);
    }
  }, []);

  return (
    <Card 
      className={cn(
        'w-64 min-h-32 p-4 transition-all duration-300 cursor-pointer hover:scale-105 relative group',
        themeStyles[noteData.theme],
        selected && 'ring-2 ring-primary ring-offset-2',
        'backdrop-blur-sm'
      )}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-galaxy-node-border border-2 border-galaxy-bg opacity-70 hover:opacity-100 transition-opacity"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-galaxy-node-border border-2 border-galaxy-bg opacity-70 hover:opacity-100 transition-opacity"
      />
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-galaxy-node-border border-2 border-galaxy-bg opacity-70 hover:opacity-100 transition-opacity"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-galaxy-node-border border-2 border-galaxy-bg opacity-70 hover:opacity-100 transition-opacity"
      />

      {/* Action Buttons */}
      {isHovered && !isEditing && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 bg-card/80 hover:bg-accent"
            onClick={(e) => {
              e.stopPropagation();
              noteData.onRead?.(id);
            }}
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 bg-card/80 hover:bg-accent"
            onClick={(e) => {
              e.stopPropagation();
              noteData.onEdit?.(id);
            }}
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 bg-card/80 hover:bg-accent"
            onClick={(e) => {
              e.stopPropagation();
              noteData.onLink?.(id);
            }}
          >
            <Link className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="font-semibold text-lg border-0 p-0 h-auto bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
        ) : (
          <h3 className="font-semibold text-lg text-foreground leading-tight">
            {title}
          </h3>
        )}

        {isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="text-sm border-0 p-0 min-h-16 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Write your thoughts..."
          />
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>
        )}
      </div>

      {!isEditing && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-galaxy-glow/5 to-transparent animate-pulse opacity-30" />
      )}
    </Card>
  );
});

NoteNode.displayName = 'NoteNode';