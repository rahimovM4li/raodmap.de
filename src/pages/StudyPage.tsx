import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink, GraduationCap, Globe, FileText, CreditCard, Shield, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepCard } from '@/components/StepCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { StudyPageSEO } from '@/components/SEOHead';

const StudyPage = () => {
  const { language, t } = useLanguage();

  const langPrefix = language === 'tj' ? '/tj' : `/${language}`;

  const steps = [
    {
      icon: Globe,
      ...t.study.steps.language,
    },
    {
      icon: GraduationCap,
      ...t.study.steps.findProgram,
    },
    {
      icon: FileText,
      ...t.study.steps.documents,
    },
    {
      icon: CreditCard,
      title: language === 'de' ? 'Sperrkonto eröffnen' : language === 'ru' ? 'Открытие банковского счёта' : 'Кушодани ҳисоби банкӣ',
      description: language === 'de' 
        ? 'Sperrkonto mit ~11.904€' 
        : language === 'ru' 
        ? 'Блокированный счёт (Sperrkonto) с ~11,904€'
        : 'Ҳисоби блокшуда (Sperrkonto) бо ~11,904€',
    },
    {
      icon: Shield,
      ...t.study.steps.visa,
    },
    {
      icon: Plane,
      ...t.study.steps.arrival,
    },
  ];

  const requirements = language === 'de' ? [
    'Gültiger Reisepass (mindestens 12 Monate)',
    'Schulabschlusszeugnis (mit Übersetzung)',
    'Hochschulabschluss (falls vorhanden) mit beglaubigter Übersetzung',
    'Deutschzertifikat (TestDaF, DSH) oder Englisch (IELTS, TOEFL)',
    'Motivationsschreiben',
    'Lebenslauf auf Deutsch',
    'Finanzierungsnachweis — Sperrkonto mit €11.904',
    'Krankenversicherung (für Visum)',
    'Biometrische Fotos (35x45mm)',
    'Zulassungsbescheid der Universität',
  ] : language === 'ru' ? [
    'Действующий паспорт (минимум 12 месяцев)',
    'Аттестат об окончании школы (перевод на немецкий)',
    'Диплом (если есть) с заверенным переводом',
    'Сертификат немецкого (TestDaF, DSH) или английского (IELTS, TOEFL)',
    'Мотивационное письмо (Motivationsschreiben)',
    'CV / Резюме на немецком',
    'Подтверждение средств — Sperrkonto с €11,904',
    'Медицинская страховка (для визы)',
    'Биометрические фото (35x45mm)',
    'Копия письма о зачислении',
  ] : [
    'Шиносномаи эътибор (ҳадди ақал 12 моҳ)',
    'Шаҳодатномаи хатми мактаб (бо тарҷума)',
    'Дипломи олӣ (агар дошта бошед) бо тарҷумаи тасдиқшуда',
    'Сертификати забони олмонӣ (TestDaF, DSH) ё англисӣ (IELTS, TOEFL)',
    'Мактуби мотивационӣ (Motivationsschreiben)',
    'CV / Резюме ба забони олмонӣ',
    'Тасдиқи маблағҳо — Sperrkonto бо €11,904',
    'Суғуртаи тиббӣ (барои виза)',
    'Аксҳои биометрӣ (35x45mm)',
    'Нусхаи мактуби қабулшавӣ',
  ];


  return (
    <>
      <StudyPageSEO />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-study/20 backdrop-blur-sm mb-6">
                <GraduationCap className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground/80">
                  {language === 'de' ? '6-24 Monate Vorbereitung' : language === 'ru' ? '6-24 месяца подготовки' : '6-24 моҳ тайёргарӣ'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.study.title}
              </h1>
              <p className="text-xl text-primary-foreground/70 mb-8">
                {t.study.intro}
              </p>
              <Button asChild className="btn-hero">
                <a href="#steps">
                  {t.common.startNow}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section id="steps" className="py-16 md:py-24">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Roadmap */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {language === 'de' ? 'Wichtige Schritte' : language === 'ru' ? 'Основные шаги' : 'Қадамҳои муҳим'}
                </h2>
                <div className="space-y-0">
                  {steps.map((step, i) => (
                    <StepCard
                      key={i}
                      number={i + 1}
                      title={step.title}
                      description={step.description}
                      isActive={i === 0}
                      isLast={i === steps.length - 1}
                    />
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {t.study.requirements.title}
                </h2>
                <div className="card-elevated p-6 md:p-8">
                  <ul className="space-y-4">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links */}
                <div className="mt-8 card-elevated p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    {language === 'de' ? 'Wichtige Links' : language === 'ru' ? 'Важные ссылки' : 'Истиноҳои муҳим'}
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="https://www.daad.de/en/study-and-research-in-germany/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-info hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      DAAD — {language === 'de' ? 'Programmsuche' : language === 'ru' ? 'Поиск программы' : 'Ҷустуҷӯи барнома'}
                    </a>
                    <a
                      href="https://www.uni-assist.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-info hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      uni-assist — {language === 'de' ? 'Bewerbung' : language === 'ru' ? 'Подача заявки' : 'Пешниҳоди ариза'}
                    </a>
                    <a
                      href="https://www.coracle.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-info hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Sperrkonto — {language === 'de' ? 'Sperrkonto eröffnen' : language === 'ru' ? 'Блокированный счёт' : 'Ҳисоби блокшуда'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarships */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t.financing.scholarships.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {t.financing.scholarships.items.map((scholarship, i) => (
                <div key={i} className="card-elevated p-6 text-center">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {scholarship.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {scholarship.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container-main text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {language === 'de' ? 'Bereit anzufangen?' : language === 'ru' ? 'Готовы начать?' : 'Омодаед оғоз кунед?'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {language === 'de'
                ? 'Erstellen Sie einen individuellen Plan mit unserem Wizard und laden Sie das PDF herunter.'
                : language === 'ru'
                ? 'Создайте индивидуальный план с помощью нашего wizard и скачайте PDF.'
                : 'Нақшаи инфиродӣ бо ёрии wizard бисозед ва PDF-ро боргирӣ кунед.'}
            </p>
            <Button asChild className="btn-hero">
              <Link to={`${langPrefix}/#wizard`}>
                {language === 'de' ? 'Plan erstellen' : language === 'ru' ? 'Создать план' : 'Нақша эҷод кардан'}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default StudyPage;
