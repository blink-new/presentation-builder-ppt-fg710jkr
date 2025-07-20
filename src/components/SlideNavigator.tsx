import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Plus, MoreVertical, Copy, Trash2 } from 'lucide-react';
import { Slide } from '../types/presentation';
import { slideTemplates } from '../data/slideTemplates';

interface SlideNavigatorProps {
  slides: Slide[];
  currentSlideIndex: number;
  onSlideSelect: (index: number) => void;
  onAddSlide: (type: Slide['type']) => void;
  onDuplicateSlide: (slideId: string) => void;
  onDeleteSlide: (slideId: string) => void;
}

export const SlideNavigator: React.FC<SlideNavigatorProps> = ({
  slides,
  currentSlideIndex,
  onSlideSelect,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide
}) => {
  const getSlideIcon = (type: Slide['type']) => {
    const template = slideTemplates.find(t => t.type === type);
    return template?.preview || '📄';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Slides</h3>
          <Badge variant="secondary" className="text-xs">
            {slides.length}
          </Badge>
        </div>
        
        {/* Add Slide Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Slide
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {slideTemplates.map((template) => (
              <DropdownMenuItem
                key={template.id}
                onClick={() => onAddSlide(template.type)}
                className="flex items-center gap-3 p-3"
              >
                <span className="text-lg">{template.preview}</span>
                <div>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-gray-500">{template.description}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Slides List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {slides.map((slide, index) => (
          <Card
            key={slide.id}
            className={`p-3 cursor-pointer transition-all hover:shadow-md ${
              index === currentSlideIndex
                ? 'ring-2 ring-indigo-500 bg-indigo-50'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSlideSelect(index)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="text-lg flex-shrink-0">
                  {getSlideIcon(slide.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      {index + 1}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {slide.type}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm text-gray-900 truncate">
                    {slide.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {slide.content.title || slide.content.body || 'Empty slide'}
                  </p>
                </div>
              </div>
              
              {/* Slide Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDuplicateSlide(slide.id)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDeleteSlide(slide.id)}
                    className="text-red-600"
                    disabled={slides.length === 1}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};