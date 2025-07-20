import React from 'react';
import { TopNavigation } from './components/TopNavigation';
import { SlideNavigator } from './components/SlideNavigator';
import { SlideCanvas } from './components/SlideCanvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import { usePresentation } from './hooks/usePresentation';
import { exportToPPT, validatePresentationForExport } from './utils/pptExport';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';

function App() {
  const {
    presentation,
    currentSlide,
    currentSlideIndex,
    setCurrentSlideIndex,
    addSlide,
    updateSlide,
    deleteSlide,
    duplicateSlide,
    updateBrandSettings,
    updatePresentationMeta
  } = usePresentation();

  const { toast } = useToast();

  const handleExportPPT = async () => {
    try {
      // Validate presentation before export
      const errors = validatePresentationForExport(presentation);
      if (errors.length > 0) {
        toast({
          title: "Export Failed",
          description: errors.join(', '),
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Exporting Presentation",
        description: "Your presentation is being exported to PowerPoint format...",
      });

      await exportToPPT(presentation);
      
      toast({
        title: "Export Successful",
        description: "Your presentation has been exported successfully!",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your presentation. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Presentation Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleUpdateSlide = (updates: any) => {
    if (currentSlide) {
      updateSlide(currentSlide.id, updates);
    }
  };

  if (!currentSlide) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No slides available</h2>
          <p className="text-gray-600">Create your first slide to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <TopNavigation
        presentation={presentation}
        onUpdatePresentation={updatePresentationMeta}
        onExportPPT={handleExportPPT}
        onSave={handleSave}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Slide Navigator */}
        <SlideNavigator
          slides={presentation.slides}
          currentSlideIndex={currentSlideIndex}
          onSlideSelect={setCurrentSlideIndex}
          onAddSlide={addSlide}
          onDuplicateSlide={duplicateSlide}
          onDeleteSlide={deleteSlide}
        />

        {/* Center - Slide Canvas */}
        <SlideCanvas
          slide={currentSlide}
          brandSettings={presentation.brandSettings}
          onUpdateSlide={handleUpdateSlide}
        />

        {/* Right Sidebar - Properties Panel */}
        <PropertiesPanel
          slide={currentSlide}
          brandSettings={presentation.brandSettings}
          onUpdateSlide={handleUpdateSlide}
          onUpdateBrandSettings={updateBrandSettings}
        />
      </div>

      <Toaster />
    </div>
  );
}

export default App;