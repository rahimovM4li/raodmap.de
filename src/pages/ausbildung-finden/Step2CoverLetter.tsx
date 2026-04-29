import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Mail,
  User,
  MapPin,
  Calendar,
  Type,
  MessageSquare,
  Layers,
  HandMetal,
  PenTool,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Step2CoverLetterProps {
  onStepVisible: () => void;
}

const STORAGE_KEY = 'ausbildung-finden-checklist';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

type Lang = 'de' | 'ru' | 'tj';

const t = (de: string, ru: string, tj: string, language: Lang) =>
  language === 'de' ? de : language === 'ru' ? ru : tj;

// DIN 5008 letter areas
const letterAreas = [
  {
    id: 1,
    label: { de: 'Absender', ru: 'Отправитель', tj: 'Фиристанда' },
    desc: {
      de: 'Name, Adresse, Telefon (international), professionelle E-Mail',
      ru: 'Имя, адрес, телефон (международный), профессиональный email',
      tj: 'Ном, суроға, телефон (байналмилалӣ), email-и касбӣ',
    },
    position: 'self-end text-right',
  },
  {
    id: 2,
    label: { de: 'Empfänger', ru: 'Получатель', tj: 'Гиранда' },
    desc: {
      de: '4,5 cm vom oberen Rand. Firmenname, Ansprechpartner, Adresse',
      ru: '4,5 см от верхнего края. Название компании, контактное лицо, адрес',
      tj: '4,5 см аз канори боло. Номи ширкат, шахси тамос, суроға',
    },
    position: 'self-start text-left',
  },
  {
    id: 3,
    label: { de: 'Ort, Datum', ru: 'Место, дата', tj: 'Ҷой, сана' },
    desc: {
      de: 'Rechtsbündig: Stadt, Datum (z.B. Dushanbe, 20. Januar 2026)',
      ru: 'По правому краю: город, дата (напр. Dushanbe, 20. Januar 2026)',
      tj: 'Дар канори рост: шаҳр, сана (масалан, Dushanbe, 20. Januar 2026)',
    },
    position: 'self-end text-right',
  },
  {
    id: 4,
    label: { de: 'Betreff', ru: 'Тема', tj: 'Мавзӯъ' },
    desc: {
      de: "Fett, ohne 'Betreff:'. Exakte Ausbildungsbezeichnung und Startjahr",
      ru: "Жирным, без 'Betreff:'. Точное название Ausbildung и год начала",
      tj: "Бо ҳуруфоти ғафс, бидуни 'Betreff:'. Номи дақиқи Ausbildung ва соли оғоз",
    },
    position: 'self-start text-left font-bold',
  },
  {
    id: 5,
    label: { de: 'Einleitung', ru: 'Вступление', tj: 'Муқаддима' },
    desc: {
      de: "Starker erster Absatz nach der Anrede. Kein 'Hiermit bewerbe ich mich...'",
      ru: "Мощный первый абзац после обращения. Без 'Hiermit bewerbe ich mich...'",
      tj: "Сархати аввалини пурқувват пас аз муроҷиат. Бидуни 'Hiermit bewerbe ich mich...'",
    },
    position: 'self-start text-left',
  },
  {
    id: 6,
    label: { de: 'Hauptteil', ru: 'Основная часть', tj: 'Қисми асосӣ' },
    desc: {
      de: 'Kompetenzen mit Stellenanforderungen verknüpfen. Soft Skills zeigen',
      ru: 'Связь компетенций с требованиями вакансии. Демонстрация Soft Skills',
      tj: 'Пайвасти салоҳиятҳо бо талаботи ҷойи холӣ. Намоиши Soft Skills',
    },
    position: 'self-start text-left',
  },
  {
    id: 7,
    label: { de: 'Schluss', ru: 'Заключение', tj: 'Хулоса' },
    desc: {
      de: "Gesprächsbereitschaft im Indikativ (kein Konjunktiv!). 'Mit freundlichen Grüßen'",
      ru: 'Готовность к интервью в изъявительном наклонении (без сослагательного!)',
      tj: "Омодагӣ ба мусоҳиба бидуни сиғаи шартӣ. 'Mit freundlichen Grüßen'",
    },
    position: 'self-start text-left',
  },
  {
    id: 8,
    label: { de: 'Unterschrift', ru: 'Подпись', tj: 'Имзо' },
    desc: {
      de: '3 Leerzeilen für handschriftliche Unterschrift (digital: gescannte Unterschrift)',
      ru: '3 пустые строки для подписи (цифровая: скан ручной подписи)',
      tj: '3 сатри холӣ барои имзо (рақамӣ: скани имзои дастӣ)',
    },
    position: 'self-start text-left',
  },
];

