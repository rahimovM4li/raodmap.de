import { Link } from 'react-router-dom';
import { ExternalLink, MapPin, Phone, User, Code, Icon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t, language } = useLanguage();

  const langPrefix = language === 'tj' ? '/tj' : `/${language}`;

  const quickLinks = [
    { path: '/study', label: t.nav.study },
    { path: '/work', label: t.nav.work },
    { path: '/ausbildung', label: t.nav.ausbildung },
    { path: '/living', label: t.nav.living },
    { path: '/roadmap', label: t.nav.roadmap },
    { path: '/faq', label: t.nav.faq },
  ];

  const externalLinks = [
    { name: 'DAAD', url: 'https://www.daad.de' },
    { name: 'Make it in Germany', url: 'https://www.make-it-in-germany.com' },
    { name: 'Anerkennung', url: 'https://www.anerkennung-in-deutschland.de' },
  ];

  const legalLinks = [
    { path: '/privacy', label: t.nav.privacy },
    { path: '/cookies', label: t.nav.cookies },
    { path: '/imprint', label: t.nav.imprint },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Creator */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 relative">
              {/* Animated Flag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -8, 0]
                }}
                transition={{
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 },
                  rotate: { duration: 0.6 },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative"
              >
                <img 
                  src="/flag.png" 
                  alt="Germany & Tajikistan Flag" 
                  className="w-12 h-12 object-contain drop-shadow-lg"
                />
              </motion.div>
              
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">Germany Roadmap</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              {t.footer.disclaimer}
            </p>
            
            {/* Creator Credit */}
            <div className="p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-accent" />
                <span className="font-medium text-sm">{t.footer.createdBy}</span>
              </div>
              <p className="text-sm font-semibold mb-1">Muhammadali Rahimov</p>
              <p className="text-xs text-primary-foreground/60 mb-3">{t.footer.developer}</p>
              <a
                href="https://m4li.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
              >
                <User className="w-4 h-4" />
                {t.footer.portfolio}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={`${langPrefix}${link.path}`}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Resources */}
          <div>
            <h3 className="font-semibold mb-4">{t.footer.externalResources}</h3>
            <ul className="space-y-2">
              {externalLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Embassy & Legal */}
          <div>
            <h3 className="font-semibold mb-4">{t.resources.embassy.title}</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70 mb-6">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{t.resources.embassy.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>{t.resources.embassy.phone}</span>
              </li>
            </ul>

            {/* Legal Links */}
            <div className="pt-4 border-t border-primary-foreground/10">
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={`${langPrefix}${link.path}`}
                      className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-center text-sm text-primary-foreground/50">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
