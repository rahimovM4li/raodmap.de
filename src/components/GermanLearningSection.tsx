import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Headphones,
  Languages,
  Lightbulb,
  MessageCircle,
  PenLine,
  ShieldAlert,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { germanLearningCenters } from '@/data/germanLearningCenters';
import { useLanguage } from '@/contexts/LanguageContext';
import { germanLearningT } from '@/data/germanLearningTranslations';
import { centersI18n } from '@/data/germanLearningCentersI18n';

const STORAGE_KEY = 'german-learning-30-day-progress';

const learningImages = {
  hero: '/learning-images/german-learning-hero.png',
  classroom: '/learning-images/german-language-classroom.png',
  selfStudy: '/learning-images/german-self-study-desk.png',
  bookKamyanova: '/learning-images/book-image.png',
  tracker: '/learning-images/german-30-day-tracker.png',
};

const reveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const skillIcons = [BookOpen, Languages, Headphones, MessageCircle, FileText, PenLine];
const importanceIcons = [GraduationCap, Building2, FileText, MessageCircle, ShieldAlert, Target];
const pathIcons = [Building2, BookOpen];

const planGroupRanges = [
  { from: 1, to: 7 },
  { from: 8, to: 14 },
  { from: 15, to: 21 },
  { from: 22, to: 30 },
];

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-8 max-w-3xl">
      {label && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          {label}
        </p>
      )}
      <h2 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  );
}

function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PlaceholderValue({ label, value, fallback }: { label: string; value: string; fallback: string }) {
  const displayValue = value && value !== '#' ? value : fallback;
  const normalizedValue = value.trim();
  const isMissing = !normalizedValue || normalizedValue === '#';

  const getLinkHref = () => {
    if (isMissing) return null;

    if (/^https?:\/\//i.test(normalizedValue)) {
      return normalizedValue;
    }

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue)) {
      return `mailto:${normalizedValue}`;
    }

    if (/^@?[A-Za-z0-9_.]{3,}$/.test(normalizedValue) && label.toLowerCase() === 'telegram') {
      return `https://t.me/${normalizedValue.replace(/^@/, '')}`;
    }

    const phoneValue = normalizedValue.replace(/[\s()-]/g, '');
    if (/^\+?[0-9]{7,}$/.test(phoneValue)) {
      return `tel:${phoneValue}`;
    }

    return null;
  };

  const href = getLinkHref();
  const normalizedLabel = label.toLowerCase();

  const getDisplayLabel = () => {
    if (!href) return displayValue;

    if (href.startsWith('tel:') || href.startsWith('mailto:')) {
      return displayValue;
    }

    try {
      const parsedUrl = new URL(href);
      const pathValue = parsedUrl.pathname.replace(/^\//, '').replace(/\/$/, '');

      if (normalizedLabel === 'instagram' && pathValue) {
        return `@${pathValue}`;
      }

      if (normalizedLabel === 'telegram' && pathValue) {
        return `@${pathValue}`;
      }

      if (normalizedLabel === 'website') {
        return parsedUrl.hostname.replace(/^www\./, '');
      }

      return `${parsedUrl.hostname.replace(/^www\./, '')}${pathValue ? `/${pathValue}` : ''}`;
    } catch {
      return displayValue;
    }
  };

  const linkText = getDisplayLabel();

  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          className="mt-1 block break-all text-sm text-primary underline-offset-4 hover:underline"
        >
          {linkText}
        </a>
      ) : (
        <p className="mt-1 break-all text-sm text-foreground">{displayValue}</p>
      )}
    </div>
  );
}

function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('german-tilt-card group relative overflow-hidden rounded-xl border border-border bg-card', className)}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

type TranslationType = typeof germanLearningT.ru;

