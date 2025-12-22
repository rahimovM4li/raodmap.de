import { ExternalLink, BookOpen, Building2, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function ResourcesSection() {
  const { language } = useLanguage();

  const getDescription = (tj: string, ru: string, de: string) => {
    if (language === 'tj') return tj;
    if (language === 'ru') return ru;
    return de;
  };

  const resources = [
    {
      icon: BookOpen,
      title: 'DAAD',
      description: getDescription(
        'DAAD — Стипендияҳо ва барномаҳо барои донишҷӯён',
        'Германская служба академических обменов — стипендии и программы',
        'Deutsche Akademische Austauschdienst — Stipendien und Programme'
      ),
      url: 'https://www.daad.de',
    },
    {
      icon: Building2,
      title: 'Make it in Germany',
      description: getDescription(
        'Портали расмии Олмон барои мутахассисони хориҷӣ',
        'Официальный портал Германии для иностранных специалистов',
        'Offizielles Portal für Fachkräfte aus dem Ausland'
      ),
      url: 'https://www.make-it-in-germany.com',
    },
    {
      icon: FileText,
      title: 'Anerkennung',
      description: getDescription(
        'Эътирофи дипломҳо ва сертификатҳо',
        'Признание дипломов и сертификатов',
        'Anerkennung von Abschlüssen und Zertifikaten'
      ),
      url: 'https://www.anerkennung-in-deutschland.de',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getDescription('Захираҳои муфид', 'Полезные ресурсы', 'Nützliche Ressourcen')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getDescription(
              'Сайтҳои расмӣ барои маълумоти дақиқ',
              'Официальные сайты для точной информации',
              'Offizielle Webseiten für genaue Informationen'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-elevated p-6 group hover:shadow-lg transition-all"
            >
              <resource.icon className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                {resource.title}
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </h3>
              <p className="text-muted-foreground text-sm">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
