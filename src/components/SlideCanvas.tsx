import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ZoomIn, ZoomOut, Grid, Move } from 'lucide-react';
import { Slide, BrandSettings } from '../types/presentation';

interface SlideCanvasProps {
  slide: Slide;
  brandSettings: BrandSettings;
  onUpdateSlide: (updates: Partial<Slide>) => void;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  brandSettings,
  onUpdateSlide
}) => {
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  const handleContentUpdate = (field: string, value: string) => {
    onUpdateSlide({
      content: {
        ...slide.content,
        [field]: value
      }
    });
  };

  const renderSlideContent = () => {
    const slideStyle = {
      fontFamily: brandSettings.fontFamily,
      backgroundColor: slide.background || '#ffffff',
      transform: `scale(${zoom / 100})`,
      transformOrigin: 'top left'
    };

    switch (slide.type) {
      case 'title':
        return (
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-12 text-center"
            style={slideStyle}
          >
            {editingField === 'title' ? (
              <Input
                value={slide.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                className="text-4xl font-bold text-center border-none shadow-none bg-transparent"
                style={{ color: brandSettings.primaryColor }}
                autoFocus
              />
            ) : (
              <h1
                className="text-4xl font-bold mb-6 cursor-pointer hover:bg-gray-100 p-2 rounded"
                style={{ color: brandSettings.primaryColor }}
                onClick={() => setEditingField('title')}
              >
                {slide.content.title || 'Click to edit title'}
              </h1>
            )}
            
            {editingField === 'subtitle' ? (
              <Input
                value={slide.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                className="text-xl text-center border-none shadow-none bg-transparent"
                autoFocus
              />
            ) : (
              <p
                className="text-xl text-gray-600 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => setEditingField('subtitle')}
              >
                {slide.content.subtitle || 'Click to edit subtitle'}
              </p>
            )}
          </div>
        );

      case 'content':
        return (
          <div className="w-full h-full p-12" style={slideStyle}>
            {editingField === 'title' ? (
              <Input
                value={slide.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                className="text-3xl font-bold border-none shadow-none bg-transparent mb-6"
                style={{ color: brandSettings.primaryColor }}
                autoFocus
              />
            ) : (
              <h2
                className="text-3xl font-bold mb-6 cursor-pointer hover:bg-gray-100 p-2 rounded"
                style={{ color: brandSettings.primaryColor }}
                onClick={() => setEditingField('title')}
              >
                {slide.content.title || 'Click to edit title'}
              </h2>
            )}
            
            {editingField === 'body' ? (
              <Textarea
                value={slide.content.body || ''}
                onChange={(e) => handleContentUpdate('body', e.target.value)}
                onBlur={() => setEditingField(null)}
                className="text-lg border-none shadow-none bg-transparent resize-none h-64"
                autoFocus
              />
            ) : (
              <div
                className="text-lg text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded min-h-64"
                onClick={() => setEditingField('body')}
              >
                {slide.content.body ? (
                  <div className="whitespace-pre-wrap">{slide.content.body}</div>
                ) : (
                  <div className="text-gray-400">Click to add content...</div>
                )}
              </div>
            )}
          </div>
        );

      case 'two-column':
        return (
          <div className="w-full h-full p-12" style={slideStyle}>
            {editingField === 'title' ? (
              <Input
                value={slide.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                className="text-3xl font-bold border-none shadow-none bg-transparent mb-8"
                style={{ color: brandSettings.primaryColor }}
                autoFocus
              />
            ) : (
              <h2
                className="text-3xl font-bold mb-8 cursor-pointer hover:bg-gray-100 p-2 rounded"
                style={{ color: brandSettings.primaryColor }}
                onClick={() => setEditingField('title')}
              >
                {slide.content.title || 'Click to edit title'}
              </h2>
            )}
            
            <div className="grid grid-cols-2 gap-8 h-3/4">
              <div>
                {editingField === 'leftColumn' ? (
                  <Textarea
                    value={slide.content.leftColumn || ''}
                    onChange={(e) => handleContentUpdate('leftColumn', e.target.value)}
                    onBlur={() => setEditingField(null)}
                    className="text-lg border-none shadow-none bg-transparent resize-none h-full"
                    autoFocus
                  />
                ) : (
                  <div
                    className="text-lg text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded h-full"
                    onClick={() => setEditingField('leftColumn')}
                  >
                    {slide.content.leftColumn ? (
                      <div className="whitespace-pre-wrap">{slide.content.leftColumn}</div>
                    ) : (
                      <div className="text-gray-400">Click to add left column content...</div>
                    )}
                  </div>
                )}
              </div>
              
              <div>
                {editingField === 'rightColumn' ? (
                  <Textarea
                    value={slide.content.rightColumn || ''}
                    onChange={(e) => handleContentUpdate('rightColumn', e.target.value)}
                    onBlur={() => setEditingField(null)}
                    className="text-lg border-none shadow-none bg-transparent resize-none h-full"
                    autoFocus
                  />
                ) : (
                  <div
                    className="text-lg text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded h-full"
                    onClick={() => setEditingField('rightColumn')}
                  >
                    {slide.content.rightColumn ? (
                      <div className="whitespace-pre-wrap">{slide.content.rightColumn}</div>
                    ) : (
                      <div className="text-gray-400">Click to add right column content...</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'image-focus':
        return (
          <div className="w-full h-full p-12" style={slideStyle}>
            <div className="h-full flex flex-col">
              <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                {slide.content.imageUrl ? (
                  <img
                    src={slide.content.imageUrl}
                    alt={slide.content.imageAlt || ''}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <div>Click to add image</div>
                  </div>
                )}
              </div>
              
              {editingField === 'title' ? (
                <Input
                  value={slide.content.title || ''}
                  onChange={(e) => handleContentUpdate('title', e.target.value)}
                  onBlur={() => setEditingField(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                  className="text-2xl font-bold text-center border-none shadow-none bg-transparent"
                  style={{ color: brandSettings.primaryColor }}
                  autoFocus
                />
              ) : (
                <h2
                  className="text-2xl font-bold text-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                  style={{ color: brandSettings.primaryColor }}
                  onClick={() => setEditingField('title')}
                >
                  {slide.content.title || 'Click to edit caption'}
                </h2>
              )}
            </div>
          </div>
        );

      case 'blank':
        return (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={slideStyle}
          >
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">✨</div>
              <div>Blank canvas - add your content</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Canvas Controls */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-16 text-center">
            {zoom}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showGrid ? "default" : "outline"}
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Move className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <Card 
            className={`bg-white shadow-lg aspect-[16/9] relative overflow-hidden ${
              showGrid ? 'bg-grid-pattern' : ''
            }`}
            style={{
              width: '100%',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {renderSlideContent()}
          </Card>
        </div>
      </div>
    </div>
  );
};