import { SlideTemplate } from '../types/presentation';

export const slideTemplates: SlideTemplate[] = [
  {
    id: 'title',
    name: 'Title Slide',
    type: 'title',
    preview: '📄',
    description: 'Perfect for presentation opening with title and subtitle'
  },
  {
    id: 'content',
    name: 'Content Slide',
    type: 'content',
    preview: '📝',
    description: 'Standard slide with title and bullet points'
  },
  {
    id: 'two-column',
    name: 'Two Column',
    type: 'two-column',
    preview: '📊',
    description: 'Split content into two columns for comparison'
  },
  {
    id: 'image-focus',
    name: 'Image Focus',
    type: 'image-focus',
    preview: '🖼️',
    description: 'Highlight images with minimal text overlay'
  },
  {
    id: 'blank',
    name: 'Blank Slide',
    type: 'blank',
    preview: '⬜',
    description: 'Start with a completely blank canvas'
  }
];