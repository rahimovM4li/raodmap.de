/**
 * Vereinfachte Typen für den deutschen Lebenslauf-Generator
 */

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  photo?: string; // base64
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  startDate: string; // YYYY-MM
  endDate: string;   // YYYY-MM
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string; // YYYY-MM
  endDate: string;   // YYYY-MM
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string; // Kurzprofil
  experience: WorkExperience[]; // Berufserfahrung
  education: Education[];       // Ausbildung
  skills: string[];             // Kenntnisse
  languages: { language: string; level: string; }[]; // Sprachen
}

export const initialCVData: CVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    city: '',
    photo: undefined,
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
};

// Premium Customization Settings
export type AccentColor = 'blue' | 'gray' | 'black' | 'green' | 'darkgreen' | 'anthracite' | 'bordeaux';
export type FontFamily = 'inter' | 'opensans' | 'lato' | 'roboto';
export type SectionSpacing = 'tight' | 'normal' | 'airy';
export type SectionSeparator = 'line' | 'dot' | 'none';
export type SectionHeaderStyle = 'uppercase' | 'normal' | 'smallcaps';
export type PageMargin = 'narrow' | 'normal' | 'wide';
export type PhotoPosition = 'topleft' | 'topright' | 'center';
export type PhotoShape = 'circle' | 'rounded' | 'square';
export type PhotoSize = 'small' | 'medium' | 'large';

export interface CVCustomization {
  // Colors
  accentColor: AccentColor;
  secondaryAccentColor?: AccentColor;
  
  // Typography
  fontFamily: FontFamily;
  fontSize: number; // 10-12 (pt)
  lineSpacing: number; // 1.2-1.6
  
  // Layout & Spacing
  sectionSpacing: SectionSpacing;
  pageMargin: PageMargin;
  
  // Section Styling
  sectionSeparator: SectionSeparator;
  sectionHeaderStyle: SectionHeaderStyle;
  
  // Photo
  photoPosition: PhotoPosition;
  photoShape: PhotoShape;
  photoSize: PhotoSize;
}

export const defaultCustomization: CVCustomization = {
  accentColor: 'blue',
  secondaryAccentColor: undefined,
  fontFamily: 'inter',
  fontSize: 11,
  lineSpacing: 1.4,
  sectionSpacing: 'normal',
  pageMargin: 'normal',
  sectionSeparator: 'line',
  sectionHeaderStyle: 'normal',
  photoPosition: 'topleft',
  photoShape: 'circle',
  photoSize: 'medium',
};

// Accent color values (German professional palette)
export const accentColors: Record<AccentColor, string> = {
  blue: '#2563eb',        // Blau
  gray: '#4b5563',        // Grau
  black: '#1f2937',       // Schwarz
  green: '#059669',       // Grün
  darkgreen: '#065f46',   // Dunkelgrün
  anthracite: '#374151',  // Anthrazit
  bordeaux: '#991b1b',    // Bordeaux
};

// Font families (German-friendly, web-safe)
export const fontFamilies: Record<FontFamily, string> = {
  inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  opensans: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  lato: "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  roboto: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// Typography scale values (calculated from fontSize)
export const calculateTypographyScale = (baseFontSize: number) => ({
  base: `${baseFontSize}pt`,
  small: `${baseFontSize - 1}pt`,
  heading: `${baseFontSize + 2}pt`,
  large: `${baseFontSize + 6}pt`,
});

// Section spacing values
export const sectionSpacings: Record<SectionSpacing, string> = {
  tight: '1rem',
  normal: '1.5rem',
  airy: '2rem',
};

// Page margin values (in mm for A4)
export const pageMargins: Record<PageMargin, string> = {
  narrow: '15mm',
  normal: '20mm',
  wide: '25mm',
};

// Photo size values (in pixels)
export const photoSizes: Record<PhotoSize, number> = {
  small: 80,
  medium: 120,
  large: 160,
};
