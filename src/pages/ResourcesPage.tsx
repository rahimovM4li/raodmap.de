import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Phone, Download, Building2, BookOpen, Award, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateChecklistPDF } from '@/lib/pdfGenerator';

const ResourcesPage = () => {
  const { language, t } = useLanguage();

  const officialLinks = [
    {
      name: 'DAAD',
      description: language === 'de' 
        ? 'Deutscher Akademischer Austauschdienst' 
        : 'Германская служба академических обменов',
      url: 'https://www.daad.de',
      icon: BookOpen,
    },
    {
      name: 'Make it in Germany',
      description: language === 'de'
        ? 'Offizielles Portal für Fachkräfte'
        : 'Официальный портал для специалистов',
      url: 'https://www.make-it-in-germany.com',
      icon: Building2,
    },
    {
      name: 'Anerkennung in Deutschland',
      description: language === 'de'
        ? 'Anerkennung von Dokumenten'
        : 'Признание документов',
      url: 'https://www.anerkennung-in-deutschland.de',
      icon: Award,
    },
    {
      name: 'Anabin',
      description: language === 'de'
        ? 'Datenbank für Abschlüsse'
        : 'База данных дипломов',
      url: 'https://anabin.kmk.org',
      icon: FileText,
    },
    {
      name: 'uni-assist',
      description: language === 'de'
        ? 'Dokumentenbewertung für Universitäten'
        : 'Оценка документов для вузов',
      url: 'https://www.uni-assist.de',
      icon: FileText,
    },
    {
      name: 'ausbildung.de',
      description: language === 'de'
        ? 'Suche nach Berufsausbildung'
        : 'Поиск профобучения',
      url: 'https://www.ausbildung.de',
      icon: BookOpen,
    },
  ];

  const checklists = language === 'de' ? [
    { name: 'Checkliste Studentenvisum', description: 'Alle Dokumente für das Visum', type: 'study' as const },
    { name: 'Checkliste Job Seeker Visa', description: 'Zur Jobsuche', type: 'jobseeker' as const },
    { name: 'Checkliste Blue Card', description: 'Für Fachkräfte', type: 'bluecard' as const },
    { name: 'Checkliste Ausbildung', description: 'Für Berufsausbildung', type: 'ausbildung' as const },
  ] : [
    { name: 'Чеклист учебной визы', description: 'Все документы для визы', type: 'study' as const },
    { name: 'Чеклист Job Seeker Visa', description: 'Для поиска работы', type: 'jobseeker' as const },
    { name: 'Чеклист Blue Card', description: 'Для специалистов', type: 'bluecard' as const },
    { name: 'Чеклист Ausbildung', description: 'Для профобучения', type: 'ausbildung' as const },
  ];

  const seoTitle = language === 'de'
    ? 'Ressourcen & Links | Botschaft, DAAD, Make it in Germany' 
    : 'Ресурсы и ссылки | Посольство, DAAD, Make it in Germany';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={t.resources.links.title} />
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
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.resources.title}
              </h1>
              <p className="text-xl text-primary-foreground/70">
                {language === 'de' 
                  ? 'Offizielle Webseiten und nützliche Dokumente' 
                  : 'Официальные сайты и полезные документы'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Embassy */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-2xl mx-auto">
              <div className="card-elevated p-6 md:p-8 border-l-4 border-l-accent">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-accent" />
                  {t.resources.embassy.title}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{language === 'de' ? 'Adresse' : 'Адрес'}</p>
                      <p className="text-muted-foreground">{t.resources.embassy.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{language === 'de' ? 'Telefon' : 'Телефон'}</p>
                      <p className="text-muted-foreground">{t.resources.embassy.phone}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <a
                      href="https://duschanbe.diplo.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-info hover:underline font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {language === 'de' ? 'Offizielle Webseite' : 'Официальный сайт'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official Links */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t.resources.links.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-elevated p-6 group hover:shadow-lg transition-all"
                >
                  <link.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    {link.name}
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </h3>
                  <p className="text-muted-foreground text-sm">{link.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Checklists */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {language === 'de' ? 'Checklisten' : 'Чеклисты'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {checklists.map((checklist, i) => (
                <div key={i} className="card-elevated p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{checklist.name}</h3>
                    <p className="text-sm text-muted-foreground">{checklist.description}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="shrink-0"
                    onClick={() => generateChecklistPDF(checklist.type, language)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t.common.sources}
            </h2>
            <div className="max-w-2xl mx-auto card-elevated p-6 md:p-8">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• DAAD — daad.de</li>
                <li>• Auswärtiges Amt — auswaertiges-amt.de</li>
                <li>• Make it in Germany — make-it-in-germany.com</li>
                <li>• Anerkennung in Deutschland — anerkennung-in-deutschland.de</li>
                <li>• Anabin — anabin.kmk.org</li>
                <li>• German Embassy Dushanbe — duschanbe.diplo.de</li>
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                {t.common.lastUpdated}: {language === 'de' ? 'Dezember 2024' : 'Декабрь 2024'}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ResourcesPage;
