import { RoadmapPageSEO } from "@/components/SEOHead";
import { motion } from 'framer-motion';
import { useState } from 'react';
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

  const phases = [
    { key: 'preparation', data: t.roadmap.phases.preparation },
    { key: 'visa', data: t.roadmap.phases.visa },
    { key: 'arrival', data: t.roadmap.phases.arrival },
    { key: 'first90', data: t.roadmap.phases.first90 },
    { key: 'longterm', data: t.roadmap.phases.longterm },
  ];

  const activePhaseData = phases.find(p => p.key === activePhase)?.data;
  const ActiveIcon = phaseIcons[activePhase as keyof typeof phaseIcons] || FileText;

  return (
    <>
      <RoadmapPageSEO />

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
        <section className="py-8 bg-card border-b border-border sticky top-16 md:top-20 z-40">
          <div className="container-main">
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
              {phases.map((phase, idx) => {
                const Icon = phaseIcons[phase.key as keyof typeof phaseIcons];
                const isActive = activePhase === phase.key;
                return (
                  <button
                    key={phase.key}
                    onClick={() => setActivePhase(phase.key)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                    )}
                  >
                    <span className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                      isActive ? 'bg-accent text-accent-foreground' : 'bg-muted'
                    )}>
                      {idx + 1}
                    </span>
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{phase.data.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Phase Content */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            {activePhaseData && (
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-5xl mx-auto"
              >
                {/* Phase Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                    <ActiveIcon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {activePhaseData.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{t.common.duration}: <strong>{activePhaseData.duration}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Steps */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                      <ChevronRight className="w-5 h-5 text-accent" />
                      {t.wizard.steps}
                    </h3>
                    {activePhaseData.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="card-elevated p-5 flex gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Tips */}
                    <div className="card-elevated p-5">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-accent" />
                        {t.common.tips}
                      </h3>
                      <ul className="space-y-3">
                        {activePhaseData.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-accent mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Checklist */}
                    <div className="card-elevated p-5">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        {t.common.checklist}
                      </h3>
                      <ul className="space-y-3">
                        {activePhaseData.checklist.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <div className="w-5 h-5 rounded border-2 border-success/30 flex items-center justify-center shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-success/50" />
                            </div>
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
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
                          onClick={() => {
                            setActivePhase(phase.key);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="p-0 h-auto mt-2"
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
    </>
  );
};

export default RoadmapPage;
