/**
 * CV Generator - Utility Functions
 * Helper functions for CV data manipulation and formatting
 */

import type { CVData } from '@/types/cv';

/**
 * Generate a unique ID for CV entries
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Format date for display based on settings
 */
export function formatDate(
  date: string,
  format: 'MM/YYYY' | 'YYYY-MM' | 'Month YYYY' = 'MM/YYYY'
): string {
  if (!date) return '';

  try {
    const [year, month] = date.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    switch (format) {
      case 'MM/YYYY':
        return `${month}/${year}`;
      case 'YYYY-MM':
        return `${year}-${month}`;
      case 'Month YYYY':
        return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
      default:
        return date;
    }
  } catch {
    return date;
  }
}

/**
 * Format date range for experience/education
 */
export function formatDateRange(
  startDate: string,
  endDate: string,
  current: boolean,
  format: 'MM/YYYY' | 'YYYY-MM' | 'Month YYYY' = 'MM/YYYY'
): string {
  const start = formatDate(startDate, format);
  const end = current ? 'Present' : formatDate(endDate, format);
  return `${start} - ${end}`;
}

/**
 * Calculate duration between dates
 */
export function calculateDuration(startDate: string, endDate: string, current: boolean): string {
  try {
    const start = new Date(startDate);
    const end = current ? new Date() : new Date(endDate);
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  } catch {
    return '';
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  if (!email) return true;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone format (basic)
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return true;
  const regex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return regex.test(phone);
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): boolean {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if CV data is empty
 */
export function isCVDataEmpty(cvData: CVData | null | undefined): boolean {
  if (!cvData) return true;
  
  const { personalInfo, summary, experience, education, skills, languages } = cvData;
  
  const hasPersonalInfo = personalInfo?.firstName || personalInfo?.lastName || personalInfo?.email;
  const hasContent = summary || 
                     experience?.length > 0 || 
                     education?.length > 0 || 
                     skills?.length > 0 || 
                     languages?.length > 0;
  
  return !hasPersonalInfo && !hasContent;
}

/**
 * Calculate CV completeness percentage
 */
export function calculateCompleteness(cvData: CVData | null | undefined): number {
  if (!cvData) return 0;
  
  let completed = 0;
  let total = 0;

  const personalFields = [
    cvData.personalInfo?.firstName,
    cvData.personalInfo?.lastName,
    cvData.personalInfo?.jobTitle,
    cvData.personalInfo?.email,
    cvData.personalInfo?.phone,
    cvData.personalInfo?.city,
  ];
  
  personalFields.forEach(field => {
    total++;
    if (field) completed++;
  });

  total++; if (cvData.summary) completed++;
  total++; if (cvData.experience?.length > 0) completed++;
  total++; if (cvData.education?.length > 0) completed++;
  total++; if (cvData.skills?.length > 0) completed++;
  total++; if (cvData.languages?.length > 0) completed++;

  return Math.round((completed / total) * 100);
}

/**
 * Get full name from personal info
 */
export function getFullName(personal: CVData['personalInfo'] | null | undefined): string {
  if (!personal) return 'Untitled CV';
  return `${personal.firstName || ''} ${personal.lastName || ''}`.trim() || 'Untitled CV';
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9_\-]/gi, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Generate PDF filename
 */
export function generatePdfFilename(cvData: CVData): string {
  const name = getFullName(cvData.personalInfo);
  const sanitized = sanitizeFilename(name);
  const date = new Date().toISOString().split('T')[0];
  return `CV_${sanitized}_${date}.pdf`;
}

/**
 * Generate JSON filename
 */
export function generateJsonFilename(cvData: CVData): string {
  const name = getFullName(cvData.personalInfo);
  const sanitized = sanitizeFilename(name);
  const date = new Date().toISOString().split('T')[0];
  return `CV_${sanitized}_${date}.json`;
}

/**
 * Compress base64 image
 */
export function compressImage(
  base64: string,
  maxWidth: number = 500,
  maxHeight: number = 500,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = base64;
  });
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge CV data with defaults
 */
export function mergeCVData(partial: Partial<CVData>, defaults: CVData): CVData {
  return {
    personalInfo: { ...defaults.personalInfo, ...partial.personalInfo },
    summary: partial.summary ?? defaults.summary,
    experience: partial.experience ?? defaults.experience,
    education: partial.education ?? defaults.education,
    skills: partial.skills ?? defaults.skills,
    languages: partial.languages ?? defaults.languages,
  };
}

/**
 * Sort array by date (newest first)
 */
export function sortByDate<T extends { startDate: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Truncate text to max length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Convert color hex to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Get contrast color (black or white) for background
 */
export function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}
