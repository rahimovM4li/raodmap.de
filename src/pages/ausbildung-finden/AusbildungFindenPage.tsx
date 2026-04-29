import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Search, FileText, PenTool, User, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Step1Documents from './Step1Documents';
import Step2CoverLetter from './Step2CoverLetter';
import Step3CV from './Step3CV';
import Step4WhereToApply from './Step4WhereToApply';
import Step5Interview from './Step5Interview';

const steps = [
  { icon: FileText, de: 'Bewerbungsunterlagen', ru: 'Документы', tj: 'Ҳуҷҷатҳо' },
  { icon: PenTool, de: 'Anschreiben', ru: 'Сопр. письмо', tj: 'Номаи ҳамроҳ' },
  { icon: User, de: 'Lebenslauf', ru: 'Резюме', tj: 'Резюме' },
  { icon: Search, de: 'Wo bewerben', ru: 'Где искать', tj: 'Дар куҷо ҷустуҷӯ' },
  { icon: MessageSquare, de: 'Vorstellungsgespräch', ru: 'Собеседование', tj: 'Мусоҳиба' },
];

const AusbildungFindenPage = () => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const stepButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scroll-based active step detection
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight * 0.35;
      let current = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (!section) continue;
        const top = section.getBoundingClientRect().top;
        if (top <= offset) {
          current = i;
        }
      }
      setActiveStep(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll stepper nav to show active step on mobile
  useEffect(() => {
    const btn = stepButtonRefs.current[activeStep];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeStep]);

  const scrollToStep = (index: number) => {
    setActiveStep(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const langPrefix = language === 'tj' ? '' : `/${language}`;

  return (
    <>
      <Helmet>
        <title>
          {language === 'de'
            ? 'Ausbildung finden – Schritt für Schritt | Germany Roadmap'
            : language === 'ru'
            ? 'Найти Ausbildung — пошаговое руководство | Germany Roadmap'
            : 'Ausbildung ёфтан — қадам ба қадам | Germany Roadmap'}
        </title>
        <meta
          name="description"
          content={
            language === 'de'
              ? 'Komplette Anleitung: Ausbildung in Deutschland finden. Bewerbungsunterlagen, Anschreiben, Lebenslauf, Jobportale und Vorstellungsgespräch.'
              : language === 'ru'
              ? 'Полное руководство: как найти Ausbildung в Германии. Документы, сопроводительное письмо, резюме, платформы и собеседование.'
              : 'Роҳнамои пурра: чӣ тавр Ausbildung-ро дар Олмон ёфтан. Ҳуҷҷатҳо, номаи ҳамроҳкунанда, резюме, платформаҳо ва мусоҳиба.'
          }
        />
        <meta property="og:title" content={language === 'de' ? 'Ausbildung finden – Schritt für Schritt' : language === 'ru' ? 'Найти Ausbildung — пошагово' : 'Ausbildung ёфтан — қадам ба қадам'} />
        <meta property="og:type" content="article" />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section style={{ background: 'var(--gradient-hero)' }} className="py-10 md:py-24">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-primary-foreground"
            >
              <Badge className="mb-4 bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                <Search className="w-3 h-3 mr-1" />
                {language === 'de' ? '5 Schritte zum Erfolg' : language === 'ru' ? '5 шагов к успеху' : '5 қадам ба муваффақият'}
              </Badge>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                {language === 'de'
                  ? 'Wie du selbstständig eine Ausbildung in Deutschland findest'
                  : language === 'ru'
                  ? 'Как самостоятельно найти Ausbildung в Германии'
                  : 'Чӣ тавр мустақилона Ausbildung-ро дар Олмон пайдо кардан'}
              </h1>
              <p className="text-base md:text-xl max-w-3xl mx-auto opacity-90 mb-2">
                {language === 'de'
                  ? 'Umfassende Schritt-für-Schritt-Anleitung für Bewerber aus GUS-Staaten 2025/2026'
                  : language === 'ru'
                  ? 'Исчерпывающее пошаговое руководство для кандидатов из стран СНГ на 2025/2026 годы'
                  : 'Роҳнамои муфассал барои номзадҳо аз кишварҳои ИДМ барои солҳои 2025/2026'}
              </p>
              <p className="text-sm md:text-base max-w-2xl mx-auto opacity-80">
                {language === 'de'
                  ? 'Das duale Ausbildungssystem bietet einen der zuverlässigsten Wege in den europäischen Arbeitsmarkt. Dank des Fachkräftemangels öffnen sich 2025/2026 beispiellose Möglichkeiten — ganz ohne teure Vermittler.'
                  : language === 'ru'
                  ? 'Система дуального образования — один из самых надежных путей на европейский рынок труда. Благодаря дефициту кадров в 2025/2026 открываются беспрецедентные возможности — без дорогих посредников.'
                  : 'Системаи таҳсилоти дуалӣ яке аз боэътимодтарин роҳҳо ба бозори меҳнати Аврупо мебошад. Бо сабаби норасоии кадрҳо дар 2025/2026 имкониятҳои бесобиқа кушода мешаванд — бидуни миёнаравҳои гаронбаҳо.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stepper Navigation */}
        <section className="sticky top-12 md:top-16 z-40 bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
          <div className="container-main py-3 md:py-4 overflow-x-auto scrollbar-hide">
            <nav aria-label="Steps navigation" className="flex flex-row items-center gap-2 md:gap-0 md:justify-between min-w-max md:min-w-0">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                return (
                  <button
                    key={index}
                    ref={(el) => { stepButtonRefs.current[index] = el; }}
                    onClick={() => scrollToStep(index)}
                    aria-label={`${language === 'de' ? 'Schritt' : language === 'ru' ? 'Шаг' : 'Қадам'} ${index + 1}: ${step[language]}`}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap',
                      isActive
                        ? 'bg-primary/10 text-primary ring-2 ring-primary/40'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    )}
                  >
                    <div className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0',
                      isActive ? 'bg-primary text-primary-foreground scale-110' : 'bg-secondary text-muted-foreground'
                    )}>
                      {index + 1}
                    </div>
                    <Icon className="w-4 h-4 hidden md:block shrink-0" />
                    <span className="text-xs md:text-sm">{step[language]}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </section>

        {/* Step Sections */}
        <section ref={(el) => { sectionRefs.current[0] = el; }} id="step-1">
          <Step1Documents onStepVisible={() => {}} />
        </section>

        <section ref={(el) => { sectionRefs.current[1] = el; }} id="step-2">
          <Step2CoverLetter onStepVisible={() => {}} />
        </section>

        <section ref={(el) => { sectionRefs.current[2] = el; }} id="step-3">
          <Step3CV onStepVisible={() => {}} />
        </section>

        <section ref={(el) => { sectionRefs.current[3] = el; }} id="step-4">
          <Step4WhereToApply onStepVisible={() => {}} />
        </section>

        <section ref={(el) => { sectionRefs.current[4] = el; }} id="step-5">
          <Step5Interview onStepVisible={() => {}} />
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-24" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container-main text-center text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl md:text-3xl font-bold mb-4">
                {language === 'de'
                  ? 'Nächster Schritt: Erstelle deinen Lebenslauf'
                  : language === 'ru'
                  ? 'Следующий шаг: создайте свое резюме'
                  : 'Қадами навбатӣ: Резюмеи худро эҷод кунед'}
              </h2>
              <p className="text-sm md:text-base opacity-90 mb-6 max-w-xl mx-auto">
                {language === 'de'
                  ? 'Nutze unseren kostenlosen CV-Generator, um einen professionellen Lebenslauf nach deutschem Standard zu erstellen.'
                  : language === 'ru'
                  ? 'Используйте наш бесплатный генератор CV для создания профессионального резюме по немецкому стандарту.'
                  : 'Генератори бепули CV-и моро барои эҷоди резюмеи касбӣ тибқи стандарти олмонӣ истифода баред.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="btn-hero">
                  <Link to="/cv-generator">
                    {language === 'de' ? 'CV-Generator starten' : language === 'ru' ? 'Запустить CV-генератор' : 'CV-генераторро оғоз кунед'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20">
                  <Link to="/ausbildung">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    {language === 'de' ? 'Zurück zur Ausbildung-Übersicht' : language === 'ru' ? 'Назад к обзору Ausbildung' : 'Бозгашт ба шарҳи Ausbildung'}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AusbildungFindenPage;
