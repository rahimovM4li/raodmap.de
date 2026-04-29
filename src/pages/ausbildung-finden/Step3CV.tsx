import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Briefcase,
  Star,
  Heart,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Step3CVProps {
  onStepVisible: () => void;
}

type Lang = 'de' | 'ru' | 'tj';

const t = (language: Lang, de: string, ru: string, tj: string) =>
  language === 'de' ? de : language === 'ru' ? ru : tj;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const timelineData = [
  {
    icon: User,
    color: 'border-blue-500',
    dotColor: 'bg-blue-500',
    title: { de: 'Persönliche Daten', ru: 'Личные данные', tj: 'Маълумоти шахсӣ' },
    desc: { de: 'Name, Kontakte, Geburtsdatum', ru: 'Имя, контакты, дата рождения', tj: 'Ном, тамосҳо, санаи таваллуд' },
  },
  {
    icon: GraduationCap,
    color: 'border-emerald-500',
    dotColor: 'bg-emerald-500',
    title: { de: 'Schulbildung / Ausbildung', ru: 'Образование', tj: 'Таҳсилот' },
    desc: { de: 'Reverse chronologisch: neuestes zuerst', ru: 'В обратном хронологическом порядке', tj: 'Бо тартиби антихронологӣ' },
  },
  {
    icon: Briefcase,
    color: 'border-amber-500',
    dotColor: 'bg-amber-500',
    title: { de: 'Praxiserfahrung', ru: 'Практический опыт', tj: 'Таҷрибаи амалӣ' },
    desc: { de: '2-3 Bullet Points mit aktiven Substantiven', ru: '2-3 пункта с активными существительными', tj: '2-3 банд бо исмҳои фаъол' },
  },
  {
    icon: Star,
    color: 'border-purple-500',
    dotColor: 'bg-purple-500',
    title: { de: 'Besondere Kenntnisse', ru: 'Особые знания', tj: 'Донишҳои махсус' },
    desc: { de: 'Sprachen (CEFR), IT-Skills, Führerschein', ru: 'Языки (CEFR), IT-навыки, водительские права', tj: 'Забонҳо (CEFR), малакаҳои IT, шаҳодатномаи ронандагӣ' },
  },
  {
    icon: Heart,
    color: 'border-rose-500',
    dotColor: 'bg-rose-500',
    title: { de: 'Hobbys / Engagement', ru: 'Хобби / Волонтерство', tj: 'Хобби / Волонтёрӣ' },
    desc: { de: 'Teamfähigkeit, relevante Interessen zeigen', ru: 'Показать командные навыки, релевантные интересы', tj: 'Малакаҳои даставӣ, шавқу ҳавасҳои дахлдорро нишон додан' },
  },
];

const includeItems = [
  { de: 'Vollständiger Name (wie im Reisepass)', ru: 'Полное имя (как в загранпаспорте)', tj: 'Номи пурра (мувофиқи шиносномаи хориҷӣ)' },
  { de: 'Aktuelle Adresse mit PLZ', ru: 'Полный адрес с индексом', tj: 'Суроғаи пурра бо индекс' },
  { de: 'Professionelle E-Mail (vorname.nachname@...)', ru: 'Профессиональный email (имя.фамилия@...)', tj: 'Email-и касбӣ (ном.насаб@...)' },
  { de: 'Telefon mit Landesvorwahl (+992)', ru: 'Телефон с кодом страны (+992)', tj: 'Телефон бо коди кишвар (+992)' },
  { de: 'Staatsangehörigkeit', ru: 'Гражданство', tj: 'Шаҳрвандӣ' },
];

const excludeItems = [
  { de: 'Namen/Berufe der Eltern (veraltet)', ru: 'Имена/профессии родителей (устарело)', tj: 'Номҳо/касбҳои волидон (кӯҳна шуд)' },
  { de: 'Religion (außer bei Caritas/Diakonie)', ru: 'Вероисповедание (кроме Caritas/Diakonie)', tj: 'Дин (истисно Caritas/Diakonie)' },
  { de: 'Familienstand (wenn nicht relevant)', ru: 'Семейное положение (если не влияет)', tj: 'Вазъи оилавӣ (агар дахл надорад)' },
];

const gapItems = [
  {
    bad: { de: 'Arbeitslos', ru: 'Безработный', tj: 'Бекор' },
    good: { de: 'Berufliche Orientierung', ru: 'Профессиональная ориентация', tj: 'Самтгирии касбӣ' },
  },
  {
    bad: { de: 'Nichts gemacht', ru: 'Ничего не делал', tj: 'Ҳеҷ кор накардам' },
    good: { de: 'Intensivsprachkurs Deutsch', ru: 'Интенсивный курс немецкого', tj: 'Курси пуршиддати олмонӣ' },
  },
  {
    bad: { de: 'Zu Hause', ru: 'Дома', tj: 'Дар хона' },
    good: { de: 'Familienpflegezeit', ru: 'Уход за семьёй', tj: 'Нигоҳубини оила' },
  },
];

