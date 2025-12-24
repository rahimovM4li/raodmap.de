import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.tj;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['tj', 'ru', 'de'].includes(saved)) {
      return saved;
    }
    // Default to Tajik
    return 'tj';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
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
