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
export type AccentColor = 'blue' | 'gray' | 'black' | 'green';
export type TypographyScale = 'compact' | 'balanced' | 'spacious';
export type SectionSpacing = 'tight' | 'normal' | 'airy';
export type SectionSeparator = 'line' | 'soft' | 'none';

export interface CVCustomization {
  accentColor: AccentColor;
  typographyScale: TypographyScale;
  sectionSpacing: SectionSpacing;
  sectionSeparator: SectionSeparator;
}

export const defaultCustomization: CVCustomization = {
  accentColor: 'blue',
  typographyScale: 'balanced',
  sectionSpacing: 'normal',
  sectionSeparator: 'line',
};

// Accent color values
export const accentColors: Record<AccentColor, string> = {
  blue: '#2563eb',
  gray: '#4b5563',
  black: '#1f2937',
  green: '#059669',
};

// Typography scale values (font sizes)
export const typographyScales: Record<TypographyScale, { base: string; heading: string; large: string }> = {
  compact: { base: '0.875rem', heading: '1.25rem', large: '1.5rem' },
  balanced: { base: '0.9375rem', heading: '1.375rem', large: '1.75rem' },
  spacious: { base: '1rem', heading: '1.5rem', large: '2rem' },
};

// Section spacing values
export const sectionSpacings: Record<SectionSpacing, string> = {
  tight: '1rem',
  normal: '1.5rem',
  airy: '2rem',
};
