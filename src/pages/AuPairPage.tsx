import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Baby, Users, Clock, Euro, FileText, Plane, Home, GraduationCap, Briefcase, HelpCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const AuPairPage = () => {
  const { language } = useLanguage();

  const content = {
    tj: {
      title: 'Au-Pair дар Олмон',
      subtitle: 'Зиндагӣ бо оилаи олмонӣ, омӯзиши забон ва фарҳанг',
      overview: {
        title: 'Au-Pair чист?',
        what: 'Au-Pair барнома аст, ки шумо бо оилаи олмонӣ зиндагӣ мекунед, ба парасторӣ аз кӯдакон ёрӣ медиҳед ва дар ивази ин пули ҷайбӣ, манзил, ғизо ва вақт барои курси забон мегиред.',
        who: 'Барои кӣ мувофиқ аст?',
        whoDesc: 'Барои ҷавонони 18-26 сола, ки кӯдаконро дӯст медоранд, мехоҳанд олмонӣ омӯзанд ва фарҳанги олмониро аз наздик бишносанд.',
        age: 'Ҳадди синнусолӣ',
        ageDesc: '18-26 сол (дар баъзе ҳолатҳо 27)',
        duration: 'Давомнокӣ',
        durationDesc: '6-12 моҳ (тамдид то 6 моҳ мумкин аст)',
        benefits: 'Фоидаҳои асосӣ',
        benefitsList: [
          'Зиндагӣ бо оилаи олмонӣ',
          'Манзил ва ғизо ройгон',
          'Пули ҷайбӣ 280€/моҳ',
          '50€/моҳ барои курси забон',
          'Омӯзиши забони олмонӣ',
          '2 рӯзи озод дар ҳафта',
        ],
      },
      requirements: {
        title: 'Талаботҳо',
        items: [
          { title: 'Синну сол', desc: '18-26 сол (баъзе мамлакатҳо 27 сол).' },
          { title: 'Сатҳи забон', desc: 'Олмонӣ A1-A2 ҳадди ақал. Оила ҳангоми мусоҳиба мефаҳмад.' },
          { title: 'Таҷрибаи кӯдакон', desc: 'Таҷрибаи парасторӣ аз кӯдакон лозим аст (бебиситинг, хоҳар/бародар).' },
          { title: 'Суғуртаи саломатӣ', desc: 'Оила ё худатон суғурта таъмин мекунед.' },
          { title: 'Виза', desc: 'Визаи Au-Pair лозим аст. Дар сафорат гиред.' },
          { title: 'Санадҳо', desc: 'Паспорт, CV, мактуби ангезиш, аксҳо, тавсияномаи таҷрибаи кӯдакон.' },
        ],
      },
      roadmap: {
        title: 'Қадамҳо',
        steps: [
          { title: 'Омодагӣ', desc: 'Забони олмониро омӯзед (A1-A2). CV ва мактуби ангезиш тайёр кунед. Аксҳо ҷамъ кунед.' },
          { title: 'Ёфтани оила', desc: 'Дар aupairworld.com, aupair.com, агентӣ ҷустуҷӯ кунед. Видеозангҳо гузаронед.' },
          { title: 'Шартнома', desc: 'Бо оила шартномаи расмӣ имзо кунед. Шартҳоро муайян кунед.' },
          { title: 'Аризаи виза', desc: 'Дар сафорати Олмон виза гиред. Шартнома, суғурта лозим. 4-12 ҳафта интизор.' },
          { title: 'Омадан ба Олмон', desc: 'Оила шуморо аз фурудгоҳ мегирад. Anmeldung кунед, корро оғоз кунед.' },
          { title: 'Зиндагӣ бо оила', desc: 'Рӯзона 6 соат парасторӣ. Курси забон. 2 рӯзи озод дар ҳафта. Рухсатӣ.' },
        ],
      },
      salary: {
        title: 'Пули ҷайбӣ ва имконотҳо',
        items: [
          { title: 'Пули ҷайбӣ', desc: '280€/моҳ (ҳатмӣ аз рӯи қонун)' },
          { title: 'Манзил', desc: 'Ҳуҷраи алоҳида дар хонаи оила — ройгон' },
          { title: 'Ғизо', desc: 'Бо оила ғизо мехӯред — ройгон' },
          { title: 'Курси забон', desc: '50€/моҳ барои курси олмонӣ аз оила' },
          { title: 'Рухсатӣ', desc: '4 ҳафта барои 12 моҳ (бо музд)' },
        ],
      },
      proscons: {
        title: 'Фоидаҳо ва камбудиҳо',
        pros: [
          'Зиндагии воқеӣ бо оилаи олмонӣ',
          'Забонро ҳар рӯз машқ мекунед',
          'Манзил ва ғизо ройгон',
          'Вақт барои курс ва сайру гашт',
          'Имкони шиносоӣ бо фарҳанги олмонӣ',
        ],
        cons: [
          'Пули ҷайбӣ кам аст (280€)',
          'Кор бо кӯдакон метавонад вазнин бошад',
          'Шумо аз оила вобаста ҳастед',
          'На ҳама оилаҳо хубанд',
        ],
      },
      after: {
        title: 'Баъд аз Au-Pair',
        options: [
          { title: 'Таҳсил', desc: 'Метавонед дар донишгоҳ ё Studienkolleg таҳсил кунед.' },
          { title: 'Ausbildung', desc: 'Омӯзиши касбӣ бо музд оғоз кунед.' },
          { title: 'Кор', desc: 'Агар ҷои кор ёбед, визаи корӣ гиред.' },
          { title: 'FSJ/BFD', desc: 'Хидмати ихтиёрӣ оғоз кунед.' },
        ],
      },
      faq: {
        title: 'Саволҳои маъмул',
        items: [
          { q: 'Чанд соат дар рӯз кор мекунам?', a: 'Максимум 6 соат дар рӯз, 30 соат дар ҳафта.' },
          { q: 'Чӣ қадар пул мегирам?', a: '280€/моҳ пули ҷайбӣ + 50€ барои курси забон.' },
          { q: 'Манзил ва ғизо ройгон аст?', a: 'Бале, оила манзил ва ғизо таъмин мекунад.' },
          { q: 'Кадом забон лозим аст?', a: 'Олмонӣ A1-A2 ҳадди ақал. Беҳтар аст беҳтар бошад.' },
          { q: 'Оё метавонам баъд таҳсил кунам?', a: 'Бале! Au-Pair роҳи хуб барои донишгоҳ ё Ausbildung аст.' },
          { q: 'Чӣ гуна оила ёбам?', a: 'aupairworld.com, aupair.com ё агентӣ истифода баред.' },
          { q: 'Виза чӣ қадар вақт мегирад?', a: 'Одатан 4-12 ҳафта. Барвақт ариза диҳед!' },
          { q: 'Оё оила суғуртаро мепардозад?', a: 'Баъзе оилаҳо мепардозанд, баъзе не. Дар шартнома муайян кунед.' },
          { q: 'Чанд рӯз рухсатӣ дорам?', a: '4 ҳафта барои 12 моҳ (бо пули ҷайбӣ).' },
          { q: 'Агар оила хуб набошад, чӣ кор кунам?', a: 'Метавонед оиларо иваз кунед. Бо агентӣ ё расман тамос гиред.' },
          { q: 'Оё мард метавонад Au-Pair бошад?', a: 'Бале, вале баъзе оилаҳо занро афзалият медиҳанд.' },
          { q: 'Оё метавонам баъд аз Au-Pair дар Олмон бимонам?', a: 'Бале, агар таҳсил, кор ё Ausbildung ёбед, визаро тағйир диҳед.' },
        ],
      },
    },
    ru: {
      title: 'Au-Pair в Германии',
      subtitle: 'Жизнь с немецкой семьёй, изучение языка и культуры',
      overview: {
        title: 'Что такое Au-Pair?',
        what: 'Au-Pair — это программа, где вы живёте с немецкой семьёй, помогаете ухаживать за детьми, а взамен получаете карманные деньги, жильё, питание и время для языковых курсов.',
        who: 'Для кого подходит?',
        whoDesc: 'Для молодых людей 18-26 лет, которые любят детей, хотят выучить немецкий и узнать немецкую культуру изнутри.',
        age: 'Возрастные ограничения',
        ageDesc: '18-26 лет (в некоторых случаях 27)',
        duration: 'Продолжительность',
        durationDesc: '6-12 месяцев (продление до 6 месяцев возможно)',
        benefits: 'Основные преимущества',
        benefitsList: [
          'Жизнь с немецкой семьёй',
          'Бесплатное жильё и питание',
          'Карманные деньги 280€/месяц',
          '50€/месяц на языковой курс',
          'Изучение немецкого языка',
          '2 выходных дня в неделю',
        ],
      },
      requirements: {
        title: 'Требования',
        items: [
          { title: 'Возраст', desc: '18-26 лет (некоторые страны 27 лет).' },
          { title: 'Уровень языка', desc: 'Немецкий A1-A2 минимум. Семья оценит при собеседовании.' },
          { title: 'Опыт с детьми', desc: 'Нужен опыт ухода за детьми (бебиситинг, братья/сёстры).' },
          { title: 'Медстраховка', desc: 'Семья или вы сами обеспечиваете страховку.' },
          { title: 'Виза', desc: 'Нужна виза Au-Pair. Получите в посольстве.' },
          { title: 'Документы', desc: 'Паспорт, CV, мотивационное письмо, фото, рекомендации об опыте с детьми.' },
        ],
      },
      roadmap: {
        title: 'Пошаговый план',
        steps: [
          { title: 'Подготовка', desc: 'Выучите немецкий (A1-A2). Подготовьте CV и мотивационное письмо. Соберите фото.' },
          { title: 'Поиск семьи', desc: 'Ищите на aupairworld.com, aupair.com, через агентство. Проводите видеозвонки.' },
          { title: 'Контракт', desc: 'Подпишите официальный контракт с семьёй. Определите условия.' },
          { title: 'Заявка на визу', desc: 'Получите визу в посольстве Германии. Нужен контракт, страховка. 4-12 недель ожидания.' },
          { title: 'Прибытие в Германию', desc: 'Семья встретит вас в аэропорту. Сделайте Anmeldung, начните работу.' },
          { title: 'Жизнь с семьёй', desc: '6 часов в день уход за детьми. Языковой курс. 2 выходных в неделю. Отпуск.' },
        ],
      },
      salary: {
        title: 'Карманные деньги и условия',
        items: [
          { title: 'Карманные деньги', desc: '280€/месяц (обязательно по закону)' },
          { title: 'Жильё', desc: 'Отдельная комната в доме семьи — бесплатно' },
          { title: 'Питание', desc: 'Едите с семьёй — бесплатно' },
          { title: 'Языковой курс', desc: '50€/месяц на немецкий курс от семьи' },
          { title: 'Отпуск', desc: '4 недели за 12 месяцев (с оплатой)' },
        ],
      },
      proscons: {
        title: 'Преимущества и недостатки',
        pros: [
          'Настоящая жизнь с немецкой семьёй',
          'Практика языка каждый день',
          'Бесплатное жильё и питание',
          'Время для курсов и путешествий',
          'Возможность узнать немецкую культуру',
        ],
        cons: [
          'Маленькие карманные деньги (280€)',
          'Работа с детьми может быть тяжёлой',
          'Вы зависите от семьи',
          'Не все семьи хорошие',
        ],
      },
      after: {
        title: 'После Au-Pair',
        options: [
          { title: 'Учёба', desc: 'Можете поступить в университет или Studienkolleg.' },
          { title: 'Ausbildung', desc: 'Начните профессиональное обучение с зарплатой.' },
          { title: 'Работа', desc: 'Если найдёте работу, получите рабочую визу.' },
          { title: 'FSJ/BFD', desc: 'Начните волонтёрскую службу.' },
        ],
      },
      faq: {
        title: 'Часто задаваемые вопросы',
        items: [
          { q: 'Сколько часов в день работать?', a: 'Максимум 6 часов в день, 30 часов в неделю.' },
          { q: 'Сколько денег я получу?', a: '280€/месяц карманные + 50€ на языковой курс.' },
          { q: 'Жильё и питание бесплатные?', a: 'Да, семья обеспечивает жильё и питание.' },
          { q: 'Какой язык нужен?', a: 'Немецкий A1-A2 минимум. Чем лучше — тем лучше.' },
          { q: 'Могу ли я потом учиться?', a: 'Да! Au-Pair — хороший путь к университету или Ausbildung.' },
          { q: 'Как найти семью?', a: 'aupairworld.com, aupair.com или через агентство.' },
          { q: 'Сколько времени занимает виза?', a: 'Обычно 4-12 недель. Подавайте заранее!' },
          { q: 'Семья оплачивает страховку?', a: 'Некоторые семьи да, некоторые нет. Уточните в контракте.' },
          { q: 'Сколько дней отпуска?', a: '4 недели за 12 месяцев (с карманными деньгами).' },
          { q: 'Что делать, если семья плохая?', a: 'Можете поменять семью. Обратитесь в агентство или официально.' },
          { q: 'Может ли мужчина быть Au-Pair?', a: 'Да, но некоторые семьи предпочитают женщин.' },
          { q: 'Можно ли остаться после Au-Pair?', a: 'Да, если найдёте учёбу, работу или Ausbildung, поменяйте визу.' },
        ],
      },
    },
    de: {
      title: 'Au-Pair in Deutschland',
      subtitle: 'Leben mit einer deutschen Familie, Sprache und Kultur lernen',
      overview: {
        title: 'Was ist Au-Pair?',
        what: 'Au-Pair ist ein Programm, bei dem Sie mit einer deutschen Familie leben, bei der Kinderbetreuung helfen und dafür Taschengeld, Unterkunft, Verpflegung und Zeit für Sprachkurse erhalten.',
        who: 'Für wen geeignet?',
        whoDesc: 'Für junge Menschen von 18-26 Jahren, die Kinder mögen, Deutsch lernen und die deutsche Kultur von innen kennenlernen möchten.',
        age: 'Altersgrenzen',
        ageDesc: '18-26 Jahre (in einigen Fällen 27)',
        duration: 'Dauer',
        durationDesc: '6-12 Monate (Verlängerung um 6 Monate möglich)',
        benefits: 'Hauptvorteile',
        benefitsList: [
          'Leben mit einer deutschen Familie',
          'Kostenlose Unterkunft und Verpflegung',
          'Taschengeld 280€/Monat',
          '50€/Monat für Sprachkurs',
          'Deutschlernen',
          '2 freie Tage pro Woche',
        ],
      },
      requirements: {
        title: 'Anforderungen',
        items: [
          { title: 'Alter', desc: '18-26 Jahre (einige Länder 27 Jahre).' },
          { title: 'Sprachniveau', desc: 'Deutsch A1-A2 Minimum. Familie beurteilt beim Gespräch.' },
          { title: 'Erfahrung mit Kindern', desc: 'Erfahrung in Kinderbetreuung nötig (Babysitting, Geschwister).' },
          { title: 'Krankenversicherung', desc: 'Familie oder Sie selbst stellen Versicherung bereit.' },
          { title: 'Visum', desc: 'Au-Pair-Visum erforderlich. Bei der Botschaft beantragen.' },
          { title: 'Dokumente', desc: 'Reisepass, CV, Motivationsschreiben, Fotos, Referenzen über Kindererfahrung.' },
        ],
      },
      roadmap: {
        title: 'Schritte',
        steps: [
          { title: 'Vorbereitung', desc: 'Deutsch lernen (A1-A2). CV und Motivationsschreiben vorbereiten. Fotos sammeln.' },
          { title: 'Familie finden', desc: 'Auf aupairworld.com, aupair.com, über Agentur suchen. Videoanrufe führen.' },
          { title: 'Vertrag', desc: 'Offiziellen Vertrag mit Familie unterschreiben. Bedingungen festlegen.' },
          { title: 'Visumantrag', desc: 'Visum bei der Deutschen Botschaft beantragen. Vertrag, Versicherung nötig. 4-12 Wochen warten.' },
          { title: 'Ankunft in Deutschland', desc: 'Familie holt Sie vom Flughafen ab. Anmeldung machen, Arbeit beginnen.' },
          { title: 'Leben mit der Familie', desc: '6 Stunden täglich Kinderbetreuung. Sprachkurs. 2 freie Tage pro Woche. Urlaub.' },
        ],
      },
      salary: {
        title: 'Taschengeld und Leistungen',
        items: [
          { title: 'Taschengeld', desc: '280€/Monat (gesetzlich vorgeschrieben)' },
          { title: 'Unterkunft', desc: 'Eigenes Zimmer im Haus der Familie — kostenlos' },
          { title: 'Verpflegung', desc: 'Essen mit der Familie — kostenlos' },
          { title: 'Sprachkurs', desc: '50€/Monat für Deutschkurs von der Familie' },
          { title: 'Urlaub', desc: '4 Wochen für 12 Monate (mit Bezahlung)' },
        ],
      },
      proscons: {
        title: 'Vor- und Nachteile',
        pros: [
          'Echtes Leben mit deutscher Familie',
          'Tägliche Sprachpraxis',
          'Kostenlose Unterkunft und Verpflegung',
          'Zeit für Kurse und Reisen',
          'Möglichkeit, deutsche Kultur kennenzulernen',
        ],
        cons: [
          'Geringes Taschengeld (280€)',
          'Arbeit mit Kindern kann anstrengend sein',
          'Abhängigkeit von der Familie',
          'Nicht alle Familien sind gut',
        ],
      },
      after: {
        title: 'Nach Au-Pair',
        options: [
          { title: 'Studium', desc: 'Sie können an einer Universität oder im Studienkolleg studieren.' },
          { title: 'Ausbildung', desc: 'Berufsausbildung mit Gehalt beginnen.' },
          { title: 'Arbeit', desc: 'Wenn Sie einen Job finden, Arbeitsvisum beantragen.' },
          { title: 'FSJ/BFD', desc: 'Freiwilligendienst beginnen.' },
        ],
      },
      faq: {
        title: 'Häufig gestellte Fragen',
        items: [
          { q: 'Wie viele Stunden am Tag arbeite ich?', a: 'Maximal 6 Stunden am Tag, 30 Stunden pro Woche.' },
          { q: 'Wie viel Geld bekomme ich?', a: '280€/Monat Taschengeld + 50€ für Sprachkurs.' },
          { q: 'Sind Unterkunft und Verpflegung kostenlos?', a: 'Ja, die Familie stellt Unterkunft und Verpflegung bereit.' },
          { q: 'Welche Sprache brauche ich?', a: 'Deutsch A1-A2 Minimum. Je besser, desto besser.' },
          { q: 'Kann ich danach studieren?', a: 'Ja! Au-Pair ist ein guter Weg zur Universität oder Ausbildung.' },
          { q: 'Wie finde ich eine Familie?', a: 'aupairworld.com, aupair.com oder über eine Agentur.' },
          { q: 'Wie lange dauert das Visum?', a: 'Normalerweise 4-12 Wochen. Bewerben Sie sich frühzeitig!' },
          { q: 'Zahlt die Familie die Versicherung?', a: 'Einige Familien ja, einige nicht. Im Vertrag klären.' },
          { q: 'Wie viele Urlaubstage habe ich?', a: '4 Wochen für 12 Monate (mit Taschengeld).' },
          { q: 'Was tun, wenn die Familie schlecht ist?', a: 'Sie können die Familie wechseln. Wenden Sie sich an die Agentur oder offiziell.' },
          { q: 'Kann ein Mann Au-Pair sein?', a: 'Ja, aber einige Familien bevorzugen Frauen.' },
          { q: 'Kann ich nach Au-Pair in Deutschland bleiben?', a: 'Ja, wenn Sie Studium, Arbeit oder Ausbildung finden, Visum ändern.' },
        ],
      },
    },
  };

  const t = content[language];

  const seoTitle = {
    tj: 'Au-Pair дар Олмон | Germany Roadmap',
    ru: 'Au-Pair в Германии | Germany Roadmap',
    de: 'Au-Pair in Deutschland | Germany Roadmap',
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle[language]}</title>
        <meta name="description" content={t.overview.what} />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm mb-6">
                <Baby className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground/80">6-12 {language === 'de' ? 'Monate' : language === 'ru' ? 'месяцев' : 'моҳ'}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.title}
              </h1>
              <p className="text-xl text-primary-foreground/70 mb-8">
                {t.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{t.overview.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card-elevated p-6 md:p-8">
                <p className="text-foreground mb-6">{t.overview.what}</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">{t.overview.who}</h3>
                      <p className="text-muted-foreground text-sm">{t.overview.whoDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">{t.overview.age}</h3>
                      <p className="text-muted-foreground text-sm">{t.overview.ageDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">{t.overview.duration}</h3>
                      <p className="text-muted-foreground text-sm">{t.overview.durationDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-elevated p-6 md:p-8">
                <h3 className="font-semibold text-foreground mb-4">{t.overview.benefits}</h3>
                <ul className="space-y-3">
                  {t.overview.benefitsList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{t.requirements.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.requirements.items.map((item, i) => (
                <div key={i} className="card-elevated p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{t.roadmap.title}</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
              <div className="space-y-6">
                {t.roadmap.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 md:gap-8"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold z-10">
                      {i + 1}
                    </div>
                    <div className="card-elevated p-6 flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Salary */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{t.salary.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {t.salary.items.map((item, i) => (
                <div key={i} className="card-elevated p-6 text-center">
                  <Euro className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{t.proscons.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-elevated p-6 md:p-8 border-l-4 border-l-success">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-success" />
                  {language === 'de' ? 'Vorteile' : language === 'ru' ? 'Преимущества' : 'Фоидаҳо'}
                </h3>
                <ul className="space-y-3">
                  {t.proscons.pros.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-success shrink-0 mt-1" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-elevated p-6 md:p-8 border-l-4 border-l-destructive">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <X className="w-5 h-5 text-destructive" />
                  {language === 'de' ? 'Nachteile' : language === 'ru' ? 'Недостатки' : 'Камбудиҳо'}
                </h3>
                <ul className="space-y-3">
                  {t.proscons.cons.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-destructive shrink-0 mt-1" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* After */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{t.after.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.after.options.map((item, i) => (
                <div key={i} className="card-elevated p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {i === 0 && <GraduationCap className="w-6 h-6 text-primary" />}
                    {i === 1 && <FileText className="w-6 h-6 text-primary" />}
                    {i === 2 && <Briefcase className="w-6 h-6 text-primary" />}
                    {i === 3 && <Heart className="w-6 h-6 text-primary" />}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-primary" />
              {t.faq.title}
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {t.faq.items.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="card-elevated px-6 border-none">
                    <AccordionTrigger className="text-left text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AuPairPage;
