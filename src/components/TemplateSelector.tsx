import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { templates, Template } from '@/utils/templates';
import { FileText, Lightbulb, Target, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  trigger?: React.ReactNode;
}

const categoryIcons = {
  project: Target,
  learning: Lightbulb,
  brainstorming: Search,
  research: FileText,
};

const categoryLabels = {
  project: 'Project Management',
  learning: 'Learning & Education',
  brainstorming: 'Creative Brainstorming',
  research: 'Research & Analysis',
};

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  onSelectTemplate, 
  trigger 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];
  
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate(template);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Use Template
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Choose a Template
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="h-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            {categories.slice(1).map(category => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <TabsTrigger key={category} value={category} className="flex items-center gap-1">
                  <Icon className="h-3 w-3" />
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          <div className="mt-4 overflow-y-auto max-h-[60vh]">
            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => {
                  const Icon = categoryIcons[template.category];
                  return (
                    <Card 
                      key={template.id} 
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Icon className="h-6 w-6 text-primary" />
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {String(template.description)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {template.galaxies.slice(0, 3).map((galaxy, index) => (
                              <Badge 
                                key={galaxy.id} 
                                variant="outline" 
                                className="text-xs"
                              >
                                {String(galaxy.data.name)}
                              </Badge>
                            ))}
                            {template.galaxies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.galaxies.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {template.galaxies.length} galaxies • {
                              Object.values(template.galaxyNotes).flat().length
                            } notes
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};