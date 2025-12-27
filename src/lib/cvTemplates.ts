/**
 * CV Generator - Template System
 * Template definitions and configurations for different CV styles
 */

import type { TemplateSettings, CVData } from '@/types/cv';

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  preview: string;
  defaultColor: string;
  defaultFont: 'roboto' | 'inter' | 'opensans' | 'lato';
  layout: 'single' | 'sidebar' | 'two-column';
  style: 'formal' | 'modern' | 'creative' | 'minimal';
}   

/**
 * Available CV templates
 */
export const templates: TemplateConfig[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional German CV style with sidebar layout',
    preview: '/templates/classic-preview.png',
    defaultColor: '#2563eb',
    defaultFont: 'roboto',
    layout: 'sidebar',
    style: 'formal',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and minimal single-column design',
    preview: '/templates/modern-preview.png',
    defaultColor: '#10b981',
    defaultFont: 'inter',
    layout: 'single',
    style: 'minimal',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and visual with accent colors',
    preview: '/templates/creative-preview.png',
    defaultColor: '#7c3aed',
    defaultFont: 'opensans',
    layout: 'two-column',
    style: 'creative',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Balanced two-column layout for experienced professionals',
    preview: '/templates/professional-preview.png',
    defaultColor: '#64748b',
    defaultFont: 'lato',
    layout: 'two-column',
    style: 'formal',
  },
];

/**
 * Get template configuration by ID
 */
export function getTemplateConfig(templateId: string): TemplateConfig {
  const template = templates.find(t => t.id === templateId);
  return template || templates[0];
}

/**
 * Get default settings for a template
 */
export function getTemplateDefaults(templateId: string): Partial<TemplateSettings> {
  const config = getTemplateConfig(templateId);
  
  return {
    template: templateId as any,
    accentColor: config.defaultColor,
    fontFamily: config.defaultFont,
  };
}

/**
 * Font families with their CSS font stacks
 */
export const fontFamilies = {
  roboto: {
    name: 'Roboto',
    css: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weights: [300, 400, 500, 700],
  },
  inter: {
    name: 'Inter',
    css: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weights: [400, 500, 600, 700],
  },
  opensans: {
    name: 'Open Sans',
    css: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weights: [400, 600, 700],
  },
  lato: {
    name: 'Lato',
    css: "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weights: [400, 700],
  },
};

/**
 * Get CSS font family string
 */
export function getFontFamily(fontKey: keyof typeof fontFamilies): string {
  return fontFamilies[fontKey].css;
}

/**
 * Template-specific measurements (in mm for PDF)
 */
export const templateMeasurements = {
  a4: {
    width: 210,
    height: 297,
  },
  margins: {
    classic: { top: 15, right: 15, bottom: 15, left: 15 },
    modern: { top: 20, right: 20, bottom: 20, left: 20 },
    creative: { top: 10, right: 10, bottom: 10, left: 10 },
    professional: { top: 18, right: 18, bottom: 18, left: 18 },
  },
  sidebar: {
    classic: 70,
    professional: 65,
  },
};

/**
 * Calculate content area dimensions
 */
export function getContentArea(
  template: string,
  settings: TemplateSettings
): {
  width: number;
  height: number;
  sidebarWidth?: number;
  mainWidth?: number;
} {
  const config = getTemplateConfig(template);
  const margins = settings.margins;
  const a4 = templateMeasurements.a4;

  const contentWidth = a4.width - margins.left - margins.right;
  const contentHeight = a4.height - margins.top - margins.bottom;

  if (config.layout === 'sidebar') {
    const sidebarWidth = templateMeasurements.sidebar[template as keyof typeof templateMeasurements.sidebar] || 70;
    const mainWidth = contentWidth - sidebarWidth;
    
    return {
      width: contentWidth,
      height: contentHeight,
      sidebarWidth,
      mainWidth,
    };
  }

  return {
    width: contentWidth,
    height: contentHeight,
  };
}

/**
 * Section icons mapping
 */