const tips = [
  { de: 'Schulpraktika zählen als wertvolle Erfahrung', ru: 'Школьные стажировки считаются ценным опытом', tj: 'Таҷрибаомӯзиҳои мактабӣ таҷрибаи арзишманд ҳисобида мешаванд' },
  { de: 'Ehrenamt/Volunteering zeigt Proaktivität', ru: 'Волонтерство показывает проактивность', tj: 'Волонтёрӣ ташаббускориро нишон медиҳад' },
  { de: 'Team-Sport + relevante Hobbys (PC-Reparatur für IT)', ru: 'Командный спорт + релевантные хобби (ремонт ПК для IT)', tj: 'Варзиши даставӣ + хоббиҳои дахлдор (таъмири компютер барои IT)' },
];

const Step3CV = ({ onStepVisible }: Step3CVProps) => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onStepVisible();
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onStepVisible]);

  return (
    <div ref={sectionRef} className="py-10 md:py-24">
      <div className="container-main">
        {/* Title & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t(language, 'Schritt 3: Lebenslauf (CV) erstellen', 'Шаг 3: Создание резюме (CV)', 'Қадами 3: Эҷоди резюме (CV)')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto">
            {t(
              language,
              'Der tabellarische Lebenslauf ist das Herzstück jeder Bewerbung. Recruiter scannen ihn in 40–60 Sekunden — die Struktur muss perfekt sein.',
              'Табличное резюме — информационное ядро любой заявки. Рекрутер тратит на него 40–60 секунд — структура должна быть безупречной.',
              'Резюмеи ҷадвалӣ ядрои иттилоотии ҳар як дархост аст. Рекрутер 40-60 сония сарф мекунад — сохтор бояд бенуқсон бошад.'
            )}
          </p>
        </motion.div>

        {/* A) CV Structure Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mb-16 max-w-2xl mx-auto"
        >
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-primary/30" />
          {timelineData.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative pl-12 pb-8 last:pb-0"
              >
                <div className={cn('absolute left-2 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-background', item.dotColor)}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <div className={cn('card-elevated p-4 rounded-xl border-l-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300', item.color)}>
                  <h4 className="font-semibold text-foreground">{item.title[language]}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc[language]}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* B) Photo Section: Do / Don't */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          <motion.div variants={itemVariants} className="card-elevated p-6 rounded-xl border-l-4 border-green-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✅</span>
              <h4 className="font-semibold text-foreground">
                {t(language, 'Richtiges Bewerbungsfoto', 'Правильное фото', 'Акси дуруст')}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">
              {t(
                language,
                'Professionelles Studiofoto: neutraler Hintergrund, berufsentsprechende Kleidung, freundlicher Ausdruck mit leichtem Lächeln',
                'Профессиональное студийное фото: нейтральный фон, одежда по профессии, приветливое выражение с лёгкой улыбкой',
                'Акси касбии студия: заминаи бетараф, либоси мувофиқи касб, ифодаи дӯстона бо табассуми сабук'
              )}
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="card-elevated p-6 rounded-xl border-l-4 border-red-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">❌</span>
              <h4 className="font-semibold text-foreground">
                {t(language, 'Vermeiden', 'Избегать', 'Пешгирӣ кунед')}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">
              {t(
                language,
                'Selfies, Urlaubsfotos, Partybilder, ausgeschnittene Gruppenfotos, Ganzkörperaufnahmen — sofortige Disqualifikation',
                'Селфи, фото из отпуска, с вечеринок, вырезанные из групповых, в полный рост — мгновенная дисквалификация',
                'Селфи, аксҳо аз рухсатӣ, зиёфат, буридашуда аз гурӯҳӣ, қомати пурра — дисквалификатсияи фаврӣ'
              )}
            </p>
          </motion.div>
        </motion.div>

        {/* C) Personal Data: Include vs Exclude */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          <motion.div variants={itemVariants} className="card-elevated p-6 rounded-xl">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              {t(language, 'Angeben', 'Указывать', 'Нишон диҳед')}
            </h4>
            <ul className="space-y-3">
              {includeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  {item[language]}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="card-elevated p-6 rounded-xl">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              {t(language, 'Weglassen', 'Не указывать', 'Нишон надиҳед')}
            </h4>
            <ul className="space-y-3">
              {excludeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  {item[language]}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* D) CV Gaps: Before / After */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">
            {t(
              language,
              'Lücken im Lebenslauf richtig erklären',
              'Как правильно объяснить пробелы в резюме',
              'Фосилаҳо дар резюмеро чӣ тавр дуруст шарҳ додан'
            )}
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            {gapItems.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-3 card-elevated p-4 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-1 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg px-4 py-2 text-sm font-medium text-center">
                  ❌ {item.bad[language]}
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg px-4 py-2 text-sm font-medium text-center">
                  ✅ {item.good[language]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* E) Tips for candidates without German experience */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-elevated p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <Lightbulb className="w-8 h-8 text-amber-500 mb-3" />
                <p className="text-sm text-muted-foreground">{tip[language]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* F) CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg">
            <Link to="/cv-generator">
              {t(language, 'Jetzt Lebenslauf erstellen', 'Создать резюме сейчас', 'Ҳозир резюме эҷод кунед')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Step3CV;