const introductionPhrases = [
  {
    de: 'Die ausgeschriebene Stelle im Bereich [Bereich] hat mich sofort angesprochen, denn genau hier kann ich meine Leidenschaft für [Thema] optimal einbringen.',
    ru: 'Объявленная вакансия в области [область] сразу привлекла моё внимание, потому что именно здесь я могу оптимально применить свою страсть к [тема].',
    tj: 'Ҷойи холии эълоншуда дар соҳаи [соҳа] фавран диққати маро ҷалб кард, зеро маҳз дар ин ҷо ман шавқу ҳаваси худро ба [мавзӯъ] бо роҳи беҳтарин истифода бурда метавонам.',
  },
  {
    de: 'Schon seit meiner Schulzeit fasziniert mich Technik. Daher ist eine Ausbildung zum [Beruf] bei einem innovativen Unternehmen wie der [Firma] mein absolutes Wunschziel.',
    ru: 'С школьных лет меня увлекает техника. Поэтому обучение на [профессия] в инновационной компании [фирма] — моя заветная цель.',
    tj: 'Аз давраи мактаб техника маро ба ҳайрат меоварад. Бинобар ин, таълими касбӣ барои [касб] дар ширкати навоварона чун [ширкат] ҳадафи ниҳоии ман аст.',
  },
  {
    de: 'Vielen Dank für das freundliche und informative Telefonat am [Datum], das mich in meinem Entschluss bestärkt hat, ein Teil Ihres Teams zu werden.',
    ru: 'Большое спасибо за дружелюбный и информативный телефонный разговор [дата], который укрепил моё решение стать частью вашей команды.',
    tj: 'Ташаккури зиёд барои гуфтугӯи телефонии дӯстона ва маълумотноки [сана], ки қарори маро барои узви дастаи шумо шудан мустаҳкам кард.',
  },
];

const closingPhrases = [
  {
    de: 'Ich freue mich darauf, meine Motivation und Qualifikationen in einem persönlichen Gespräch weiter zu vertiefen.',
    ru: 'Я с нетерпением жду возможности более подробно обсудить мою мотивацию и квалификацию на личной встрече.',
    tj: 'Ман интизори онам, ки мотиватсия ва малакаҳои худро дар мулоқоти шахсӣ муфассалтар баррасӣ кунам.',
  },
  {
    de: 'Gern überzeuge ich Sie in einem Vorstellungsgespräch – ob vor Ort oder per Video-Call – davon, wie ich Ihr Team bereichern kann.',
    ru: 'Буду рад убедить вас на собеседовании — очно или по видеозвонку — в том, как я могу обогатить вашу команду.',
    tj: 'Бо хурсандӣ шуморо дар мусоҳиба — рӯ ба рӯ ё тавассути видеозанг — боварӣ медиҳам, ки чӣ гуна дастаи шуморо ғанӣ карда метавонам.',
  },
  {
    de: 'Ich bin davon überzeugt, dass ich die perfekte Ergänzung für Ihr Team bin, und freue mich auf eine Einladung zu einem Vorstellungsgespräch.',
    ru: 'Я убеждён, что стану идеальным дополнением вашей команды, и с нетерпением жду приглашения на собеседование.',
    tj: 'Ман боварӣ дорам, ки иловаи комил барои дастаи шумо ҳастам ва интизори даъват ба мусоҳиба мебошам.',
  },
  {
    de: 'Für ein weiterführendes Gespräch stehe ich Ihnen gern per Video-Call zur Verfügung.',
    ru: 'Для дальнейшего разговора я с удовольствием доступен по видеозвонку.',
    tj: 'Барои гуфтугӯи минбаъда ман бо хурсандӣ тавассути видеозанг дастрасам.',
  },
];

