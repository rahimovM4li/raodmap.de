import { motion } from 'framer-motion';
import {
  FileText,
  Camera,
  Award,
  Languages,
  Briefcase,
  Layout,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Step1DocumentsProps {
  onStepVisible: () => void;
}

export default function Step1Documents({ onStepVisible }: Step1DocumentsProps) {
  const { language } = useLanguage();

  const t = (de: string, ru: string, tj: string) =>
    language === 'de' ? de : language === 'ru' ? ru : tj;

  const documents = [
    {
      icon: FileText,
      title: t('Anschreiben', 'Сопроводительное письмо', 'Номаи ҳамроҳкунанда'),
      desc: t(
        'Max. 1 A4-Seite, Motivation und Berufswahl argumentieren',
        'Не более одной страницы А4, аргументация мотивации и выбора профессии',
        'На бештар аз як саҳифаи А4, далели ҳавасмандӣ ва интихоби касб',
      ),
    },
    {
      icon: Camera,
      title: t('Tabellarischer Lebenslauf', 'Табличное резюме', 'Резюмеи ҷадвалӣ'),
      desc: t(
        'Persönliche Daten, Bildung, Erfahrung, Kenntnisse',
        'Личные данные, образование, опыт и навыки',
        'Маълумоти шахсӣ, таҳсилот, таҷриба ва малакаҳо',
      ),
    },
    {
      icon: Award,
      title: t('Zeugnisse', 'Документы об образовании', 'Ҳуҷҷатҳо дар бораи таҳсилот'),
      desc: t(
        'Schulabschluss mit übersetztem Notenblatt',
        'Школьный аттестат с переведенным приложением с оценками',
        'Шаҳодатномаи мактабӣ бо замимаи тарҷумашудаи баҳоҳо',
      ),
    },
    {
      icon: Languages,
      title: t('Sprachzertifikate', 'Языковые сертификаты', 'Сертификатҳои забонӣ'),
      desc: t(
        'Goethe, Telc, ÖSD, TestDaF — mindestens B1 (B2 empfohlen)',
        'Goethe, Telc, ÖSD, TestDaF — минимум B1 (B2 рекомендуется)',
        'Goethe, Telc, ÖSD, TestDaF — на камтар аз B1 (B2 тавсия мешавад)',
      ),
    },
    {
      icon: Briefcase,
      title: t('Praktikumszeugnisse', 'Сертификаты о практике', 'Сертификатҳои таҷрибаомӯзӣ'),
      desc: t(
        'Arbeitserfahrung, Praktika, Ehrenamt',
        'Опыт работы, стажировки, волонтерство',
        'Таҷрибаи корӣ, таҷрибаомӯзӣ, волонтёрӣ',
      ),
    },
    {
      icon: Layout,
      title: t('Deckblatt', 'Титульный лист', 'Саҳифаи унвонӣ'),
      desc: t(
        'Optional: Foto, Kontaktdaten, Dokumentenliste',
        'Опционально: фото, контакты, список документов',
        'Ихтиёрӣ: акс, тамосҳо, рӯйхати ҳуҷҷатҳо',
      ),
    },
  ];

  const dos = [
    t(
      'Alle Dokumente in einem PDF (max 5 MB)',
      'Объединять все документы в один PDF (до 5 МБ)',
      'Якҷоя кардани ҳамаи ҳуҷҷатҳо дар як файли PDF (то 5 МБ)',
    ),
    t(
      'Klassische Schriften: Arial, Calibri, 11-12pt',
      'Классические шрифты: Arial, Calibri, 11-12pt',
      'Ҳуруфотҳои классикӣ: Arial, Calibri, 11-12pt',
    ),
    t(
      'Konkreten Ansprechpartner nennen (z.Hd. Frau Müller)',
      'Обращаться к конкретному лицу (z.Hd. Frau Müller)',
      'Муроҷиат ба шахси мушаххас (z.Hd. Frau Müller)',
    ),
    t(
      'PDF klar benennen (Bewerbung_Name_Beruf.pdf)',
      'Понятные названия файлов (Bewerbung_Name_Beruf.pdf)',
      'Номҳои фаҳмои файлҳо (Bewerbung_Name_Beruf.pdf)',
    ),
  ];

  const donts = [
    t(
      'JPEG-Handyfotos oder 10 separate Dateien senden',
      'Отправлять JPEG-фото с телефона или 10 разных файлов',
      'Ирсоли аксҳои JPEG аз телефон ё 10 файли гуногун',
    ),
    t(
      'Comic Sans oder bunte Farbschemen verwenden',
      'Использовать Comic Sans или нестандартные цвета',
      'Истифодаи Comic Sans ё рангҳои ғайристандартӣ',
    ),
    t(
      "'Sehr geehrte Damen und Herren' wenn Name bekannt",
      "'Sehr geehrte Damen und Herren' если имя HR указано",
      "'Sehr geehrte Damen und Herren' агар номи HR маълум бошад",
    ),
    t(
      'Dateien als Document_final_new.pdf senden',
      'Отправлять файлы как Document_final_new.pdf',
      'Ирсоли файлҳо ҳамчун Document_final_new.pdf',
    ),
  ];

  const translationCards = [
    {
      title: t('Für Arbeitgeber', 'Для работодателя', 'Барои корфармо'),
      desc: t(
        'Qualitätsscans, ins Deutsche übersetzt. Notarielle Beglaubigung selten nötig.',
        'Качественные сканы, переведенные на немецкий. Нотариальное заверение редко требуется.',
        'Нусхаҳои сканершудаи босифат, ба олмонӣ тарҷумашуда. Тасдиқи нотариалӣ кам талаб мешавад.',
      ),
    },
    {
      title: t('Für Botschaft', 'Для посольства', 'Барои сафорат'),
      desc: t(
        'Vereidigter Übersetzer erforderlich. Schulzeugnis muss offiziell übersetzt werden.',
        'Требуется присяжный переводчик. Школьный аттестат должен быть переведён официально.',
        'Тарҷумони қасамхӯрда лозим аст. Шаҳодатномаи мактабӣ бояд расман тарҷума шавад.',
      ),
    },
    {
      title: t('Anabin-Bewertung', 'Оценка Anabin', 'Баҳодиҳии Anabin'),
      desc: t(
        'Prüfung über anabin.kmk.org. Bestätigt Gleichwertigkeit des Abschlusses (H+ Status).',
        'Проверка через anabin.kmk.org. Подтверждает эквивалентность диплома (статус H+).',
        'Тафтиш тавассути anabin.kmk.org. Баробарарзишии дипломро тасдиқ мекунад (мақоми H+).',
      ),
    },
  ];

  const tips = [
    {
      emoji: '⚡',
      badge: t('Proaktiv', 'Проактивность', 'Фаъолият'),
      variant: 'default' as const,
      desc: t(
        'Zeige im Anschreiben, dass du den Visaprozess (Fachkräfteeinwanderungsgesetz) selbst recherchiert hast und bereit bist, die Verantwortung zu übernehmen.',
        'Продемонстрируйте в письме, что вы сами изучили процесс получения визы (Fachkräfteeinwanderungsgesetz) и готовы взять ответственность на себя.',
        'Дар нома нишон диҳед, ки шумо худатон раванди гирифтани визаро (Fachkräfteeinwanderungsgesetz) омӯхтаед ва омодаед масъулиятро ба дӯш гиред.',
      ),
    },
    {
      emoji: '⚡',
      badge: t('Kompensieren', 'Компенсация', 'Ҷуброн'),
      variant: 'default' as const,
      desc: t(
        'Ohne deutsche Erfahrung: Internationale Olympiaden, Online-Kurse auf Deutsch/Englisch, Mitarbeit im Familienbetrieb hervorheben.',
        'Без немецкого опыта: подчеркните участие в олимпиадах, онлайн-курсы на немецком/английском, помощь в семейном бизнесе.',
        'Бе таҷрибаи олмонӣ: иштирок дар олимпиадаҳо, курсҳои онлайнӣ бо забони олмонӣ/англисӣ, кӯмак дар тиҷорати оилавиро таъкид кунед.',
      ),
    },
    {
      emoji: '⚠️',
      badge: t('Warnung', 'Предупреждение', 'Огоҳӣ'),
      variant: 'destructive' as const,
      desc: t(
        'NIEMALS Originale per Post senden! In Deutschland werden Dokumente nach der Auswahl nicht zurückgegeben.',
        'НИКОГДА не отправляйте оригиналы по почте! В Германии документы не возвращаются после отбора.',
        'ҲЕҶ ГОҲ асли ҳуҷҷатҳоро тавассути почта нафиристед! Дар Олмон ҳуҷҷатҳо пас аз интихоб баргардонида намешаванд.',
      ),
    },
  ];

  return (
    <motion.section
      className="py-10 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onViewportEnter={onStepVisible}
    >
      <div className="container-main">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          {t(
            'Schritt 1: Bewerbungsunterlagen vorbereiten',
            'Шаг 1: Подготовка документов для подачи заявки',
            'Қадами 1: Омодасозии ҳуҷҷатҳо барои пешниҳоди дархост',
          )}
        </h2>

        {/* Intro */}
        <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-4xl">
          {t(
            'Der erste und grundlegende Schritt erfordert eine sorgfältige Sammlung und Aufbereitung der Dokumentation. Deutsche Arbeitgeber erwarten strikte Einhaltung bürokratischer Standards; jede Abweichung kann als mangelnde Motivation interpretiert werden.',
            'Первый и фундаментальный этап на пути к получению места для профессионального обучения требует скрупулезного сбора и оформления документации. Немецкие работодатели ожидают строгого соответствия установленным бюрократическим стандартам; любые отклонения от нормы могут быть интерпретированы как недостаток мотивации или неаккуратность.',
            'Марҳилаи аввал ва бунёдӣ дар роҳи дарёфти ҷойи таҳсилоти касбӣ ҷамъоварӣ ва барасмиятдарории дақиқи ҳуҷҷатҳоро талаб мекунад. Корфармоёни олмонӣ ва идораҳои давлатӣ риояи қатъии стандартҳои муқарраршудаи бюрократиро интизоранд; ҳама гуна дуршавӣ аз меъёр метавонад ҳамчун норасоии ҳавасмандӣ ё беэътиноӣ арзёбӣ шавад.',
          )}
        </p>

        {/* Accordion */}
        <Accordion type="multiple" className="space-y-4">
          {/* Item 1: Documents */}
          <AccordionItem value="documents" className="card-elevated rounded-lg border-none">
            <AccordionTrigger className="px-4 md:px-6 text-lg font-semibold hover:no-underline">
              {t(
                'Was gehört in die Bewerbungsmappe?',
                'Что входит в полный пакет документов?',
                'Ба бастаи пурраи ҳуҷҷатҳо чӣ дохил мешавад?',
              )}
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card-elevated p-4 md:p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <doc.icon className="h-8 w-8 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground mb-1">{doc.title}</h4>
                    <p className="text-sm text-muted-foreground">{doc.desc}</p>
                  </motion.div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Item 2: Translation / Certification */}
          <AccordionItem value="translation" className="card-elevated rounded-lg border-none">
            <AccordionTrigger className="px-4 md:px-6 text-lg font-semibold hover:no-underline">
              {t(
                'Welche Dokumente übersetzen/beglaubigen?',
                'Какие документы нужно переводить/заверять?',
                'Кадом ҳуҷҷатҳоро тарҷума/тасдиқ кардан лозим аст?',
              )}
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {translationCards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card-elevated p-4 md:p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <h4 className="font-semibold text-foreground mb-2">{card.title}</h4>
                    <p className="text-sm text-muted-foreground">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Item 4: Do's and Don'ts */}
          <AccordionItem value="dos-donts" className="card-elevated rounded-lg border-none">
            <AccordionTrigger className="px-4 md:px-6 text-lg font-semibold hover:no-underline">
              {t("Do's und Don'ts", 'Что можно и нельзя', 'Чӣ кор кардан мумкин ва чӣ манъ аст')}
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Do's */}
                <div className="rounded-lg bg-green-500/10 p-4 md:p-6 space-y-3">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Do&apos;s
                  </h4>
                  {dos.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-foreground">{item}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Don'ts */}
                <div className="rounded-lg bg-red-500/10 p-4 md:p-6 space-y-3">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Don&apos;ts
                  </h4>
                  {donts.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2"
                    >
                      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-foreground">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Item 5: Tips for Foreign Applicants */}
          <AccordionItem value="tips" className="card-elevated rounded-lg border-none">
            <AccordionTrigger className="px-4 md:px-6 text-lg font-semibold hover:no-underline">
              {t(
                'Tipps für ausländische Bewerber',
                'Практические советы для иностранных кандидатов',
                'Маслиҳатҳои амалӣ барои номзадҳои хориҷӣ',
              )}
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={cn(
                      'card-elevated p-4 md:p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
                      tip.variant === 'destructive' && 'border border-red-500/30',
                    )}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{tip.emoji}</span>
                      <Badge variant={tip.variant}>{tip.badge}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.desc}</p>
                  </motion.div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.section>
  );
}
