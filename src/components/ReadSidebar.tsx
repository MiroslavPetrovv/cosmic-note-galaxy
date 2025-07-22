import React from 'react';
import { X, Edit3, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ReadSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  noteData: {
    id: string;
    title: string;
    content: string;
    theme: string;
  } | null;
  onEdit: (noteId: string) => void;
  onLink: (noteId: string) => void;
}

export const ReadSidebar: React.FC<ReadSidebarProps> = ({
  isOpen,
  onClose,
  noteData,
  onEdit,
  onLink,
}) => {
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
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Read Note</h2>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => noteData && onEdit(noteData.id)}
                className="h-8 w-8"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => noteData && onLink(noteData.id)}
                className="h-8 w-8"
              >
                <Link className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {noteData && (
              <>
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-4">
                    {noteData.title}
                  </h1>
                </div>

                <div className="prose prose-sm max-w-none">
                  <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {noteData.content}
                  </div>
                </div>

                <Card className="p-3 bg-muted/50 mt-8">
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};