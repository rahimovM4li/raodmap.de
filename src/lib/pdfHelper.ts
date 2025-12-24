import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Generiert ein schönes PDF aus HTML-Content mit vollständiger Unicode-Unterstützung
 * Funktioniert perfekt mit Kyrillisch, Tadschikisch und allen anderen Schriften
 */
export async function generatePDFFromHTML(
  element: HTMLElement,
  filename: string,
  options: {
    format?: 'a4' | 'letter';
    orientation?: 'portrait' | 'landscape';
    margin?: number;
  } = {}
): Promise<void> {
  const {
    format = 'a4',
    orientation = 'portrait',
    margin = 10
  } = options;

  try {
    // Schritt 1: HTML zu Canvas rendern (behält alle Schriften und Styling)
    const canvas = await html2canvas(element, {
      scale: 2, // Höhere Qualität
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 0,
      removeContainer: true,
    });

    // Schritt 2: Canvas zu Bild konvertieren
    const imgData = canvas.toDataURL('image/png');
    
    // Schritt 3: PDF erstellen
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });

    // Berechne Dimensionen
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const contentWidth = pageWidth - (margin * 2);
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    
    let pdfWidth = contentWidth;
    let pdfHeight = pdfWidth / ratio;
    
    // Wenn das Bild zu hoch ist, füge mehrere Seiten hinzu
    const totalPages = Math.ceil(pdfHeight / (pageHeight - margin * 2));
    
    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }
      
      const yOffset = -(pageHeight - margin * 2) * page;
      pdf.addImage(
        imgData,
        'PNG',
        margin,
        margin + yOffset,
        pdfWidth,
        pdfHeight
      );
    }

    // Schritt 4: PDF speichern
    pdf.save(filename);
  } catch (error) {
    console.error('Fehler beim PDF-Generieren:', error);
    throw error;
  }
}

/**
 * Erstellt ein HTML-Element für ein schön formatiertes Checklist-PDF
 */
