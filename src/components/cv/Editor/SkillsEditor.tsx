import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsEditorProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export function SkillsEditor({ data, onChange }: SkillsEditorProps) {
  const addSkill = () => {
    onChange([...data, '']);
  };

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, value: string) => {
    const next = [...data];
    next[index] = value;
    onChange(next);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Kenntnisse</h2>
        <Button onClick={addSkill} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Hinzufügen
        </Button>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-sm mb-4">Fügen Sie Ihre Kenntnisse hinzu</p>
      )}

      <div className="space-y-3">
        {data.map((skill, index) => (
          <div key={index} className="flex items-end gap-3 border border-gray-200 rounded-lg p-3">
            <div className="flex-1 space-y-2">
              <Label>Kenntnis</Label>
              <Input
                value={skill || ''}
                onChange={(e) => updateSkill(index, e.target.value)}
                placeholder="z. B. JavaScript, Excel, Projektmanagement"
              />
            </div>
            <Button
              onClick={() => removeSkill(index)}
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
