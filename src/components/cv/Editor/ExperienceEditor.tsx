import { WorkExperience } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ExperienceEditorProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export function ExperienceEditor({ data, onChange }: ExperienceEditorProps) {
  const addExperience = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Berufserfahrung</h2>
        <Button onClick={addExperience} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Hinzufügen
        </Button>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-sm mb-4">Fügen Sie Ihre Berufserfahrung hinzu</p>
      )}

      <div className="space-y-6">
        {data.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Station #{index + 1}</span>
              <Button
                onClick={() => removeExperience(exp.id)}
                size="sm"
                variant="ghost"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position *</Label>
                <Input
                  value={exp.position || ''}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Softwareentwickler/in"
                />
              </div>

              <div className="space-y-2">
                <Label>Unternehmen *</Label>
                <Input
                  value={exp.company || ''}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Firmenname"
                />
              </div>

              <div className="space-y-2">
                <Label>Beginn *</Label>
                <Input
                  type="month"
                  value={exp.startDate || ''}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Ende</Label>
                <Input
                  type="month"
                  value={exp.endDate || ''}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Beschreibung</Label>
                <Textarea
                  value={exp.description || ''}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Aufgaben und Ergebnisse"
                  rows={4}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
