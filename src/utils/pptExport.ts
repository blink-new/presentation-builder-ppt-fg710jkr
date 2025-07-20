import { Presentation, Slide } from '../types/presentation';

const generateMockPPTContent = (presentation: Presentation): string => {
  // This is a simplified mock. In a real implementation, you would:
  // 1. Use a library like PptxGenJS to create actual PPTX files
  // 2. Convert slide content to PowerPoint format
  // 3. Apply brand settings and styling
  // 4. Handle images and media properly
  
  const slides = presentation.slides.map((slide, index) => {
    return `
Slide ${index + 1}: ${slide.title}
Type: ${slide.type}
Content: ${JSON.stringify(slide.content, null, 2)}
Background: ${slide.background || 'default'}
---
`;
  }).join('\n');

  return `
PRESENTATION: ${presentation.title}
Description: ${presentation.description || 'No description'}
Created: ${presentation.createdAt.toISOString()}
Updated: ${presentation.updatedAt.toISOString()}

BRAND SETTINGS:
Primary Color: ${presentation.brandSettings.primaryColor}
Secondary Color: ${presentation.brandSettings.secondaryColor}
Accent Color: ${presentation.brandSettings.accentColor}
Font Family: ${presentation.brandSettings.fontFamily}
Logo Position: ${presentation.brandSettings.logoPosition}

SLIDES:
${slides}

Note: This is a mock export. In a production environment, this would generate a proper PPTX file.
`;
};

// Mock PPT export functionality
// In a real implementation, you would use a library like PptxGenJS or similar
export const exportToPPT = async (presentation: Presentation): Promise<void> => {
  try {
    // Simulate export process
    console.log('Starting PPT export for:', presentation.title);
    
    // Create a mock download
    const mockPptContent = generateMockPPTContent(presentation);
    const blob = new Blob([mockPptContent], { 
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${presentation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pptx`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log('PPT export completed successfully');
  } catch (error) {
    console.error('Error exporting to PPT:', error);
    throw new Error('Failed to export presentation to PowerPoint format');
  }
};

// Helper function to convert slide content to PowerPoint-compatible format
export const convertSlideContent = (slide: Slide): any => {
  const baseSlide = {
    title: slide.title,
    type: slide.type,
    background: slide.background
  };

  switch (slide.type) {
    case 'title':
      return {
        ...baseSlide,
        layout: 'title',
        content: {
          title: slide.content.title || '',
          subtitle: slide.content.subtitle || ''
        }
      };
    
    case 'content':
      return {
        ...baseSlide,
        layout: 'content',
        content: {
          title: slide.content.title || '',
          body: slide.content.body || ''
        }
      };
    
    case 'two-column':
      return {
        ...baseSlide,
        layout: 'twoColumn',
        content: {
          title: slide.content.title || '',
          leftColumn: slide.content.leftColumn || '',
          rightColumn: slide.content.rightColumn || ''
        }
      };
    
    case 'image-focus':
      return {
        ...baseSlide,
        layout: 'imageFocus',
        content: {
          title: slide.content.title || '',
          imageUrl: slide.content.imageUrl || '',
          imageAlt: slide.content.imageAlt || ''
        }
      };
    
    case 'blank':
      return {
        ...baseSlide,
        layout: 'blank',
        content: {}
      };
    
    default:
      return baseSlide;
  }
};

// Function to validate presentation before export
export const validatePresentationForExport = (presentation: Presentation): string[] => {
  const errors: string[] = [];
  
  if (!presentation.title.trim()) {
    errors.push('Presentation title is required');
  }
  
  if (presentation.slides.length === 0) {
    errors.push('Presentation must have at least one slide');
  }
  
  presentation.slides.forEach((slide, index) => {
    if (!slide.title.trim()) {
      errors.push(`Slide ${index + 1} is missing a title`);
    }
    
    if (slide.type === 'title' && !slide.content.title) {
      errors.push(`Title slide ${index + 1} is missing main title content`);
    }
  });
  
  return errors;
};