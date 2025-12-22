import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink, Wrench, Euro, Clock, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const AusbildungPage = () => {
  const { language, t } = useLanguage();

  const benefits = language === 'de' ? [
    { icon: Euro, text: 'Gehalt 800-1200€/Monat während der Ausbildung' },
    { icon: Clock, text: '2-3,5 Jahre Ausbildung (je nach Beruf)' },
    { icon: Award, text: 'Offizieller deutscher Abschluss' },
    { icon: Users, text: 'Arbeitsmöglichkeit nach Abschluss' },
  ] : [
    { icon: Euro, text: 'Зарплата 800-1200€/месяц во время обучения' },
    { icon: Clock, text: '2-3.5 года обучения (зависит от профессии)' },
    { icon: Award, text: 'Официальный диплом Германии' },
    { icon: Users, text: 'Возможность работы после окончания' },
  ];

  const popularTrades = language === 'de' ? [
    { name: 'IT-Fachinformatiker', description: 'IT-Spezialist' },
    { name: 'Pflegefachmann/frau', description: 'Pflege' },
    { name: 'Mechatroniker', description: 'Mechanik und Elektronik' },
    { name: 'Kaufmann/frau', description: 'Handel und Management' },
    { name: 'Elektriker', description: 'Elektriker' },
    { name: 'Koch/Köchin', description: 'Koch' },
  ] : [
    { name: 'IT-Fachinformatiker', description: 'IT-специалист' },
    { name: 'Pflegefachmann/frau', description: 'Уход за больными' },
    { name: 'Mechatroniker', description: 'Механика и электроника' },
    { name: 'Kaufmann/frau', description: 'Торговля и управление' },
    { name: 'Elektriker', description: 'Электрик' },
    { name: 'Koch/Köchin', description: 'Повар' },
  ];

  const requirements = language === 'de' ? [
    'Alter 16+ Jahre',
    'Schulabschluss',
    'Deutschkenntnisse (B1-B2)',
    'Ausbildungsvertrag von Unternehmen',
    'Wohnungsnachweis in Deutschland',
    'Krankenversicherung',
    'Gültiger Reisepass',
  ] : [
    'Возраст 16+ лет',
    'Аттестат об окончании школы',
    'Немецкий язык (B1-B2)',
    'Контракт на обучение от компании',
    'Подтверждение жилья в Германии',
    'Медицинская страховка',
    'Действующий паспорт',
  ];

  const seoTitle = language === 'de' 
    ? 'Ausbildung in Deutschland | Berufsausbildung mit Gehalt' 
    : 'Ausbildung в Германии | Профобучение с зарплатой';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={t.ausbildung.intro} />
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ausbildung/20 backdrop-blur-sm mb-6">
                <Wrench className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground/80">
                  {language === 'de' ? '6-18 Monate Vorbereitung' : '6-18 месяцев подготовки'}
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
              {language === 'de' ? 'Vorteile der Ausbildung' : 'Преимущества Ausbildung'}
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
                ausbildung.de — {language === 'de' ? 'Stellensuche' : 'Поиск места'}
              </a>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {language === 'de' ? 'Voraussetzungen' : 'Требования'}
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
              {language === 'de' ? 'Prozess der Ausbildung' : 'Процесс получения Ausbildung'}
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  language === 'de' 
                    ? { step: 1, title: 'Berufswahl', desc: 'Wählen Sie Ihren Wunschberuf und informieren Sie sich' }
                    : { step: 1, title: 'Выбор профессии', desc: 'Выберите желаемую профессию и изучите информацию о ней' },
                  language === 'de'
                    ? { step: 2, title: 'Sprachlernen', desc: 'Lernen Sie Deutsch bis B1-B2 Niveau' }
                    : { step: 2, title: 'Изучение языка', desc: 'Изучите немецкий до уровня B1-B2' },
                  language === 'de'
                    ? { step: 3, title: 'Suche & Bewerbung', desc: 'Suchen Sie auf ausbildung.de und bewerben Sie sich' }
                    : { step: 3, title: 'Поиск и заявка', desc: 'Ищите места на ausbildung.de и отправляйте заявки' },
                  language === 'de'
                    ? { step: 4, title: 'Vertrag erhalten', desc: 'Unterzeichnen Sie den Ausbildungsvertrag mit dem Unternehmen' }
                    : { step: 4, title: 'Получение контракта', desc: 'Подпишите контракт на обучение с компанией' },
                  language === 'de'
                    ? { step: 5, title: 'Visum erhalten', desc: 'Beantragen Sie das Ausbildungsvisum bei der Botschaft' }
                    : { step: 5, title: 'Получение визы', desc: 'Обратитесь в Посольство за визой Ausbildung' },
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
              <Link to="/#wizard">
                {language === 'de' ? 'Plan erstellen' : 'Создать план'}
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
