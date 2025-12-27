/**
 * CV Generator - Storage Management
 * LocalStorage persistence for CV data with auto-save and export/import
 */

import type { CVData } from '@/types/cv';
import { initialCVData } from '@/types/cv';

const CV_DATA_KEY = 'cv_generator_data';
const CV_VERSION_KEY = 'cv_generator_version';

const CURRENT_VERSION = '3.0.0';

/**
 * Save CV data to localStorage
 */
export function saveCVData(data: CVData): void {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(CV_DATA_KEY, serialized);
    localStorage.setItem(CV_VERSION_KEY, CURRENT_VERSION);
  } catch (error) {
    console.error('Failed to save CV data:', error);
    throw new Error('Failed to save CV data. Storage might be full.');
  }
}

/**
 * Load CV data from localStorage
 */
export function loadCVData(): CVData | null {
  try {
    const serialized = localStorage.getItem(CV_DATA_KEY);
    if (!serialized) return null;

    const data = JSON.parse(serialized) as CVData;
    return data;
  } catch (error) {
    console.error('Failed to load CV data:', error);
    return null;
  }
}

/**
 * Clear all CV data from localStorage
 */
export function clearCVData(): void {
  try {
    localStorage.removeItem(CV_DATA_KEY);
    localStorage.removeItem(CV_VERSION_KEY);
    localStorage.removeItem('cv-customization');
  } catch (error) {
    console.error('Failed to clear CV data:', error);
  }
}

/**
 * Export CV data as JSON file
 */
export function exportCVData(data: CVData, filename: string): void {
  try {
    const exportData = {
      version: CURRENT_VERSION,
      timestamp: new Date().toISOString(),
      data,
    };

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export CV data:', error);
    throw new Error('Failed to export CV data');
  }
}

/**
 * Import CV data from JSON file
 */
export function importCVData(file: File): Promise<CVData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const imported = JSON.parse(result);

        if (!imported.data) {
          reject(new Error('Invalid CV data file format'));
          return;
        }

        resolve(imported.data);
      } catch (error) {
        reject(new Error('Failed to parse CV data file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}
export function backupToSession(data: CVData): void {
  try {
    const serialized = JSON.stringify(data);
    sessionStorage.setItem('cv_backup', serialized);
  } catch (error) {
    console.error('Failed to backup to session:', error);
  }
}

/**
 * Restore CV data from session storage
 */
export function restoreFromSession(): CVData | null {
  try {
    const serialized = sessionStorage.getItem('cv_backup');
    if (!serialized) return null;
    return JSON.parse(serialized) as CVData;
  } catch (error) {
    console.error('Failed to restore from session:', error);
    return null;
  }
}

/**
 * Get last save timestamp
 */
export function getLastSaveTime(): Date | null {
  try {
    const data = localStorage.getItem(CV_DATA_KEY);
    if (!data) return null;

    const stats = localStorage.getItem('cv_last_save');
    if (stats) {
      return new Date(stats);
    }

    return new Date();
  } catch {
    return null;
  }
}

/**
 * Save timestamp
 */
export function saveTimestamp(): void {
  try {
    localStorage.setItem('cv_last_save', new Date().toISOString());
  } catch (error) {
    console.error('Failed to save timestamp:', error);
  }
}
