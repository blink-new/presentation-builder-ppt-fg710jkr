export interface Slide {
  id: string;
  type: 'title' | 'content' | 'two-column' | 'image-focus' | 'blank';
  title: string;
  content: {
    title?: string;
    subtitle?: string;
    body?: string;
    leftColumn?: string;
    rightColumn?: string;
    imageUrl?: string;
    imageAlt?: string;
  };
  background?: string;
  order: number;
}

export interface BrandSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl?: string;
  logoPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export interface Presentation {
  id: string;
  title: string;
  description?: string;
  slides: Slide[];
  brandSettings: BrandSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface SlideTemplate {
  id: string;
  name: string;
  type: Slide['type'];
  preview: string;
  description: string;
}