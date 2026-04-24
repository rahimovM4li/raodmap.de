import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Language, translations } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.tj;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  // Detect language from URL
  const getLanguageFromURL = (): Language => {
    const path = location.pathname;
    if (path.startsWith('/ru')) return 'ru';
    if (path.startsWith('/de')) return 'de';
    return 'tj'; // Default
  };

  const [language, setLanguage] = useState<Language>(getLanguageFromURL);

  // Update language when URL changes
  useEffect(() => {
    const urlLang = getLanguageFromURL();
    if (urlLang !== language) {
      setLanguage(urlLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    // Set HTML lang attribute for SEO (tj -> tg for proper ISO code)
    const htmlLang = language === 'tj' ? 'tg' : language;
    document.documentElement.lang = htmlLang;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
