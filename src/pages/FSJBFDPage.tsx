import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Heart, Users, Clock, Euro, FileText, Plane, Home, GraduationCap, Briefcase, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FSJBFDPage = () => {
  const { language } = useLanguage();

  const content = {
    tj: {
      title: 'FSJ / BFD — Хидмати ихтиёрӣ дар Олмон',
      subtitle: 'Соли ихтиёрии иҷтимоӣ ва хидмати федералии ихтиёрӣ',
      overview: {
        title: 'Чист?',
        what: 'FSJ (Freiwilliges Soziales Jahr) ва BFD (Bundesfreiwilligendienst) барномаҳои хидмати ихтиёрӣ дар Олмон мебошанд. Шумо дар соҳаҳои иҷтимоӣ, фарҳангӣ ё экологӣ кор мекунед ва таҷрибаи бебаҳо мегиред.',
        who: 'Барои кӣ мувофиқ аст?',
        whoDesc: 'Барои ҷавонони 16-26 сола (FSJ) ё ҳар синну сол (BFD), ки мехоҳанд Олмонро бишносанд, забон омӯзанд ва ҷамъиятро ёрӣ диҳанд.',
        age: 'Ҳадди синнусолӣ',
        ageDesc: 'FSJ: 16-26 сол | BFD: аз 16 сол (бе ҳадди боло)',
        duration: 'Давомнокӣ',
        durationDesc: '6-18 моҳ (одатан 12 моҳ)',
        benefits: 'Фоидаҳои асосӣ',
        benefitsList: [
          'Таҷрибаи амалӣ дар соҳаи иҷтимоӣ',
          'Омӯзиши забони олмонӣ',
          'Шиносоӣ бо фарҳанги олмонӣ',
          'Пули ҷайбӣ ва манзил',
          'Суғуртаи пурра',
          'Имкони таҳсил ё кор баъд аз хатм',
        ],
      },
      requirements: {
        title: 'Талаботҳо',
        items: [
          { title: 'Сатҳи забон', desc: 'Олмонӣ A2-B1 тавсия мешавад. Баъзе ташкилотҳо A1 қабул мекунанд.' },
          { title: 'Маълумот', desc: 'Аттестати мактаб кофӣ аст. Диплом талаб намешавад.' },
          { title: 'Суғуртаи саломатӣ', desc: 'Ташкилот суғуртаи пурра таъмин мекунад.' },
          { title: 'Виза', desc: 'Визаи хидмати ихтиёрӣ (§19c AufenthG) лозим аст.' },
          { title: 'Санадҳо', desc: 'Паспорт, CV, мактуби ангезиш, сертификати забон.' },
        ],
      },
      roadmap: {
        title: 'Қадамҳо',
        steps: [
          { title: 'Омодагӣ', desc: 'Забони олмониро омӯзед (ҳадди ақал A2). Ҳуҷҷатҳоро ҷамъ кунед: CV, сертификат, аксҳо.' },
          { title: 'Ёфтани ташкилот', desc: 'Дар сайтҳои freiwilligendienste.de, ijgd.de, fsj.de ҷустуҷӯ кунед. Аризаҳо фиристед.' },
          { title: 'Шартнома', desc: 'Бо ташкилот шартнома имзо кунед. Санадҳоро барои виза тайёр кунед.' },
          { title: 'Аризаи виза', desc: 'Дар сафорати Олмон виза гиред. 4-12 ҳафта интизор шавед.' },
          { title: 'Омадан ба Олмон', desc: 'Anmeldung кунед, ҳисоби бонкӣ кушоед, корро оғоз кунед.' },
          { title: 'Зиндагӣ дар давраи барнома', desc: 'Кор кунед, семинарҳо гузаред, забон беҳтар кунед, дӯстон ёбед.' },
        ],
      },
      salary: {
        title: 'Пули ҷайбӣ ва имконотҳо',
        items: [
          { title: 'Пули ҷайбӣ', desc: '150-450€/моҳ (аз рӯи ташкилот фарқ мекунад)' },
          { title: 'Манзил', desc: 'Ройгон ё бо ёрии молиявӣ' },
          { title: 'Ғизо', desc: 'Одатан дохили пардохт ё пули иловагӣ' },
          { title: 'Суғурта', desc: 'Саломатӣ, ҳодиса, масъулият — пурра пӯшида' },
          { title: 'Рухсатӣ', desc: '25-30 рӯз дар сол' },
        ],
      },
      proscons: {
        title: 'Фоидаҳо ва камбудиҳо',
        pros: [
          'Таҷрибаи кории воқеӣ дар Олмон',
          'Забонро дар муҳити зинда омӯзед',
          'Суғурта ва манзил ройгон',
          'Роҳи осон барои таҳсил/кор',
          'Шиносоӣ бо мардуми олмонӣ',
        ],
        cons: [
          'Пули ҷайбӣ кам аст',
          'Кор метавонад ҷисмонан вазнин бошад',
          'Забони олмонӣ лозим аст',
          'Визаро гирифтан вақт мегирад',
        ],
      },
      after: {
        title: 'Баъд аз хатм',
        options: [
          { title: 'Таҳсил', desc: 'Метавонед дар донишгоҳ ё Studienkolleg таҳсил кунед.' },
          { title: 'Ausbildung', desc: 'Омӯзиши касбӣ бо музд оғоз кунед.' },
          { title: 'Кор', desc: 'Агар ҷои кор ёбед, визаи корӣ гиред.' },
          { title: 'Иҷозатнома', desc: 'Таҷрибаи FSJ/BFD барои иқомат кӯмак мекунад.' },
        ],
      },
      faq: {
        title: 'Саволҳои маъмул',
        items: [
          { q: 'FSJ ва BFD чӣ фарқ доранд?', a: 'FSJ барои ҷавонони то 27 сол аст, BFD барои ҳар синну сол. Ҳар ду барнома монанданд.' },
          { q: 'Чӣ қадар пул мегирам?', a: '150-450€/моҳ + манзил ва ғизо ройгон ё бо ёрии молиявӣ.' },
          { q: 'Кадом забон лозим аст?', a: 'Олмонӣ A2-B1 тавсия мешавад. Баъзе ташкилотҳо A1 қабул мекунанд.' },
          { q: 'Оё метавонам баъд таҳсил кунам?', a: 'Бале! FSJ/BFD роҳи хуб барои донишгоҳ ё Ausbildung аст.' },
          { q: 'Чӣ гуна ташкилот ёбам?', a: 'Дар freiwilligendienste.de, ijgd.de ва fsj.de ҷустуҷӯ кунед.' },
          { q: 'Виза чӣ қадар вақт мегирад?', a: 'Одатан 4-12 ҳафта. Барвақт ариза диҳед!' },
          { q: 'Оё оила метавонад ҳамроҳам биёяд?', a: 'Одатан не. Визаи FSJ/BFD танҳо барои як нафар аст.' },
          { q: 'Кор дар кадом соҳаҳо аст?', a: 'Саломатӣ, парасторӣ, кӯдакон, экология, фарҳанг, варзиш.' },
          { q: 'Оё суғурта дохил аст?', a: 'Бале, ташкилот суғуртаи саломатӣ, ҳодиса ва масъулиятро мепардозад.' },
          { q: 'Чанд соат дар ҳафта кор мекунам?', a: 'Одатан 38-40 соат дар ҳафта.' },
          { q: 'Семинарҳо чистанд?', a: '25 рӯзи семинар дар давоми 12 моҳ: забон, фарҳанг, малакаҳо.' },
          { q: 'Оё баъд аз FSJ метавонам дар Олмон бимонам?', a: 'Бале, агар кор, таҳсил ё Ausbildung ёбед, визаро тағйир диҳед.' },
        ],
      },
    },
    ru: {
      title: 'FSJ / BFD — Волонтёрская служба в Германии',
      subtitle: 'Добровольный социальный год и федеральная волонтёрская служба',
      overview: {
        title: 'Что это?',
        what: 'FSJ (Freiwilliges Soziales Jahr) и BFD (Bundesfreiwilligendienst) — программы волонтёрской службы в Германии. Вы работаете в социальной, культурной или экологической сфере и получаете бесценный опыт.',
        who: 'Для кого подходит?',
        whoDesc: 'Для молодых людей 16-26 лет (FSJ) или любого возраста (BFD), желающих узнать Германию, выучить язык и помочь обществу.',
        age: 'Возрастные ограничения',
        ageDesc: 'FSJ: 16-26 лет | BFD: от 16 лет (без верхнего предела)',
        duration: 'Продолжительность',
        durationDesc: '6-18 месяцев (обычно 12 месяцев)',
        benefits: 'Основные преимущества',
        benefitsList: [
          'Практический опыт в социальной сфере',
          'Изучение немецкого языка',
          'Знакомство с немецкой культурой',
          'Карманные деньги и жильё',
          'Полная страховка',
          'Возможность учёбы или работы после окончания',
        ],
      },
      requirements: {
        title: 'Требования',
        items: [
          { title: 'Уровень языка', desc: 'Немецкий A2-B1 рекомендуется. Некоторые организации принимают A1.' },
          { title: 'Образование', desc: 'Достаточно школьного аттестата. Диплом не требуется.' },
          { title: 'Медстраховка', desc: 'Организация обеспечивает полную страховку.' },
          { title: 'Виза', desc: 'Требуется виза для волонтёрской службы (§19c AufenthG).' },
          { title: 'Документы', desc: 'Паспорт, CV, мотивационное письмо, языковой сертификат.' },
        ],
      },
      roadmap: {
        title: 'Пошаговый план',
        steps: [
          { title: 'Подготовка', desc: 'Изучите немецкий (минимум A2). Соберите документы: CV, сертификат, фото.' },
          { title: 'Поиск организации', desc: 'Ищите на freiwilligendienste.de, ijgd.de, fsj.de. Отправляйте заявки.' },
          { title: 'Контракт', desc: 'Подпишите контракт с организацией. Подготовьте документы для визы.' },
          { title: 'Заявка на визу', desc: 'Получите визу в посольстве Германии. Ожидание 4-12 недель.' },
          { title: 'Прибытие в Германию', desc: 'Сделайте Anmeldung, откройте счёт, начните работу.' },
          { title: 'Жизнь во время программы', desc: 'Работайте, посещайте семинары, улучшайте язык, находите друзей.' },
        ],
      },
      salary: {
        title: 'Карманные деньги и условия',
        items: [
          { title: 'Карманные деньги', desc: '150-450€/месяц (зависит от организации)' },
          { title: 'Жильё', desc: 'Бесплатно или с финансовой поддержкой' },
          { title: 'Питание', desc: 'Обычно включено или дополнительные деньги' },
          { title: 'Страховка', desc: 'Здоровье, несчастный случай, ответственность — полностью покрыто' },
          { title: 'Отпуск', desc: '25-30 дней в год' },
        ],
      },
      proscons: {
        title: 'Преимущества и недостатки',
        pros: [
          'Реальный рабочий опыт в Германии',
          'Изучение языка в живой среде',
          'Бесплатная страховка и жильё',
          'Лёгкий путь к учёбе/работе',
          'Знакомство с немцами',
        ],
        cons: [
          'Маленькие карманные деньги',
          'Работа может быть физически тяжёлой',
          'Нужен немецкий язык',
          'Получение визы занимает время',
        ],
      },
      after: {
        title: 'После окончания',
        options: [
          { title: 'Учёба', desc: 'Можете поступить в университет или Studienkolleg.' },
          { title: 'Ausbildung', desc: 'Начните профессиональное обучение с зарплатой.' },
          { title: 'Работа', desc: 'Если найдёте работу, получите рабочую визу.' },
          { title: 'Разрешение', desc: 'Опыт FSJ/BFD помогает при получении ВНЖ.' },
        ],
      },
      faq: {
        title: 'Часто задаваемые вопросы',
        items: [
          { q: 'Чем отличаются FSJ и BFD?', a: 'FSJ для молодых до 27 лет, BFD для любого возраста. Обе программы похожи.' },
          { q: 'Сколько денег я получу?', a: '150-450€/месяц + бесплатное жильё и питание или финансовая поддержка.' },
          { q: 'Какой язык нужен?', a: 'Немецкий A2-B1 рекомендуется. Некоторые организации принимают A1.' },
          { q: 'Могу ли я потом учиться?', a: 'Да! FSJ/BFD — хороший путь к университету или Ausbildung.' },
          { q: 'Как найти организацию?', a: 'Ищите на freiwilligendienste.de, ijgd.de и fsj.de.' },
          { q: 'Сколько времени занимает виза?', a: 'Обычно 4-12 недель. Подавайте заранее!' },
          { q: 'Может ли семья приехать со мной?', a: 'Обычно нет. Виза FSJ/BFD только для одного человека.' },
          { q: 'В каких сферах работа?', a: 'Здравоохранение, уход, дети, экология, культура, спорт.' },
          { q: 'Страховка включена?', a: 'Да, организация оплачивает медицинскую, от несчастных случаев и ответственности.' },
          { q: 'Сколько часов в неделю работать?', a: 'Обычно 38-40 часов в неделю.' },
          { q: 'Что такое семинары?', a: '25 дней семинаров за 12 месяцев: язык, культура, навыки.' },
          { q: 'Могу ли я остаться после FSJ?', a: 'Да, если найдёте работу, учёбу или Ausbildung, поменяйте визу.' },
        ],
      },
    },
    de: {
      title: 'FSJ / BFD — Freiwilligendienst in Deutschland',
      subtitle: 'Freiwilliges Soziales Jahr und Bundesfreiwilligendienst',
      overview: {
        title: 'Was ist das?',
        what: 'FSJ (Freiwilliges Soziales Jahr) und BFD (Bundesfreiwilligendienst) sind Freiwilligendienstprogramme in Deutschland. Sie arbeiten im sozialen, kulturellen oder ökologischen Bereich und sammeln wertvolle Erfahrungen.',
        who: 'Für wen geeignet?',
        whoDesc: 'Für junge Menschen von 16-26 Jahren (FSJ) oder jeden Alters (BFD), die Deutschland kennenlernen, Deutsch lernen und der Gesellschaft helfen möchten.',
        age: 'Altersgrenzen',
        ageDesc: 'FSJ: 16-26 Jahre | BFD: ab 16 Jahren (keine Obergrenze)',
        duration: 'Dauer',
        durationDesc: '6-18 Monate (normalerweise 12 Monate)',
        benefits: 'Hauptvorteile',
        benefitsList: [
          'Praktische Erfahrung im sozialen Bereich',
          'Deutschlernen',
          'Kennenlernen der deutschen Kultur',
          'Taschengeld und Unterkunft',
          'Volle Versicherung',
          'Möglichkeit für Studium oder Arbeit danach',
        ],
      },
      requirements: {
        title: 'Anforderungen',
        items: [
          { title: 'Sprachniveau', desc: 'Deutsch A2-B1 empfohlen. Einige Organisationen akzeptieren A1.' },
          { title: 'Bildung', desc: 'Schulabschluss reicht aus. Kein Diplom erforderlich.' },
          { title: 'Krankenversicherung', desc: 'Die Organisation stellt volle Versicherung bereit.' },
          { title: 'Visum', desc: 'Visum für Freiwilligendienst (§19c AufenthG) erforderlich.' },
          { title: 'Dokumente', desc: 'Reisepass, CV, Motivationsschreiben, Sprachzertifikat.' },
        ],
      },
      roadmap: {
        title: 'Schritte',
        steps: [
          { title: 'Vorbereitung', desc: 'Deutsch lernen (mindestens A2). Dokumente sammeln: CV, Zertifikat, Fotos.' },
          { title: 'Organisation finden', desc: 'Auf freiwilligendienste.de, ijgd.de, fsj.de suchen. Bewerbungen senden.' },
          { title: 'Vertrag', desc: 'Vertrag mit der Organisation unterschreiben. Dokumente für Visum vorbereiten.' },
          { title: 'Visumantrag', desc: 'Visum bei der Deutschen Botschaft beantragen. 4-12 Wochen warten.' },
          { title: 'Ankunft in Deutschland', desc: 'Anmeldung machen, Bankkonto eröffnen, Arbeit beginnen.' },
          { title: 'Leben während des Programms', desc: 'Arbeiten, Seminare besuchen, Sprache verbessern, Freunde finden.' },
        ],
      },
      salary: {
        title: 'Taschengeld und Leistungen',
        items: [
          { title: 'Taschengeld', desc: '150-450€/Monat (abhängig von der Organisation)' },
          { title: 'Unterkunft', desc: 'Kostenlos oder mit finanzieller Unterstützung' },
          { title: 'Verpflegung', desc: 'Normalerweise inklusive oder Zusatzgeld' },
          { title: 'Versicherung', desc: 'Gesundheit, Unfall, Haftpflicht — vollständig abgedeckt' },
          { title: 'Urlaub', desc: '25-30 Tage pro Jahr' },
        ],
      },
      proscons: {
        title: 'Vor- und Nachteile',
        pros: [
          'Echte Arbeitserfahrung in Deutschland',
          'Sprachlernen in echtem Umfeld',
          'Kostenlose Versicherung und Unterkunft',
          'Einfacher Weg zu Studium/Arbeit',
          'Kontakte mit Deutschen',
        ],
        cons: [
          'Geringes Taschengeld',
          'Arbeit kann körperlich anstrengend sein',
          'Deutsch erforderlich',
          'Visumerteilung braucht Zeit',
        ],
      },
      after: {
        title: 'Nach dem Abschluss',
        options: [
          { title: 'Studium', desc: 'Sie können an einer Universität oder im Studienkolleg studieren.' },
          { title: 'Ausbildung', desc: 'Berufsausbildung mit Gehalt beginnen.' },
          { title: 'Arbeit', desc: 'Wenn Sie einen Job finden, Arbeitsvisum beantragen.' },
          { title: 'Aufenthaltserlaubnis', desc: 'FSJ/BFD-Erfahrung hilft beim Erhalt der Aufenthaltserlaubnis.' },
        ],
      },
      faq: {
        title: 'Häufig gestellte Fragen',
        items: [
          { q: 'Was ist der Unterschied zwischen FSJ und BFD?', a: 'FSJ ist für Jugendliche bis 27 Jahre, BFD für jedes Alter. Beide Programme sind ähnlich.' },
          { q: 'Wie viel Geld bekomme ich?', a: '150-450€/Monat + kostenlose Unterkunft und Verpflegung oder finanzielle Unterstützung.' },
          { q: 'Welche Sprache brauche ich?', a: 'Deutsch A2-B1 empfohlen. Einige Organisationen akzeptieren A1.' },
          { q: 'Kann ich danach studieren?', a: 'Ja! FSJ/BFD ist ein guter Weg zur Universität oder Ausbildung.' },
          { q: 'Wie finde ich eine Organisation?', a: 'Suchen Sie auf freiwilligendienste.de, ijgd.de und fsj.de.' },
          { q: 'Wie lange dauert das Visum?', a: 'Normalerweise 4-12 Wochen. Bewerben Sie sich frühzeitig!' },
          { q: 'Kann meine Familie mitkommen?', a: 'Normalerweise nicht. FSJ/BFD-Visum ist nur für eine Person.' },
          { q: 'In welchen Bereichen wird gearbeitet?', a: 'Gesundheit, Pflege, Kinder, Ökologie, Kultur, Sport.' },
          { q: 'Ist Versicherung inklusive?', a: 'Ja, die Organisation zahlt Kranken-, Unfall- und Haftpflichtversicherung.' },
          { q: 'Wie viele Stunden pro Woche arbeite ich?', a: 'Normalerweise 38-40 Stunden pro Woche.' },
          { q: 'Was sind Seminare?', a: '25 Seminartage in 12 Monaten: Sprache, Kultur, Fähigkeiten.' },
          { q: 'Kann ich nach dem FSJ in Deutschland bleiben?', a: 'Ja, wenn Sie Arbeit, Studium oder Ausbildung finden, Visum ändern.' },
        ],
      },
    },
  };

  const t = content[language];

  const seoTitle = {
    tj: 'FSJ / BFD — Хидмати ихтиёрӣ дар Олмон | Germany Roadmap',
    ru: 'FSJ / BFD — Волонтёрская служба в Германии | Germany Roadmap',
    de: 'FSJ / BFD — Freiwilligendienst in Deutschland | Germany Roadmap',
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
                <Heart className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground/80">6-18 {language === 'de' ? 'Monate' : language === 'ru' ? 'месяцев' : 'моҳ'}</span>
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
                    {i === 3 && <Home className="w-6 h-6 text-primary" />}
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

export default FSJBFDPage;
