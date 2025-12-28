/**
 * CV Generator - SCREENSHOT-BASED PDF Generation
 * 
 * STRATEGY: Preview is the SINGLE source of truth
 * PDF = Screenshot of preview (pixel-perfect, WYSIWYG)
 * 
 * NO HTML rendering inside jsPDF
 * NO layout calculations
 * ONLY: Screenshot → Image → PDF
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
  quality: 1.0, // Maximum quality
  scale: 3, // High resolution for crisp output
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
 * Generate PDF from CV data - SCREENSHOT-BASED (PIXEL-PERFECT)
 * 
 * FLOW:
 * 1. Capture preview element using html2canvas
 * 2. Convert canvas to PNG image
 * 3. Create jsPDF document (A4)
 * 4. Calculate image dimensions proportionally
 * 5. If multi-page: slice canvas vertically, add multiple pages
 * 6. Download PDF
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

    // Check if element has content
    if (element.offsetHeight === 0 || element.offsetWidth === 0) {
      throw new Error('CV-Vorschau ist nicht sichtbar. Bitte wechseln Sie zur Vorschau-Ansicht.');
    }

    // Store and remove any CSS transforms from parent elements (they break html2canvas)
    const transforms: Array<{ element: HTMLElement; transform: string }> = [];
    let currentElement: HTMLElement | null = element;
    while (currentElement && currentElement !== document.body) {
      if (currentElement.style.transform) {
        transforms.push({ 
          element: currentElement, 
          transform: currentElement.style.transform 
        });
        currentElement.style.transform = 'none';
      }
      currentElement = currentElement.parentElement;
    }

    // Temporarily make element visible if hidden (for mobile)
    const parentHidden = element.closest('.hidden');
    let originalDisplay = '';
    if (parentHidden && parentHidden instanceof HTMLElement) {
      originalDisplay = parentHidden.style.display;
      parentHidden.style.display = 'block';
      
      // Wait for layout to update
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
      // Wait for all images (photos, logos) to load
      await waitForImages(element);

      // STEP 1: Capture preview as high-resolution canvas
      const canvas = await html2canvas(element, {
        scale: opts.scale,
        useCORS: opts.useCORS,
        logging: opts.logging,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      // STEP 2: Convert canvas to PNG image
      const imgData = canvas.toDataURL('image/png', opts.quality);

      // STEP 3: Create PDF document (A4 portrait)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // STEP 4: Calculate image dimensions proportionally to fit A4
      const imgWidth = A4_WIDTH;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = A4_HEIGHT;

      // STEP 5: Multi-page support - slice vertically if needed
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than A4
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // STEP 6: Generate filename and save
      const filename = generatePdfFilename(cvData);
      pdf.save(filename);
    } finally {
      // Restore CSS transforms
      transforms.forEach(({ element, transform }) => {
        element.style.transform = transform;
      });

      // Restore original visibility
      if (parentHidden && parentHidden instanceof HTMLElement) {
        parentHidden.style.display = originalDisplay;
      }
    }
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
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
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
        img.addEventListener('error', checkComplete);
      }
    });
  });
}

/**
 * Generate PDF with progress callback - SCREENSHOT-BASED
 */
export async function generatePDFWithProgress(
  cvData: CVData,
  previewElementId: string = 'cv-preview',
  onProgress?: (progress: number, message: string) => void
): Promise<void> {
  const opts = defaultOptions;

  try {
    onProgress?.(10, 'Vorbereitung...');

    const element = document.getElementById(previewElementId);
    if (!element) {
      throw new Error('CV-Vorschau nicht gefunden');
    }

    // Check if element has content
    if (element.offsetHeight === 0 || element.offsetWidth === 0) {
      throw new Error('CV-Vorschau ist nicht sichtbar. Bitte wechseln Sie zur Vorschau-Ansicht.');
    }

    // Store and remove any CSS transforms from parent elements
    const transforms: Array<{ element: HTMLElement; transform: string }> = [];
    let currentElement: HTMLElement | null = element;
    while (currentElement && currentElement !== document.body) {
      if (currentElement.style.transform) {
        transforms.push({ 
          element: currentElement, 
          transform: currentElement.style.transform 
        });
        currentElement.style.transform = 'none';
      }
      currentElement = currentElement.parentElement;
    }

    // Temporarily make element visible if hidden (for mobile)
    const parentHidden = element.closest('.hidden');
    let originalDisplay = '';
    if (parentHidden && parentHidden instanceof HTMLElement) {
      originalDisplay = parentHidden.style.display;
      parentHidden.style.display = 'block';
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
      onProgress?.(20, 'Bilder werden geladen...');
      await waitForImages(element);

      onProgress?.(40, 'Screenshot wird erstellt...');

      // Capture preview as canvas
      const canvas = await html2canvas(element, {
        scale: opts.scale,
        useCORS: opts.useCORS,
        logging: opts.logging,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      onProgress?.(60, 'PNG-Bild wird erstellt...');

      // Convert to PNG
      const imgData = canvas.toDataURL('image/png', opts.quality);

      onProgress?.(70, 'PDF-Dokument wird erstellt...');

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Calculate dimensions
      const imgWidth = A4_WIDTH;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = A4_HEIGHT;

      onProgress?.(80, 'Seiten werden hinzugefügt...');

      // Multi-page support
      let heightLeft = imgHeight;
      let position = 0;
      let pageCount = 1;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pageCount++;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        onProgress?.(80 + (pageCount * 5), `Seite ${pageCount} wird hinzugefügt...`);
      }

      onProgress?.(95, 'PDF wird gespeichert...');

      const filename = generatePdfFilename(cvData);
      pdf.save(filename);

      onProgress?.(100, 'Fertig!');
    } finally {
      // Restore CSS transforms
      transforms.forEach(({ element, transform }) => {
        element.style.transform = transform;
      });

      // Restore original visibility
      if (parentHidden && parentHidden instanceof HTMLElement) {
        parentHidden.style.display = originalDisplay;
      }
    }
  } catch (error) {
    console.error('PDF generation with progress failed:', error);
    throw error;
  }
}
