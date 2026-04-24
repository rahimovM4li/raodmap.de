import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Heart, Euro, Home, Clock, Award, Users, AlertCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FSJPage = () => {
  const { language, t } = useLanguage();

  const seoTitle = language === 'de' 
    ? 'FSJ / BFD in Deutschland | Freiwilligendienst' 
    : language === 'ru'
    ? 'FSJ / BFD в Германии | Добровольная служба'
    : 'FSJ / BFD дар Олмон | Хидмати ихтиёрӣ';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={t.fsj.intro} />
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
                <span className="text-sm text-primary-foreground/80">
                  {language === 'de' ? '6-18 Monate Freiwilligendienst' : language === 'ru' ? '6-18 месяцев службы' : '6-18 моҳ хидмат'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.fsj.title}
              </h1>
              <p className="text-xl text-primary-foreground/70 mb-8">
                {t.fsj.intro}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {t.fsj.overview.title}
              </h2>
              <div className="card-elevated p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {language === 'de' ? 'Was ist FSJ/BFD?' : language === 'ru' ? 'Что такое FSJ/BFD?' : 'FSJ/BFD чист?'}
                  </h3>
                  <p className="text-muted-foreground">{t.fsj.overview.what}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {language === 'de' ? 'Für wen?' : language === 'ru' ? 'Для кого?' : 'Барои кӣ?'}
                  </h3>
                  <p className="text-muted-foreground">{t.fsj.overview.forWho}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {language === 'de' ? 'Dauer' : language === 'ru' ? 'Продолжительность' : 'Давомнокӣ'}
                  </h3>
                  <p className="text-muted-foreground">{t.fsj.overview.duration}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {language === 'de' ? 'Hauptvorteile' : language === 'ru' ? 'Основные преимущества' : 'Бартариҳои асосӣ'}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {t.fsj.overview.benefits.map((benefit: string, i: number) => (
                <div key={i} className="card-elevated p-4 flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {t.fsj.requirements.title}
              </h2>
              <div className="card-elevated p-6 md:p-8">
                <ul className="space-y-4">
                  {t.fsj.requirements.items.map((req: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-info shrink-0 mt-0.5" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t.fsj.roadmap.title}
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  t.fsj.roadmap.step1,
                  t.fsj.roadmap.step2,
                  t.fsj.roadmap.step3,
                  t.fsj.roadmap.step4,
                  t.fsj.roadmap.step5,
                  t.fsj.roadmap.step6,
                ].map((step: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-primary-foreground font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="card-elevated p-6 flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Salary & Conditions */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t.fsj.salary.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="card-elevated p-6 text-center">
                <Euro className="w-10 h-10 text-success mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">
                  {language === 'de' ? 'Taschengeld' : language === 'ru' ? 'Карманные деньги' : 'Пулӣ ҷебӣ'}
                </h3>
                <p className="text-muted-foreground">{t.fsj.salary.monthly}</p>
              </div>
              <div className="card-elevated p-6 text-center">
                <Home className="w-10 h-10 text-info mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">
                  {language === 'de' ? 'Unterkunft' : language === 'ru' ? 'Жильё' : 'Манзил'}
                </h3>
                <p className="text-muted-foreground">{t.fsj.salary.accommodation}</p>
              </div>
              <div className="card-elevated p-6 text-center">
                <Clock className="w-10 h-10 text-warning mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">
                  {language === 'de' ? 'Urlaub' : language === 'ru' ? 'Отпуск' : 'Рухсатӣ'}
                </h3>
                <p className="text-muted-foreground">{t.fsj.salary.vacation}</p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto mt-8 space-y-4">
              <div className="card-elevated p-4">
                <p className="text-foreground"><strong>{language === 'de' ? 'Verpflegung:' : language === 'ru' ? 'Питание:' : 'Ғизо:'}</strong> {t.fsj.salary.food}</p>
              </div>
              <div className="card-elevated p-4">
                <p className="text-foreground"><strong>{language === 'de' ? 'Versicherungen:' : language === 'ru' ? 'Страховки:' : 'Суғуртаҳо:'}</strong> {t.fsj.salary.insurance}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  {t.fsj.pros.title}
                </h2>
                <div className="space-y-3">
                  {t.fsj.pros.items.map((pro: string, i: number) => (
                    <div key={i} className="card-elevated p-4 flex items-start gap-3">
                      <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  {t.fsj.cons.title}
                </h2>
                <div className="space-y-3">
                  {t.fsj.cons.items.map((con: string, i: number) => (
                    <div key={i} className="card-elevated p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                      <span className="text-foreground">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* After Completion */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {t.fsj.after.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-elevated p-6 border-l-4 border-l-primary">
                  <Award className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-foreground mb-2">
                    {language === 'de' ? 'Studium' : language === 'ru' ? 'Учёба' : 'Таҳсил'}
                  </h3>
                  <p className="text-muted-foreground">{t.fsj.after.study}</p>
                </div>
                <div className="card-elevated p-6 border-l-4 border-l-ausbildung">
                  <Users className="w-8 h-8 text-ausbildung mb-3" />
                  <h3 className="font-bold text-foreground mb-2">Ausbildung</h3>
                  <p className="text-muted-foreground">{t.fsj.after.ausbildung}</p>
                </div>
                <div className="card-elevated p-6 border-l-4 border-l-success">
                  <Check className="w-8 h-8 text-success mb-3" />
                  <h3 className="font-bold text-foreground mb-2">
                    {language === 'de' ? 'Arbeit' : language === 'ru' ? 'Работа' : 'Кор'}
                  </h3>
                  <p className="text-muted-foreground">{t.fsj.after.work}</p>
                </div>
                <div className="card-elevated p-6 border-l-4 border-l-info">
                  <Home className="w-8 h-8 text-info mb-3" />
                  <h3 className="font-bold text-foreground mb-2">
                    {language === 'de' ? 'Aufenthalt' : language === 'ru' ? 'Проживание' : 'Иқомат'}
                  </h3>
                  <p className="text-muted-foreground">{t.fsj.after.residence}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {t.fsj.faq.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {t.fsj.faq.items.map((item: any, i: number) => (
                  <AccordionItem key={i} value={`item-${i}`} className="card-elevated px-6">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      <span className="flex items-center gap-3">
                        <ChevronDown className="w-5 h-5 text-primary shrink-0" />
                        {item.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2 pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container-main text-center">
            <Button asChild className="btn-hero">
              <Link to="/#wizard">
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

export default FSJPage;
