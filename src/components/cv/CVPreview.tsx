/**
 * CVPreview – Premium Deutsches Lebenslauf-Layout (DIN A4)
 * Nutzt ausschließlich den aktuellen CV-Status (keine Mock-Daten)
 * Mit CSS-Variablen für Premium-Anpassungen
 */
import { memo, CSSProperties } from 'react';
import type { CVData, CVCustomization } from '@/types/cv';
import { accentColors, typographyScales, sectionSpacings } from '@/types/cv';
import { Mail, Phone, MapPin } from 'lucide-react';

interface CVPreviewProps {
  cvData: CVData;
  customization: CVCustomization;
  className?: string;
}

const CVPreview = memo(({ cvData, customization, className = '' }: CVPreviewProps) => {
  const personal = cvData?.personalInfo || { firstName: '', lastName: '', jobTitle: '', email: '', phone: '', city: '' };
  const summary = cvData?.summary || '';
  const experience = cvData?.experience || [];
  const education = cvData?.education || [];
  const skills = cvData?.skills || [];
  const languages = cvData?.languages || [];

  const hasContent = Boolean(
    personal.firstName ||
    personal.lastName ||
    summary ||
    experience.length ||
    education.length ||
    skills.length ||
    languages.length
  );

  // Generate CSS variables from customization
  const styleVars: CSSProperties = {
    '--cv-accent': accentColors[customization.accentColor],
    '--cv-font-base': typographyScales[customization.typographyScale].base,
    '--cv-font-heading': typographyScales[customization.typographyScale].heading,
    '--cv-font-large': typographyScales[customization.typographyScale].large,
    '--cv-section-spacing': sectionSpacings[customization.sectionSpacing],
  } as CSSProperties;

  // Section separator styles
  const getSeparatorClass = () => {
    switch (customization.sectionSeparator) {
      case 'line':
        return 'border-b-2';
      case 'soft':
        return 'border-b';
      case 'none':
        return '';
      default:
        return 'border-b-2';
    }
  };

  const separatorClass = getSeparatorClass();
  const separatorColorClass = customization.sectionSeparator !== 'none' ? 'border-[var(--cv-accent)]' : '';

  if (!hasContent) {
    return (
      <div className={`bg-white ${className}`} style={styleVars}>
        <div className="flex items-center justify-center h-full min-h-[297mm] text-muted-foreground text-sm">
          Füllen Sie die Felder aus, um die Vorschau zu sehen.
        </div>
      </div>
    );
  }

  return (
    <div 
      id="cv-preview" 
      className={`bg-white ${className}`} 
      style={styleVars}
    >
      {/* Seite 1 Wrapper (Multi-Page-Vorbereitung) */}
      <div className="cv-page p-8" data-page="1">
        {/* Kopfbereich */}
        <div className="flex items-start justify-between gap-6 pb-6 mb-[var(--cv-section-spacing)]">
          {/* Personal Info */}
          <div className="flex-1">
            <h1 
              className="font-bold text-gray-900 mb-2"
              style={{ fontSize: 'var(--cv-font-large)' }}
            >
              {(personal.firstName || '')} {(personal.lastName || '')}
            </h1>
            {personal.jobTitle && (
              <p 
                className="text-gray-600 mb-4"
                style={{ 
                  fontSize: 'var(--cv-font-heading)',
                  color: 'var(--cv-accent)'
                }}
              >
                {personal.jobTitle}
              </p>
            )}

            <div className="grid grid-cols-1 gap-2 text-gray-700" style={{ fontSize: 'var(--cv-font-base)' }}>
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a href={`mailto:${personal.email}`} className="hover:underline">
                    {personal.email}
                  </a>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <a href={`tel:${personal.phone}`} className="hover:underline">
                    {personal.phone}
                  </a>
                </div>
              )}
              {personal.city && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{personal.city}</span>
                </div>
              )}
            </div>
          </div>

          {/* Photo (Top Right - German Standard) */}
          {personal.photo && (
            <div className="flex-shrink-0">
              <img
                src={personal.photo}
                alt={`${personal.firstName || ''} ${personal.lastName || ''}`}
                className="w-32 h-40 object-cover rounded-md shadow-sm border-2"
                style={{ borderColor: 'var(--cv-accent)' }}
              />
            </div>
          )}
        </div>

        {/* Kurzprofil */}
        {summary && (
          <section className="mb-[var(--cv-section-spacing)]">
            <h2 
              className={`font-bold text-gray-900 pb-2 mb-3 ${separatorClass} ${separatorColorClass}`}
              style={{ 
                fontSize: 'var(--cv-font-heading)',
                color: 'var(--cv-accent)'
              }}
            >
              Kurzprofil
            </h2>
            <p 
              className="text-gray-700 leading-relaxed whitespace-pre-line"
              style={{ fontSize: 'var(--cv-font-base)' }}
            >
              {summary}
            </p>
          </section>
        )}

        {/* Berufserfahrung */}
        {experience.length > 0 && (
          <section className="mb-[var(--cv-section-spacing)]">
            <h2 
              className={`font-bold text-gray-900 pb-2 mb-3 ${separatorClass} ${separatorColorClass}`}
              style={{ 
                fontSize: 'var(--cv-font-heading)',
                color: 'var(--cv-accent)'
              }}
            >
              Berufserfahrung
            </h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: 'var(--cv-accent)' }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 
                      className="font-semibold text-gray-900"
                      style={{ fontSize: 'var(--cv-font-base)' }}
                    >
                      {exp.position}
                    </h3>
                    <span 
                      className="text-gray-600 whitespace-nowrap ml-4 text-sm"
                    >
                      {exp.startDate} - {exp.endDate || 'heute'}
                    </span>
                  </div>
                  <p 
                    className="font-medium text-gray-700 mb-1"
                    style={{ fontSize: 'var(--cv-font-base)' }}
                  >
                    {exp.company}
                  </p>
                  {exp.description && (
                    <p 
                      className="text-gray-700 leading-relaxed whitespace-pre-line text-sm"
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ausbildung */}
        {education.length > 0 && (
          <section className="mb-[var(--cv-section-spacing)]">
            <h2 
              className={`font-bold text-gray-900 pb-2 mb-3 ${separatorClass} ${separatorColorClass}`}
              style={{ 
                fontSize: 'var(--cv-font-heading)',
                color: 'var(--cv-accent)'
              }}
            >
              Ausbildung
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: 'var(--cv-accent)' }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 
                      className="font-semibold text-gray-900"
                      style={{ fontSize: 'var(--cv-font-base)' }}
                    >
                      {edu.degree}
                    </h3>
                    <span 
                      className="text-gray-600 whitespace-nowrap ml-4 text-sm"
                    >
                      {edu.startDate} - {edu.endDate || 'heute'}
                    </span>
                  </div>
                  <p 
                    className="font-medium text-gray-700 mb-1"
                    style={{ fontSize: 'var(--cv-font-base)' }}
                  >
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Kenntnisse */}
        {skills.length > 0 && (
          <section className="mb-[var(--cv-section-spacing)]">
            <h2 
              className={`font-bold text-gray-900 pb-2 mb-3 ${separatorClass} ${separatorColorClass}`}
              style={{ 
                fontSize: 'var(--cv-font-heading)',
                color: 'var(--cv-accent)'
              }}
            >
              Kenntnisse
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-gray-800 text-sm rounded-full border"
                  style={{ 
                    backgroundColor: `${accentColors[customization.accentColor]}10`,
                    borderColor: 'var(--cv-accent)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Sprachen */}
        {languages.length > 0 && (
          <section className="mb-[var(--cv-section-spacing)]">
            <h2 
              className={`font-bold text-gray-900 pb-2 mb-3 ${separatorClass} ${separatorColorClass}`}
              style={{ 
                fontSize: 'var(--cv-font-heading)',
                color: 'var(--cv-accent)'
              }}
            >
              Sprachen
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span 
                    className="font-medium text-gray-900"
                    style={{ fontSize: 'var(--cv-font-base)' }}
                  >
                    {lang.language}
                  </span>
                  <span className="text-sm text-gray-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

CVPreview.displayName = 'CVPreview';
export default CVPreview;
