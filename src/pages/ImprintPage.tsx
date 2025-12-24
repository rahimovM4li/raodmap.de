import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText } from 'lucide-react';

export default function ImprintPage() {
  const { language } = useLanguage();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    // Load legal content based on language
    import(`@/locales/${language}/legal.json`)
      .then(module => setContent(module.default.imprint))
      .catch(() => {
        // Fallback to Tajik if language file not found
        import('@/locales/tj/legal.json')
          .then(module => setContent(module.default.imprint));
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
              <FileText className="h-8 w-8 text-primary" />
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

        {/* Content */}
        <ScrollArea className="h-[calc(100vh-300px)]">
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