const commonMistakes = [
  {
    title: { de: 'Formalizmus', ru: 'Чрезмерный формализм', tj: 'Формализми аз ҳад зиёд' },
    desc: {
      de: 'Veraltete, komplexe Konstruktionen aus 20 Jahre alten Lehrbüchern vermeiden. Modernes Geschäftsdeutsch ist klar und prägnant.',
      ru: 'Устаревшие конструкции из учебников 20-летней давности. Современный деловой немецкий ценит лаконичность.',
      tj: 'Сохторҳои кӯҳнашуда аз китобҳои 20 соли пеш. Забони тиҷоратии муосир ихчамиро қадр мекунад.',
    },
  },
  {
    title: { de: 'Copy-Paste', ru: 'Копипаст', tj: 'Копипаст' },
    desc: {
      de: 'AI-generierte oder Vorlagen-Texte ohne Personalisierung. HR erkennt das sofort.',
      ru: 'Использование ИИ-шаблонов без персонализации. HR это мгновенно видит.',
      tj: 'Истифодаи қолабҳои АИ бидуни фардӣ кардан. HR инро фавран мешиносад.',
    },
  },
  {
    title: { de: 'Egozentrismus', ru: 'Эгоцентризм', tj: 'Худмарказӣ' },
    desc: {
      de: "'Ich will', 'Ich brauche für Visum' statt zu zeigen, welchen Mehrwert man bringt.",
      ru: "'Я хочу', 'Мне нужно для визы' вместо пользы для компании.",
      tj: "'Ман мехоҳам', 'Барои виза лозим' ба ҷои фоида барои ширкат.",
    },
  },
  {
    title: { de: 'Falsche Anrede', ru: 'Неправильное обращение', tj: 'Муроҷиати нодуруст' },
    desc: {
      de: "'Frau [Vorname]' statt 'Frau [Nachname]'. Duzen ohne Angebot ist tabu.",
      ru: "'Frau [Имя]' вместо 'Frau [Фамилия]'. Тыканье без предложения — табу.",
      tj: "'Frau [Ном]' ба ҷои 'Frau [Насаб]'. Ту-гӯӣ бидуни пешниҳод — манъ.",
    },
  },
];

const checklistItems = [
  {
    de: 'Max 1 A4-Seite (6–10 Sätze)',
    ru: 'Максимум 1 страница А4 (6–10 предложений)',
    tj: 'Максимум 1 саҳифаи А4 (6-10 ҷумла)',
  },
  {
    de: 'Alle Ränder nach DIN 5008',
    ru: 'Все поля по стандарту DIN 5008',
    tj: 'Ҳамаи ҳошияҳо тибқи DIN 5008',
  },
  {
    de: 'Konkrete Kontaktperson gefunden',
    ru: 'Найдено конкретное контактное лицо',
    tj: 'Шахси мушаххаси тамос ёфт шуд',
  },
  {
    de: 'Betreff: exakte Ausbildung + Startjahr',
    ru: 'Тема: точное название Ausbildung + год',
    tj: 'Мавзӯъ: номи дақиқи Ausbildung + сол',
  },
  {
    de: "Originaler erster Absatz (kein 'Hiermit...')",
    ru: "Оригинальное вступление (без 'Hiermit...')",
    tj: "Муқаддимаи аслӣ (бидуни 'Hiermit...')",
  },
  {
    de: 'CV nicht nacherzählt, sondern erklärt',
    ru: 'Резюме не пересказано, а объяснено',
    tj: 'Резюме нақл нашуда, балки шарҳ дода шуда',
  },
  {
    de: 'Berufswahl begründet',
    ru: 'Выбор профессии обоснован',
    tj: 'Интихоби касб далелнок шуд',
  },
  {
    de: 'Firmenwahl mit Recherche belegt',
    ru: 'Выбор компании подкреплён исследованием',
    tj: 'Интихоби ширкат бо тадқиқот тасдиқ шуд',
  },
  {
    de: 'Schluss im Indikativ (kein würde/hätte)',
    ru: 'Заключение без сослагательного (без würde/hätte)',
    tj: 'Хулоса бидуни сиғаи шартӣ (бидуни würde/hätte)',
  },
  {
    de: 'Rechtschreibprüfung durchgeführt',
    ru: 'Орфография проверена',
    tj: 'Имло тафтиш карда шуд',
  },
];

