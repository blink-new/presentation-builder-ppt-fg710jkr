import PptxGenJS from 'pptxgenjs';
import { Presentation, Slide } from '../types/presentation';

// Convert hex color to PowerPoint color format
const hexToPptColor = (hex: string): string => {
  return hex.replace('#', '');
};

const createTitleSlide = (slide: any, slideData: Slide, brandSettings: any): void => {
  // Main title
  if (slideData.content.title) {
    slide.addText(slideData.content.title, {
      x: 0.5,
      y: 2.5,
      w: 9,
      h: 1.5,
      fontSize: 44,
      fontFace: brandSettings.fontFamily || 'Arial',
      color: hexToPptColor(brandSettings.primaryColor || '#000000'),
      bold: true,
      align: 'center'
    });
  }

  // Subtitle
  if (slideData.content.subtitle) {
    slide.addText(slideData.content.subtitle, {
      x: 0.5,
      y: 4.5,
      w: 9,
      h: 1,
      fontSize: 24,
      fontFace: brandSettings.fontFamily || 'Arial',
      color: hexToPptColor(brandSettings.secondaryColor || '#666666'),
      align: 'center'
    });
  }
};

const createContentSlide = (slide: any, slideData: Slide, brandSettings: any): void => {
  // Title
  if (slideData.content.title) {
    slide.addText(slideData.content.title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1,
      fontSize: 32,
      fontFace: brandSettings.fontFamily || 'Arial',
      color: hexToPptColor(brandSettings.primaryColor || '#000000'),
      bold: true
    });
  }

  // Body content
  if (slideData.content.body) {
    // Split content into bullet points if it contains line breaks
    const content = slideData.content.body;
    const lines = content.split('\\n').filter(line => line.trim());
    
    if (lines.length > 1) {
      // Create bullet points
      const bulletPoints = lines.map(line => ({ text: line.trim(), options: { bullet: true } }));
      slide.addText(bulletPoints, {
        x: 0.5,
        y: 2,
        w: 9,
        h: 4,
        fontSize: 18,
        fontFace: brandSettings.fontFamily || 'Arial',
        color: hexToPptColor(brandSettings.secondaryColor || '#333333')
      });
    } else {
      // Single paragraph
      slide.addText(content, {
        x: 0.5,
        y: 2,
        w: 9,
        h: 4,
        fontSize: 18,
        fontFace: brandSettings.fontFamily || 'Arial',
        color: hexToPptColor(brandSettings.secondaryColor || '#333333')
      });
    }
  }
};

const createTwoColumnSlide = (slide: any, slideData: Slide, brandSettings: any): void => {
  // Title
  if (slideData.content.title) {
    slide.addText(slideData.content.title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1,
      fontSize: 32,
      fontFace: brandSettings.fontFamily || 'Arial',
      color: hexToPptColor(brandSettings.primaryColor || '#000000'),
      bold: true
    });
  }

  // Left column
  if (slideData.content.leftColumn) {
    slide.addText(slideData.content.leftColumn, {
      x: 0.5,
      y: 2,
      w: 4.25,
      h: 4,
      fontSize: 18,
      fontFace: brandSettings.fontFamily || 'Arial',
      color: hexToPptColor(brandSettings.secondaryColor || '#333333')
    });
  }

  // Right column
  if (slideData.content.rightColumn) {
    slide.addText(slideData.content.rightColumn, {
      x: 5.25,
      y: 2,
      w: 4.25,
      h: 4,
      fontSize: 18,
      fontFace: brandSettings.fontFamily || 'Arial',
      color: hexToPptColor(brandSettings.secondaryColor || '#333333')
    });
  }
};

const createImageFocusSlide = (slide: any, slideData: Slide, brandSettings: any): void => {
  // Title
  if (slideData.content.title) {
    slide.addText(slideData.content.title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1,
      fontSize: 32,
      fontFace: brandSettings.fontFamily || 'Arial',
      color: hexToPptColor(brandSettings.primaryColor || '#000000'),
      bold: true
    });
  }

  // Image placeholder or actual image
  if (slideData.content.imageUrl) {
    try {
      slide.addImage({
        path: slideData.content.imageUrl,
        x: 2,
        y: 2,
        w: 6,
        h: 4
      });
    } catch (error) {
      // If image fails to load, add a placeholder
      slide.addText('Image: ' + (slideData.content.imageAlt || 'Image placeholder'), {
        x: 2,
        y: 2,
        w: 6,
        h: 4,
        fontSize: 16,
        fontFace: brandSettings.fontFamily || 'Arial',
        color: hexToPptColor('#999999'),
        align: 'center',
        valign: 'middle',
        border: { pt: 1, color: hexToPptColor('#CCCCCC') }
      });
    }
  } else {
    // Image placeholder
    slide.addText('Image Placeholder', {
      x: 2,
      y: 2,
      w: 6,
      h: 4,
      fontSize: 16,
      fontFace: brandSettings.fontFamily || 'Arial',
      color: hexToPptColor('#999999'),
      align: 'center',
      valign: 'middle',
      border: { pt: 1, color: hexToPptColor('#CCCCCC') }
    });
  }
};

const createBlankSlide = (slide: any, slideData: Slide, brandSettings: any): void => {
  // Just add the title if it exists
  if (slideData.title && slideData.title.trim()) {
    slide.addText(slideData.title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1,
      fontSize: 32,
      fontFace: brandSettings.fontFamily || 'Arial',
      color: hexToPptColor(brandSettings.primaryColor || '#000000'),
      bold: true
    });
  }
};

// Convert slide content to PowerPoint slide
const createSlideFromTemplate = (pptx: PptxGenJS, slide: Slide, brandSettings: any): void => {
  const pptSlide = pptx.addSlide();
  
  // Set slide background if specified
  if (slide.background && slide.background !== 'white') {
    pptSlide.background = { color: hexToPptColor(slide.background) };
  }

  switch (slide.type) {
    case 'title':
      createTitleSlide(pptSlide, slide, brandSettings);
      break;
    case 'content':
      createContentSlide(pptSlide, slide, brandSettings);
      break;
    case 'two-column':
      createTwoColumnSlide(pptSlide, slide, brandSettings);
      break;
    case 'image-focus':
      createImageFocusSlide(pptSlide, slide, brandSettings);
      break;
    case 'blank':
      createBlankSlide(pptSlide, slide, brandSettings);
      break;
    default:
      createContentSlide(pptSlide, slide, brandSettings);
  }
};

// Main export function
export const exportToPPT = async (presentation: Presentation): Promise<void> => {
  try {
    console.log('Starting PPT export for:', presentation.title);
    
    // Create new presentation
    const pptx = new PptxGenJS();
    
    // Set presentation properties
    pptx.author = 'Presentation Builder';
    pptx.company = 'Blink';
    pptx.title = presentation.title;
    pptx.subject = presentation.description || 'Created with Presentation Builder';
    
    // Set default slide size (16:9)
    pptx.defineLayout({ name: 'LAYOUT_16x9', width: 10, height: 5.625 });
    pptx.layout = 'LAYOUT_16x9';
    
    // Add slides
    presentation.slides.forEach((slide) => {
      createSlideFromTemplate(pptx, slide, presentation.brandSettings);
    });
    
    // Generate and download the file
    const fileName = `${presentation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pptx`;
    
    await pptx.writeFile({ fileName });
    
    console.log('PPT export completed successfully');
  } catch (error) {
    console.error('Error exporting to PPT:', error);
    throw new Error('Failed to export presentation to PowerPoint format. Please try again.');
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