/**
 * CV Generator - Premium PDF Generation
 * Bulletproof PDF generation with proper typography and layout
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { CVData } from '@/types/cv';

/**
 * PDF generation options
 */
export interface PDFGenerationOptions {
  quality: number;
  scale: number;
  useCORS: boolean;
  logging: boolean;
}

const defaultOptions: PDFGenerationOptions = {
  quality: 0.98,
  scale: 3, // Higher resolution for premium quality
  useCORS: true,
  logging: false,
};

// A4 dimensions in mm
const A4_WIDTH = 210;
const A4_HEIGHT = 297;

/**
 * Generate filename from CV data
 */
function generatePdfFilename(cvData: CVData): string {
  const firstName = cvData.personalInfo.firstName || 'Lebenslauf';
  const lastName = cvData.personalInfo.lastName || '';
  const name = `${firstName}_${lastName}`.trim().replace(/\s+/g, '_');
  return `Lebenslauf_${name}.pdf`;
}

/**
 * Generate PDF from CV data - BULLETPROOF VERSION
 */
export async function generatePDF(
  cvData: CVData,
  previewElementId: string = 'cv-preview',
  options: Partial<PDFGenerationOptions> = {}
): Promise<void> {
  const opts = { ...defaultOptions, ...options };

  try {
    const element = document.getElementById(previewElementId);
    if (!element) {
      throw new Error('CV-Vorschau nicht gefunden. Bitte aktualisieren Sie die Seite.');
    }

    // Wait for all images to load
    await waitForImages(element);

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Capture pages
    const pages = await capturePages(element, opts);

    if (pages.length === 0) {
      throw new Error('Keine Inhalte zum Exportieren gefunden.');
    }

    // Add pages to PDF
    for (let i = 0; i < pages.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const imgData = pages[i];
      pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH, A4_HEIGHT, undefined, 'FAST');
    }

    // Generate filename and save
    const filename = generatePdfFilename(cvData);
    pdf.save(filename);
  } catch (error) {
    console.error('PDF-Generierung fehlgeschlagen:', error);
    throw new Error(
      error instanceof Error 
        ? `PDF-Export fehlgeschlagen: ${error.message}` 
        : 'PDF-Export fehlgeschlagen. Bitte versuchen Sie es erneut.'
    );
  }
}

/**
 * Capture pages as images with proper handling
 */
async function capturePages(
  element: HTMLElement,
  options: PDFGenerationOptions
): Promise<string[]> {
  const pages: HTMLElement[] = [];

  // Look for .cv-page elements
  const pageElements = element.querySelectorAll('.cv-page');
  if (pageElements.length > 0) {
    pageElements.forEach((page) => {
      if (page instanceof HTMLElement) {
        pages.push(page);
      }
    });
  } else {
    // If no pages found, use the element itself
    pages.push(element);
  }

  const images: string[] = [];

  for (const page of pages) {
    // Ensure page is visible and has dimensions
    if (page.offsetHeight === 0 || page.offsetWidth === 0) {
      console.warn('Page has no dimensions, skipping');
      continue;
    }

    const canvas = await html2canvas(page, {
      scale: options.scale,
      useCORS: options.useCORS,
      logging: options.logging,
      backgroundColor: '#ffffff',
      imageTimeout: 15000,
      removeContainer: false,
      onclone: (clonedDoc) => {
        // Ensure fonts are loaded in cloned document
        const clonedElement = clonedDoc.getElementById(page.id || 'cv-preview');
        if (clonedElement) {
          clonedElement.style.display = 'block';
          clonedElement.style.visibility = 'visible';
        }
      },
    });

    images.push(canvas.toDataURL('image/png', options.quality));
  }

  return images;
}

/**
 * Get PDF preview (base64 data URL)
 */
export async function getPDFPreview(
  previewElementId: string = 'cv-preview',
  options: Partial<PDFGenerationOptions> = {}
): Promise<string> {
  const opts = { ...defaultOptions, ...options };

  try {
    const element = document.getElementById(previewElementId);
    if (!element) {
      throw new Error('Preview element not found');
    }

    await waitForImages(element);

    const canvas = await html2canvas(element, {
      scale: opts.scale,
      useCORS: opts.useCORS,
      logging: opts.logging,
      backgroundColor: '#ffffff',
    });

    return canvas.toDataURL('image/png', opts.quality);
  } catch (error) {
    console.error('PDF preview generation failed:', error);
    throw new Error('Failed to generate preview');
  }
}

/**
 * Check if element is ready for PDF generation
 */
export function isPDFReady(previewElementId: string = 'cv-preview'): boolean {
  const element = document.getElementById(previewElementId);
  if (!element) return false;

  const hasContent = element.children.length > 0;
  const hasHeight = element.offsetHeight > 0;

  return hasContent && hasHeight;
}

/**
 * Wait for images to load before PDF generation
 */
export function waitForImages(
  element: HTMLElement,
  timeout: number = 10000
): Promise<void> {
  return new Promise((resolve, reject) => {
    const images = Array.from(element.getElementsByTagName('img'));

    if (images.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;
    
    const timer = setTimeout(() => {
      // Don't reject, just resolve - some images might have failed to load
      console.warn(`Image loading timeout: ${loadedCount}/${totalImages} loaded`);
      resolve();
    }, timeout);

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        clearTimeout(timer);
        resolve();
      }
    };

    images.forEach((img) => {
      if (img.complete && img.naturalHeight > 0) {
        checkComplete();
      } else {
        img.addEventListener('load', checkComplete);
        img.addEventListener('error', checkComplete); // Count errors as "loaded"
      }
    });
  });
}

/**
 * Generate PDF with progress callback
 */
export async function generatePDFWithProgress(
  cvData: CVData,
  previewElementId: string = 'cv-preview',
  onProgress?: (progress: number, message: string) => void
): Promise<void> {
  try {
    onProgress?.(10, 'Vorbereitung...');

    const element = document.getElementById(previewElementId);
    if (!element) {
      throw new Error('CV-Vorschau nicht gefunden');
    }

    onProgress?.(20, 'Bilder werden geladen...');
    await waitForImages(element);

    onProgress?.(40, 'PDF wird erstellt...');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    onProgress?.(60, 'Seiten werden erfasst...');

    const pages = await capturePages(element, defaultOptions);

    if (pages.length === 0) {
      throw new Error('Keine Inhalte gefunden');
    }

    onProgress?.(80, 'Seiten werden hinzugefügt...');

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const imgData = pages[i];
      pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH, A4_HEIGHT, undefined, 'FAST');
      
      const progress = 80 + ((i + 1) / pages.length) * 15;
      onProgress?.(progress, `Seite ${i + 1} von ${pages.length}...`);
    }

    onProgress?.(95, 'Speichern...');

    const filename = generatePdfFilename(cvData);
    pdf.save(filename);

    onProgress?.(100, 'Fertig!');
  } catch (error) {
    console.error('PDF generation with progress failed:', error);
    throw error;
  }
}
