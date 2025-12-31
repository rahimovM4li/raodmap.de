/**
 * Advanced Premium Customization Panel
 * Professional controls for CV styling with collapsible sections
 */
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { 
  CVCustomization, 
  AccentColor, 
  FontFamily,
  SectionSpacing, 
  SectionSeparator,
  SectionHeaderStyle,
  PageMargin,
  PhotoPosition,
  PhotoShape,
  PhotoSize
} from '@/types/cv';
import { Palette, Type, Space, Minus, AlignLeft, Layout, Image, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CustomizationPanelProps {
  customization: CVCustomization;
  onUpdate: (customization: CVCustomization) => void;
}

export default function CustomizationPanel({ customization, onUpdate }: CustomizationPanelProps) {
  const [openSections, setOpenSections] = useState({
    colors: true,
    typography: true,
    layout: false,
    sections: false,
    photo: false,
  });

  const updateField = <K extends keyof CVCustomization>(field: K, value: CVCustomization[K]) => {
    onUpdate({ ...customization, [field]: value });
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-3 p-4 md:p-6">
      
      {/* COLORS */}
      <Collapsible open={openSections.colors} onOpenChange={() => toggleSection('colors')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="text-sm font-semibold">Farben</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.colors ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-3">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Akzentfarbe</Label>
            <RadioGroup
              value={customization.accentColor}
              onValueChange={(value) => updateField('accentColor', value as AccentColor)}
            >
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'blue', label: 'Blau', color: 'bg-blue-600' },
                  { value: 'gray', label: 'Grau', color: 'bg-gray-600' },
                  { value: 'black', label: 'Schwarz', color: 'bg-gray-900' },
                  { value: 'green', label: 'Grün', color: 'bg-green-600' },
                  { value: 'darkgreen', label: 'Dunkelgrün', color: 'bg-green-800' },
                  { value: 'anthracite', label: 'Anthrazit', color: 'bg-gray-700' },
                  { value: 'bordeaux', label: 'Bordeaux', color: 'bg-red-800' },
                ].map(({ value, label, color }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`color-${value}`} />
                    <Label htmlFor={`color-${value}`} className="flex items-center gap-2 cursor-pointer text-xs">
                      <div className={`w-3 h-3 rounded-full ${color}`} />
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* TYPOGRAPHY */}
      <Collapsible open={openSections.typography} onOpenChange={() => toggleSection('typography')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <span className="text-sm font-semibold">Typografie</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.typography ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-4">
          {/* Font Family */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Schriftart</Label>
            <RadioGroup
              value={customization.fontFamily}
              onValueChange={(value) => updateField('fontFamily', value as FontFamily)}
            >
              <div className="space-y-2">
                {[
                  { value: 'inter', label: 'Inter (Modern)' },
                  { value: 'opensans', label: 'Open Sans (Klassisch)' },
                  { value: 'lato', label: 'Lato (Freundlich)' },
                  { value: 'roboto', label: 'Roboto (Neutral)' },
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`font-${value}`} />
                    <Label htmlFor={`font-${value}`} className="cursor-pointer text-xs">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Schriftgröße: {customization.fontSize}pt
            </Label>
            <Slider
              value={[customization.fontSize]}
              onValueChange={([value]) => updateField('fontSize', value)}
              min={10}
              max={12}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Line Spacing */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Zeilenabstand: {customization.lineSpacing.toFixed(1)}
            </Label>
            <Slider
              value={[customization.lineSpacing]}
              onValueChange={([value]) => updateField('lineSpacing', value)}
              min={1.2}
              max={1.6}
              step={0.1}
              className="w-full"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* LAYOUT & SPACING */}
      <Collapsible open={openSections.layout} onOpenChange={() => toggleSection('layout')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            <span className="text-sm font-semibold">Layout & Abstände</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.layout ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-4">
          {/* Section Spacing */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Abschnitt-Abstände</Label>
            <RadioGroup
              value={customization.sectionSpacing}
              onValueChange={(value) => updateField('sectionSpacing', value as SectionSpacing)}
            >
              <div className="space-y-2">
                {[
                  { value: 'tight', label: 'Kompakt' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'airy', label: 'Großzügig' },
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`spacing-${value}`} />
                    <Label htmlFor={`spacing-${value}`} className="cursor-pointer text-xs">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Page Margins */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Seitenränder</Label>
            <RadioGroup
              value={customization.pageMargin}
              onValueChange={(value) => updateField('pageMargin', value as PageMargin)}
            >
              <div className="space-y-2">
                {[
                  { value: 'narrow', label: 'Schmal (15mm)' },
                  { value: 'normal', label: 'Normal (20mm)' },
                  { value: 'wide', label: 'Breit (25mm)' },
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`margin-${value}`} />
                    <Label htmlFor={`margin-${value}`} className="cursor-pointer text-xs">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* SECTION STYLING */}
      <Collapsible open={openSections.sections} onOpenChange={() => toggleSection('sections')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
          <div className="flex items-center gap-2">
            <AlignLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Abschnitt-Stil</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.sections ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-4">
          {/* Separator Style */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Trennlinien</Label>
            <RadioGroup
              value={customization.sectionSeparator}
              onValueChange={(value) => updateField('sectionSeparator', value as SectionSeparator)}
            >
              <div className="space-y-2">
                {[
                  { value: 'line', label: 'Linie' },
                  { value: 'dot', label: 'Gepunktet' },
                  { value: 'none', label: 'Keine' },
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`sep-${value}`} />
                    <Label htmlFor={`sep-${value}`} className="cursor-pointer text-xs">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Header Style */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Überschriften-Stil</Label>
            <RadioGroup
              value={customization.sectionHeaderStyle}
              onValueChange={(value) => updateField('sectionHeaderStyle', value as SectionHeaderStyle)}
            >
              <div className="space-y-2">
                {[
                  { value: 'uppercase', label: 'GROßBUCHSTABEN' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'smallcaps', label: 'Kapitälchen' },
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`header-${value}`} />
                    <Label htmlFor={`header-${value}`} className="cursor-pointer text-xs">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* PHOTO CUSTOMIZATION */}
      <Collapsible open={openSections.photo} onOpenChange={() => toggleSection('photo')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            <span className="text-sm font-semibold">Foto-Anpassung</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.photo ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-4">
          {/* Photo Shape */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Form</Label>
            <RadioGroup
              value={customization.photoShape}
              onValueChange={(value) => updateField('photoShape', value as PhotoShape)}
            >
              <div className="space-y-2">
                {[
                  { value: 'circle', label: 'Kreis' },
                  { value: 'rounded', label: 'Abgerundet' },
                  { value: 'square', label: 'Quadrat' },
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`shape-${value}`} />
                    <Label htmlFor={`shape-${value}`} className="cursor-pointer text-xs">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Photo Size */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Größe</Label>
            <RadioGroup
              value={customization.photoSize}
              onValueChange={(value) => updateField('photoSize', value as PhotoSize)}
            >
              <div className="space-y-2">
                {[
                  { value: 'small', label: 'Klein (80px)' },
                  { value: 'medium', label: 'Mittel (120px)' },
                  { value: 'large', label: 'Groß (160px)' },
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`size-${value}`} />
                    <Label htmlFor={`size-${value}`} className="cursor-pointer text-xs">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
