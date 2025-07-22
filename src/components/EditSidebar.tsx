import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EditSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  noteData: {
    id: string;
    title: string;
    content: string;
    theme: string;
  } | null;
  onSave: (id: string, title: string, content: string) => void;
}

export const EditSidebar: React.FC<EditSidebarProps> = ({
  isOpen,
  onClose,
  noteData,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
    }
  }, [noteData]);

  const handleSave = () => {
    if (noteData) {
      onSave(noteData.id, title, content);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          'fixed inset-0 bg-black/20 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          'fixed top-0 right-0 h-full w-96 bg-card border-l border-border z-50',
          'transform transition-transform duration-300 ease-in-out',
          'shadow-2xl',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Edit Note</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full min-h-[400px] resize-none"
              />
            </div>

            {noteData && (
              <Card className="p-3 bg-muted/50">
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Note ID:</span>
                    <span className="font-mono">{noteData.id}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Theme:</span>
                    <span className="capitalize">{noteData.theme}</span>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="flex-1"
                disabled={!noteData}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press <kbd className="bg-muted px-1 rounded">Ctrl+Enter</kbd> to save, <kbd className="bg-muted px-1 rounded">Esc</kbd> to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
};