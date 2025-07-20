import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Palette, Type, Image, Settings, Upload } from 'lucide-react';
import { Slide, BrandSettings } from '../types/presentation';

interface PropertiesPanelProps {
  slide: Slide;
  brandSettings: BrandSettings;
  onUpdateSlide: (updates: Partial<Slide>) => void;
  onUpdateBrandSettings: (updates: Partial<BrandSettings>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  slide,
  brandSettings,
  onUpdateSlide,
  onUpdateBrandSettings
}) => {
  const [activeTab, setActiveTab] = useState('slide');

  const fontOptions = [
    'Inter',
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins'
  ];

  const backgroundColors = [
    '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0',
    '#1e293b', '#334155', '#475569', '#64748b',
    '#dc2626', '#ea580c', '#d97706', '#ca8a04',
    '#65a30d', '#16a34a', '#059669', '#0d9488',
    '#0891b2', '#0284c7', '#2563eb', '#4f46e5',
    '#7c3aed', '#9333ea', '#c026d3', '#db2777'
  ];

  const handleSlideBackgroundChange = (color: string) => {
    onUpdateSlide({ background: color });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onUpdateSlide({
          content: {
            ...slide.content,
            imageUrl,
            imageAlt: file.name
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Properties</h3>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="slide" className="text-xs">
            <Settings className="w-3 h-3 mr-1" />
            Slide
          </TabsTrigger>
          <TabsTrigger value="design" className="text-xs">
            <Palette className="w-3 h-3 mr-1" />
            Design
          </TabsTrigger>
          <TabsTrigger value="brand" className="text-xs">
            <Type className="w-3 h-3 mr-1" />
            Brand
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="slide" className="space-y-4 mt-0">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Slide Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="slide-title" className="text-xs">Title</Label>
                  <Input
                    id="slide-title"
                    value={slide.title}
                    onChange={(e) => onUpdateSlide({ title: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Type</Label>
                  <div className="mt-1">
                    <Badge variant="outline" className="capitalize">
                      {slide.type.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-xs">Background Color</Label>
                  <div className="grid grid-cols-6 gap-2 mt-2">
                    {backgroundColors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded border-2 ${
                          slide.background === color
                            ? 'border-indigo-500'
                            : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleSlideBackgroundChange(color)}
                      />
                    ))}
                  </div>
                </div>

                {slide.type === 'image-focus' && (
                  <>
                    <Separator />
                    <div>
                      <Label className="text-xs">Image</Label>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </Button>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                      {slide.content.imageUrl && (
                        <div className="mt-2">
                          <img
                            src={slide.content.imageUrl}
                            alt={slide.content.imageAlt}
                            className="w-full h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="space-y-4 mt-0">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Font Family</Label>
                  <Select
                    value={brandSettings.fontFamily}
                    onValueChange={(value) => onUpdateBrandSettings({ fontFamily: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>
                          <span style={{ fontFamily: font }}>{font}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primary-color" className="text-xs">Primary Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="primary-color"
                      type="color"
                      value={brandSettings.primaryColor}
                      onChange={(e) => onUpdateBrandSettings({ primaryColor: e.target.value })}
                      className="w-12 h-8 p-1 border rounded"
                    />
                    <Input
                      value={brandSettings.primaryColor}
                      onChange={(e) => onUpdateBrandSettings({ primaryColor: e.target.value })}
                      className="flex-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondary-color" className="text-xs">Secondary Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={brandSettings.secondaryColor}
                      onChange={(e) => onUpdateBrandSettings({ secondaryColor: e.target.value })}
                      className="w-12 h-8 p-1 border rounded"
                    />
                    <Input
                      value={brandSettings.secondaryColor}
                      onChange={(e) => onUpdateBrandSettings({ secondaryColor: e.target.value })}
                      className="flex-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accent-color" className="text-xs">Accent Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="accent-color"
                      type="color"
                      value={brandSettings.accentColor}
                      onChange={(e) => onUpdateBrandSettings({ accentColor: e.target.value })}
                      className="w-12 h-8 p-1 border rounded"
                    />
                    <Input
                      value={brandSettings.accentColor}
                      onChange={(e) => onUpdateBrandSettings({ accentColor: e.target.value })}
                      className="flex-1 text-xs"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brand" className="space-y-4 mt-0">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Brand Identity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Logo</Label>
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            onUpdateBrandSettings({ logoUrl: event.target?.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                  {brandSettings.logoUrl && (
                    <div className="mt-2">
                      <img
                        src={brandSettings.logoUrl}
                        alt="Logo"
                        className="w-full h-16 object-contain border rounded"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-xs">Logo Position</Label>
                  <Select
                    value={brandSettings.logoPosition}
                    onValueChange={(value: any) => onUpdateBrandSettings({ logoPosition: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Brand Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Primary</span>
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brandSettings.primaryColor }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Secondary</span>
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brandSettings.secondaryColor }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Accent</span>
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brandSettings.accentColor }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};