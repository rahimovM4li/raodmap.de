import { Education } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface EducationEditorProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationEditor({ data, onChange }: EducationEditorProps) {
  const addEducation = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Ausbildung</h2>
        <Button onClick={addEducation} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Hinzufügen
        </Button>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-sm mb-4">Fügen Sie Ihre Ausbildung hinzu</p>
      )}

      <div className="space-y-6">
        {data.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Eintrag #{index + 1}</span>
              <Button
                onClick={() => removeEducation(edu.id)}
                size="sm"
                variant="ghost"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Abschluss *</Label>
                <Input
                  value={edu.degree || ''}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor, Master, Ausbildung"
                />
              </div>

              <div className="space-y-2">
                <Label>Institution *</Label>
                <Input
                  value={edu.institution || ''}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="Universität / Schule / Betrieb"
                />
              </div>

              <div className="space-y-2">
                <Label>Beginn *</Label>
                <Input
                  type="month"
                  value={edu.startDate || ''}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Ende</Label>
                <Input
                  type="month"
                  value={edu.endDate || ''}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
