import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className="bg-card/80 backdrop-blur-sm border-galaxy-node-border shadow-galaxy-node hover:shadow-galaxy-glow transition-all duration-300"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-galaxy-glow" />
      ) : (
        <Moon className="h-5 w-5 text-galaxy-node-border" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};