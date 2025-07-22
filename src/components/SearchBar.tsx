import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  galaxy: string;
  theme: string;
}

interface SearchBarProps {
  onSearch: (query: string) => SearchResult[];
  onNavigateToNote: (noteId: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onNavigateToNote,
  className,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      const searchResults = onSearch(searchQuery);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleNavigate = (noteId: string) => {
    onNavigateToNote(noteId);
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div className={cn('relative w-64', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="pl-10 bg-card/80 backdrop-blur-sm border-galaxy-node-border"
        />
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto z-50 bg-card/95 backdrop-blur-sm border-galaxy-node-border shadow-galaxy-node">
          <div className="p-2">
            {results.map((result) => (
              <Button
                key={result.id}
                variant="ghost"
                className="w-full justify-start p-3 h-auto text-left hover:bg-accent"
                onClick={() => handleNavigate(result.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <MapPin className="h-4 w-4 text-galaxy-connection mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {result.title}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {result.content}
                    </div>
                    <div className="text-xs text-galaxy-connection mt-1">
                      {result.galaxy} • {result.theme}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {isOpen && results.length === 0 && query && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-card/95 backdrop-blur-sm border-galaxy-node-border">
          <div className="p-4 text-center text-muted-foreground">
            No notes found for "{query}"
          </div>
        </Card>
      )}
    </div>
  );
};