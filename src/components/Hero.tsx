import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Briefcase, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PathCard } from '@/components/PathCard';
import { useLanguage } from '@/contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

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
      <div className="container-main py-16 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-primary-foreground/80">
              2024 • Тоҷикистон → Олмон
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#wizard" className="btn-hero">
              {t.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </a>
            <Button
              variant="outline"
              size="lg"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <PathCard
            type="study"
            title={t.paths.study.title}
            description={t.paths.study.description}
            duration={t.paths.study.duration}
            href="/study"
          />
          <PathCard
            type="work"
            title={t.paths.work.title}
            description={t.paths.work.description}
            duration={t.paths.work.duration}
            href="/work"
          />
          <PathCard
            type="ausbildung"
            title={t.paths.ausbildung.title}
            description={t.paths.ausbildung.description}
            duration={t.paths.ausbildung.duration}
            href="/ausbildung"
          />
        </motion.div>
      </div>
    </section>
  );
}
