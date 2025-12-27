import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SummaryEditorProps {
  data: string;
  onChange: (data: string) => void;
}

export function SummaryEditor({ data, onChange }: SummaryEditorProps) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Kurzprofil</h2>

      <div className="space-y-2">
        <Label htmlFor="summary">Beschreiben Sie sich kurz</Label>
        <Textarea
          id="summary"
          value={data || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Kurzbeschreibung Ihrer Erfahrung und Stärken"
          rows={6}
          className="resize-none"
        />
        <p className="text-sm text-gray-500">2–3 Sätze, klar und professionell.</p>
      </div>
    </div>
  );
}
