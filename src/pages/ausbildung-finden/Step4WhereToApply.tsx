import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, ShieldAlert, ChevronDown, Briefcase, UserPlus, Upload, Search, Clock, RefreshCw, CheckCircle2, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Step4WhereToApplyProps {
  onStepVisible: () => void;
}

type Lang = 'de' | 'ru' | 'tj';

const t = (de: string, ru: string, tj: string, lang: Lang) =>
  lang === 'de' ? de : lang === 'ru' ? ru : tj;

const platforms = [
  {
    name: 'ausbildung.de',
    url: 'https://www.ausbildung.de',
    de: 'Größte private Plattform. Berufs-Enzyklopädie, Gehaltsstatistik, KI-Tools',
    ru: 'Крупнейшая частная платформа. Энциклопедия профессий, статистика зарплат, ИИ-инструменты',
    tj: 'Бузургтарин платформаи хусусӣ. Энсиклопедияи касбҳо, омори маош, воситаҳои АИ',
  },
  {
    name: 'arbeitsagentur.de',
    url: 'https://www.arbeitsagentur.de',
    de: 'Offizielles Bundesportal. Vollständigste Datenbank inkl. Kleinbetriebe',
    ru: 'Официальный федеральный портал. Самая полная база включая малый бизнес',
    tj: 'Портали расмии федералӣ. Пурратарин пойгоҳ бо тиҷорати хурд',
  },
  {
    name: 'aubi-plus.de',
    url: 'https://www.aubi-plus.de',
    de: 'Starke Filter nach Startjahr. Blitzbewerbung-Funktion',
    ru: 'Мощные фильтры по году старта. Функция быстрого отклика',
    tj: 'Филтрҳои пуриқтидор аз рӯи соли оғоз. Функсияи муроҷиати зуд',
  },
  {
    name: 'ihk-lehrstellenboerse.de',
    url: 'https://www.ihk-lehrstellenboerse.de',
    de: 'Offizielle IHK-Börse. Handel, Banken, Logistik, Industrie',
    ru: 'Официальная биржа IHK. Торговля, банки, логистика, промышленность',
    tj: 'Биржаи расмии IHK. Тиҷорат, бонкҳо, логистика, саноат',
  },
  {
    name: 'handwerkskammer.de',
    url: 'https://www.handwerkskammer.de',
    de: 'Handwerkskammer-Netzwerk. Mechaniker, Elektriker, Tischler, Bäcker',
    ru: 'Сеть Ремесленной палаты. Механики, электрики, столяры, пекари',
    tj: 'Шабакаи Палатаи ҳунармандӣ. Механикҳо, электрикҳо, дуредгарон, нонпазҳо',
  },
  {
    name: 'azubiyo.de',
    url: 'https://www.azubiyo.de',
    de: 'Matching-Test System. Psychologisches Profil → passende Stellen',
    ru: 'Система Matching-Test. Психологический профиль → подходящие вакансии',
    tj: 'Системаи Matching-Test. Профили психологӣ → ҷойҳои мувофиқ',
  },
  {
    name: 'LinkedIn / Xing',
    url: 'https://www.linkedin.com',
    de: 'Für IT, Marketing, Office. Weniger für Handwerk',
    ru: 'Для IT, маркетинга, офиса. Менее эффективно для ремесла',
    tj: 'Барои IT, маркетинг, офис. Барои ҳунармандӣ камтар самаранок',
  },
];

