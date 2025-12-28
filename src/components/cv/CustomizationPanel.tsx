/**
 * Premium Customization Panel
 * Elegant controls for CV styling
 */
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { CVCustomization, AccentColor, TypographyScale, SectionSpacing, SectionSeparator } from '@/types/cv';
import { Palette, Type, Space, Minus } from 'lucide-react';

interface CustomizationPanelProps {
  customization: CVCustomization;
  onUpdate: (customization: CVCustomization) => void;
}

export default function CustomizationPanel({ customization, onUpdate }: CustomizationPanelProps) {
  const updateField = <K extends keyof CVCustomization>(field: K, value: CVCustomization[K]) => {
    onUpdate({ ...customization, [field]: value });
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      
      {/* Accent Color */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Akzentfarbe
        </Label>
        <RadioGroup
          value={customization.accentColor}
          onValueChange={(value) => updateField('accentColor', value as AccentColor)}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blue" id="color-blue" />
              <Label htmlFor="color-blue" className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-blue-600" />
                <span className="text-sm">Blau</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gray" id="color-gray" />
              <Label htmlFor="color-gray" className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-gray-600" />
                <span className="text-sm">Grau</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="black" id="color-black" />
              <Label htmlFor="color-black" className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-gray-800" />
                <span className="text-sm">Schwarz</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="green" id="color-green" />
              <Label htmlFor="color-green" className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-green-600" />
                <span className="text-sm">Grün</span>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Typography Scale */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Type className="w-4 h-4" />
          Schriftgröße
        </Label>
        <RadioGroup
          value={customization.typographyScale}
          onValueChange={(value) => updateField('typographyScale', value as TypographyScale)}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="type-compact" />
              <Label htmlFor="type-compact" className="cursor-pointer text-sm">
                Kompakt
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="balanced" id="type-balanced" />
              <Label htmlFor="type-balanced" className="cursor-pointer text-sm">
                Ausgewogen
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="spacious" id="type-spacious" />
              <Label htmlFor="type-spacious" className="cursor-pointer text-sm">
                Großzügig
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Section Spacing */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Space className="w-4 h-4" />
          Abstandshöhe
        </Label>
        <RadioGroup
          value={customization.sectionSpacing}
          onValueChange={(value) => updateField('sectionSpacing', value as SectionSpacing)}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tight" id="spacing-tight" />
              <Label htmlFor="spacing-tight" className="cursor-pointer text-sm">
                Eng
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="spacing-normal" />
              <Label htmlFor="spacing-normal" className="cursor-pointer text-sm">
                Normal
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="airy" id="spacing-airy" />
              <Label htmlFor="spacing-airy" className="cursor-pointer text-sm">
                Luftig
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Section Separator */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Minus className="w-4 h-4" />
          Trennlinien
        </Label>
        <RadioGroup
          value={customization.sectionSeparator}
          onValueChange={(value) => updateField('sectionSeparator', value as SectionSeparator)}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="line" id="sep-line" />
              <Label htmlFor="sep-line" className="cursor-pointer text-sm">
                Linie
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="soft" id="sep-soft" />
              <Label htmlFor="sep-soft" className="cursor-pointer text-sm">
                Weich
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="sep-none" />
              <Label htmlFor="sep-none" className="cursor-pointer text-sm">
                Keine
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
