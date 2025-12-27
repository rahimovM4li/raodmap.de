import { PersonalInfo } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PhotoUpload from '@/components/cv/PhotoUpload';

interface PersonalInfoEditorProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoEditor({ data, onChange }: PersonalInfoEditorProps) {
  const updateField = (field: keyof PersonalInfo, value: string | null) => {
    onChange({ ...data, [field]: (value ?? '') as any });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Persönliche Daten</h2>

      <div className="mb-6">
        <PhotoUpload
          currentPhoto={data?.photo || null}
          onPhotoChange={(photo) => updateField('photo', photo)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Vorname *</Label>
          <Input
            id="firstName"
            value={data?.firstName || ''}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder="Max"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Nachname *</Label>
          <Input
            id="lastName"
            value={data?.lastName || ''}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder="Mustermann"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="jobTitle">Berufsbezeichnung</Label>
          <Input
            id="jobTitle"
            value={data?.jobTitle || ''}
            onChange={(e) => updateField('jobTitle', e.target.value)}
            placeholder="Softwareentwickler/in"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            value={data?.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="max.mustermann@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            value={data?.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+49 123 456789"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="city">Stadt</Label>
          <Input
            id="city"
            value={data?.city || ''}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="Passau"
          />
        </div>
      </div>
    </div>
  );
}