const Step2CoverLetter: React.FC<Step2CoverLetterProps> = ({ onStepVisible }) => {
  const { language } = useLanguage();
  const lang = language as Lang;

  const [selectedArea, setSelectedArea] = useState<number | null>(null);

  const [checked, setChecked] = useState<boolean[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 10) return parsed;
      }
    } catch {
      // ignore
    }
    return new Array(10).fill(false);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleCheck = useCallback((index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const progress = Math.round((checked.filter(Boolean).length / checked.length) * 100);

  const areaIcons = [Mail, User, Calendar, Type, MessageSquare, Layers, HandMetal, PenTool];

  return (
    <motion.section
      {...fadeUp}
      onViewportEnter={onStepVisible}
      className="py-10 md:py-24 bg-secondary/30"
    >
      <div className="container-main">
        {/* Title */}
        <motion.div {...fadeUp} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <FileText className="h-4 w-4" />
            {t('Schritt 2', 'Шаг 2', 'Қадами 2', lang)}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t(
              'Anschreiben / Motivationsschreiben',
              'Сопроводительное письмо / Мотивационное письмо',
              'Номаи ҳамроҳкунанда / Номаи ҳавасмандкунӣ',
              lang
            )}
          </h2>
        </motion.div>

        {/* A) DIN 5008 Letter Mockup */}
        <motion.div {...fadeUp} className="mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t(
              'DIN-5008 Brief-Struktur',
              'Структура письма DIN-5008',
              'Сохтори мактуб DIN-5008',
              lang
            )}
          </h3>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 relative bg-white dark:bg-gray-950">
            <div className="flex flex-col gap-3">
              {letterAreas.map((area, idx) => {
                const Icon = areaIcons[idx];
                const isSelected = selectedArea === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSelectedArea(isSelected ? null : area.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-md border px-4 py-3 text-left transition-all duration-200 w-full',
                      area.position.includes('self-end') && 'md:ml-auto md:w-2/3',
                      area.position.includes('self-start') && 'md:mr-auto md:w-2/3',
                      area.position.includes('font-bold') && 'font-bold',
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50'
                    )}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {area.id}
                    </span>
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {area.label[lang]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Description panel */}
            {selectedArea !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 rounded-md border border-primary/30 bg-primary/5 p-4"
              >
                <p className="text-sm text-foreground">
                  <span className="font-semibold text-primary mr-1">
                    {letterAreas[selectedArea - 1].label[lang]}:
                  </span>
                  {letterAreas[selectedArea - 1].desc[lang]}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* B) Sample Phrases Tabs */}
        <motion.div {...fadeUp} className="mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t('Beispiel-Formulierungen', 'Примеры формулировок', 'Намунаҳои ибораҳо', lang)}
          </h3>
          <Tabs defaultValue="intro" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="intro">
                {t('Einleitung', 'Вступление', 'Муқаддима', lang)}
              </TabsTrigger>
              <TabsTrigger value="closing">
                {t('Schluss', 'Заключение', 'Хулоса', lang)}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intro">
              <div className="grid gap-4">
                {introductionPhrases.map((phrase, idx) => (
                  <div
                    key={idx}
                    className="card-elevated p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                      „{phrase.de}"
                    </p>
                    {lang !== 'de' && (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {phrase[lang]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="closing">
              <div className="grid gap-4">
                {closingPhrases.map((phrase, idx) => (
                  <div
                    key={idx}
                    className="card-elevated p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                      „{phrase.de}"
                    </p>
                    {lang !== 'de' && (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {phrase[lang]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* C) Common Mistakes */}
        <motion.div {...fadeUp} className="mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t('Typische Fehler', 'Типичные ошибки', 'Хатоҳои маъмулӣ', lang)}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-1">
                      {mistake.title[lang]}
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-300/80 leading-relaxed">
                      {mistake.desc[lang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* D) Anschreiben vs Motivationsschreiben */}
        <motion.div {...fadeUp} className="mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t(
              'Anschreiben vs. Motivationsschreiben',
              'Anschreiben vs. Motivationsschreiben',
              'Anschreiben vs. Motivationsschreiben',
              lang
            )}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="card-elevated p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-foreground">Anschreiben</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(
                  'Pflicht. Max 1 Seite. An konkrete Stelle gebunden. Verknüpft Profil mit Anforderungen.',
                  'Обязательный. Макс. 1 страница. Привязан к вакансии. Связывает профиль с требованиями.',
                  'Ҳатмӣ. Макс. 1 саҳифа. Ба ҷойи холӣ вобаста. Профилро бо талабот мепайвандад.',
                  lang
                )}
              </p>
            </div>
            <div className="card-elevated p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <h4 className="font-semibold text-foreground">Motivationsschreiben</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(
                  "Optional ('Dritte Seite'). Für Ausbildung selten nötig. Persönliche Philosophie und Lebensziele.",
                  'Опциональный (\'Третья страница\'). Для Ausbildung редко нужен. Личная философия и жизненные цели.',
                  "Ихтиёрӣ ('Саҳифаи сеюм'). Барои Ausbildung кам лозим аст. Фалсафаи шахсӣ ва ҳадафҳои ҳаётӣ.",
                  lang
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* E) Interactive Checklist */}
        <motion.div {...fadeUp}>
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t('Checkliste Anschreiben', 'Чек-лист Anschreiben', 'Чек-листи Anschreiben', lang)}
          </h3>
          <div className="card-elevated p-4 md:p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {t('Fortschritt', 'Прогресс', 'Пешрафт', lang)}
                </span>
                <span className="text-sm font-semibold text-primary">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="space-y-3">
              {checklistItems.map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={checked[idx]}
                    onCheckedChange={() => toggleCheck(idx)}
                    className="mt-0.5"
                  />
                  <span
                    className={cn(
                      'text-sm leading-relaxed transition-colors',
                      checked[idx]
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground group-hover:text-primary'
                    )}
                  >
                    {item[lang]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Step2CoverLetter;
