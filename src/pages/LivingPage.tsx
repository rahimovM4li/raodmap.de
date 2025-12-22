import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, Briefcase, Heart, Sun, Euro, Languages } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const iconMap = {
  Home,
  Briefcase,
  Heart,
  Sun,
  Euro,
  Languages,
};

const colorMap = {
  housing: 'bg-study text-card',
  work: 'bg-work text-card',
  health: 'bg-destructive text-card',
  daily: 'bg-accent text-accent-foreground',
  costs: 'bg-success text-card',
  language: 'bg-info text-card',
};

const LivingPage = () => {
  const { language, t } = useLanguage();

  const sections = [
    { key: 'housing', color: 'housing', data: t.living.sections.housing },
    { key: 'work', color: 'work', data: t.living.sections.work },
    { key: 'health', color: 'health', data: t.living.sections.health },
    { key: 'daily', color: 'daily', data: t.living.sections.daily },
    { key: 'costs', color: 'costs', data: t.living.sections.costs },
    { key: 'language', color: 'language', data: t.living.sections.language },
  ];

  const seoTitle = {
    de: 'Leben in Deutschland | Praktischer Leitfaden für Neuankömmlinge',
    ru: 'Жизнь в Германии | Практическое руководство для новоприбывших',
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle[language]}</title>
        <meta name="description" content={t.living.subtitle} />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
                <Home className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  {language === 'de' ? 'Wichtige Informationen' : 'Важная информация'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.living.title}
              </h1>
              <p className="text-xl text-primary-foreground/70">
                {t.living.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sections Grid */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sections.map((section, idx) => {
                const IconComponent = iconMap[section.data.icon as keyof typeof iconMap] || Home;
                return (
                  <motion.div
                    key={section.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="card-elevated overflow-hidden"
                  >
                    {/* Section Header */}
                    <div className={cn('p-6 flex items-center gap-4', colorMap[section.color as keyof typeof colorMap])}>
                      <div className="w-12 h-12 rounded-xl bg-card/20 flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h2 className="text-xl font-bold">{section.data.title}</h2>
                    </div>

                    {/* Section Content */}
                    <div className="p-4">
                      <Accordion type="single" collapsible className="space-y-2">
                        {section.data.items.map((item, i) => (
                          <AccordionItem
                            key={i}
                            value={`${section.key}-${i}`}
                            className="border border-border/50 rounded-lg overflow-hidden"
                          >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/50 text-left">
                              <span className="font-medium text-foreground text-sm">
                                {item.title}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 text-muted-foreground text-sm">
                              {item.desc}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {language === 'de' ? 'Schnelle Tipps für Neuankömmlinge' : 'Быстрые советы для новичков'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  emoji: '📝',
                  title: language === 'de' ? 'Anmeldung zuerst' : 'Сначала Anmeldung',
                  desc: language === 'de' ? 'Innerhalb von 14 Tagen anmelden - du brauchst das für fast alles!' : 'Зарегистрируйся в течение 14 дней — это нужно почти для всего!',
                },
                {
                  emoji: '🏦',
                  title: language === 'de' ? 'Bankkonto eröffnen' : 'Открой счёт',
                  desc: language === 'de' ? 'Deutsche IBAN nötig für Miete, Gehalt, Verträge' : 'Немецкий IBAN нужен для аренды, зарплаты, контрактов',
                },
                {
                  emoji: '🇩🇪',
                  title: language === 'de' ? 'Deutsch lernen' : 'Учи немецкий',
                  desc: language === 'de' ? 'Selbst Grundkenntnisse machen den Alltag 10x leichter' : 'Даже базовый немецкий упрощает жизнь в 10 раз',
                },
              ].map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-elevated p-6 text-center"
                >
                  <span className="text-4xl mb-4 block">{tip.emoji}</span>
                  <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LivingPage;