export function createChecklistHTML(data: {
  title: string;
  subtitle: string;
  timeline: string;
  documents: { text: string; required: boolean }[];
  steps: string[];
  embassy: {
    title: string;
    address: string;
    phone: string;
    website: string;
  };
  sources: string[];
  labels: {
    documents: string;
    required: string;
    steps: string;
    sources: string;
  };
}): HTMLElement {
  const container = document.createElement('div');
  container.style.cssText = `
    font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    padding: 40px;
    background: white;
    color: #1a1a1a;
    max-width: 800px;
    line-height: 1.6;
  `;

  container.innerHTML = `
    <div style="margin-bottom: 30px; border-bottom: 3px solid #3B82F6; padding-bottom: 20px;">
      <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: bold; color: #1a1a1a;">
        ${data.title}
      </h1>
      <p style="margin: 0 0 8px 0; font-size: 16px; color: #4B5563;">
        ${data.subtitle}
      </p>
      <p style="margin: 0; font-size: 14px; color: #6B7280; font-style: italic;">
        ${data.timeline}
      </p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 20px; font-weight: bold; color: #3B82F6; margin: 0 0 15px 0; text-transform: uppercase;">
        ${data.labels.documents}
      </h2>
      <div style="background: #F9FAFB; border-left: 4px solid #3B82F6; padding: 15px; border-radius: 4px;">
        ${data.documents.map(item => `
          <div style="margin-bottom: 12px; display: flex; align-items: start;">
            <span style="color: #3B82F6; font-size: 18px; margin-right: 10px; line-height: 1.4;">☐</span>
            <span style="flex: 1; font-size: 14px; color: #1a1a1a;">
              ${item.text}${item.required ? ' <span style="color: #EF4444; font-weight: bold;">*</span>' : ''}
            </span>
          </div>
        `).join('')}
        <p style="margin: 15px 0 0 0; font-size: 12px; color: #6B7280; font-style: italic;">
          ${data.labels.required}
        </p>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 20px; font-weight: bold; color: #10B981; margin: 0 0 15px 0; text-transform: uppercase;">
        ${data.labels.steps}
      </h2>
      <div style="background: #F0FDF4; border-left: 4px solid #10B981; padding: 15px; border-radius: 4px;">
        ${data.steps.map((step, index) => `
          <div style="margin-bottom: ${index < data.steps.length - 1 ? '12px' : '0'}; display: flex; align-items: start;">
            <span style="background: #10B981; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">
              ${index + 1}
            </span>
            <span style="flex: 1; font-size: 14px; color: #1a1a1a; line-height: 1.5;">
              ${step.replace(/^\d+\.\s*/, '')}
            </span>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="margin-bottom: 30px; background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; border-radius: 4px;">
      <h3 style="font-size: 16px; font-weight: bold; color: #92400E; margin: 0 0 10px 0;">
        ${data.embassy.title}
      </h3>
      <p style="margin: 0 0 5px 0; font-size: 14px; color: #78350F;">
        📍 ${data.embassy.address}
      </p>
      <p style="margin: 0 0 5px 0; font-size: 14px; color: #78350F;">
        📞 ${data.embassy.phone}
      </p>
      <p style="margin: 0; font-size: 14px; color: #78350F;">
        🌐 ${data.embassy.website}
      </p>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; font-weight: bold; color: #6B7280; margin: 0 0 10px 0; text-transform: uppercase;">
        ${data.labels.sources}
      </h3>
      ${data.sources.map(source => `
        <p style="margin: 0 0 5px 0; font-size: 13px; color: #4B5563;">
          • ${source}
        </p>
      `).join('')}
    </div>

    <div style="border-top: 2px solid #E5E7EB; padding-top: 15px; margin-top: 30px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #9CA3AF;">
        Germany Roadmap | roadmap.m4li.de | ${new Date().toLocaleDateString()}
      </p>
    </div>
  `;

  return container;
}

/**
 * Erstellt ein HTML-Element für ein personalisiertes PDF
 */
export function createPersonalizedHTML(data: {
  title: string;
  duration: string;
  steps: { title: string; description: string }[];
  documents: string[];
  labels: {
    steps: string;
    documents: string;
    duration: string;
  };
}): HTMLElement {
  const container = document.createElement('div');
  container.style.cssText = `
    font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    padding: 40px;
    background: white;
    color: #1a1a1a;
    max-width: 800px;
    line-height: 1.6;
  `;

  container.innerHTML = `
    <div style="margin-bottom: 30px; border-bottom: 4px solid #3B82F6; padding-bottom: 20px;">
      <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: bold; color: #1a1a1a;">
        ${data.title}
      </h1>
      <p style="margin: 0; font-size: 16px; color: #6B7280; font-weight: 500;">
        ⏱️ ${data.labels.duration}: <span style="color: #3B82F6; font-weight: bold;">${data.duration}</span>
      </p>
    </div>

    <div style="margin-bottom: 35px;">
      <h2 style="font-size: 22px; font-weight: bold; color: #3B82F6; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.5px;">
        ${data.labels.steps}
      </h2>
      ${data.steps.map((step, index) => `
        <div style="margin-bottom: 25px; border-left: 4px solid #3B82F6; padding-left: 20px; background: linear-gradient(to right, #EFF6FF, transparent); padding-top: 15px; padding-bottom: 15px; border-radius: 4px;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="background: #3B82F6; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold; margin-right: 12px;">
              ${index + 1}
            </span>
            <h3 style="margin: 0; font-size: 18px; font-weight: bold; color: #1a1a1a;">
              ${step.title}
            </h3>
          </div>
          <p style="margin: 0 0 0 44px; font-size: 14px; color: #4B5563; line-height: 1.6;">
            ${step.description}
          </p>
        </div>
      `).join('')}
    </div>

    <div style="margin-bottom: 30px; background: #F0FDF4; border: 2px solid #10B981; border-radius: 8px; padding: 20px;">
      <h2 style="font-size: 22px; font-weight: bold; color: #10B981; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.5px;">
        ${data.labels.documents}
      </h2>
      ${data.documents.map((doc, index) => `
        <div style="margin-bottom: ${index < data.documents.length - 1 ? '12px' : '0'}; display: flex; align-items: start;">
          <span style="color: #10B981; font-size: 20px; margin-right: 12px; line-height: 1.5;">☐</span>
          <span style="flex: 1; font-size: 15px; color: #1a1a1a; line-height: 1.5;">
            ${doc}
          </span>
        </div>
      `).join('')}
    </div>

    <div style="border-top: 3px solid #E5E7EB; padding-top: 20px; margin-top: 40px; text-align: center;">
      <p style="margin: 0 0 5px 0; font-size: 14px; color: #6B7280; font-weight: 500;">
        Germany Roadmap
      </p>
      <p style="margin: 0; font-size: 12px; color: #9CA3AF;">
        ${new Date().toLocaleDateString()} | germanyroad.map
      </p>
    </div>
  `;

  return container;
}
