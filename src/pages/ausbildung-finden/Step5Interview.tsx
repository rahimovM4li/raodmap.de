import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  Users,
  ClipboardCheck,
  Lightbulb,
  Camera,
  Mic,
  Wifi,
  LayoutDashboard,
  Smile,
  Hand,
  Clock,
  Quote,
  Mail,
  XCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface Step5InterviewProps {
  onStepVisible: () => void;
}

type Lang = 'de' | 'ru' | 'tj';

const t = (lang: Lang, de: string, ru: string, tj: string) =>
  lang === 'de' ? de : lang === 'ru' ? ru : tj;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const interviewQuestions = [
  {
    de: 'Erzählen Sie uns kurz etwas über sich',
    ru: 'Расскажите о себе',
    tj: 'Дар бораи худ нақл кунед',
    why: { de: 'Strukturierte Selbstpräsentation', ru: 'Навыки самопрезентации', tj: 'Малакаҳои муаррифии худ' },
    answer: {
      de: 'Ich habe die Schule in Duschanbe mit guten Noten in Mathematik abgeschlossen. Seit zwei Jahren lerne ich aktiv Deutsch und interessiere mich für PC-Montage.',
      ru: 'Я окончил школу в Душанбе с хорошими оценками по математике. Последние два года активно изучаю немецкий и увлекаюсь сборкой ПК.',
      tj: 'Ман мактабро дар Душанбе бо баҳоҳои хуб аз математика хатм кардам. Ду соли охир забони олмониро меомӯзам ва ба ҷамъоварии компютерҳо шавқ дорам.',
    },
  },
  {
    de: 'Warum möchten Sie gerade diese Ausbildung machen?',
    ru: 'Почему именно эта Ausbildung?',
    tj: 'Чаро маҳз ҳамин Ausbildung?',
    why: { de: 'Bewusste Berufswahl', ru: 'Осознанность выбора', tj: 'Бошууронаи интихоб' },
    answer: {
      de: 'Mir gefällt die Verbindung von Theorie und Praxis. Das duale System ermöglicht es, Wissen sofort anzuwenden.',
      ru: 'Мне нравится сочетание теории и практики. Дуальная система позволяет сразу применять знания.',
      tj: 'Ба ман пайвасти назария ва амалия маъқул аст. Системаи дуалӣ донишро фавран татбиқ кардан имкон медиҳад.',
    },
  },
  {
    de: 'Warum haben Sie sich gerade bei uns beworben?',
    ru: 'Почему именно наша компания?',
    tj: 'Чаро маҳз ширкати мо?',
    why: { de: 'Qualität der Vorbereitung', ru: 'Качество подготовки', tj: 'Сифати омодагӣ' },
    answer: {
      de: 'Ihr Unternehmen ist regionaler Marktführer. Besonders beeindruckt hat mich Ihre Nachhaltigkeitsinitiative.',
      ru: 'Ваша компания — региональный лидер. Меня впечатлила ваша экологическая инициатива.',
      tj: 'Ширкати шумо пешвои минтақавӣ аст. Ташаббуси экологии шумо маро ба ваҷд овард.',
    },
  },
  {
    de: 'Was sind Ihre größten Stärken?',
    ru: 'Ваши сильные стороны?',
    tj: 'Нуқтаҳои қавии шумо?',
    why: { de: 'Selbstbewusstsein + Belege', ru: 'Уверенность + доказательства', tj: 'Эътимод + далелҳо' },
    answer: {
      de: 'Zuverlässigkeit und Teamfähigkeit. Bei einem Schulprojekt koordinierte ich 10 Personen.',
      ru: 'Надёжность и умение работать в команде. В школьном проекте я координировал 10 человек.',
      tj: 'Эътимоднокӣ ва кори даставӣ. Дар лоиҳаи мактаб 10 нафарро ҳамоҳанг кардам.',
    },
  },
  {
    de: 'Was sind Ihre Schwächen?',
    ru: 'Ваши слабые стороны?',
    tj: 'Нуқтаҳои заифи шумо?',
    why: { de: 'Selbstreflexion', ru: 'Саморефлексия', tj: 'Худинъикосӣ' },
    answer: {
      de: 'Manchmal bin ich zu perfektionistisch. Ich arbeite aktiv mit Zeitmanagement-Methoden.',
      ru: 'Иногда я слишком педантичен. Активно использую методы тайм-менеджмента.',
      tj: 'Баъзан хеле дақиқкор ҳастам. Фаъолона усулҳои тайм-менеҷментро истифода мебарам.',
    },
  },
  {
    de: 'Wo sehen Sie sich in 5 Jahren?',
    ru: 'Где вы через 5 лет?',
    tj: 'Пас аз 5 сол худро дар куҷо мебинед?',
    why: { de: 'Loyalität', ru: 'Лояльность', tj: 'Содиқӣ' },
    answer: {
      de: 'Als Fachkraft in Ihrem Unternehmen, mit mehr Verantwortung oder Weiterbildung.',
      ru: 'Квалифицированным специалистом в вашей компании, с бо́льшей ответственностью.',
      tj: 'Мутахассиси тахассусӣ дар ширкати шумо, бо масъулияти бештар.',
    },
  },
  {
    de: 'Wie gehen Sie mit Kritik um?',
    ru: 'Как справляетесь с критикой?',
    tj: 'Ба танқид чӣ гуна муносибат мекунед?',
    why: { de: 'Reife', ru: 'Зрелость', tj: 'Камолот' },
    answer: {
      de: 'Konstruktive Kritik sehe ich als Wachstumschance. Ich höre aufmerksam zu und korrigiere sofort.',
      ru: 'Конструктивную критику рассматриваю как инструмент роста.',
      tj: 'Танқиди созандаро ҳамчун воситаи рушд мебинам.',
    },
  },
  {
    de: 'Warum möchten Sie in Deutschland lernen?',
    ru: 'Почему хотите учиться в Германии?',
    tj: 'Чаро дар Олмон таҳсил кардан мехоҳед?',
    why: { de: 'Tiefe der Motivation', ru: 'Глубина мотивации', tj: 'Амиқии ҳавасмандӣ' },
    answer: {
      de: 'Die Duale Ausbildung ist weltweiter Goldstandard. Nirgends gibt es eine solche Verknüpfung von Berufsschule und Praxis.',
      ru: 'Немецкая Duale Ausbildung — мировой золотой стандарт.',
      tj: 'Duale Ausbildung-и олмонӣ стандарти тиллоии ҷаҳонӣ аст.',
    },
  },
  {
    de: 'Was machen Sie in Ihrer Freizeit?',
    ru: 'Что делаете в свободное время?',
    tj: 'Дар вақти холӣ чӣ кор мекунед?',
    why: { de: 'Cultural Fit', ru: 'Cultural Fit', tj: 'Cultural Fit' },
    answer: {
      de: 'Ich spiele Fußball im Verein und lese viel auf Deutsch.',
      ru: 'Играю в футбол в команде и много читаю на немецком.',
      tj: 'Дар даста футбол бозӣ мекунам ва бо олмонӣ бисёр мехонам.',
    },
  },
  {
    de: 'Was wissen Sie über unsere Produkte?',
    ru: 'Что знаете о наших продуктах?',
    tj: 'Дар бораи маҳсулоти мо чӣ медонед?',
    why: { de: 'Vorbereitung', ru: 'Подготовка', tj: 'Омодагӣ' },
    answer: {
      de: 'Nennen Sie 2–3 konkrete Fakten über die Firma (Produkte, Zielgruppe, Marktposition).',
      ru: 'Назовите 2–3 конкретных факта о компании.',
      tj: '2-3 далели мушаххасро дар бораи ширкат номбар кунед.',
    },
  },
  {
    de: 'Haben Sie sich woanders beworben?',
    ru: 'Подавали заявки ещё куда-то?',
    tj: 'Ба ҷои дигар муроҷиат кардаед?',
    why: { de: 'Ehrlichkeit', ru: 'Честность', tj: 'Ростгӯӣ' },
    answer: {
      de: 'Ja, aber Ihr Unternehmen bleibt meine absolute Priorität wegen Ihres Mentoring-Programms.',
      ru: 'Да, но ваша компания — абсолютный приоритет из-за программы наставничества.',
      tj: 'Бале, аммо ширкати шумо бо сабаби барномаи устодӣ афзалияти мутлақ аст.',
    },
  },
  {
    de: 'Wie arbeiten Sie im Team?',
    ru: 'Как работаете в команде?',
    tj: 'Дар даста чӣ гуна кор мекунед?',
    why: { de: 'Teamfähigkeit', ru: 'Командная работа', tj: 'Кори даставӣ' },
    answer: {
      de: 'Ich bin Teamplayer: höre zu, aber übernehme auch Initiative wenn nötig.',
      ru: 'Я командный игрок: слушаю других, но беру инициативу когда нужно.',
      tj: 'Ман бозигари даста ҳастам: гӯш мекунам, аммо ташаббус ҳам мегирам.',
    },
  },
  {
    de: 'Welche Schulfächer mochten Sie?',
    ru: 'Какие предметы любили?',
    tj: 'Кадом фанҳоро дӯст медоштед?',
    why: { de: 'Relevanz zum Beruf', ru: 'Связь с профессией', tj: 'Вобастагӣ ба касб' },
    answer: {
      de: 'Mathematik und Physik — sie fördern logisches Denken.',
      ru: 'Математика и физика — развивают логическое мышление.',
      tj: 'Математика ва физика — тафаккури мантиқиро рушд медиҳанд.',
    },
  },
  {
    de: 'Größter Erfolg oder Misserfolg?',
    ru: 'Самый большой успех или неудача?',
    tj: 'Бузургтарин муваффақият ё нокомӣ?',
    why: { de: 'Selbstwahrnehmung', ru: 'Самосознание', tj: 'Худшиносӣ' },
    answer: {
      de: 'Mein größter Erfolg: Deutsch bis B2 in 18 Monaten neben den Schulprüfungen.',
      ru: 'Мой успех: немецкий до B2 за 18 месяцев параллельно с экзаменами.',
      tj: 'Муваффақияти ман: олмонӣ то B2 дар 18 моҳ дар баробари имтиҳонҳо.',
    },
  },
  {
    de: 'Haben Sie Fragen an uns?',
    ru: 'Есть вопросы к нам?',
    tj: 'Ба мо савол доред?',
    why: { de: 'Interesse', ru: 'Интерес', tj: 'Таваҷҷӯҳ' },
    answer: {
      de: 'NIEMALS \'Nein\' sagen! Stelle vorbereitete Fragen (siehe unten).',
      ru: 'НИКОГДА не говорите \'Нет\'! Задайте подготовленные вопросы.',
      tj: 'ҲЕҶ ГОҲ \'Не\' нагӯед! Саволҳои омодашударо диҳед.',
    },
  },
];

