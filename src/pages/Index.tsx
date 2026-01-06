import { Hero } from '@/components/Hero';
import { Wizard } from '@/components/Wizard';
import { ResourcesSection } from '@/components/ResourcesSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HomePageSEO } from '@/components/SEOHead';
import { WebsiteStructuredData, OrganizationStructuredData } from '@/components/StructuredData';

const Index = () => {
  const { language, t } = useLanguage();

  const langPrefix = language === 'tj' ? '/tj' : `/${language}`;

  const seoTitle = {
    tj: 'Mаълумот ва роҳҳо ба Олмон | Таҳсил, Кор, Ausbildung',
    ru: 'Roadmap в Германию | Учёба, Работа, Ausbildung',
    de: 'Roadmap nach Deutschland | Studium, Arbeit, Ausbildung',
  };
  
  const seoDescription = {
    tj: 'Роҳнамои қадам ба қадам барои кӯчидан ба Олмон. Виза, забон, маблағ, ҳуҷҷатҳо — ҳама дар як ҷой.',
    ru: 'Пошаговое руководство по переезду в Германию. Виза, язык, финансы, документы — всё в одном месте.',
    de: 'Schritt-für-Schritt-Anleitung für den Umzug nach Deutschland. Visum, Sprache, Finanzen, Dokumente — alles an einem Ort.',
  };

  const cvButtonText = {
    tj: 'Эҷоди Lebenslauf',
    ru: 'Создать Lebenslauf',
    de: 'Lebenslauf erstellen',
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <HomePageSEO />
      
      {/* Structured Data */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />

      <main>
        <Hero />
        
        {/* CV Generator CTA */}
        <section className="py-12 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container-main">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-lg">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {language === 'tj' ? 'Lebenslauf-и касбӣ эҷод кунед' : 
                   language === 'ru' ? 'Создайте профессиональный Lebenslauf' : 
                   'Erstellen Sie Ihren professionellen Lebenslauf'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'tj' ? '100% бепул, бе сабт, маҳфияти пурра' : 
                   language === 'ru' ? '100% бесплатно, без регистрации, полная конфиденциальность' : 
                   '100% kostenlos, keine Registrierung, volle Privatsphäre'}
                </p>
              </div>
              <Link to={`${langPrefix}/cv-generator`}>
                <Button size="lg" className="btn-hero">
                  <FileText className="w-5 h-5 mr-2" />
                  {cvButtonText[language]}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div id="wizard">
          <Wizard />
        </div>
        <ResourcesSection />
      </main>
    </>
  );
};

export default Index;
