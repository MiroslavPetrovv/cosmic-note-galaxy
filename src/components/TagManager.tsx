import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { defaultTags, Tag, getTagsByCategory, createCustomTag } from '@/utils/tags';
import { Tags, Plus, Palette, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagManagerProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  trigger?: React.ReactNode;
}

const colorPresets = [
  'hsl(0, 84%, 60%)',   // Red
  'hsl(45, 93%, 58%)',  // Orange
  'hsl(120, 60%, 50%)', // Green
  'hsl(217, 91%, 60%)', // Blue
  'hsl(262, 83%, 58%)', // Purple
  'hsl(346, 87%, 43%)', // Pink
  'hsl(173, 58%, 39%)', // Teal
  'hsl(200, 94%, 55%)', // Cyan
];

export const TagManager: React.FC<TagManagerProps> = ({ 
  selectedTags, 
  onTagsChange, 
  trigger 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customTags, setCustomTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState(colorPresets[0]);
  const [activeCategory, setActiveCategory] = useState<string>('priority');

  const allTags = [...defaultTags, ...customTags];
  const categorizedTags = getTagsByCategory(activeCategory as Tag['category']);

  const handleToggleTag = (tagId: string) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    onTagsChange(newSelectedTags);
  };

  const handleCreateCustomTag = () => {
    if (!newTagName.trim()) return;
    
    const newTag = createCustomTag(newTagName.trim(), newTagColor);
    setCustomTags(prev => [...prev, newTag]);
    setNewTagName('');
    setNewTagColor(colorPresets[0]);
  };

  const handleRemoveCustomTag = (tagId: string) => {
    setCustomTags(prev => prev.filter(tag => tag.id !== tagId));
    onTagsChange(selectedTags.filter(id => id !== tagId));
  };

  const getTagDisplay = (tag: Tag) => (
    <Badge
      key={tag.id}
      variant={selectedTags.includes(tag.id) ? "default" : "outline"}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:scale-105",
        selectedTags.includes(tag.id) && "shadow-sm"
      )}
      style={{
        backgroundColor: selectedTags.includes(tag.id) ? tag.color : 'transparent',
        borderColor: tag.color,
        color: selectedTags.includes(tag.id) ? 'white' : tag.color,
      }}
      onClick={() => handleToggleTag(tag.id)}
    >
      {tag.name}
    </Badge>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            Manage Tags
            {selectedTags.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedTags.length}
              </Badge>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tags className="h-5 w-5 text-primary" />
            Manage Tags
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="h-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="priority">Priority</TabsTrigger>
            <TabsTrigger value="type">Type</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 overflow-y-auto max-h-[60vh]">
            <TabsContent value="priority" className="mt-0">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Priority Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {getTagsByCategory('priority').map(getTagDisplay)}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="type" className="mt-0">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Note Type Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {getTagsByCategory('type').map(getTagDisplay)}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="status" className="mt-0">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Status Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {getTagsByCategory('status').map(getTagDisplay)}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="mt-0">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Custom Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {[...getTagsByCategory('custom'), ...customTags].map(tag => (
                    <div key={tag.id} className="relative group">
                      {getTagDisplay(tag)}
                      {customTags.some(ct => ct.id === tag.id) && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCustomTag(tag.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="create" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Plus className="h-5 w-5" />
                    Create Custom Tag
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tag-name">Tag Name</Label>
                    <Input
                      id="tag-name"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      placeholder="Enter tag name..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tag Color</Label>
                    <div className="flex flex-wrap gap-2">
                      {colorPresets.map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all duration-200",
                            newTagColor === color 
                              ? "border-foreground scale-110" 
                              : "border-border hover:scale-105"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => setNewTagColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <Badge
                      style={{
                        backgroundColor: newTagColor,
                        color: 'white',
                      }}
                    >
                      {newTagName || 'Custom Tag'}
                    </Badge>
                  </div>
                  
                  <Button 
                    onClick={handleCreateCustomTag}
                    disabled={!newTagName.trim()}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Tag
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};