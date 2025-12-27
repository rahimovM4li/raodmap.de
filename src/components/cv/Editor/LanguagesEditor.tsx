import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface LanguagesEditorProps {
  data: { language: string; level: string }[];
  onChange: (data: { language: string; level: string }[]) => void;
}

export function LanguagesEditor({ data, onChange }: LanguagesEditorProps) {
  const addLanguage = () => {
    onChange([...data, { language: '', level: 'A1' }]);
  };

  const removeLanguage = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: 'language' | 'level', value: string) => {
    const next = [...data];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Muttersprache'];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Sprachen</h2>
        <Button onClick={addLanguage} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Hinzufügen
        </Button>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-sm mb-4">Fügen Sie Ihre Sprachkenntnisse hinzu</p>
      )}

      <div className="space-y-3">
        {data.map((lang, index) => (
          <div key={index} className="flex items-end gap-3 border border-gray-200 rounded-lg p-3">
            <div className="flex-1 space-y-2">
              <Label>Sprache</Label>
              <Input
                value={lang.language || ''}
                onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                placeholder="z. B. Deutsch, Englisch"
              />
            </div>

            <div className="w-40 space-y-2">
              <Label>Niveau</Label>
              <Select
                value={lang.level || ''}
                onValueChange={(value) => updateLanguage(index, 'level', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => removeLanguage(index)}
              size="icon"
              variant="ghost"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
