import { AusbildungPageSEO } from "@/components/SEOHead";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink, Wrench, Euro, Clock, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const AusbildungPage = () => {
  const { language, t } = useLanguage();

  const langPrefix = language === 'tj' ? '/tj' : `/${language}`;

  const benefits = language === 'de' ? [
    { icon: Euro, text: 'Gehalt 800-1200€/Monat während der Ausbildung' },
    { icon: Clock, text: '2-3,5 Jahre Ausbildung (je nach Beruf)' },
    { icon: Award, text: 'Offizieller deutscher Abschluss' },
    { icon: Users, text: 'Arbeitsmöglichkeit nach Abschluss' },
  ] : language === 'ru' ? [
    { icon: Euro, text: 'Зарплата 800-1200€/месяц во время обучения' },
    { icon: Clock, text: '2-3.5 года обучения (зависит от профессии)' },
    { icon: Award, text: 'Официальный диплом Германии' },
    { icon: Users, text: 'Возможность работы после окончания' },
  ] : [
    { icon: Euro, text: 'Музд 800-1200€/моҳ дар давраи таълим' },
    { icon: Clock, text: '2-3.5 соли таълим (вобаста ба касб)' },
    { icon: Award, text: 'Дипломи расмӣи Олмон' },
    { icon: Users, text: 'Имконияти кор пас аз хатм' },
  ];

  const popularTrades = language === 'de' ? [
    { name: 'IT-Fachinformatiker', description: 'IT-Spezialist' },
    { name: 'Pflegefachmann/frau', description: 'Pflege' },
    { name: 'Mechatroniker', description: 'Mechanik und Elektronik' },
    { name: 'Kaufmann/frau', description: 'Handel und Management' },
    { name: 'Elektriker', description: 'Elektriker' },
    { name: 'Koch/Köchin', description: 'Koch' },
  ] : language === 'ru' ? [
    { name: 'IT-Fachinformatiker', description: 'IT-специалист' },
    { name: 'Pflegefachmann/frau', description: 'Уход за больными' },
    { name: 'Mechatroniker', description: 'Механика и электроника' },
    { name: 'Kaufmann/frau', description: 'Торговля и управление' },
    { name: 'Elektriker', description: 'Электрик' },
    { name: 'Koch/Köchin', description: 'Повар' },
  ] : [
    { name: 'IT-Fachinformatiker', description: 'Мутахассиси IT' },
    { name: 'Pflegefachmann/frau', description: 'Парасторӣ аз беморон' },
    { name: 'Mechatroniker', description: 'Механика ва электроника' },
    { name: 'Kaufmann/frau', description: 'Савдо ва менеҷмент' },
    { name: 'Elektriker', description: 'Барқиятчӣ' },
    { name: 'Koch/Köchin', description: 'Ошпаз' },
  ];

  const requirements = language === 'de' ? [
    'Alter 16+ Jahre',
    'Schulabschluss',
    'Deutschkenntnisse (B1-B2)',
    'Ausbildungsvertrag von Unternehmen',
    'Wohnungsnachweis in Deutschland',
    'Krankenversicherung',
    'Gültiger Reisepass',
  ] : language === 'ru' ? [
    'Возраст 16+ лет',
    'Аттестат об окончании школы',
    'Немецкий язык (B1-B2)',
    'Контракт на обучение от компании',
    'Подтверждение жилья в Германии',
    'Медицинская страховка',
    'Действующий паспорт',
  ] : [
    'Синну сол 16+',
    'Шаҳодатномаи хатми мактаб',
    'Забони олмонӣ (B1-B2)',
    'Шартномаи таълим аз корхона',
    'Тасдиқи маскан дар Олмон',
    'Суғуртаи тиббӣ',
    'Шиносномаи эътибор',
  ];


  return (
    <>
      <AusbildungPageSEO />

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ausbildung/20 backdrop-blur-sm mb-6">
                <Wrench className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground/80">
                  {language === 'de' ? '6-18 Monate Vorbereitung' : language === 'ru' ? '6-18 месяцев подготовки' : '6-18 моҳ тайёргарӣ'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.ausbildung.title}
              </h1>
              <p className="text-xl text-primary-foreground/70 mb-8">
                {t.ausbildung.intro}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {language === 'de' ? 'Vorteile der Ausbildung' : language === 'ru' ? 'Преимущества Ausbildung' : 'Бартариҳои Ausbildung'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="card-elevated p-6 text-center">
                  <benefit.icon className="w-10 h-10 text-ausbildung mx-auto mb-4" />
                  <p className="text-foreground font-medium">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Trades */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t.ausbildung.popularTrades.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {popularTrades.map((trade, i) => (
                <div key={i} className="card-elevated p-6 border-l-4 border-l-ausbildung">
                  <h3 className="font-bold text-foreground mb-1">{trade.name}</h3>
                  <p className="text-muted-foreground text-sm">{trade.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a
                href="https://www.ausbildung.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-info hover:underline font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                ausbildung.de — {language === 'de' ? 'Stellensuche' : language === 'ru' ? 'Поиск места' : 'Ҷустуҷӯи ҷой'}
              </a>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {language === 'de' ? 'Voraussetzungen' : language === 'ru' ? 'Требования' : 'Шартҳо'}
              </h2>
              <div className="card-elevated p-6 md:p-8">
                <ul className="space-y-4">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {language === 'de' ? 'Prozess der Ausbildung' : language === 'ru' ? 'Процесс получения Ausbildung' : 'Ҷараёни гирифтани Ausbildung'}
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  language === 'de' 
                    ? { step: 1, title: 'Berufswahl', desc: 'Wählen Sie Ihren Wunschberuf und informieren Sie sich' }
                    : language === 'ru'
                    ? { step: 1, title: 'Выбор профессии', desc: 'Выберите желаемую профессию и изучите информацию о ней' }
                    : { step: 1, title: 'Интихоби касб', desc: 'Касби дилхоҳро интихоб кунед ва маълумот ҷамъ оваред' },
                  language === 'de'
                    ? { step: 2, title: 'Sprachlernen', desc: 'Lernen Sie Deutsch bis B1-B2 Niveau' }
                    : language === 'ru'
                    ? { step: 2, title: 'Изучение языка', desc: 'Изучите немецкий до уровня B1-B2' }
                    : { step: 2, title: 'Омӯхтани забон', desc: 'Забони олмонӣро то сатҳи B1-B2 омӯзед' },
                  language === 'de'
                    ? { step: 3, title: 'Suche & Bewerbung', desc: 'Suchen Sie auf ausbildung.de und bewerben Sie sich' }
                    : language === 'ru'
                    ? { step: 3, title: 'Поиск и заявка', desc: 'Ищите места на ausbildung.de и отправляйте заявки' }
                    : { step: 3, title: 'Ҷустуҷӯ ва ариза', desc: 'Дар ausbildung.de ҷойҳо ҷустуҷӯ кунед ва ариза пешниҳод намоед' },
                  language === 'de'
                    ? { step: 4, title: 'Vertrag erhalten', desc: 'Unterzeichnen Sie den Ausbildungsvertrag mit dem Unternehmen' }
                    : language === 'ru'
                    ? { step: 4, title: 'Получение контракта', desc: 'Подпишите контракт на обучение с компанией' }
                    : { step: 4, title: 'Гирифтани шартнома', desc: 'Шартномаи таълимро бо корхона имзо намоед' },
                  language === 'de'
                    ? { step: 5, title: 'Visum erhalten', desc: 'Beantragen Sie das Ausbildungsvisum bei der Botschaft' }
                    : language === 'ru'
                    ? { step: 5, title: 'Получение визы', desc: 'Обратитесь в Посольство за визой Ausbildung' }
                    : { step: 5, title: 'Гирифтани виза', desc: 'Барои визаи Ausbildung ба Сафорат муроҷиат намоед' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-ausbildung flex items-center justify-center text-card font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container-main text-center">
            <Button asChild className="btn-hero">
              <Link to={`${langPrefix}/#wizard`}>
                {language === 'de' ? 'Plan erstellen' : language === 'ru' ? 'Создать план' : 'Нақша эҷод кардан'}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default AusbildungPage;