const checklistItems = [
  { icon: Lightbulb, de: 'Lichtquelle vor dem Gesicht', ru: 'Свет перед лицом', tj: 'Нур дар назди чеҳра' },
  { icon: Camera, de: 'Kamera auf Augenhöhe', ru: 'Камера на уровне глаз', tj: 'Камера дар сатҳи чашм' },
  { icon: Mic, de: 'Headset mit Mikrofon', ru: 'Гарнитура с микрофоном', tj: 'Гарнитура бо микрофон' },
  { icon: Wifi, de: 'Stabiles Internet (LAN bevorzugt)', ru: 'Стабильный интернет (LAN предпочтительно)', tj: 'Интернети устувор (LAN беҳтар)' },
  { icon: LayoutDashboard, de: 'Neutraler Hintergrund', ru: 'Нейтральный фон', tj: 'Заминаи бетараф' },
];

const bodyLanguageTips = [
  { icon: Smile, de: 'Gerade sitzen, leicht nach vorne lehnen', ru: 'Сидеть прямо, слегка наклониться вперёд', tj: 'Рост нишинед, каме ба пеш такя кунед' },
  { icon: Hand, de: 'Hände sichtbar, moderate Gesten, aktiv nicken', ru: 'Руки на виду, умеренные жесты, активно кивать', tj: 'Дастҳо намоён, имову ишораи мӯътадил, фаъолона сар ҷунбонед' },
  { icon: Clock, de: 'Sprechtempo 10–15% verlangsamen, Pausen vor Antworten', ru: 'Замедлить темп на 10–15%, паузы перед ответами', tj: 'Суръатро 10-15% суст кунед, пеш аз ҷавоб таваққуф кунед' },
];

