import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GalaxyData {
  name: string;
  noteCount: number;
  theme: 'royal' | 'cosmic' | 'stellar' | 'nebula';
}

const themeStyles = {
  royal: 'border-galaxy-node-border bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30',
  cosmic: 'border-purple-400 bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30',
  stellar: 'border-blue-400 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
  nebula: 'border-pink-400 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30',
};

export const GalaxyNode = memo(({ id, data, selected }: NodeProps) => {
  const galaxyData = data as unknown as GalaxyData;

  return (
    <Card 
      className={cn(
        'w-32 h-32 rounded-full p-4 transition-all duration-300 cursor-pointer hover:scale-110',
        'flex flex-col items-center justify-center',
        'shadow-galaxy-glow backdrop-blur-sm',
        themeStyles[galaxyData.theme],
        selected && 'ring-2 ring-primary ring-offset-2',
        'relative overflow-hidden'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-galaxy-node-border border border-background opacity-50 hover:opacity-100 transition-opacity"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-galaxy-node-border border border-background opacity-50 hover:opacity-100 transition-opacity"
      />
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-galaxy-node-border border border-background opacity-50 hover:opacity-100 transition-opacity"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-galaxy-node-border border border-background opacity-50 hover:opacity-100 transition-opacity"
      />

      <div className="text-center space-y-1">
        <h4 className="font-semibold text-sm text-foreground leading-tight">
          {galaxyData.name}
        </h4>
        <p className="text-xs text-muted-foreground">
          {galaxyData.noteCount} notes
        </p>
      </div>

      {/* Galaxy sparkle effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-galaxy-glow/10 to-transparent animate-pulse opacity-40 rounded-full" />
      
      {/* Galaxy center glow */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-galaxy-glow/30 rounded-full blur-sm animate-pulse" />
    </Card>
  );
});

GalaxyNode.displayName = 'GalaxyNode';