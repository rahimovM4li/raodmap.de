import { WorkPageSEO } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink, Briefcase, CreditCard, FileCheck, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FAQSection } from '@/components/FAQSection';
import { useLanguage } from '@/contexts/LanguageContext';

const WorkPage = () => {
  const { language, t } = useLanguage();

  const langPrefix = language === 'tj' ? '/tj' : `/${language}`;

  const jobSeekerRequirements = language === 'de' ? [
    'Hochschulabschluss (Bachelor oder Master)',
    'Berufserfahrung im eigenen Bereich',
    'Ausreichende Mittel für 6 Monate (~5.000€)',
    'Krankenversicherung',
    'Deutsch oder Englisch (B1+)',
    'Lebenslauf auf Deutsch',
  ] : language === 'ru' ? [
    'Диплом университета (Bachelor или Master)',
    'Опыт работы в своей сфере',
    'Достаточные средства на 6 месяцев (~5,000€)',
    'Медицинская страховка',
    'Немецкий или английский (B1+)',
    'CV на немецком',
  ] : [
    'Дипломи донишгоҳ (Bachelor ё Master)',
    'Таҷрибаи корӣ дар соҳаи худ',
    'Маблағҳои кофӣ барои 6 моҳ (~5,000€)',
    'Суғуртаи тиббӣ',
    'Забони олмонӣ ё англисӣ (B1+)',
    'CV ба забони олмонӣ',
  ];

  const blueCardRequirements = language === 'de' ? [
    'Arbeitsvertrag von deutschem Arbeitgeber',
    'Mindestgehalt €45.300/Jahr (2024)',
    'Für IT/Ingenieurwesen: €41.000/Jahr',
    'Anerkannter Hochschulabschluss',
    'Krankenversicherung',
  ] : language === 'ru' ? [
    'Контракт от немецкого работодателя',
    'Минимальная зарплата €45,300/год (2024)',
    'Для IT/инженерии: €41,000/год',
    'Признанный диплом университета',
    'Медицинская страховка',
  ] : [
    'Шартномаи корӣ аз корфармои олмонӣ',
    'Музди ҳадди ақал €45.300/сол (2024)',
    'Барои IT/муҳандисӣ: €41.000/сол',
    'Дипломи эътирофшудаи донишгоҳ',
    'Суғуртаи тиббӣ',
  ];


  return (
    <>
      <WorkPageSEO />

      <PageTransition>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-work/20 backdrop-blur-sm mb-6">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground/80">
                  {language === 'de' ? '3-12 Monate Vorbereitung' : language === 'ru' ? '3-12 месяцев подготовки' : '3-12 моҳ тайёргарӣ'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.work.title}
              </h1>
              <p className="text-xl text-primary-foreground/70 mb-8">
                {t.work.intro}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Visa Types */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Job Seeker Visa */}
              <div className="card-elevated p-6 md:p-8 border-l-4 border-l-work">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-work flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-card" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {t.work.paths.jobseeker.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {language === 'de' ? '6 Monate zur Jobsuche' : language === 'ru' ? '6 месяцев для поиска' : '6 моҳ барои ҷустуҷӯи кор'}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  {t.work.paths.jobseeker.description}
                </p>
                <ul className="space-y-3">
                  {jobSeekerRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blue Card */}
              <div className="card-elevated p-6 md:p-8 border-l-4 border-l-info">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-info flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-card" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {t.work.paths.bluecard.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {language === 'de' ? 'Für Fachkräfte' : language === 'ru' ? 'Для специалистов' : 'Барои мутахассисон'}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  {t.work.paths.bluecard.description}
                </p>
                <ul className="space-y-3">
                  {blueCardRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Job Search Platforms */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {language === 'de' ? 'Wo nach Jobs suchen?' : language === 'ru' ? 'Где искать работу?' : 'Кор дар куҷо ҷустуҷӯ кунем?'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com' },
                { name: 'StepStone', url: 'https://www.stepstone.de' },
                { name: 'Indeed', url: 'https://de.indeed.com' },
                { name: 'XING', url: 'https://www.xing.com' },
              ].map((platform) => (
                <a
                  key={platform.url}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-elevated p-6 text-center hover:shadow-lg transition-all group"
                >
                  <Building2 className="w-8 h-8 text-accent mx-auto mb-3" />
                  <span className="font-semibold text-foreground flex items-center justify-center gap-2">
                    {platform.name}
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </span>
                </a>
              ))}
            </div>

            {/* Make it in Germany */}
            <div className="mt-12 text-center">
              <a
                href="https://www.make-it-in-germany.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-info hover:underline font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                Make it in Germany — {language === 'de' ? 'Offizielles Portal' : language === 'ru' ? 'Официальный портал' : 'Портали расмӣ'}
              </a>
            </div>
          </div>
        </section>

        {/* CV Template */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {language === 'de' ? 'Lebenslauf-Vorlage' : language === 'ru' ? 'Шаблон CV' : 'Намунаи CV'}
              </h2>
              <div className="card-elevated p-6 md:p-8">
                <div className="space-y-4 text-sm">
                  <div className="border-b border-border pb-4">
                    <h3 className="font-bold text-foreground">LEBENSLAUF</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                    <div className="font-medium">Persönliche Daten</div>
                    <div className="col-span-2">
                      Name: [Ihr Name]<br />
                      Geburtsdatum: [Datum]<br />
                      Staatsangehörigkeit: [Land]
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                    <div className="font-medium">Berufserfahrung</div>
                    <div className="col-span-2">
                      [Jahr] — [Jahr]: [Position]<br />
                      [Unternehmen], [Stadt]
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                    <div className="font-medium">Ausbildung</div>
                    <div className="col-span-2">
                      [Jahr]: [Abschluss]<br />
                      [Universität]
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                    <div className="font-medium">Sprachen</div>
                    <div className="col-span-2">
                      Muttersprache<br />
                      Russisch (Fließend)<br />
                      Deutsch (B1/B2)<br />
                      Englisch (B2)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          title={language === 'de' ? 'Häufig gestellte Fragen' : language === 'ru' ? 'Часто задаваемые вопросы' : 'Саволҳои зиёд пурсидашаванда'}
          subtitle={language === 'de' ? 'Antworten auf wichtige Fragen zum Arbeiten in Deutschland' : language === 'ru' ? 'Ответы на важные вопросы о работе в Германии' : 'Ҷавобҳо ба саволҳои муҳим дар бораи кор дар Олмон'}
          faqs={t.work.faq || []}
        />

        {/* CTA */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main text-center">
            <Button asChild className="btn-hero">
              <Link to={`${langPrefix}/#wizard`}>
                {language === 'de' ? 'Plan erstellen' : language === 'ru' ? 'Создать план' : 'Нақша эҷод кардан'}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </PageTransition>
    </>
  );
};

export default WorkPage;