const employerQuestions = [
  {
    de: 'Wie sieht die Einarbeitungsphase in den ersten Wochen aus?',
    ru: 'Как выглядит фаза адаптации в первые недели?',
    tj: 'Дар ҳафтаҳои аввал марҳилаи ҳамгироӣ чӣ гуна аст?',
  },
  {
    de: 'Gibt es spezielle Projekte, an denen Auszubildende bereits im ersten Jahr arbeiten dürfen?',
    ru: 'Есть ли проекты для учеников уже в первый год?',
    tj: 'Оё лоиҳаҳое барои хонандагон дар соли аввал ҳастанд?',
  },
  {
    de: 'Wie unterstützt das Unternehmen bei der Prüfungsvorbereitung?',
    ru: 'Как компания помогает в подготовке к экзаменам?',
    tj: 'Ширкат дар омодагӣ ба имтиҳонҳо чӣ гуна кӯмак мекунад?',
  },
];

const Step5Interview = ({ onStepVisible }: Step5InterviewProps) => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(5).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onStepVisible();
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onStepVisible]);

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div ref={sectionRef} className="py-10 md:py-24">
      <div className="container-main">
        {/* Title */}
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
            <Badge variant="outline" className="text-sm">
              {t(language, 'Schritt 5', 'Шаг 5', 'Қадами 5')}
            </Badge>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            {t(
              language,
              'Schritt 5: Vorstellungsgespräch',
              'Шаг 5: Собеседование',
              'Қадами 5: Мусоҳиба'
            )}
          </h2>
        </motion.div>

        {/* A) Interview Process Timeline */}
        <motion.div {...fadeUp} className="mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Phase 1 */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card-elevated p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Phase 1
                  </span>
                  <h3 className="font-bold text-foreground text-sm md:text-base">
                    {t(
                      language,
                      'Online-Interview (30–45 Min)',
                      'Онлайн-интервью (30-45 мин)',
                      'Мусоҳибаи онлайнӣ (30-45 дақ)'
                    )}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                {t(
                  language,
                  'Mit HR: Vorstellung, Sprachcheck, Motivation',
                  'С HR: знакомство, проверка языка, мотивация',
                  'Бо HR: шиносоӣ, санҷиши забон, ҳавасмандӣ'
                )}
              </p>
            </motion.div>

            {/* Phase 2 */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-elevated p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Phase 2
                  </span>
                  <h3 className="font-bold text-foreground text-sm md:text-base">
                    {t(
                      language,
                      'Fachgespräch / Test',
                      'Углубленное интервью / Тест',
                      'Мусоҳибаи амиқ / Тест'
                    )}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                {t(
                  language,
                  'Mit Ausbilder: Logiktests, Situationsanalyse',
                  'С наставником: логические тесты, ситуационный анализ',
                  'Бо устод: тестҳои мантиқӣ, таҳлили вазъият'
                )}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* B) 15 Interview Questions */}
        <motion.div {...fadeUp} className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            {t(
              language,
              '15 häufigste Interviewfragen',
              '15 самых частых вопросов',
              '15 саволи маъмултарин'
            )}
          </h3>
          <Accordion type="single" collapsible className="space-y-2">
            {interviewQuestions.map((q, i) => (
              <AccordionItem
                key={i}
                value={`q-${i}`}
                className="card-elevated border rounded-lg px-4 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="hover:no-underline gap-3">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground text-sm md:text-base">
                        {q.de}
                      </p>
                      {language !== 'de' && (
                        <p className="text-muted-foreground text-xs mt-0.5">
                          {q[language]}
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-10">
                    <Badge variant="secondary" className="text-xs">
                      {t(language, 'Warum diese Frage', 'Почему спрашивают', 'Чаро мепурсанд')}:{' '}
                      {q.why[language]}
                    </Badge>
                    <div className="card-elevated bg-secondary/30 p-4 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                        {t(language, 'Beispielantwort', 'Пример ответа', 'Намунаи ҷавоб')}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {q.answer[language]}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* C) Dresscode Tabs */}
        <motion.div {...fadeUp} className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            {t(language, 'Dresscode', 'Дресс-код', 'Дресс-код')}
          </h3>
          <Tabs defaultValue="office" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="office">
                {t(language, 'Office / Banken', 'Офис / Банки', 'Офис / Бонкҳо')}
              </TabsTrigger>
              <TabsTrigger value="it">IT / Medizin / Sozial</TabsTrigger>
              <TabsTrigger value="handwerk">
                {t(language, 'Handwerk / Produktion', 'Handwerk / Produktion', 'Handwerk / Produktion')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="office">
              <div className="card-elevated p-6 rounded-lg mt-2">
                <p className="text-sm text-foreground leading-relaxed">
                  {t(
                    language,
                    'Business: Anzug (Krawatte in Banken), Lederschuhe. Keine Sneakers, Jeans, grelle Farben.',
                    'Business: костюм (галстук в банках), туфли. Без кроссовок, джинсов, ярких цветов.',
                    'Business: костюм (галстук дар бонкҳо), пойафзол. Бидуни кроссовкаҳо, ҷинсҳо, рангҳои дурахшон.'
                  )}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="it">
              <div className="card-elevated p-6 rounded-lg mt-2">
                <p className="text-sm text-foreground leading-relaxed">
                  {t(
                    language,
                    'Smart Casual: Chinos, Hemd/Pullover. Keine Sportkleidung oder T-Shirts mit Prints.',
                    'Smart Casual: чиносы, рубашка/джемпер. Без спортивной одежды и футболок с принтами.',
                    'Smart Casual: чинос, курта/ҷемпер. Бидуни либоси варзишӣ ва футболкаҳо бо расмҳо.'
                  )}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="handwerk">
              <div className="card-elevated p-6 rounded-lg mt-2">
                <p className="text-sm text-foreground leading-relaxed">
                  {t(
                    language,
                    'Sauber & gepflegt: Polo/Hemd, dunkle Jeans. Kein Anzug (wirkt unnatürlich), keine schmutzige Kleidung.',
                    'Опрятно: поло/рубашка, тёмные джинсы. Без костюма (неестественно), без грязной одежды.',
                    'Тоза ва озода: поло/курта, ҷинси торик. Бидуни костюм (ғайритабиӣ), бидуни либоси ифлос.'
                  )}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* D) Online Interview Checklist */}
        <motion.div {...fadeUp} className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            {t(
              language,
              'Online-Interview Checkliste',
              'Чек-лист для онлайн-интервью',
              'Чек-листи мусоҳибаи онлайнӣ'
            )}
          </h3>
          <div className="card-elevated p-6 rounded-lg space-y-4">
            {checklistItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.label
                  key={i}
                  {...stagger}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={cn(
                    'flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors',
                    checkedItems[i] ? 'bg-primary/5' : 'hover:bg-secondary/30'
                  )}
                >
                  <Checkbox
                    checked={checkedItems[i]}
                    onCheckedChange={() => toggleCheck(i)}
                  />
                  <Icon className={cn('w-5 h-5 flex-shrink-0', checkedItems[i] ? 'text-primary' : 'text-muted-foreground')} />
                  <span className={cn('text-sm', checkedItems[i] ? 'text-foreground line-through opacity-70' : 'text-foreground')}>
                    {item[language]}
                  </span>
                </motion.label>
              );
            })}
          </div>
        </motion.div>

        {/* E) Body Language Tips */}
        <motion.div {...fadeUp} className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            {t(language, 'Körpersprache', 'Язык тела', 'Забони бадан')}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {bodyLanguageTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={i}
                  {...stagger}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-elevated p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {tip[language]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* F) Questions to Ask the Employer */}
        <motion.div {...fadeUp} className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            {t(
              language,
              'Deine Fragen an den Arbeitgeber',
              'Ваши вопросы работодателю',
              'Саволҳои шумо ба корфармо'
            )}
          </h3>
          <div className="space-y-4">
            {employerQuestions.map((q, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-l-4 border-primary pl-4 py-3"
              >
                <p className="italic text-foreground text-sm md:text-base font-medium">
                  <Quote className="w-4 h-4 inline-block mr-1 text-primary opacity-60 -mt-1" />
                  {q.de}
                </p>
                {language !== 'de' && (
                  <p className="text-muted-foreground text-xs mt-1 italic">
                    {q[language]}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* G) After the Interview */}
        <motion.div {...fadeUp}>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            {t(
              language,
              'Nach dem Gespräch',
              'После собеседования',
              'Пас аз мусоҳиба'
            )}
          </h3>
          <Tabs defaultValue="followup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="followup" className="gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {t(language, 'Follow-Up Email', 'Письмо благодарности', 'Номаи миннатдорӣ')}
              </TabsTrigger>
              <TabsTrigger value="rejection" className="gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                {t(language, 'Absage-Reaktion', 'Реакция на отказ', 'Реаксия ба раддия')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="followup">
              <div className="card-elevated p-6 rounded-lg mt-2">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                  {t(language, 'Vorlage', 'Шаблон', 'Намуна')}
                </p>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm text-foreground leading-relaxed italic">
                    &ldquo;Sehr geehrte(r) [Nachname], vielen Dank für das angenehme und informative
                    Gespräch von gestern. Ich bin nach wie vor hoch motiviert, meine Ausbildung bei
                    Ihnen zu beginnen...&rdquo;
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="rejection">
              <div className="card-elevated p-6 rounded-lg mt-2 space-y-4">
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                    {t(language, 'Vorlage', 'Шаблон', 'Намуна')}
                  </p>
                  <p className="text-sm text-foreground leading-relaxed italic">
                    &ldquo;Könnten Sie mir kurzes Feedback geben, woran es gelegen hat, damit ich mich
                    für die Zukunft verbessern kann?&rdquo;
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(
                    language,
                    'HR-Manager schätzen professionelle Reife. Es gibt Fälle, wo der Erstkandidat absprang und die höfliche Person den Vertrag bekam.',
                    'HR-менеджеры ценят профессиональную зрелость. Бывали случаи, когда основной кандидат отказывался и вежливый получал контракт.',
                    'Менеҷерони HR камолоти касбиро қадр мекунанд. Ҳолатҳое буданд, ки номзади асосӣ рад кард ва шахси хушмуомила шартнома гирифт.'
                  )}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Step5Interview;