const timelineData = [
  {
    industry: { de: 'Banken, Finanzen, Versicherung', ru: 'Банки, финансы, страхование', tj: 'Бонкҳо, молия, суғурта' },
    window: 'Aug–Okt 2025',
    color: 'blue',
    note: {
      de: 'Frühester Zyklus. Sparkasse, Allianz füllen fast 1 Jahr vorher',
      ru: 'Самый ранний цикл. Sparkasse, Allianz закрывают за год',
      tj: 'Давраи аз ҳама барвақт. Sparkasse, Allianz як сол пеш мепӯшанд',
    },
  },
  {
    industry: { de: 'Staatsdienst (Polizei, Verwaltung)', ru: 'Госслужба (полиция, управление)', tj: 'Хизмати давлатӣ (полис, идоракунӣ)' },
    window: 'Sep–Nov 2025',
    color: 'purple',
    note: {
      de: 'Langwierige Tests und Überprüfungen',
      ru: 'Длительное тестирование и проверки',
      tj: 'Тесткунии дарозмуддат ва тафтишот',
    },
  },
  {
    industry: { de: 'IT, Medien, Logistik', ru: 'IT, медиа, логистика', tj: 'IT, расонаҳо, логистика' },
    window: 'Sep 2025–Jan 2026',
    color: 'green',
    note: {
      de: 'Aktive Phase. Viele nehmen bis Weihnachten an',
      ru: 'Активный период. Многие принимают до Рождества',
      tj: 'Давраи фаъол. Бисёриҳо то Мавлуди Исо қабул мекунанд',
    },
  },
  {
    industry: { de: 'Gesundheit & Pflege', ru: 'Здравоохранение и уход', tj: 'Тандурустӣ ва нигоҳубин' },
    window: 'Nov 2025–Feb 2026',
    color: 'red',
    note: {
      de: 'Akuter Mangel = längeres Bewerbungsfenster',
      ru: 'Острая нехватка = более длинное окно подачи',
      tj: 'Норасоии шадид = равзанаи дарозтари пешниҳод',
    },
  },
  {
    industry: { de: 'Handwerk, Kleinbetriebe, Gastronomie', ru: 'Ремесло, малый бизнес, гастрономия', tj: 'Ҳунармандӣ, тиҷорати хурд, гастрономия' },
    window: 'Jan–Mai 2026',
    color: 'orange',
    note: {
      de: 'Maximale Flexibilität. Last-Minute-Plätze bis Sommer',
      ru: 'Максимальная гибкость. Last-Minute-Plätze до лета',
      tj: 'Тағйирпазирии максималӣ. Last-Minute-Plätze то тобистон',
    },
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  blue: { border: 'border-l-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-300' },
  purple: { border: 'border-l-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300' },
  green: { border: 'border-l-green-500', bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-700 dark:text-green-300' },
  red: { border: 'border-l-red-500', bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-700 dark:text-red-300' },
  orange: { border: 'border-l-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-700 dark:text-orange-300' },
};

const stats = [
  {
    value: '200–300',
    de: 'Bewerbungen sind normal',
    ru: 'заявок — это нормально',
    tj: 'дархост — ин муқаррарист',
    target: 300,
  },
  {
    value: '5–10%',
    de: 'Konversionsrate (Einladungen)',
    ru: 'конверсия (приглашения)',
    tj: 'табдил (даъватномаҳо)',
    target: 10,
  },
  {
    value: '30–40%',
    de: 'Verdeckter Arbeitsmarkt',
    ru: 'скрытый рынок труда',
    tj: 'бозори пинҳонии меҳнат',
    target: 40,
  },
];

const scamFlags = [
  {
    title: { de: 'Zahlung verlangt', ru: 'Требование оплаты', tj: 'Талаби пардохт' },
    desc: {
      de: 'Echte Arbeitgeber verlangen nie Geld für Vermittlung, Verträge oder Visa',
      ru: 'Настоящие работодатели никогда не просят деньги',
      tj: 'Корфармоёни воқеӣ ҳеҷ гоҳ пул намепурсанд',
    },
  },
  {
    title: { de: 'Nur informelle Kanäle', ru: 'Только неформальные каналы', tj: 'Танҳо каналҳои ғайрирасмӣ' },
    desc: {
      de: 'Telegram/WhatsApp/Gmail statt Firmendomain',
      ru: 'Telegram/WhatsApp/Gmail вместо корпоративного домена',
      tj: 'Telegram/WhatsApp/Gmail ба ҷои домени корпоративӣ',
    },
  },
  {
    title: { de: 'Unrealistische Bedingungen', ru: 'Нереальные условия', tj: 'Шартҳои ғайривоқеӣ' },
    desc: {
      de: '3000€ Gehalt ohne Qualifikation, nur Homeoffice',
      ru: '3000€ зарплата без квалификации, только Homeoffice',
      tj: '3000€ маош бидуни тахассус, танҳо Homeoffice',
    },
  },
  {
    title: { de: 'Dokumente vor Videocall', ru: 'Документы до видеозвонка', tj: 'Ҳуҷҷатҳо пеш аз видеозанг' },
    desc: {
      de: 'Passscan + Bankdaten vor erstem Gespräch',
      ru: 'Скан паспорта + банк. реквизиты до первого разговора',
      tj: 'Скани шиносномаи хориҷӣ + реквизитҳои бонкӣ пеш аз сӯҳбати аввал',
    },
  },
  {
    title: { de: 'Zeitdruck', ru: 'Давление временем', tj: 'Фишор бо вақт' },
    desc: {
      de: "'Unterschreibe in 24h oder Platz geht an jemand anderen'",
      ru: "'Подпишите за 24 часа или место отдадут другому'",
      tj: "'Дар 24 соат имзо кунед ё ҷойро ба каси дигар медиҳем'",
    },
  },
];

function AnimatedCounter({ target, finalText, label, lang }: { target: number; finalText: string; label: string; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
        setDone(true);
      }
      setCount(current);
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-5xl font-bold text-primary">
        {done ? finalText : count}
      </div>
      <p className="mt-2 text-muted-foreground">{label}</p>
    </div>
  );
}

const Step4WhereToApply = ({ onStepVisible }: Step4WhereToApplyProps) => {
  const { language } = useLanguage();
  const lang = language as Lang;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [initiativOpen, setInitiativOpen] = useState(false);

  useEffect(() => {
    if (isInView) onStepVisible();
  }, [isInView, onStepVisible]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section ref={sectionRef} className="py-10 md:py-24 bg-secondary/30">
      <div className="container-main">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-foreground mb-10"
        >
          {t(
            'Schritt 4: Wo bewerben und wie',
            'Шаг 4: Где искать и как откликаться',
            'Қадами 4: Дар куҷо ҷустуҷӯ кардан ва чӣ гуна муроҷиат кардан',
            lang
          )}
        </motion.h2>

        {/* A) Platform Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {platforms.map((p) => (
            <motion.a
              key={p.name}
              variants={itemVariants}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-elevated p-5 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
              <p className="text-sm text-muted-foreground">{p[lang]}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* A2) Bewerbungsprozess Schritt für Schritt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            {t(
              'Bewerbungsprozess: So funktioniert es',
              'Процесс подачи заявки: как это работает',
              'Раванди дархост: чӣ тавр кор мекунад',
              lang
            )}
          </h3>
          <div className="space-y-4">
            {[
              {
                icon: UserPlus,
                num: 1,
                title: { de: 'Auf Plattform registrieren', ru: 'Зарегистрироваться на платформе', tj: 'Дар платформа бақайдгирӣ шудан' },
                desc: { de: 'Profil erstellen, E-Mail bestätigen, Foto hochladen', ru: 'Создать профиль, подтвердить email, загрузить фото', tj: 'Профил сохтан, email тасдиқ кардан, акс бор кардан' },
              },
              {
                icon: Upload,
                num: 2,
                title: { de: 'Unterlagen hochladen', ru: 'Загрузить документы', tj: 'Ҳуҷҷатҳоро бор кардан' },
                desc: { de: 'Lebenslauf, Anschreiben und Zeugnisse als PDF hochladen', ru: 'Загрузить резюме, сопроводительное письмо и аттестаты в PDF', tj: 'Резюме, номаи ҳамроҳ ва шаҳодатномаҳоро ҳамчун PDF бор кардан' },
              },
              {
                icon: Search,
                num: 3,
                title: { de: 'Stelle suchen & bewerben', ru: 'Найти вакансию и подать заявку', tj: 'Ҷои корро ёфтан ва дархост додан' },
                desc: { de: 'Filter nutzen (Stadt, Beruf, Startdatum), auf „Bewerben" klicken', ru: 'Использовать фильтры (город, профессия, дата старта), нажать «Подать»', tj: 'Филтрҳоро истифода баред (шаҳр, касб, санаи оғоз), «Дархост»-ро пахш кунед' },
              },
              {
                icon: Clock,
                num: 4,
                title: { de: 'Auf Antwort warten (2–6 Wochen)', ru: 'Ждать ответ (2–6 недель)', tj: 'Интизори ҷавоб (2–6 ҳафта)' },
                desc: { de: 'Das ist normal! In dieser Zeit weitere Bewerbungen schicken', ru: 'Это нормально! В это время отправляйте ещё заявки', tj: 'Ин муқаррарист! Дар ин вақт дархостҳои дигар фиристед' },
              },
              {
                icon: RefreshCw,
                num: 5,
                title: { de: 'Bei Absage — sofort weitermachen!', ru: 'При отказе — сразу продолжать!', tj: 'Ҳангоми рад — фавран давом диҳед!' },
                desc: { de: 'Nicht aufgeben. Die nächste Bewerbung am selben Tag schicken', ru: 'Не сдаваться. Отправить следующую заявку в тот же день', tj: 'Қафо нагардед. Дархости навбатиро ҳамон рӯз фиристед' },
              },
            ].map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: step.num * 0.1 }}
                className="flex items-start gap-4 card-elevated p-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center">{step.num}</span>
                    <h4 className="font-semibold text-foreground">{step.title[lang]}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{step.desc[lang]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* B) Application Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            {t(
              'Bewerbungszeiträume nach Branche (Start Aug/Sep 2026)',
              'Сроки подачи по отраслям (старт авг/сен 2026)',
              'Мӯҳлатҳои пешниҳод аз рӯи соҳа (оғоз авг/сен 2026)',
              lang
            )}
          </h3>
          <div className="space-y-3">
            {timelineData.map((row, i) => {
              const c = colorMap[row.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={cn(
                    'rounded-lg border-l-4 p-4',
                    c.border,
                    c.bg
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="font-semibold text-foreground">
                      {row.industry[lang]}
                    </span>
                    <span className={cn('text-sm font-medium', c.text)}>
                      {row.window}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{row.note[lang]}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* C) Animated Statistics Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 py-10"
        >
          {stats.map((s) => (
            <AnimatedCounter
              key={s.value}
              target={s.target}
              finalText={s.value}
              label={s[lang]}
              lang={lang}
            />
          ))}
        </motion.div>

        {/* C2) Absagen sind normal — Motivationsbox */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
            <h3 className="text-lg md:text-xl font-bold text-green-700 dark:text-green-300">
              {t(
                'Absagen sind völlig normal!',
                'Отказы — это абсолютно нормально!',
                'Рад кардан — ин пурра муқаррарист!',
                lang
              )}
            </h3>
          </div>
          <div className="space-y-3">
            {[
              {
                de: '200–300 Bewerbungen zu schicken ist der Normalfall in Deutschland — nicht die Ausnahme.',
                ru: 'Отправить 200–300 заявок — это норма в Германии, а не исключение.',
                tj: '200–300 дархост фиристодан дар Олмон муқаррарист — на истисно.',
              },
              {
                de: '90–95% Absagen sind Standard. Das liegt nicht an dir — der Wettbewerb ist einfach groß.',
                ru: '90–95% отказов — это стандарт. Дело не в тебе — конкуренция просто высокая.',
                tj: '90–95% рад кардан стандарт аст. Ин аз сабаби ту нест — рақобат зиёд аст.',
              },
              {
                de: 'Jede Absage bringt dich näher zum Ziel. Die eine Zusage kommt — bleib dran!',
                ru: 'Каждый отказ приближает тебя к цели. Одно «да» придёт — не сдавайся!',
                tj: 'Ҳар як рад кардан туро ба мақсад наздиктар мекунад. Як «ҳа» меояд — қафо нагард!',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <p className="text-sm text-green-700 dark:text-green-300">{item[lang]}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              {t(
                '💡 Tipp: Schicke jeden Tag 3–5 Bewerbungen. Nach 2 Monaten hast du 200+ geschafft!',
                '💡 Совет: Отправляй 3–5 заявок в день. Через 2 месяца у тебя будет 200+!',
                '💡 Маслиҳат: Ҳар рӯз 3–5 дархост фиристед. Пас аз 2 моҳ шумо 200+ доред!',
                lang
              )}
            </p>
          </div>
        </motion.div>

        {/* D) Scam Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
            <h3 className="text-lg md:text-xl font-bold text-red-700 dark:text-red-300">
              {t(
                'Warnung: So erkennst du Betrug (Job Scamming)',
                'Предупреждение: Как отличить мошенничество',
                'Огоҳӣ: Чӣ тавр қаллобиро шинохтан мумкин аст',
                lang
              )}
            </h3>
          </div>
          <Accordion type="single" collapsible className="space-y-1">
            {scamFlags.map((flag, i) => (
              <AccordionItem key={i} value={`scam-${i}`} className="border-red-200 dark:border-red-800">
                <AccordionTrigger className="text-red-700 dark:text-red-300 hover:no-underline text-sm font-medium">
                  {flag.title[lang]}
                </AccordionTrigger>
                <AccordionContent className="text-red-600 dark:text-red-400 text-sm">
                  {flag.desc[lang]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* E) Initiativbewerbung */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-elevated p-6"
        >
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
            {t(
              'Initiativbewerbung: Der versteckte Arbeitsmarkt',
              'Инициативная заявка: скрытый рынок труда',
              'Дархости ташаббускорӣ: бозори пинҳонии меҳнат',
              lang
            )}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {t(
              '30–40% der Ausbildungsplätze werden nie öffentlich ausgeschrieben.',
              '30–40% мест никогда не публикуются открыто.',
              '30-40% ҷойҳо ҳеҷ гоҳ ба таври ошкоро нашр намешаванд.',
              lang
            )}
          </p>

          {!initiativOpen && (
            <button
              onClick={() => setInitiativOpen(true)}
              className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
            >
              {t('Mehr erfahren', 'Узнать больше', 'Бештар хондан', lang)}
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          <motion.div
            initial={false}
            animate={{ height: initiativOpen ? 'auto' : 0, opacity: initiativOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground pt-3">
              {t(
                'Recherchiere die Firma, finde den HR-Kontakt, rufe an und sende dann: „Initiativbewerbung als Auszubildender im Bereich [Beruf]". Zeige, warum genau diese Firma (Produkte, Werte, Marktposition).',
                'Изучите компанию, найдите HR-контакт, позвоните и отправьте: „Initiativbewerbung als Auszubildender im Bereich [Профессия]". Покажите, почему именно эта компания.',
                'Ширкатро омӯзед, тамоси HR-ро ёбед, занг занед ва фиристед: „Initiativbewerbung als Auszubildender im Bereich [Касб]". Нишон диҳед, ки чаро маҳз ҳамин ширкат.',
                lang
              )}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Step4WhereToApply;
