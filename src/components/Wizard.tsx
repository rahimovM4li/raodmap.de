import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Download, GraduationCap, Briefcase, Wrench, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { generatePersonalizedPDF } from '@/lib/pdfGenerator';

type PathType = 'study' | 'work' | 'ausbildung' | null;

interface RoadmapData {
  title: string;
  duration: string;
  steps: { title: string; description: string }[];
  documents: string[];
}

const roadmaps: Record<Exclude<PathType, null>, { tj: RoadmapData; ru: RoadmapData; de: RoadmapData }> = {
  study: {
    tj: {
      title: 'Таҳсил дар Олмон',
      duration: '12-24',
      steps: [
        { title: 'Омӯзиши забон', description: 'Омӯзиши забони олмонӣ то сатҳи B1-B2' },
        { title: 'Ҷустуҷӯи барнома', description: 'Интихоби донишгоҳ ва барнома дар DAAD' },
        { title: 'Омодасозии ҳуҷҷатҳо', description: 'Тарҷума ва тасдиқи ҳуҷҷатҳо' },
        { title: 'Ариза додан', description: 'Фиристодани ариза тавассути uni-assist' },
        { title: 'Кушодани ҳисоб', description: 'Кушодани ҳисоби бастаи бонкӣ' },
        { title: 'Гирифтани виза', description: 'Муроҷиат ба Сафоратхона' },
      ],
      documents: [
        'Паспорти амалкунанда',
        'Шаҳодатномаи хатми мактаб',
        'Диплом (агар бошад)',
        'Сертификати забон (B1/B2)',
        'Мотиватсияи хаттӣ',
        'CV (резюме)',
        'Тасдиқи маблағ (~11,208€)',
        'Суғуртаи тандурустӣ',
        'Расмҳои биометрӣ',
      ],
    },
    ru: {
      title: 'Учёба в Германии',
      duration: '12-24',
      steps: [
        { title: 'Изучение языка', description: 'Изучение немецкого до уровня B1-B2' },
        { title: 'Поиск программы', description: 'Выбор университета и программы на DAAD' },
        { title: 'Подготовка документов', description: 'Перевод и заверение документов' },
        { title: 'Подача заявки', description: 'Отправка заявки через uni-assist' },
        { title: 'Открытие счёта', description: 'Открытие блокированного счёта' },
        { title: 'Получение визы', description: 'Обращение в Посольство' },
      ],
      documents: [
        'Действующий паспорт',
        'Аттестат об окончании школы',
        'Диплом (если есть)',
        'Языковой сертификат (B1/B2)',
        'Мотивационное письмо',
        'CV (резюме)',
        'Подтверждение средств (~11,208€)',
        'Медицинская страховка',
        'Биометрические фото',
      ],
    },
    de: {
      title: 'Studium in Deutschland',
      duration: '12-24',
      steps: [
        { title: 'Sprachkurs', description: 'Deutsch lernen bis B1-B2 Niveau' },
        { title: 'Programmsuche', description: 'Universität und Programm auf DAAD finden' },
        { title: 'Dokumentenvorbereitung', description: 'Übersetzung und Beglaubigung' },
        { title: 'Bewerbung', description: 'Bewerbung über uni-assist einreichen' },
        { title: 'Sperrkonto', description: 'Sperrkonto eröffnen' },
        { title: 'Visum', description: 'Antrag bei der Botschaft stellen' },
      ],
      documents: [
        'Gültiger Reisepass',
        'Schulabschlusszeugnis',
        'Hochschulabschluss (falls vorhanden)',
        'Sprachzertifikat (B1/B2)',
        'Motivationsschreiben',
        'Lebenslauf',
        'Finanzierungsnachweis (~11.208€)',
        'Krankenversicherung',
        'Biometrische Fotos',
      ],
    },
  },
  work: {
    tj: {
      title: 'Кор дар Олмон',
      duration: '6-12',
      steps: [
        { title: 'Эътирофи ҳуҷҷатҳо', description: 'Тасдиқи диплом дар Германия' },
        { title: 'Омӯзиши забон', description: 'Забони олмонӣ ё англисӣ' },
        { title: 'Ҷустуҷӯи кор', description: 'Дар LinkedIn, StepStone, Indeed' },
        { title: 'Омодасозии CV', description: 'CV ва cover letter ба олмонӣ' },
        { title: 'Гирифтани шартнома', description: 'Имзо кардани шартнома' },
        { title: 'Гирифтани виза', description: 'Blue Card ё визаи корӣ' },
      ],
      documents: [
        'Паспорти амалкунанда',
        'Дипломи донишгоҳ',
        'Тасдиқи эътирофи диплом',
        'Шартномаи кор',
        'CV ба забони олмонӣ',
        'Тасдиқи маоши минималӣ',
        'Суғуртаи тандурустӣ',
        'Расмҳои биометрӣ',
      ],
    },
    ru: {
      title: 'Работа в Германии',
      duration: '6-12',
      steps: [
        { title: 'Признание документов', description: 'Подтверждение диплома в Германии' },
        { title: 'Изучение языка', description: 'Немецкий или английский' },
        { title: 'Поиск работы', description: 'На LinkedIn, StepStone, Indeed' },
        { title: 'Подготовка CV', description: 'CV и cover letter на немецком' },
        { title: 'Получение контракта', description: 'Подписание контракта' },
        { title: 'Получение визы', description: 'Blue Card или рабочая виза' },
      ],
      documents: [
        'Действующий паспорт',
        'Диплом университета',
        'Подтверждение признания диплома',
        'Трудовой контракт',
        'CV на немецком',
        'Подтверждение минимальной зарплаты',
        'Медицинская страховка',
        'Биометрические фото',
      ],
    },
    de: {
      title: 'Arbeit in Deutschland',
      duration: '6-12',
      steps: [
        { title: 'Anerkennung', description: 'Anerkennung des Abschlusses in Deutschland' },
        { title: 'Sprachkurs', description: 'Deutsch oder Englisch lernen' },
        { title: 'Jobsuche', description: 'Auf LinkedIn, StepStone, Indeed' },
        { title: 'CV-Erstellung', description: 'Lebenslauf und Anschreiben auf Deutsch' },
        { title: 'Arbeitsvertrag', description: 'Vertrag unterschreiben' },
        { title: 'Visum', description: 'Blue Card oder Arbeitsvisum' },
      ],
      documents: [
        'Gültiger Reisepass',
        'Hochschulabschluss',
        'Anerkennungsnachweis',
        'Arbeitsvertrag',
        'Lebenslauf auf Deutsch',
        'Mindestgehaltsnachweis',
        'Krankenversicherung',
        'Biometrische Fotos',
      ],
    },
  },
  ausbildung: {
    tj: {
      title: 'Ausbildung — Омӯзиши касбӣ',
      duration: '6-18',
      steps: [
        { title: 'Интихоби касб', description: 'Касби дилхоҳро интихоб кунед' },
        { title: 'Омӯзиши забон', description: 'Забони олмонӣ то B1-B2' },
        { title: 'Ҷустуҷӯи ҷой', description: 'Дар ausbildung.de ҷустуҷӯ кунед' },
        { title: 'Ариза додан', description: 'Фиристодани ариза ба ширкатҳо' },
        { title: 'Гирифтани шартнома', description: 'Шартномаи омӯзиш' },
        { title: 'Гирифтани виза', description: 'Визаи Ausbildung' },
      ],
      documents: [
        'Паспорти амалкунанда',
        'Шаҳодатномаи мактаб',
        'Сертификати забон B1',
        'CV ба забони олмонӣ',
        'Мотиватсияи хаттӣ',
        'Шартномаи омӯзиш',
        'Тасдиқи манзил',
        'Суғуртаи тандурустӣ',
      ],
    },
    ru: {
      title: 'Ausbildung — Профобучение',
      duration: '6-18',
      steps: [
        { title: 'Выбор профессии', description: 'Выберите желаемую профессию' },
        { title: 'Изучение языка', description: 'Немецкий до B1-B2' },
        { title: 'Поиск места', description: 'Ищите на ausbildung.de' },
        { title: 'Подача заявки', description: 'Отправка заявок в компании' },
        { title: 'Получение контракта', description: 'Контракт на обучение' },
        { title: 'Получение визы', description: 'Виза Ausbildung' },
      ],
      documents: [
        'Действующий паспорт',
        'Школьный аттестат',
        'Языковой сертификат B1',
        'CV на немецком',
        'Мотивационное письмо',
        'Контракт на обучение',
        'Подтверждение жилья',
        'Медицинская страховка',
      ],
    },
    de: {
      title: 'Ausbildung — Berufsausbildung',
      duration: '6-18',
      steps: [
        { title: 'Berufswahl', description: 'Wählen Sie Ihren Wunschberuf' },
        { title: 'Sprachkurs', description: 'Deutsch bis B1-B2' },
        { title: 'Stellensuche', description: 'Auf ausbildung.de suchen' },
        { title: 'Bewerbung', description: 'Bewerbungen an Unternehmen senden' },
        { title: 'Ausbildungsvertrag', description: 'Ausbildungsvertrag erhalten' },
        { title: 'Visum', description: 'Ausbildungsvisum beantragen' },
      ],
      documents: [
        'Gültiger Reisepass',
        'Schulabschlusszeugnis',
        'Sprachzertifikat B1',
        'Lebenslauf auf Deutsch',
        'Motivationsschreiben',
        'Ausbildungsvertrag',
        'Wohnungsnachweis',
        'Krankenversicherung',
      ],
    },
  },
};

