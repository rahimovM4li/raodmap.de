import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/components/CookieBanner';

export default function CookiesPage() {
  const { language } = useLanguage();
  const [content, setContent] = useState<any>(null);
  const { consent, resetConsent } = useCookieConsent();

  useEffect(() => {
    // Load legal content based on language
    import(`@/locales/${language}/legal.json`)
      .then(module => setContent(module.default.cookies))
      .catch(() => {
        // Fallback to Tajik if language file not found
        import('@/locales/tj/legal.json')
          .then(module => setContent(module.default.cookies));
      });
  }, [language]);

  if (!content) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{content.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {content.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {content.lastUpdated}
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Cookie Status */}
        {consent && (
          <div className="mb-8 rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold">
                  {language === 'tj' && 'Ҳолати ҷории Cookie'}
                  {language === 'de' && 'Aktueller Cookie-Status'}
                  {language === 'ru' && 'Текущий статус Cookie'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {consent.analytics
                    ? language === 'tj' && 'Ҳама cookies фаъол'
                    : language === 'tj' && 'Танҳо cookies зарурӣ'}
                  {consent.analytics
                    ? language === 'de' && 'Alle Cookies aktiviert'
                    : language === 'de' && 'Nur essenzielle Cookies'}
                  {consent.analytics
                    ? language === 'ru' && 'Все cookies активированы'
                    : language === 'ru' && 'Только необходимые cookies'}
                </p>
              </div>
              <Button onClick={resetConsent} variant="outline" size="sm">
                {language === 'tj' && 'Танзимотро тағйир диҳед'}
                {language === 'de' && 'Einstellungen ändern'}
                {language === 'ru' && 'Изменить настройки'}
              </Button>
            </div>
          </div>
        )}

        {/* Content */}
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-8 pr-4">
            {Object.entries(content.sections).map(([key, section]: [string, any]) => (
              <section key={key}>
                <h2 className="mb-3 text-xl font-semibold">{section.title}</h2>
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
