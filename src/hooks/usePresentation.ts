import { useState, useCallback } from 'react';
import { Presentation, Slide, BrandSettings } from '../types/presentation';

const defaultBrandSettings: BrandSettings = {
  primaryColor: '#6366F1',
  secondaryColor: '#F59E0B',
  accentColor: '#10B981',
  fontFamily: 'Inter',
  logoPosition: 'top-right'
};

const createDefaultSlide = (order: number): Slide => ({
  id: `slide-${Date.now()}-${order}`,
  type: 'title',
  title: `Slide ${order + 1}`,
  content: {
    title: 'Welcome to Your Presentation',
    subtitle: 'Click to edit this subtitle'
  },
  order
});

export const usePresentation = () => {
  const [presentation, setPresentation] = useState<Presentation>({
    id: 'presentation-1',
    title: 'My Presentation',
    slides: [createDefaultSlide(0)],
    brandSettings: defaultBrandSettings,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const addSlide = useCallback((type: Slide['type'] = 'content') => {
    setPresentation(prev => {
      const newSlide: Slide = {
        id: `slide-${Date.now()}`,
        type,
        title: `Slide ${prev.slides.length + 1}`,
        content: type === 'title' 
          ? { title: 'New Title', subtitle: 'Subtitle here' }
          : { title: 'New Slide', body: 'Add your content here...' },
        order: prev.slides.length
      };
      
      return {
        ...prev,
        slides: [...prev.slides, newSlide],
        updatedAt: new Date()
      };
    });
  }, []);

  const updateSlide = useCallback((slideId: string, updates: Partial<Slide>) => {
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map(slide => 
        slide.id === slideId ? { ...slide, ...updates } : slide
      ),
      updatedAt: new Date()
    }));
  }, []);

  const deleteSlide = useCallback((slideId: string) => {
    setPresentation(prev => {
      const newSlides = prev.slides.filter(slide => slide.id !== slideId);
      return {
        ...prev,
        slides: newSlides.map((slide, index) => ({ ...slide, order: index })),
        updatedAt: new Date()
      };
    });
    
    // Adjust current slide index if needed
    setCurrentSlideIndex(prev => {
      const slideIndex = presentation.slides.findIndex(s => s.id === slideId);
      if (slideIndex === prev && prev > 0) {
        return prev - 1;
      }
      return prev >= presentation.slides.length - 1 ? presentation.slides.length - 2 : prev;
    });
  }, [presentation.slides]);

  const duplicateSlide = useCallback((slideId: string) => {
    setPresentation(prev => {
      const slideIndex = prev.slides.findIndex(s => s.id === slideId);
      if (slideIndex === -1) return prev;
      
      const originalSlide = prev.slides[slideIndex];
      const duplicatedSlide: Slide = {
        ...originalSlide,
        id: `slide-${Date.now()}`,
        title: `${originalSlide.title} (Copy)`,
        order: slideIndex + 1
      };
      
      const newSlides = [...prev.slides];
      newSlides.splice(slideIndex + 1, 0, duplicatedSlide);
      
      return {
        ...prev,
        slides: newSlides.map((slide, index) => ({ ...slide, order: index })),
        updatedAt: new Date()
      };
    });
  }, []);

  const reorderSlides = useCallback((startIndex: number, endIndex: number) => {
    setPresentation(prev => {
      const newSlides = [...prev.slides];
      const [removed] = newSlides.splice(startIndex, 1);
      newSlides.splice(endIndex, 0, removed);
      
      return {
        ...prev,
        slides: newSlides.map((slide, index) => ({ ...slide, order: index })),
        updatedAt: new Date()
      };
    });
  }, []);

  const updateBrandSettings = useCallback((updates: Partial<BrandSettings>) => {
    setPresentation(prev => ({
      ...prev,
      brandSettings: { ...prev.brandSettings, ...updates },
      updatedAt: new Date()
    }));
  }, []);

  const updatePresentationMeta = useCallback((updates: { title?: string; description?: string }) => {
    setPresentation(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date()
    }));
  }, []);

  const currentSlide = presentation.slides[currentSlideIndex];

  return {
    presentation,
    currentSlide,
    currentSlideIndex,
    setCurrentSlideIndex,
    addSlide,
    updateSlide,
    deleteSlide,
    duplicateSlide,
    reorderSlides,
    updateBrandSettings,
    updatePresentationMeta
  };
};