export function Wizard() {
  const [step, setStep] = useState(1);
  const [selectedPath, setSelectedPath] = useState<PathType>(null);
  const [checkedDocs, setCheckedDocs] = useState<Set<number>>(new Set());
  const { language, t } = useLanguage();

  const toggleDoc = (index: number) => {
    setCheckedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const paths = [
    { id: 'study' as const, icon: GraduationCap, ...t.paths.study },
    { id: 'work' as const, icon: Briefcase, ...t.paths.work },
    { id: 'ausbildung' as const, icon: Wrench, ...t.paths.ausbildung },
  ];

  const currentRoadmap = selectedPath ? roadmaps[selectedPath][language] : null;

  const handleDownloadPDF = async () => {
    if (!selectedPath || !currentRoadmap) return;
    try {
      await generatePersonalizedPDF(
        selectedPath,
        language,
        currentRoadmap.steps,
        currentRoadmap.documents,
        currentRoadmap.duration
      );
    } catch (error) {
      console.error('PDF-Generierung fehlgeschlagen:', error);
    }
  };

  return (
    <section className="py-10 md:py-24 bg-secondary/30">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            {t.wizard.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.wizard.subtitle}
          </p>
        </div>

        {/* Progress */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div
                  className={cn(
                    'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-all',
                    step >= s
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {step > s ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : s}
                </div>
                {s < 2 && (
                  <div
                    className={cn(
                      'w-12 md:w-24 h-1 rounded-full transition-all',
                      step > s ? 'bg-accent' : 'bg-secondary'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-center mb-6 md:mb-8 text-foreground">
                {t.wizard.selectPath}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
                {paths.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPath(path.id)}
                    className={cn(
                      'card-elevated flex flex-row items-center gap-4 p-4 md:p-6 md:flex-col md:items-start md:text-left text-left transition-all active:scale-[0.98]',
                      selectedPath === path.id
                        ? 'ring-2 ring-accent border-accent'
                        : 'hover:shadow-lg'
                    )}
                  >
                    <path.icon
                      className={cn(
                        'w-8 h-8 md:w-10 md:h-10 shrink-0 md:mb-4',
                        selectedPath === path.id ? 'text-accent' : 'text-muted-foreground'
                      )}
                    />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 md:mb-2">{path.title}</h4>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedPath}
                  className="btn-hero w-full sm:w-auto"
                >
                  {t.wizard.next}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && currentRoadmap && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t.wizard.yourPlan}: {currentRoadmap.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.wizard.estimatedTime}: <strong>{currentRoadmap.duration} {t.wizard.months}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                {/* Steps */}
                <div className="card-elevated p-4 md:p-6 lg:p-8">
                  <h4 className="font-semibold text-lg mb-6 text-foreground flex items-center gap-2">
                    <span className="step-indicator text-sm">{currentRoadmap.steps.length}</span>
                    {t.wizard.steps}
                  </h4>
                  <div className="space-y-3 md:space-y-4">
                    {currentRoadmap.steps.map((s, i) => (
                      <div key={i} className="flex gap-3 md:gap-4">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary flex items-center justify-center text-xs md:text-sm font-medium text-muted-foreground shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">{s.title}</h5>
                          <p className="text-sm text-muted-foreground">{s.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div className="card-elevated p-4 md:p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold text-lg text-foreground">
                      {t.wizard.documents}
                    </h4>
                    <span className="text-sm font-medium text-muted-foreground">
                      {checkedDocs.size}/{currentRoadmap.documents.length}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {currentRoadmap.documents.map((doc, i) => (
                      <li
                        key={i}
                        onClick={() => toggleDoc(i)}
                        className="flex items-start gap-3 cursor-pointer select-none active:scale-[0.98] transition-transform"
                      >
                        <div
                          className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                            checkedDocs.has(i)
                              ? 'bg-accent border-accent'
                              : 'border-muted-foreground/40'
                          )}
                        >
                          <AnimatePresence>
                            {checkedDocs.has(i) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Check className="w-3 h-3 text-accent-foreground" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <span className={cn(
                          'text-foreground transition-opacity',
                          checkedDocs.has(i) && 'line-through opacity-60'
                        )}>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => { setStep(1); setCheckedDocs(new Set()); }}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.wizard.back}
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  className="btn-hero w-full sm:w-auto"
                >
                  <Download className="w-5 h-5" />
                  {t.wizard.download}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
