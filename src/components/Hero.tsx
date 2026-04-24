import { Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Briefcase, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PathCard } from '@/components/PathCard';
import { useLanguage } from '@/contexts/LanguageContext';

const CARD_COUNT = 5;

function ScrollDots({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <div className="flex justify-center gap-2 mt-4 md:hidden">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === activeIndex ? 'w-6 bg-accent' : 'w-2 bg-primary-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280 + 16; // w-[280px] + gap-4
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveCard(Math.min(index, CARD_COUNT - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'var(--gradient-hero)' }}
      >
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-info/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-main py-8 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-8 md:mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-4 md:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-primary-foreground/80">
              2026 • Тоҷикистон → Олмон
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl text-primary-foreground/70 mb-6 md:mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#wizard" className="btn-hero w-full sm:w-auto">
              {t.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </a>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              asChild
            >
              <Link to="/study">{t.hero.ctaSecondary}</Link>
            </Button>
          </div>
        </motion.div>

        {/* Path Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-3 px-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide"
          >
            <div className="snap-center shrink-0 w-[280px] md:w-auto">
              <PathCard type="study" title={t.paths.study.title} description={t.paths.study.description} duration={t.paths.study.duration} href="/study" />
            </div>
            <div className="snap-center shrink-0 w-[280px] md:w-auto">
              <PathCard type="work" title={t.paths.work.title} description={t.paths.work.description} duration={t.paths.work.duration} href="/work" />
            </div>
            <div className="snap-center shrink-0 w-[280px] md:w-auto">
              <PathCard type="ausbildung" title={t.paths.ausbildung.title} description={t.paths.ausbildung.description} duration={t.paths.ausbildung.duration} href="/ausbildung" />
            </div>
            <div className="snap-center shrink-0 w-[280px] md:w-auto">
              <PathCard type="fsj" title={t.paths.fsj.title} description={t.paths.fsj.description} duration={t.paths.fsj.duration} href="/fsj" />
            </div>
            <div className="snap-center shrink-0 w-[280px] md:w-auto">
              <PathCard type="aupair" title={t.paths.aupair.title} description={t.paths.aupair.description} duration={t.paths.aupair.duration} href="/aupair" />
            </div>
          </div>
          <ScrollDots count={CARD_COUNT} activeIndex={activeCard} />
        </motion.div>
      </div>
    </section>
  );
}
