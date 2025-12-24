import jsPDF from 'jspdf';
import { Language } from '@/lib/i18n';

interface ChecklistItem {
  text: string;
  required: boolean;
}

interface ChecklistData {
  title: string;
  subtitle: string;
  timeline: string;
  documents: ChecklistItem[];
  steps: string[];
  embassy: {
    title: string;
    address: string;
    phone: string;
    website: string;
  };
  sources: string[];
}

// Helper function to add Unicode text to PDF using rectangles and manual rendering
class UnicodePDFHelper {
  private doc: jsPDF;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor(doc: jsPDF) {
    this.doc = doc;
    if (typeof document !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
  }

  // Add text with proper Unicode support by rendering to canvas first
  addText(text: string, x: number, y: number, options: {
    fontSize?: number;
    fontWeight?: 'normal' | 'bold';
    color?: [number, number, number];
    maxWidth?: number;
  } = {}) {
    const {
      fontSize = 10,
      fontWeight = 'normal',
      color = [0, 0, 0],
      maxWidth = 170
    } = options;

    if (!this.canvas || !this.ctx) {
      // Fallback to regular jsPDF text (will show squares for unsupported chars)
      this.doc.setFontSize(fontSize);
      this.doc.setTextColor(color[0], color[1], color[2]);
      this.doc.text(text, x, y, { maxWidth });
      return;
    }

    // Use canvas to render Unicode text properly
    const font = `${fontWeight === 'bold' ? 'bold' : 'normal'} ${fontSize}px "Noto Sans", Arial, sans-serif`;
    this.ctx.font = font;
    
    // Measure text
    const metrics = this.ctx.measureText(text);
    const textWidth = metrics.width;
    
    // Set canvas size
    const scale = 2; // Higher resolution
    this.canvas.width = textWidth * scale;
    this.canvas.height = fontSize * scale * 1.5;
    
    // Re-apply font after canvas resize
    this.ctx.font = font;
    this.ctx.scale(scale, scale);
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    this.ctx.fillText(text, 0, 0);
    
    // Convert canvas to image and add to PDF
    try {
      const imgData = this.canvas.toDataURL('image/png');
      const imgWidth = textWidth * 0.264583; // Convert px to mm
      const imgHeight = fontSize * 1.5 * 0.264583;
      this.doc.addImage(imgData, 'PNG', x, y - fontSize * 0.264583, imgWidth, imgHeight);
    } catch (error) {
      // Fallback
      this.doc.setFontSize(fontSize);
      this.doc.setTextColor(color[0], color[1], color[2]);
      this.doc.text(text, x, y, { maxWidth });
    }
  }

  // Add multiline text with wrapping
  addMultilineText(text: string, x: number, y: number, options: {
    fontSize?: number;
    fontWeight?: 'normal' | 'bold';
    color?: [number, number, number];
    maxWidth?: number;
    lineHeight?: number;
  } = {}): number {
    const {
      fontSize = 10,
      maxWidth = 170,
      lineHeight = fontSize * 0.4
    } = options;

    // Split text into lines that fit maxWidth
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    if (this.ctx) {
      const font = `${options.fontWeight === 'bold' ? 'bold' : 'normal'} ${fontSize}px "Noto Sans", Arial, sans-serif`;
      this.ctx.font = font;

      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width * 0.264583; // px to mm

        if (testWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
    } else {
      // Fallback: simple char-count based splitting
      const charsPerLine = Math.floor(maxWidth / (fontSize * 0.5));
      for (let i = 0; i < text.length; i += charsPerLine) {
        lines.push(text.substring(i, i + charsPerLine));
      }
    }

    // Render each line
    let currentY = y;
    for (const line of lines) {
      this.addText(line, x, currentY, options);
      currentY += lineHeight;
    }

    return currentY;
  }
}

// Rest of the code remains the same...
export { UnicodePDFHelper };
