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
      alert('PDF konnte nicht erstellt werden. Bitte erneut versuchen.');
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

      <div className="min-h-screen bg-muted/30">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container-main flex h-16 items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-4 mr-4">
                <SaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
              </div>

              <Button variant="outline" size="sm" onClick={handleManualSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Speichern</span>
              </Button>

              <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
                <Download className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Exportieren</span>
              </Button>

              <label htmlFor="import-cv">
                <Button variant="outline" size="sm" asChild>
                  <span className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Importieren</span>
                  </span>
                </Button>
                <input id="import-cv" type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>

              <Button variant="default" size="sm" onClick={handleDownloadPDF} disabled={isExporting}>
                {isExporting ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-1" />
                )}
                <span className="hidden sm:inline">PDF herunterladen</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Progress Indicator */}
        {exportProgress && (
          <div className="fixed top-20 right-4 z-50 bg-background border rounded-lg shadow-lg p-4 w-80">
            <div className="flex items-center gap-3 mb-2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="font-medium">PDF wird erstellt...</span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">{exportProgress.message}</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${exportProgress.progress}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1 text-right">{Math.round(exportProgress.progress)}%</div>
          </div>
        )}

        <div className="md:hidden border-b bg-background">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="w-full grid grid-cols-3 rounded-none h-12">
              <TabsTrigger value="edit" className="gap-2">
                <Edit3 className="w-4 h-4" />
                Bearbeiten
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="w-4 h-4" />
                Vorschau
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="w-4 h-4" />
                Stil
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <main className="container-main py-6">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-6">
            {/* Editor Panel */}
            <div className={activeTab === 'edit' ? 'block' : 'hidden md:block'}>
              <Card className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Editor</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Füllen Sie Ihre Informationen aus
                  </p>
                </div>
                <EditorPanel cvData={cvData} updateCVData={handleUpdateCVData} />
              </Card>

              {/* Customization Panel - Desktop */}
              <Card className="mt-6 hidden md:block">
                <CustomizationPanel customization={customization} onUpdate={setCustomization} />
              </Card>
            </div>

            {/* Settings Panel - Mobile */}
            <div className={activeTab === 'settings' ? 'block md:hidden' : 'hidden'}>
              <Card>
                <CustomizationPanel customization={customization} onUpdate={setCustomization} />
              </Card>
            </div>

            {/* Preview Panel */}
            <div className={activeTab === 'preview' ? 'block' : 'hidden md:block'}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <h2 className="text-lg font-semibold">Vorschau</h2>
                </div>
                <div className="flex justify-center">
                  <div
                    className="shadow-2xl"
                    style={{ width: '210mm', maxWidth: '100%', transform: 'scale(0.75)', transformOrigin: 'top center' }}
                  >
                    <CVPreview cvData={cvData} customization={customization} className="min-h-[297mm]" />
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
