/**
 * Deutscher Lebenslauf-Generator – Premium Version
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import type { CVData, CVCustomization } from '@/types/cv';
import { initialCVData, defaultCustomization } from '@/types/cv';
import { loadCVData, saveCVData, exportCVData, importCVData } from '@/lib/cvStorage';
import { generatePDF, generatePDFWithProgress } from '@/lib/cvPdfGenerator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditorPanel } from '@/components/cv/Editor/EditorPanel';
import CVPreview from '@/components/cv/CVPreview';
import CustomizationPanel from '@/components/cv/CustomizationPanel';
import { Save, Download, Upload, FileText, Eye, Edit3, Loader2, CheckCircle2, Settings } from 'lucide-react';

const SaveIndicator = ({ isSaving, lastSaved }: { isSaving: boolean; lastSaved: Date | null }) => {
  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="w-3 h-3 animate-spin" />
        <span>Wird gespeichert…</span>
      </div>
    );
  }
  if (lastSaved) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="w-3 h-3 text-green-500" />
        <span>Gespeichert {lastSaved.toLocaleTimeString()}</span>
      </div>
    );
  }
  return null;
};

const CVGeneratorPage = () => {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [customization, setCustomization] = useState<CVCustomization>(defaultCustomization);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<{ progress: number; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'settings'>('edit');
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load data on mount
  useEffect(() => {
    const savedData = loadCVData();
    if (savedData) setCvData(savedData);
    
    const savedCustomization = localStorage.getItem('cv-customization');
    if (savedCustomization) {
      try {
        setCustomization(JSON.parse(savedCustomization));
      } catch (e) {
        console.error('Failed to parse customization', e);
      }
    }
  }, []);

  // Auto-save with debounce
  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    setIsSaving(true);
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveCVData(cvData);
      localStorage.setItem('cv-customization', JSON.stringify(customization));
      setIsSaving(false);
      setLastSaved(new Date());
    }, 500);
  }, [cvData, customization]);

  useEffect(() => {
    scheduleAutoSave();
  }, [cvData, customization, scheduleAutoSave]);

  const handleUpdateCVData = useCallback((updates: Partial<CVData> | ((prev: CVData) => CVData)) => {
    if (typeof updates === 'function') {
      setCvData(updates);
    } else {
      setCvData((prev) => ({ ...prev, ...updates }));
    }
  }, []);

  const handleManualSave = useCallback(() => {
    saveCVData(cvData);
    localStorage.setItem('cv-customization', JSON.stringify(customization));
    setLastSaved(new Date());
  }, [cvData, customization]);

  const handleExport = useCallback(() => {
    try {
      setIsExporting(true);
      const filename = `Lebenslauf_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_Daten.json`;
      exportCVData(cvData, filename);
    } catch (error) {
      console.error('Export fehlgeschlagen:', error);
      alert('Export der Daten fehlgeschlagen');
    } finally {
      setIsExporting(false);
    }
  }, [cvData]);

  const handleImport = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importCVData(file);
      setCvData(imported);
      setLastSaved(new Date());
      event.target.value = '';
    } catch (error) {
      console.error('Import fehlgeschlagen:', error);
      alert('Import der Daten fehlgeschlagen. Bitte Dateiformat prüfen.');
    }
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    try {
      setIsExporting(true);
      setExportProgress({ progress: 0, message: 'Starte PDF-Export...' });
      
      // Check if preview element exists and has content
      const previewElement = document.getElementById('cv-preview');
      if (!previewElement) {
        throw new Error('Vorschau nicht gefunden. Bitte laden Sie die Seite neu.');
      }
      
      if (previewElement.offsetHeight === 0 || previewElement.offsetWidth === 0) {
        throw new Error('Vorschau ist nicht sichtbar. Bitte füllen Sie mindestens einige Felder aus.');
      }
      
      await generatePDFWithProgress(
        cvData,
        'cv-preview',
        (progress, message) => {
          setExportProgress({ progress, message });
        }
      );
      
      setExportProgress(null);
      setIsExporting(false);
    } catch (error) {
      console.error('PDF-Generierung fehlgeschlagen:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      alert(`PDF konnte nicht erstellt werden:\n\n${errorMessage}\n\nBitte stellen Sie sicher, dass Sie einige Felder ausgefüllt haben und versuchen Sie es erneut.`);
      setExportProgress(null);
      setIsExporting(false);
    }
  }, [cvData]);

  const title = 'Professioneller Lebenslauf-Generator';
  const subtitle = '100% clientseitig • Keine Speicherung im Backend • Deutsch';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
      </Helmet>

      <div className="min-h-screen bg-background md:bg-muted/30">
        {/* MOBILE HEADER */}
        <header className="md:hidden sticky top-0 z-50 w-full border-b bg-background">
          <div className="flex flex-col">
            {/* Top Bar */}
            <div className="flex h-14 items-center justify-between px-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-base font-bold truncate">CV-Generator</h1>
                {isSaving && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Speichere...
                  </p>
                )}
              </div>
              
              <Button
                onClick={handleDownloadPDF}
                disabled={isExporting}
                size="sm"
                className="gap-2"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs">Erstelle...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span className="text-xs">PDF</span>
                  </>
                )}
              </Button>
            </div>

            {/* Mobile Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
              <TabsList className="w-full grid grid-cols-3 rounded-none h-12 bg-muted/50">
                <TabsTrigger value="edit" className="gap-1.5 data-[state=active]:bg-background">
                  <Edit3 className="w-4 h-4" />
                  <span className="text-xs">Daten</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-1.5 data-[state=active]:bg-background">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">Stil</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-1.5 data-[state=active]:bg-background">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs">Ansicht</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        {/* DESKTOP HEADER */}
        <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container-main flex h-16 items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-4 mr-2">
                <SaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
              </div>

              <Button variant="outline" size="sm" onClick={handleManualSave} disabled={isSaving}>
                <Save className="w-4 h-4" />
                <span className="ml-2 hidden lg:inline">Speichern</span>
              </Button>

              <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
                <Download className="w-4 h-4" />
                <span className="ml-2 hidden lg:inline">Export JSON</span>
              </Button>

              <label htmlFor="import-cv">
                <Button variant="outline" size="sm" asChild>
                  <span className="cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span className="ml-2 hidden lg:inline">Import</span>
                  </span>
                </Button>
                <input id="import-cv" type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>

              <Button 
                variant="default" 
                size="sm" 
                onClick={handleDownloadPDF} 
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Erstelle...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>PDF Download</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Progress Indicator */}
        {exportProgress && (
          <div className="fixed top-16 md:top-20 right-2 md:right-4 z-50 bg-background border rounded-lg shadow-lg p-3 md:p-4 w-[calc(100vw-1rem)] md:w-80 max-w-md">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin text-primary" />
              <span className="font-medium text-sm md:text-base">PDF wird erstellt...</span>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mb-2">{exportProgress.message}</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${exportProgress.progress}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1 text-right">{Math.round(exportProgress.progress)}%</div>
          </div>
        )}

        {/* MOBILE CONTENT */}
        <main className="md:hidden">
          {/* Editor Tab */}
          <div className={activeTab === 'edit' ? 'block' : 'hidden'}>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">CV-Daten</h2>
                  <p className="text-xs text-muted-foreground">Füllen Sie Ihre Informationen aus</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleManualSave} disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Card>
                <EditorPanel cvData={cvData} updateCVData={handleUpdateCVData} />
              </Card>
            </div>
          </div>

          {/* Settings Tab */}
          <div className={activeTab === 'settings' ? 'block' : 'hidden'}>
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Stil-Anpassung</h2>
                <p className="text-xs text-muted-foreground">Passen Sie das Design an</p>
              </div>
              <Card>
                <CustomizationPanel customization={customization} onUpdate={setCustomization} />
              </Card>
            </div>
          </div>

          {/* Preview Tab */}
          <div className={activeTab === 'preview' ? 'block' : 'hidden'}>
            <div className="p-2 bg-muted/50">
              <div className="bg-background rounded-lg shadow-xl overflow-hidden">
                <div className="aspect-[210/297] overflow-auto">
                  <div className="w-full h-full" style={{ transform: 'scale(0.48)', transformOrigin: 'top left', width: '208.33%', height: '208.33%' }}>
                    <CVPreview cvData={cvData} customization={customization} className="w-[210mm] min-h-[297mm] bg-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isExporting}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Erstelle PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      PDF herunterladen
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* DESKTOP CONTENT */}
        <main className="hidden md:block container-main py-6">
          <div className="grid lg:grid-cols-[420px_1fr] gap-6">
            
            {/* LEFT COLUMN: Editor + Settings */}
            <div className="space-y-6">
              {/* Editor Panel */}
              <Card>
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">CV-Daten</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Füllen Sie Ihre Informationen aus
                  </p>
                </div>
                <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
                  <EditorPanel cvData={cvData} updateCVData={handleUpdateCVData} />
                </div>
              </Card>

              {/* Customization Panel */}
              <Card>
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Stil-Anpassung</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Passen Sie das Design an
                  </p>
                </div>
                <CustomizationPanel customization={customization} onUpdate={setCustomization} />
              </Card>
            </div>

            {/* RIGHT COLUMN: Preview */}
            <div className="sticky top-24 h-fit">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <h2 className="text-lg font-semibold">Vorschau</h2>
                  <Button
                    onClick={handleDownloadPDF}
                    disabled={isExporting}
                    size="sm"
                    className="gap-2"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Erstelle...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        PDF Download
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex justify-center">
                  <div
                    className="w-full shadow-2xl"
                    style={{ 
                      maxWidth: '210mm',
                      transform: 'scale(0.85)',
                      transformOrigin: 'top center'
                    }}
                  >
                    <CVPreview cvData={cvData} customization={customization} className="w-[210mm] min-h-[297mm]" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CVGeneratorPage;
