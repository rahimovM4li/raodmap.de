import { RoadmapPageSEO } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  FileText, Clock, CheckCircle2, Lightbulb, ChevronRight,
  Plane, Building2, Home, Calendar, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const phaseIcons = {
  preparation: FileText,
  visa: Building2,
  arrival: Plane,
  first90: Home,
  longterm: Award,
};

const RoadmapPage = () => {
  const { language, t } = useLanguage();
  const [activePhase, setActivePhase] = useState<string>('preparation');
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const phases = [
    { key: 'preparation', data: t.roadmap.phases.preparation },
    { key: 'visa', data: t.roadmap.phases.visa },
    { key: 'arrival', data: t.roadmap.phases.arrival },
    { key: 'first90', data: t.roadmap.phases.first90 },
    { key: 'longterm', data: t.roadmap.phases.longterm },
  ];

  const activePhaseData = phases.find(p => p.key === activePhase)?.data;
  const ActiveIcon = phaseIcons[activePhase as keyof typeof phaseIcons] || FileText;

  // Scroll to content when phase changes
  const handlePhaseChange = (phaseKey: string) => {
    setActivePhase(phaseKey);
    
    // Wait for state update, then scroll
    setTimeout(() => {
      if (contentRef.current) {
        const offset = 80; // Header height
        const elementPosition = contentRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <>
      <RoadmapPageSEO />
      <PageTransition>
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
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  {language === 'de' ? 'Komplette Reise' : 'Полный путь'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.roadmap.title}
              </h1>
              <p className="text-xl text-primary-foreground/70">
                {t.roadmap.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Navigation */}
        <section ref={timelineRef} className="py-4 md:py-6 bg-card/95 backdrop-blur-xl border-b border-border sticky top-14 z-40 shadow-sm">
          <div className="container-main">
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center scrollbar-hide">
              {phases.map((phase, idx) => {
                const Icon = phaseIcons[phase.key as keyof typeof phaseIcons];
                const isActive = activePhase === phase.key;
                return (
                  <motion.button
                    key={phase.key}
                    onClick={() => handlePhaseChange(phase.key)}
                    whileTap={{ scale: 0.96 }}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                        : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 active:scale-95'
                    )}
                  >
                    <span className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                      isActive ? 'bg-accent text-accent-foreground' : 'bg-muted'
                    )}>
                      {idx + 1}
                    </span>
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{phase.data.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Phase Content */}
        <section ref={contentRef} className="py-12 md:py-20">
          <div className="container-main">
            <AnimatePresence mode="wait">
              {activePhaseData && (
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="max-w-5xl mx-auto"
                >
                  {/* Phase Header */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 md:mb-12"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                      <ActiveIcon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {activePhaseData.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm md:text-base">{t.common.duration}: <strong>{activePhaseData.duration}</strong></span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Steps */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="font-semibold text-base md:text-lg text-foreground mb-4 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-accent" />
                        {t.wizard.steps}
                      </h3>
                      {activePhaseData.steps.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                          className="card-elevated p-4 md:p-5 flex gap-3 md:gap-4 hover:shadow-lg transition-shadow duration-300 active:scale-[0.99]"
                        >
                          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold shrink-0 text-sm md:text-base">
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">{step.title}</h4>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4 md:space-y-6">
                      {/* Tips */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="card-elevated p-4 md:p-5"
                      >
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm md:text-base">
                          <Lightbulb className="w-5 h-5 text-accent" />
                          {t.common.tips}
                        </h3>
                        <ul className="space-y-3">
                          {activePhaseData.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                              <span className="text-accent mt-0.5 font-bold">•</span>
                              <span className="flex-1">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Checklist */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25, duration: 0.3 }}
                        className="card-elevated p-4 md:p-5"
                      >
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm md:text-base">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                          {t.common.checklist}
                        </h3>
                        <ul className="space-y-3">
                          {activePhaseData.checklist.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-xs md:text-sm">
                              <div className="w-5 h-5 rounded border-2 border-success/30 flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-success/50" />
                              </div>
                              <span className="text-foreground flex-1 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Progress Overview */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
              {language === 'de' ? 'Deine Reise auf einen Blick' : 'Твой путь в обзоре'}
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
                
                {phases.map((phase, idx) => {
                  const Icon = phaseIcons[phase.key as keyof typeof phaseIcons];
                  return (
                    <motion.div
                      key={phase.key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative flex items-start gap-6 mb-8 last:mb-0"
                    >
                      {/* Timeline Dot */}
                      <div className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10',
                        idx === 0 ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {/* Content */}
                      <div className="card-elevated p-5 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{phase.data.title}</h3>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {phase.data.duration}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {phase.data.steps.length} {t.wizard.steps.toLowerCase()} • {phase.data.checklist.length} {t.common.checklist.toLowerCase()} items
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handlePhaseChange(phase.key)}
                          className="p-0 h-auto mt-2 hover:text-primary transition-colors"
                        >
                          {t.common.learnMore} →
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
    </>
  );
};

export default RoadmapPage;
