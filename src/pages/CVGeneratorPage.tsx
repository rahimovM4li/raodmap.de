import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, Download, Plus, Trash2, User, Briefcase, GraduationCap, Languages, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  photo?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface LanguageSkill {
  id: string;
  language: string;
  level: string;
}

interface CVData {
  personal: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  languages: LanguageSkill[];
}

const initialData: CVData = {
  personal: { firstName: '', lastName: '', jobTitle: '', email: '', phone: '', city: '', country: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
};

const CVGeneratorPage = () => {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [template, setTemplate] = useState<'classic' | 'modern' | 'creative'>('classic');

  const t = {
    tj: {
      title: 'Эҷодкунандаи Lebenslauf',
      subtitle: '100% бепул, маҳфияти пурра, бе backend',
      step1: 'Маълумоти шахсӣ',
      step2: 'Таҷриба',
      step3: 'Таҳсилот',
      step4: 'Малакаҳо',
      step5: 'Пешнамоиш',
      firstName: 'Ном',
      lastName: 'Насаб',
      jobTitle: 'Вазифа',
      email: 'Email',
      phone: 'Телефон',
      city: 'Шаҳр',
      country: 'Кишвар',
      summary: 'Тавсифи касбӣ',
      company: 'Ширкат',
      position: 'Вазифа',
      startDate: 'Оғоз',
      endDate: 'Анҷом',
      description: 'Тавсиф',
      institution: 'Муассиса',
      degree: 'Дараҷа',
      field: 'Соҳа',
      skills: 'Малакаҳо',
      languages: 'Забонҳо',
      level: 'Сатҳ',
      add: 'Илова кардан',
      remove: 'Нест кардан',
      next: 'Навбатӣ',
      back: 'Бозгашт',
      download: 'PDF боргирӣ',
      preview: 'Пешнамоиш',
      classic: 'Классикӣ',
      modern: 'Муосир',
      creative: 'Эҷодӣ',
      selectTemplate: 'Шаблонро интихоб кунед',
    },
    ru: {
      title: 'Генератор Lebenslauf',
      subtitle: '100% бесплатно, полная конфиденциальность, без backend',
      step1: 'Личные данные',
      step2: 'Опыт',
      step3: 'Образование',
      step4: 'Навыки',
      step5: 'Просмотр',
      firstName: 'Имя',
      lastName: 'Фамилия',
      jobTitle: 'Должность',
      email: 'Email',
      phone: 'Телефон',
      city: 'Город',
      country: 'Страна',
      summary: 'Профессиональное описание',
      company: 'Компания',
      position: 'Должность',
      startDate: 'Начало',
      endDate: 'Конец',
      description: 'Описание',
      institution: 'Учреждение',
      degree: 'Степень',
      field: 'Направление',
      skills: 'Навыки',
      languages: 'Языки',
      level: 'Уровень',
      add: 'Добавить',
      remove: 'Удалить',
      next: 'Далее',
      back: 'Назад',
      download: 'Скачать PDF',
      preview: 'Просмотр',
      classic: 'Классический',
      modern: 'Современный',
      creative: 'Креативный',
      selectTemplate: 'Выберите шаблон',
    },
    de: {
      title: 'Lebenslauf Generator',
      subtitle: '100% kostenlos, volle Privatsphäre, kein Backend',
      step1: 'Persönliche Daten',
      step2: 'Erfahrung',
      step3: 'Ausbildung',
      step4: 'Fähigkeiten',
      step5: 'Vorschau',
      firstName: 'Vorname',
      lastName: 'Nachname',
      jobTitle: 'Berufsbezeichnung',
      email: 'E-Mail',
      phone: 'Telefon',
      city: 'Stadt',
      country: 'Land',
      summary: 'Berufliche Zusammenfassung',
      company: 'Unternehmen',
      position: 'Position',
      startDate: 'Beginn',
      endDate: 'Ende',
      description: 'Beschreibung',
      institution: 'Institution',
      degree: 'Abschluss',
      field: 'Fachrichtung',
      skills: 'Fähigkeiten',
      languages: 'Sprachen',
      level: 'Niveau',
      add: 'Hinzufügen',
      remove: 'Entfernen',
      next: 'Weiter',
      back: 'Zurück',
      download: 'PDF herunterladen',
      preview: 'Vorschau',
      classic: 'Klassisch',
      modern: 'Modern',
      creative: 'Kreativ',
      selectTemplate: 'Vorlage wählen',
    },
  }[language];

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), institution: '', degree: '', field: '', startDate: '', endDate: '' }]
    }));
  };

  const addLanguage = () => {
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: Date.now().toString(), language: '', level: '' }]
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const { personal, summary, experience, education, skills, languages } = cvData;
    let y = 20;

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(`${personal.firstName} ${personal.lastName}`, 20, y);
    y += 10;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(personal.jobTitle, 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.text(`${personal.email} | ${personal.phone} | ${personal.city}, ${personal.country}`, 20, y);
    doc.setTextColor(0, 0, 0);
    y += 15;

    // Summary
    if (summary) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFIL', 20, y);
      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(summary, 170);
      doc.text(lines, 20, y);
      y += lines.length * 5 + 10;
    }

    // Experience
    if (experience.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('BERUFSERFAHRUNG', 20, y);
      y += 7;
      experience.forEach(exp => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(exp.position, 20, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, 20, y);
        y += 5;
        if (exp.description) {
          const descLines = doc.splitTextToSize(exp.description, 170);
          doc.text(descLines, 20, y);
          y += descLines.length * 4 + 5;
        }
        y += 3;
      });
      y += 5;
    }

    // Education
    if (education.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('AUSBILDUNG', 20, y);
      y += 7;
      education.forEach(edu => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(`${edu.degree} - ${edu.field}`, 20, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`${edu.institution} | ${edu.startDate} - ${edu.endDate}`, 20, y);
        y += 8;
      });
      y += 5;
    }

    // Skills
    if (skills.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('FÄHIGKEITEN', 20, y);
      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(skills.join(' • '), 20, y);
      y += 10;
    }

    // Languages
    if (languages.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('SPRACHEN', 20, y);
      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      languages.forEach(lang => {
        doc.text(`${lang.language}: ${lang.level}`, 20, y);
        y += 5;
      });
    }

    doc.save(`Lebenslauf_${personal.lastName}_${personal.firstName}.pdf`);
  };

  const steps = [
    { num: 1, icon: User, label: t.step1 },
    { num: 2, icon: Briefcase, label: t.step2 },
    { num: 3, icon: GraduationCap, label: t.step3 },
    { num: 4, icon: Languages, label: t.step4 },
    { num: 5, icon: Award, label: t.step5 },
  ];

  return (
    <>
      <Helmet>
        <title>{t.title} | Germany Roadmap</title>
      </Helmet>

      <div className="min-h-screen bg-background py-8">
        <div className="container-main">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Progress */}
          <div className="flex justify-center mb-8 overflow-x-auto pb-4">
            <div className="flex items-center gap-2 md:gap-4">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center gap-2 md:gap-4">
                  <button
                    onClick={() => setStep(s.num)}
                    className={cn(
                      'flex flex-col items-center gap-1 p-2 rounded-lg transition-all',
                      step === s.num ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                      step >= s.num ? 'bg-accent text-accent-foreground' : 'bg-secondary'
                    )}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs hidden md:block">{s.label}</span>
                  </button>
                  {i < steps.length - 1 && <div className={cn('w-8 h-0.5', step > s.num ? 'bg-accent' : 'bg-secondary')} />}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>{t.firstName}</Label><Input value={cvData.personal.firstName} onChange={e => setCvData(prev => ({ ...prev, personal: { ...prev.personal, firstName: e.target.value } }))} /></div>
                    <div><Label>{t.lastName}</Label><Input value={cvData.personal.lastName} onChange={e => setCvData(prev => ({ ...prev, personal: { ...prev.personal, lastName: e.target.value } }))} /></div>
                    <div><Label>{t.jobTitle}</Label><Input value={cvData.personal.jobTitle} onChange={e => setCvData(prev => ({ ...prev, personal: { ...prev.personal, jobTitle: e.target.value } }))} /></div>
                    <div><Label>{t.email}</Label><Input type="email" value={cvData.personal.email} onChange={e => setCvData(prev => ({ ...prev, personal: { ...prev.personal, email: e.target.value } }))} /></div>
                    <div><Label>{t.phone}</Label><Input value={cvData.personal.phone} onChange={e => setCvData(prev => ({ ...prev, personal: { ...prev.personal, phone: e.target.value } }))} /></div>
                    <div><Label>{t.city}</Label><Input value={cvData.personal.city} onChange={e => setCvData(prev => ({ ...prev, personal: { ...prev.personal, city: e.target.value } }))} /></div>
                    <div className="md:col-span-2"><Label>{t.country}</Label><Input value={cvData.personal.country} onChange={e => setCvData(prev => ({ ...prev, personal: { ...prev.personal, country: e.target.value } }))} /></div>
                  </div>
                  <div><Label>{t.summary}</Label><Textarea rows={4} value={cvData.summary} onChange={e => setCvData(prev => ({ ...prev, summary: e.target.value }))} /></div>
                </div>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <div className="space-y-4">
                  {cvData.experience.map((exp, i) => (
                    <Card key={exp.id} className="p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">#{i + 1}</span>
                        <Button variant="ghost" size="sm" onClick={() => setCvData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== exp.id) }))}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div><Label>{t.company}</Label><Input value={exp.company} onChange={e => setCvData(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, company: e.target.value } : ex) }))} /></div>
                        <div><Label>{t.position}</Label><Input value={exp.position} onChange={e => setCvData(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, position: e.target.value } : ex) }))} /></div>
                        <div><Label>{t.startDate}</Label><Input value={exp.startDate} onChange={e => setCvData(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, startDate: e.target.value } : ex) }))} /></div>
                        <div><Label>{t.endDate}</Label><Input value={exp.endDate} onChange={e => setCvData(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, endDate: e.target.value } : ex) }))} /></div>
                        <div className="md:col-span-2"><Label>{t.description}</Label><Textarea value={exp.description} onChange={e => setCvData(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, description: e.target.value } : ex) }))} /></div>
                      </div>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={addExperience}><Plus className="w-4 h-4 mr-2" />{t.add}</Button>
                </div>
              )}

              {/* Step 3: Education */}
              {step === 3 && (
                <div className="space-y-4">
                  {cvData.education.map((edu, i) => (
                    <Card key={edu.id} className="p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">#{i + 1}</span>
                        <Button variant="ghost" size="sm" onClick={() => setCvData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== edu.id) }))}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div><Label>{t.institution}</Label><Input value={edu.institution} onChange={e => setCvData(prev => ({ ...prev, education: prev.education.map(ed => ed.id === edu.id ? { ...ed, institution: e.target.value } : ed) }))} /></div>
                        <div><Label>{t.degree}</Label><Input value={edu.degree} onChange={e => setCvData(prev => ({ ...prev, education: prev.education.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed) }))} /></div>
                        <div><Label>{t.field}</Label><Input value={edu.field} onChange={e => setCvData(prev => ({ ...prev, education: prev.education.map(ed => ed.id === edu.id ? { ...ed, field: e.target.value } : ed) }))} /></div>
                        <div><Label>{t.startDate}</Label><Input value={edu.startDate} onChange={e => setCvData(prev => ({ ...prev, education: prev.education.map(ed => ed.id === edu.id ? { ...ed, startDate: e.target.value } : ed) }))} /></div>
                        <div><Label>{t.endDate}</Label><Input value={edu.endDate} onChange={e => setCvData(prev => ({ ...prev, education: prev.education.map(ed => ed.id === edu.id ? { ...ed, endDate: e.target.value } : ed) }))} /></div>
                      </div>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={addEducation}><Plus className="w-4 h-4 mr-2" />{t.add}</Button>
                </div>
              )}

              {/* Step 4: Skills & Languages */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label>{t.skills}</Label>
                    <Textarea placeholder="JavaScript, React, TypeScript..." value={cvData.skills.join(', ')} onChange={e => setCvData(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
                  </div>
                  <div>
                    <Label className="mb-2 block">{t.languages}</Label>
                    {cvData.languages.map((lang, i) => (
                      <div key={lang.id} className="flex gap-2 mb-2">
                        <Input placeholder="Deutsch" value={lang.language} onChange={e => setCvData(prev => ({ ...prev, languages: prev.languages.map(l => l.id === lang.id ? { ...l, language: e.target.value } : l) }))} />
                        <Input placeholder="B2" value={lang.level} onChange={e => setCvData(prev => ({ ...prev, languages: prev.languages.map(l => l.id === lang.id ? { ...l, level: e.target.value } : l) }))} />
                        <Button variant="ghost" size="icon" onClick={() => setCvData(prev => ({ ...prev, languages: prev.languages.filter(l => l.id !== lang.id) }))}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addLanguage}><Plus className="w-4 h-4 mr-2" />{t.add}</Button>
                  </div>
                </div>
              )}

              {/* Step 5: Preview & Download */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="p-6 border rounded-lg bg-white text-black">
                    <h2 className="text-2xl font-bold">{cvData.personal.firstName} {cvData.personal.lastName}</h2>
                    <p className="text-gray-600">{cvData.personal.jobTitle}</p>
                    <p className="text-sm text-gray-500">{cvData.personal.email} | {cvData.personal.phone} | {cvData.personal.city}, {cvData.personal.country}</p>
                    {cvData.summary && <><h3 className="font-bold mt-4">Profil</h3><p className="text-sm">{cvData.summary}</p></>}
                    {cvData.experience.length > 0 && <><h3 className="font-bold mt-4">Berufserfahrung</h3>{cvData.experience.map(exp => <div key={exp.id} className="mt-2"><p className="font-medium">{exp.position} @ {exp.company}</p><p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p><p className="text-sm">{exp.description}</p></div>)}</>}
                    {cvData.education.length > 0 && <><h3 className="font-bold mt-4">Ausbildung</h3>{cvData.education.map(edu => <div key={edu.id} className="mt-2"><p className="font-medium">{edu.degree} - {edu.field}</p><p className="text-xs text-gray-500">{edu.institution} | {edu.startDate} - {edu.endDate}</p></div>)}</>}
                    {cvData.skills.length > 0 && <><h3 className="font-bold mt-4">Fähigkeiten</h3><p className="text-sm">{cvData.skills.join(' • ')}</p></>}
                    {cvData.languages.length > 0 && <><h3 className="font-bold mt-4">Sprachen</h3>{cvData.languages.map(l => <p key={l.id} className="text-sm">{l.language}: {l.level}</p>)}</>}
                  </div>
                  <Button onClick={generatePDF} className="w-full btn-hero"><Download className="w-5 h-5 mr-2" />{t.download}</Button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}><ArrowLeft className="w-4 h-4 mr-2" />{t.back}</Button>
                {step < 5 && <Button onClick={() => setStep(s => s + 1)}>{t.next}<ArrowRight className="w-4 h-4 ml-2" /></Button>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CVGeneratorPage;
