import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'cookie-consent';

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  timestamp: number;
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const { language } = useLanguage();
  const [legalContent, setLegalContent] = useState<any>(null);

  useEffect(() => {
    // Load legal content based on language
    import(`@/locales/${language}/legal.json`)
      .then(module => setLegalContent(module.default))
      .catch(() => {
        // Fallback to Tajik if language file not found
        import('@/locales/tj/legal.json')
          .then(module => setLegalContent(module.default));
      });
  }, [language]);

  useEffect(() => {
    // Check if consent has been given
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (analytics: boolean) => {
    const consent: CookieConsent = {
      essential: true,
      analytics,
      timestamp: Date.now(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true);
  };

  const handleRejectOptional = () => {
    saveConsent(false);
  };

  if (!showBanner || !legalContent) {
    return null;
  }

  const banner = legalContent.cookieBanner;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative rounded-lg border border-border bg-background/95 p-6 shadow-2xl backdrop-blur-sm"
          >
            {/* Close button for accessibility */}
            <button
              onClick={handleRejectOptional}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Закрыть и принять только необходимые cookies"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex gap-4">
              {/* Icon */}
              <div className="hidden sm:block">
                <div className="rounded-full bg-primary/10 p-3">
                  <Cookie className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2
                    id="cookie-banner-title"
                    className="text-lg font-semibold leading-tight"
                  >
                    {banner.title}
                  </h2>
                  <p
                    id="cookie-banner-description"
                    className="mt-2 text-sm text-muted-foreground"
                  >
                    {banner.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Button
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto"
                    size="default"
                  >
                    {banner.acceptAll}
                  </Button>
                  <Button
                    onClick={handleRejectOptional}
                    variant="outline"
                    className="w-full sm:w-auto"
                    size="default"
                  >
                    {banner.rejectOptional}
                  </Button>
                  <Link
                    to={`/cookies`}
                    className="text-sm text-primary underline-offset-4 hover:underline sm:ml-auto"
                  >
                    {banner.moreInfo}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to check cookie consent
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch {
        setConsent(null);
      }
    }
  }, []);

  const hasConsent = (type: 'essential' | 'analytics'): boolean => {
    if (!consent) return false;
    return consent[type] === true;
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    setConsent(null);
    window.location.reload();
  };

  return { consent, hasConsent, resetConsent };
}