export const sectionIcons: Record<string, string> = {
  summary: '📝',
  experience: '💼',
  education: '🎓',
  skills: '⚡',
  languages: '🌍',
  certificates: '📜',
  projects: '🚀',
  references: '👥',
};

/**
 * Get section title by key
 */
export function getSectionTitle(key: string, language: string = 'en'): string {
  const titles: Record<string, Record<string, string>> = {
    summary: {
      en: 'Professional Summary',
      de: 'Berufsprofil',
      tj: 'Тавсифи касбӣ',
      ru: 'Профессиональное резюме',
    },
    experience: {
      en: 'Work Experience',
      de: 'Berufserfahrung',
      tj: 'Таҷрибаи корӣ',
      ru: 'Опыт работы',
    },
    education: {
      en: 'Education',
      de: 'Bildung',
      tj: 'Таҳсилот',
      ru: 'Образование',
    },
    skills: {
      en: 'Skills',
      de: 'Fähigkeiten',
      tj: 'Малакаҳо',
      ru: 'Навыки',
    },
    languages: {
      en: 'Languages',
      de: 'Sprachen',
      tj: 'Забонҳо',
      ru: 'Языки',
    },
    certificates: {
      en: 'Certificates',
      de: 'Zertifikate',
      tj: 'Сертификатҳо',
      ru: 'Сертификаты',
    },
    projects: {
      en: 'Projects',
      de: 'Projekte',
      tj: 'Лоиҳаҳо',
      ru: 'Проекты',
    },
    references: {
      en: 'References',
      de: 'Referenzen',
      tj: 'Тавсияҳо',
      ru: 'Рекомендации',
    },
  };

  return titles[key]?.[language] || titles[key]?.en || key;
}

/**
 * Check if template supports feature
 */
export function supportsFeature(
  template: string,
  feature: 'photo' | 'sidebar' | 'colorBlocks' | 'timeline'
): boolean {
  const config = getTemplateConfig(template);

  const features: Record<string, string[]> = {
    classic: ['photo', 'sidebar'],
    modern: ['photo', 'timeline'],
    creative: ['photo', 'colorBlocks', 'timeline'],
    professional: ['photo', 'sidebar', 'timeline'],
  };

  return features[template]?.includes(feature) || false;
}

/**
 * Get recommended section order for template
 */
export function getRecommendedSectionOrder(template: string): string[] {
  const orders: Record<string, string[]> = {
    classic: [
      'summary',
      'experience',
      'education',
      'skills',
      'languages',
      'certificates',
      'projects',
      'references',
    ],
    modern: [
      'summary',
      'skills',
      'experience',
      'education',
      'projects',
      'languages',
      'certificates',
      'references',
    ],
    creative: [
      'summary',
      'experience',
      'projects',
      'skills',
      'education',
      'languages',
      'certificates',
      'references',
    ],
    professional: [
      'summary',
      'experience',
      'education',
      'skills',
      'projects',
      'languages',
      'certificates',
      'references',
    ],
  };

  return orders[template] || orders.classic;
}

/**
 * Validate CV data completeness for template
 */
export function validateForTemplate(
  cvData: CVData,
  template: string
): {
  valid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (!cvData.personalInfo.firstName || !cvData.personalInfo.lastName) {
    errors.push('Name is required');
  }

  if (!cvData.personalInfo.email) {
    warnings.push('Email is recommended');
  }

  if (!cvData.personalInfo.phone) {
    warnings.push('Phone number is recommended');
  }

  if (!cvData.summary && cvData.experience.length === 0) {
    warnings.push('Add either a summary or work experience');
  }

  if (cvData.education.length === 0) {
    warnings.push('Education section is empty');
  }

  if (cvData.skills.length === 0) {
    warnings.push('Consider adding skills');
  }

  const config = getTemplateConfig(template);
  if (config.layout === 'sidebar' && !cvData.personalInfo.photo) {
    warnings.push('This template works best with a photo');
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}
