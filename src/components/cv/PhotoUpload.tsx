/**
 * PhotoUpload – Canvas-basierte Bildbearbeitung (Quadrat, max 400px)
 */
import { useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, X, Camera } from 'lucide-react';

interface PhotoUploadProps {
  currentPhoto: string | null;
  onPhotoChange: (photo: string | null) => void;
}

const PhotoUpload = ({ currentPhoto, onPhotoChange }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const MAX_SIZE = 400;
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) {
            reject(new Error('Canvas nicht verfügbar'));
            return;
          }
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas-Kontext nicht verfügbar'));
            return;
          }
          const size = Math.min(img.width, img.height);
          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;
          canvas.width = MAX_SIZE;
          canvas.height = MAX_SIZE;
          ctx.drawImage(img, sx, sy, size, size, 0, 0, MAX_SIZE, MAX_SIZE);
          const base64 = canvas.toDataURL('image/jpeg', 0.9);
          resolve(base64);
        };
        img.onerror = () => reject(new Error('Bild konnte nicht geladen werden'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Datei konnte nicht gelesen werden'));
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Bitte wählen Sie eine Bilddatei aus');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Datei darf maximal 5MB groß sein');
      return;
    }
    try {
      setIsProcessing(true);
      const processedImage = await processImage(file);
      onPhotoChange(processedImage);
    } catch (error) {
      console.error('Bildverarbeitung fehlgeschlagen:', error);
      alert('Bild konnte nicht verarbeitet werden. Bitte eine andere Datei versuchen.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [processImage, onPhotoChange]);

  const handleRemove = useCallback(() => onPhotoChange(null), [onPhotoChange]);
  const handleClick = useCallback(() => fileInputRef.current?.click(), []);

  return (
    <Card className="p-4">
      <Label className="text-sm font-medium mb-3 block">Foto hochladen</Label>
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={handleFileSelect}
        disabled={isProcessing}
      />

      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {currentPhoto ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
              <img src={currentPhoto} alt="Profilfoto" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <Button type="button" variant="outline" size="sm" onClick={handleClick} disabled={isProcessing} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            {isProcessing ? 'Wird verarbeitet…' : 'Foto auswählen'}
          </Button>

          {currentPhoto && (
            <Button type="button" variant="ghost" size="sm" onClick={handleRemove} disabled={isProcessing} className="w-full">
              <X className="w-4 h-4 mr-2" />
              Entfernen
            </Button>
          )}

          <p className="text-xs text-muted-foreground mt-1">Maximale Größe: 5MB</p>
        </div>
      </div>
    </Card>
  );
};

export default PhotoUpload;
