import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload, FileJson, Loader2 } from 'lucide-react';
import { CVData } from '@/types/cv';
import { exportCVData, importCVData } from '@/lib/cvStorage';
import { generatePDF } from '@/lib/cvPdfGenerator';

interface ExportControlsProps {
  cvData: CVData;
  onImport: (data: CVData) => void;
}

export const ExportControls: React.FC<ExportControlsProps> = ({ cvData, onImport }) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingJSON, setIsExportingJSON] = useState(false);

  const handleExportJSON = () => {
    try {
      setIsExportingJSON(true);
      exportCVData(cvData, "");
      setTimeout(() => setIsExportingJSON(false), 500);
    } catch (error) {
      console.error('Failed to export JSON:', error);
      alert('Failed to export JSON data. Please try again.');
      setIsExportingJSON(false);
    }
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    
    const handleFileChange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.name.endsWith('.json') && file.type !== 'application/json') {
        alert('Please select a valid JSON file.');
        return;
      }

      // Confirm before overwriting
      const shouldProceed = confirm(
        'This will replace your current CV data. Do you want to continue?'
      );
      
      if (!shouldProceed) return;

      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const result = event.target?.result;
          if (typeof result !== 'string') {
            throw new Error('Invalid file content');
          }

          const data = importCVData(result);
          if (!data) {
            throw new Error('Failed to parse CV data');
          }

          onImport(data);
          alert('CV data imported successfully!');
        } catch (error) {
          console.error('Failed to import CV data:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          alert(`Failed to import CV data: ${errorMessage}\n\nPlease check that the file is a valid CV JSON export.`);
        }
      };

      reader.onerror = () => {
        alert('Failed to read file. Please try again.');
      };

      reader.readAsText(file);
    };

    input.addEventListener('change', handleFileChange);
    input.click();
    
    // Cleanup
    setTimeout(() => {
      input.removeEventListener('change', handleFileChange);
    }, 100);
  };

  const handleExportPDF = async () => {
    if (isExportingPDF) return;
    
    try {
      setIsExportingPDF(true);
      await generatePDF(cvData);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to generate PDF: ${errorMessage}\n\nPlease try again.`);
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={handleExportPDF}
        variant="default"
        size="sm"
        className="gap-2"
        disabled={isExportingPDF}
        aria-label="Export CV as PDF"
      >
        {isExportingPDF ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Export PDF
          </>
        )}
      </Button>
      
      <Button
        onClick={handleExportJSON}
        variant="outline"
        size="sm"
        className="gap-2"
        disabled={isExportingJSON || isExportingPDF}
        aria-label="Export CV as JSON"
      >
        {isExportingJSON ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <FileJson className="w-4 h-4" />
            Export JSON
          </>
        )}
      </Button>
      
      <Button
        onClick={handleImportJSON}
        variant="outline"
        size="sm"
        className="gap-2"
        disabled={isExportingPDF || isExportingJSON}
        aria-label="Import CV from JSON"
      >
        <Upload className="w-4 h-4" />
        Import JSON
      </Button>
    </div>
  );
};
