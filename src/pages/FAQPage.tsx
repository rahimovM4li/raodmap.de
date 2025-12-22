import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQPage = () => {
  const { language } = useLanguage();

  const faqItems = language === 'de' ? [
    {
      question: 'Wie viel Geld brauche ich für ein Studentenvisum?',
      answer: 'Für ein Studentenvisum müssen Sie etwa €11.208 auf einem Sperrkonto nachweisen. Diese Summe entspricht einem Jahr Lebenshaltungskosten. Monatlich werden €934 von diesem Konto freigegeben.',
    },
    {
      question: 'Welche Sprache brauche ich fürs Studium?',
      answer: 'Für die meisten Studiengänge benötigen Sie Deutsch (B2-C1). Akzeptierte Zertifikate: TestDaF, DSH, Goethe-Zertifikat. Es gibt auch englischsprachige Programme (IELTS 6.0+, TOEFL 80+).',
    },
    {
      question: 'Wie lange dauert die Visumbearbeitung?',
      answer: 'Die Visumbearbeitung dauert in der Regel 4 bis 12 Wochen. Die Wartezeit variiert je nach Saison und Visumart. Im Sommer dauert es länger.',
    },
    {
      question: 'Darf ich während des Studiums arbeiten?',
      answer: 'Ja! Internationale Studierende dürfen 120 volle oder 240 halbe Tage im Jahr arbeiten. Der Mindestlohn beträgt €12 pro Stunde.',
    },
    {
      question: 'Was ist eine Ausbildung?',
      answer: 'Eine Ausbildung ist eine Berufsausbildung in Deutschland. Sie arbeiten 2-3,5 Jahre in einem Unternehmen und lernen in der Berufsschule. Dabei erhalten Sie 800-1200€/Monat Gehalt. Nach Abschluss erhalten Sie einen Abschluss und Arbeitsmöglichkeiten.',
    },
    {
      question: 'Was ist die Blue Card und wie bekomme ich sie?',
      answer: 'Die EU Blue Card ist ein Arbeitsvisum für hochqualifizierte Fachkräfte. Voraussetzungen: anerkannter Abschluss, Arbeitsvertrag, Mindestgehalt €45.300/Jahr (2024). Für IT/Ingenieurwesen €41.000/Jahr.',
    },
    {
      question: 'Wie lasse ich meinen Abschluss anerkennen?',
      answer: 'Prüfen Sie zunächst Ihren Abschluss auf anabin.kmk.org. Wenn "H+" angezeigt wird — gut. Dann beantragen Sie die Anerkennung auf anerkennung-in-deutschland.de. Der Prozess dauert 3-6 Monate.',
    },
    {
      question: 'Ist das Studium in Deutschland kostenlos?',
      answer: 'An den meisten staatlichen Universitäten ist das Studium kostenlos! Nur der Semesterbeitrag (150-350€) ist zu zahlen. Lebenshaltungskosten: 850-1200€/Monat.',
    },
    {
      question: 'Welche Stipendien gibt es?',
      answer: 'Wichtige Stipendien: DAAD (700-1200€/Monat), Deutschlandstipendium (300€/Monat), Erasmus+, Konrad-Adenauer-Stiftung, Friedrich-Ebert-Stiftung. Suchen Sie auf daad.de.',
    },
    {
      question: 'Wie lange kann ich nach dem Studium in Deutschland bleiben?',
      answer: 'Nach dem Studium können Sie 18 Monate zur Jobsuche in Deutschland bleiben. Nach Erhalt einer Stelle erhalten Sie ein Arbeitsvisum.',
    },
  ] : [
    {
      question: 'Сколько денег нужно для учебной визы?',
      answer: 'Для учебной визы нужно показать ~11,208€ на блокированном счету в Германии (Sperrkonto). Это сумма на год обучения. Каждый месяц вы получаете 934€ с этого счёта.',
    },
    {
      question: 'Какой язык нужен для учёбы?',
      answer: 'Для большинства университетских программ нужен немецкий (B2-C1). Принимаемые сертификаты: TestDaF, DSH, Goethe-Zertifikat. Есть программы на английском (IELTS 6.0+, TOEFL 80+).',
    },
    {
      question: 'Сколько ждать визу?',
      answer: 'Процесс получения визы занимает от 4 до 12 недель. Время зависит от сезона и типа визы. Летом дольше.',
    },
    {
      question: 'Могу ли я работать во время учёбы?',
      answer: 'Да! Иностранные студенты могут работать 120 полных или 240 неполных дней в год. Минимальная почасовая оплата €12.',
    },
    {
      question: 'Что такое Ausbildung?',
      answer: 'Ausbildung — это профессиональное обучение в Германии. Вы 2-3.5 года работаете в компании и учитесь в школе. При этом получаете зарплату 800-1200€/месяц. После окончания — диплом и возможность работы.',
    },
    {
      question: 'Что такое Blue Card и как её получить?',
      answer: 'EU Blue Card — рабочая виза для высококвалифицированных специалистов. Требования: признанный диплом, контракт от работодателя, минимальная зарплата €45,300/год (2024). Для IT/инженерии €41,000/год.',
    },
    {
      question: 'Как признать диплом?',
      answer: 'Сначала проверьте диплом на anabin.kmk.org. Если "H+" — хорошо. Затем подайте заявку на anerkennung-in-deutschland.de. Процесс 3-6 месяцев.',
    },
    {
      question: 'Бесплатно ли обучение в Германии?',
      answer: 'В большинстве государственных вузов обучение бесплатное! Только семестровый взнос (150-350€). Расходы на жизнь 850-1200€/месяц.',
    },
    {
      question: 'Какие стипендии есть?',
      answer: 'Основные стипендии: DAAD (700-1200€/месяц), Deutschlandstipendium (300€/месяц), Erasmus+, фонд Конрада Аденауэра, фонд Фридриха Эберта. Ищите на daad.de.',
    },
    {
      question: 'Сколько времени на поиск работы после учёбы?',
      answer: 'После окончания учёбы вы можете остаться в Германии 18 месяцев для поиска работы. После нахождения работы получите рабочую визу.',
    },
  ];

  const glossary = language === 'de' ? [
    { term: 'Sperrkonto', definition: 'Gesperrtes Bankkonto für Visum' },
    { term: 'TestDaF', definition: 'Deutschprüfung für Ausländer' },
    { term: 'uni-assist', definition: 'Dokumentenbewertungsdienst für Unis' },
    { term: 'Anabin', definition: 'Datenbank zur Anerkennung von Abschlüssen' },
    { term: 'Aufenthaltstitel', definition: 'Aufenthaltserlaubnis in Deutschland' },
    { term: 'Studienkolleg', definition: 'Vorbereitungskurs für die Universität' },
  ] : [
    { term: 'Sperrkonto', definition: 'Блокированный банковский счёт для визы' },
    { term: 'TestDaF', definition: 'Экзамен по немецкому для иностранцев' },
    { term: 'uni-assist', definition: 'Служба оценки документов для вузов' },
    { term: 'Anabin', definition: 'База данных для признания дипломов' },
    { term: 'Aufenthaltstitel', definition: 'Разрешение на пребывание в Германии' },
    { term: 'Studienkolleg', definition: 'Подготовительный курс для университета' },
  ];

  const seoTitle = language === 'de' 
    ? 'Häufige Fragen zur Einwanderung nach Deutschland | FAQ' 
    : 'Вопросы об эмиграции в Германию | FAQ';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={language === 'de' ? 'Häufige Fragen zu Visum, Studium, Arbeit in Deutschland' : 'Частые вопросы о визе, учёбе, работе в Германии'} />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <HelpCircle className="w-16 h-16 text-accent mx-auto mb-6" />
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {language === 'de' ? 'Häufige Fragen' : 'Частые вопросы'}
              </h1>
              <p className="text-xl text-primary-foreground/70">
                {language === 'de' 
                  ? 'Antworten auf häufige Fragen zur Einwanderung nach Deutschland' 
                  : 'Ответы на частые вопросы об эмиграции в Германию'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, i) => (
                  <AccordionItem 
                    key={i} 
                    value={`item-${i}`}
                    className="card-elevated border-none"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
                      <span className="font-semibold text-foreground pr-4">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Glossary */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {language === 'de' ? 'Glossar' : 'Глоссарий'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {glossary.map((item, i) => (
                <div key={i} className="card-elevated p-4">
                  <h3 className="font-bold text-foreground">{item.term}</h3>
                  <p className="text-sm text-muted-foreground">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQPage;