function HeroLearningModel({ stageY, t }: { stageY: any; t: TranslationType }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, rotateY: -8 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ y: stageY }}
      className="hidden lg:block"
    >
      <div className="german-hero-stage">
        <div className="german-hero-panel">
          <div className="relative mb-5 overflow-hidden rounded-xl border border-border bg-secondary">
            <img
              src={learningImages.hero}
              alt=""
              className="aspect-[16/10] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 rounded-lg bg-card/90 px-3 py-2 text-sm font-semibold text-foreground shadow-card backdrop-blur">
              {t.heroMobileTitle}
            </div>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t.heroStageLabel}</p>
              <h2 className="text-2xl font-bold text-foreground">{t.heroStageTitle}</h2>
            </div>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accent-foreground">
              {t.heroStageBadge}
            </span>
          </div>

          <div className="relative h-48">
            {t.levelLabels.map((item, i) => {
              const positions = [
                { top: '8%', left: '8%', delay: 0 },
                { top: '26%', left: '38%', delay: 0.15 },
                { top: '48%', left: '18%', delay: 0.3 },
                { top: '66%', left: '54%', delay: 0.45 },
              ];
              const pos = positions[i];
              return (
                <motion.div
                  key={item.level}
                  initial={{ opacity: 0, y: 20, rotateX: 20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: pos.delay, duration: 0.55 }}
                  className="german-level-chip"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <span className="text-xl font-bold text-primary">{item.level}</span>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </motion.div>
              );
            })}
            <div className="german-hero-axis" />
            <div className="german-hero-axis german-hero-axis-secondary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroMobileCard({ imageY, t }: { imageY: any; t: TranslationType }) {
  return (
    <motion.div style={{ y: imageY }} className="mt-6 lg:hidden">
      <div className="german-hero-mobile-card">
        <div className="overflow-hidden rounded-[1.1rem] border border-border/80 bg-card">
          <div className="relative">
            <img
              src={learningImages.hero}
              alt=""
              className="aspect-[16/11] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/18 to-transparent" />
          </div>

          <div className="space-y-4 p-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm">
                {t.heroMobileTag1}
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground">
                {t.heroMobileTag2}
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
                {t.heroMobileTag3}
              </span>
            </div>

            <div className="rounded-2xl bg-secondary/55 p-4">
              <p className="text-base font-semibold text-foreground">{t.heroMobileTitle}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t.heroMobileText}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {t.heroSkillBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="rounded-2xl border border-border/80 bg-background/92 px-3 py-3 text-center shadow-sm"
            >
              <p className="text-lg font-bold text-primary">{badge.title}</p>
              <p className="text-xs text-muted-foreground">{badge.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function GermanLearningSection() {
  const { language } = useLanguage();
  const t = germanLearningT[language];
  const centersT = centersI18n[language];
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [activeSkillIdx, setActiveSkillIdx] = useState(0);
  const [activeLevel, setActiveLevel] = useState(t.levelEstimates[0].level);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `${window.location.pathname}#${id}`);
  };

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setCompletedDays(
          parsed.filter((day) => Number.isInteger(day) && day >= 1 && day <= 30)
        );
      }
    } catch {
      setCompletedDays([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
  }, [completedDays]);

  const checkedProgress = Math.round((checkedItems.length / t.checklistItems.length) * 100);
  const trackerProgress = Math.round((completedDays.length / 30) * 100);
  const completedSet = useMemo(() => new Set(completedDays), [completedDays]);
  const selectedSkill = t.skillBlocks[activeSkillIdx] ?? t.skillBlocks[0];
  const selectedLevel = t.levelEstimates.find((level) => level.level === activeLevel) ?? t.levelEstimates[0];
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const heroStageY = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);
  const heroBandY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const heroGridOpacity = useTransform(scrollYProgress, [0, 0.8], [0.7, 0.18]);

  const toggleChecklistItem = (index: number) => {
    setCheckedItems((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  };

  const toggleDay = (day: number) => {
    setCompletedDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day].sort((a, b) => a - b)
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <section ref={heroRef} className="german-hero-shell border-b border-border">
        <motion.div style={{ opacity: heroGridOpacity }} className="german-hero-grid" />
        <motion.div style={{ y: heroBandY }} className="german-hero-band german-hero-band-primary" />
        <motion.div style={{ y: heroBandY }} className="german-hero-band german-hero-band-secondary" />
        <div className="german-hero-noise" />
        <div className="container-main">
          <div className="relative py-12 md:py-20 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_460px]">
              <motion.div style={{ y: heroTextY }}>
                <Reveal className="max-w-4xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/78 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur">
                    <Languages className="h-4 w-4" />
                    {t.heroTag}
                  </div>
                  <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.02] text-foreground md:text-6xl lg:text-[4.4rem]">
                    {t.heroTitle}
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                    {t.heroSubtitle}
                  </p>
                  <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                    {t.heroDescription}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button size="lg" className="h-12 rounded-xl px-6 shadow-card" onClick={() => scrollToSection('centers')}>
                      {t.heroBtnCenter}
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 rounded-xl border-primary/20 bg-background/70 px-6 backdrop-blur" onClick={() => scrollToSection('self-study')}>
                      {t.heroBtnSelf}
                    </Button>
                  </div>
                  <div className="mt-8 rounded-2xl border border-accent/25 bg-background/76 p-5 shadow-card backdrop-blur">
                    <p className="text-sm font-semibold uppercase tracking-wide text-accent-foreground/90">
                      {t.heroWhyWorks}
                    </p>
                    <p className="mt-2 text-base leading-7 text-foreground">
                      {t.heroWhyWorksText}
                    </p>
                  </div>
                  <div className="mt-6 grid gap-3 md:max-w-3xl md:grid-cols-3">
                    {t.heroPillars.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
                        className="rounded-2xl border border-border/70 bg-card/82 p-4 shadow-sm backdrop-blur"
                      >
                        <p className="text-sm font-semibold text-primary">{item.label}</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </Reveal>
                <HeroMobileCard imageY={heroImageY} t={t} />
              </motion.div>
              <HeroLearningModel stageY={heroStageY} t={t} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="mt-8 hidden lg:flex items-center gap-3 text-sm text-muted-foreground"
            >
              <span className="rounded-full border border-border/80 bg-card/70 px-3 py-2 backdrop-blur">scroll</span>
              <span>{t.heroScrollHint}</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.importanceSectionLabel}
            title={t.importanceSectionTitle}
            description={t.importanceSectionDesc}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.importanceItems.map((item, idx) => {
              const Icon = importanceIcons[idx];
              return (
                <Reveal key={item.title}>
                  <TiltCard className="h-full p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/25 py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.strategySectionLabel}
            title={t.strategySectionTitle}
            description={t.strategySectionDesc}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {t.pathComparison.map((path, idx) => {
              const Icon = pathIcons[idx];
              return (
                <Reveal key={path.title}>
                  <TiltCard className="p-5 md:p-6">
                    <div className="mb-5 flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{path.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{path.intro}</p>
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="mb-3 text-sm font-semibold text-foreground">{t.prosLabel}</p>
                        <InfoList items={path.pros} />
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-semibold text-foreground">{t.consLabel}</p>
                        <ul className="space-y-2">
                          {path.cons.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button variant="link" className="mt-5 h-auto p-0" onClick={() => scrollToSection(path.targetId)}>
                      {t.goToPath}
                    </Button>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5 leading-7 text-foreground">
            <span dangerouslySetInnerHTML={{ __html: t.strategyConclusion }} />
          </Reveal>
        </div>
      </section>

      <section id="centers" className="scroll-mt-24 py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.centersSectionLabel}
            title={t.centersSectionTitle}
            description={t.centersSectionDesc}
          />

          <Reveal className="mb-6 rounded-xl border border-accent/30 bg-accent/10 p-5">
            <div className="flex gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-6 text-foreground">
                {t.centersWarning}
              </p>
            </div>
          </Reveal>

          <Reveal className="mb-8 grid gap-5 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-card lg:grid-cols-[0.9fr_1.1fr] lg:p-5">
            <div className="overflow-hidden rounded-lg">
              <img
                src={learningImages.classroom}
                alt=""
                className="aspect-[16/9] h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.centersPhotoLabel}</p>
              <h3 className="mt-2 text-xl font-bold text-foreground">{t.centersPhotoTitle}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                {t.centersPhotoDesc}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            {germanLearningCenters.map((center, index) => {
              const ct = centersT[center.name] ?? centersT[Object.keys(centersT)[index]];
              return (
              <Reveal key={center.name}>
                <TiltCard className="h-full p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                      {t.centerPrefix} {index + 1}
                    </span>
                    {ct?.statusLabel && (
                      <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        {ct.statusLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                    {center.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {ct?.shortDescription ?? center.shortDescription}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {center.levels.map((level) => (
                      <span key={level} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                        {level}
                      </span>
                    ))}
                    <span className="mx-1 text-border">|</span>
                    {(ct?.formats ?? center.formats).map((format) => (
                      <span key={format} className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                        {format}
                      </span>
                    ))}
                  </div>

                  <Accordion type="single" collapsible className="mt-3">
                    <AccordionItem value="details" className="border-t border-border">
                      <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                        {t.centersExpandLabel}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4 text-sm leading-6 text-muted-foreground">
                          {ct?.fullDescription ?? center.fullDescription}
                        </p>
                        <div className="grid gap-3 md:grid-cols-2">
                          <PlaceholderValue label="Website" value={center.website} fallback={t.placeholderFallback} />
                          <PlaceholderValue label="Phone" value={center.phone} fallback={t.placeholderFallback} />
                          <PlaceholderValue label="Instagram" value={center.instagram} fallback={t.placeholderFallback} />
                          <PlaceholderValue label="Telegram" value={center.telegram} fallback={t.placeholderFallback} />
                        </div>
                        {center.address && center.address !== '#' && (
                          <p className="mt-3 text-sm text-muted-foreground">📍 {center.address}</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TiltCard>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/25 py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.checklistSectionLabel}
            title={t.checklistSectionTitle}
            description={t.checklistSectionDesc}
          />
          <Reveal className="mb-5 max-w-4xl rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">{t.checklistChecked} {checkedItems.length} {t.checklistOf} {t.checklistItems.length}</p>
                <p className="text-sm text-muted-foreground">{t.checklistHint}</p>
              </div>
              <div className="min-w-56">
                <Progress value={checkedProgress} />
              </div>
            </div>
          </Reveal>
          <div className="grid max-w-4xl gap-3 md:grid-cols-2">
            {t.checklistItems.map((item, index) => {
              const checked = checkedItems.includes(index);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleChecklistItem(index)}
                  className={cn(
                    'flex min-h-14 items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40',
                    checked && 'border-success/50 bg-success/5'
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border',
                      checked ? 'border-success bg-success text-success-foreground' : 'border-border bg-background'
                    )}
                  >
                    {checked && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span className="text-sm leading-6 text-foreground">{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="self-study" className="scroll-mt-24 py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.selfStudySectionLabel}
            title={t.selfStudySectionTitle}
            description={t.selfStudySectionDesc}
          />
          <Reveal className="mb-8 grid gap-5 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-card lg:grid-cols-[1.05fr_0.95fr] lg:p-5">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.selfStudyPhotoLabel}</p>
              <h3 className="mt-2 text-xl font-bold text-foreground">{t.selfStudyPhotoTitle}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                {t.selfStudyPhotoDesc}
              </p>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src={learningImages.selfStudy}
                alt=""
                className="aspect-[16/9] h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.skillBlocks.map((skill, idx) => {
              const Icon = skillIcons[idx];
              return (
                <Reveal key={skill.title}>
                  <TiltCard
                    className={cn(
                      'h-full p-5 transition-colors',
                      activeSkillIdx === idx && 'border-primary/50 bg-primary/5'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveSkillIdx(idx)}
                      className="block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="font-semibold text-foreground">{skill.title}</h3>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{skill.text}</p>
                    </button>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-5 max-w-4xl rounded-xl border border-primary/20 bg-card p-5 shadow-card">
            <p className="text-sm font-semibold text-primary">{t.activeSkillLabel}: {selectedSkill.title}</p>
            <p className="mt-2 leading-7 text-muted-foreground">{selectedSkill.text}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/25 py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.stepsSectionLabel}
            title={t.stepsSectionTitle}
            description={t.stepsSectionDesc}
          />
          <div className="max-w-4xl space-y-4">
            {t.selfStudySteps.map((step, index) => (
              <Reveal key={step.title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 leading-7 text-muted-foreground">{step.text}</p>
                    {index === 0 && (
                      <div className="mt-4 max-w-md overflow-hidden rounded-xl border border-border bg-secondary/30">
                        <img
                          src={learningImages.bookKamyanova}
                          alt={t.selfStudyBookImageAlt}
                          className="aspect-[4/5] w-full object-cover"
                          loading="lazy"
                        />
                        <p className="border-t border-border px-4 py-3 text-sm font-medium text-foreground">
                          {t.selfStudyBookImageCaption}
                        </p>
                      </div>
                    )}
                    {step.tip && (
                      <p className="mt-3 rounded-lg bg-primary/5 p-3 text-sm leading-6 text-foreground">
                        {step.tip}
                      </p>
                    )}
                    {step.examples && (
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {step.examples.map((example) => (
                          <span key={example} className="rounded-lg bg-secondary px-3 py-2 text-sm text-foreground">
                            {example}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.levelsSectionLabel}
            title={t.levelsSectionTitle}
            description={t.levelsSectionDesc}
          />
          <Reveal className="mb-5 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2">
              {t.levelEstimates.map((item, index) => (
                <motion.button
                  key={item.level}
                  type="button"
                  onClick={() => setActiveLevel(item.level)}
                  whileHover={{ y: -3, rotateX: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    'rounded-xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    activeLevel === item.level
                      ? 'border-primary bg-primary text-primary-foreground shadow-card'
                      : 'border-border bg-card text-foreground hover:border-primary/40'
                  )}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="block text-2xl font-bold">{item.level}</span>
                  <span className={cn('mt-1 block text-xs', activeLevel === item.level ? 'text-primary-foreground/75' : 'text-muted-foreground')}>
                    {t.levelStepLabel} {index + 1}
                  </span>
                </motion.button>
              ))}
            </div>
            <TiltCard className="p-5 md:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.selectedLevelLabel}</p>
                  <h3 className="mt-2 text-3xl font-bold text-foreground">{selectedLevel.level}</h3>
                </div>
                <div className="rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
                  {selectedLevel.time}
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.levelGoalLabel}</p>
                  <p className="mt-1 leading-7 text-muted-foreground">{selectedLevel.goal}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.levelCanDoLabel}</p>
                  <p className="mt-1 leading-7 text-muted-foreground">{selectedLevel.canDo}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid grid-cols-[80px_1fr] border-b border-border bg-secondary/50 p-4 text-sm font-semibold text-foreground md:grid-cols-[90px_1fr_1fr_1.2fr]">
              <span>{t.levelTableLevel}</span>
              <span>{t.levelTableGoal}</span>
              <span className="hidden md:block">{t.levelTableTime}</span>
              <span className="hidden md:block">{t.levelTableCanDo}</span>
            </div>
            {t.levelEstimates.map((item) => (
              <div key={item.level} className="grid grid-cols-[80px_1fr] gap-y-2 border-b border-border p-4 last:border-b-0 md:grid-cols-[90px_1fr_1fr_1.2fr]">
                <span className="font-bold text-primary">{item.level}</span>
                <span className="text-sm text-foreground">{item.goal}</span>
                <span className="text-sm text-muted-foreground md:block">{item.time}</span>
                <span className="text-sm leading-6 text-muted-foreground md:block">{item.canDo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/25 py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.dailySectionLabel}
            title={t.dailySectionTitle}
            description={t.dailySectionDesc}
          />
          <div className="grid gap-3 lg:grid-cols-5">
            {t.dailyPlan.map((item) => (
              <Reveal key={item.task}>
                <TiltCard className="h-full p-5">
                  <p className="text-xl font-bold text-foreground">{item.time}</p>
                  <p className="mt-2 font-medium text-primary">{item.task}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="flex gap-3">
              <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="leading-7 text-muted-foreground">
                {t.dailyConclusion}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.trackerSectionLabel}
            title={t.trackerSectionTitle}
            description={t.trackerSectionDesc}
          />
          <Reveal className="mb-6 overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <img
              src={learningImages.tracker}
              alt=""
              className="aspect-[16/6] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              loading="lazy"
            />
          </Reveal>
          <Reveal className="max-w-5xl rounded-xl border border-border bg-card p-5 md:p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{t.trackerProgress}: {completedDays.length}/30</h3>
                </div>
                <Progress value={trackerProgress} className="h-3 md:w-96" />
              </div>
              <div className="rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
                {trackerProgress}% {t.trackerDone}
              </div>
            </div>

            <div className="space-y-5">
              {t.planGroups.map((group, groupIdx) => {
                const range = planGroupRanges[groupIdx];
                return (
                <div key={group.label}>
                  <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-foreground">{group.label}</p>
                    <p className="text-sm text-muted-foreground">{group.text}</p>
                  </div>
                  <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-10">
                    {Array.from({ length: range.to - range.from + 1 }, (_, i) => range.from + i).map((day) => {
                      const done = completedSet.has(day);
                      return (
                        <motion.button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          whileHover={{ y: -2, rotateX: 12 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`${t.markDay} ${day}`}
                          className={cn(
                            'flex h-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                            done
                              ? 'border-success bg-success text-success-foreground'
                              : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-primary'
                          )}
                        >
                          {done ? <CheckCircle2 className="h-4 w-4" /> : day}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/25 py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.mistakesSectionLabel}
            title={t.mistakesSectionTitle}
            description={t.mistakesSectionDesc}
          />
          <div className="grid max-w-5xl gap-3 md:grid-cols-2">
            {t.commonMistakes.map((mistake) => (
              <Reveal key={mistake} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-6 text-muted-foreground">{mistake}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-main">
          <Reveal className="max-w-4xl rounded-xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-lg font-semibold leading-8 text-foreground">
              {t.motivationQuote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/25 py-12 md:py-20">
        <div className="container-main">
          <SectionHeader
            label={t.faqSectionLabel}
            title={t.faqSectionTitle}
            description={t.faqSectionDesc}
          />
          <Accordion type="single" collapsible className="max-w-4xl space-y-3">
            {t.faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-xl border border-border bg-card px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-main">
          <Reveal className="max-w-4xl rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t.ctaTitle}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {t.ctaText}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
                <Button onClick={() => scrollToSection('centers')}>
                  {t.ctaBtnCenters}
                </Button>
                <Button variant="outline" onClick={() => scrollToSection('self-study')}>
                  {t.ctaBtnPlan}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
