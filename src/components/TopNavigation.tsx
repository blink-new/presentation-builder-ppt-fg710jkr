import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { 
  Download, 
  Save, 
  Share2, 
  Play, 
  Settings, 
  FileText,
  MoreHorizontal,
  Undo,
  Redo
} from 'lucide-react';
import { Presentation } from '../types/presentation';

interface TopNavigationProps {
  presentation: Presentation;
  onUpdatePresentation: (updates: { title?: string; description?: string }) => void;
  onExportPPT: () => void;
  onSave: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  presentation,
  onUpdatePresentation,
  onExportPPT,
  onSave
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(presentation.title);

  const handleTitleSave = () => {
    onUpdatePresentation({ title: tempTitle });
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTempTitle(presentation.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Left Section - Title and Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          {isEditingTitle ? (
            <Input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleTitleKeyDown}
              className="font-medium text-lg border-none shadow-none p-0 h-auto"
              autoFocus
            />
          ) : (
            <h1
              className="font-medium text-lg cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => setIsEditingTitle(true)}
            >
              {presentation.title}
            </h1>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {presentation.slides.length} slides
          </Badge>
          <span className="text-xs text-gray-500">
            Last saved: {presentation.updatedAt.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Center Section - Quick Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" disabled>
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" disabled>
          <Redo className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <Button variant="ghost" size="sm">
          <Play className="w-4 h-4 mr-2" />
          Present
        </Button>
      </div>

      {/* Right Section - Main Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Presentation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Share Link</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={`https://presentations.app/view/${presentation.id}`}
                    readOnly
                    className="flex-1"
                  />
                  <Button size="sm">Copy</Button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Anyone with this link can view your presentation
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button onClick={onExportPPT} className="bg-indigo-600 hover:bg-indigo-700">
          <Download className="w-4 h-4 mr-2" />
          Export PPT
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Presentation Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="w-4 h-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="w-4 h-4 mr-2" />
              Download Images
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};