import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Language, languageFullNames } from '@/lib/i18n';

const languages: { code: Language; flag: string }[] = [
  { code: 'tj', flag: '🇹🇯' },
  { code: 'ru', flag: '🇷🇺' },
  { code: 'de', flag: '🇩🇪' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setOpenDropdown(null);
    setIsLangOpen(false);
  }, [location.pathname]);

  // Close dropdowns on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setIsLangOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const pathsToGermany = [
    { path: '/study', label: t.nav.study },
    { path: '/ausbildung', label: t.nav.ausbildung },
    { path: '/work', label: t.nav.work },
    { path: '/fsj', label: t.nav.fsj },
    { path: '/aupair', label: t.nav.aupair },
  ];

  const lifeInGermany = [
    { path: '/living', label: t.nav.living },
    { path: '/roadmap', label: t.nav.roadmap },
    { path: '/resources', label: t.nav.resources },
    { path: '/faq', label: t.nav.faq },
  ];

  const lifeInGermany = [
    { path: '/living', label: t.nav.living, icon: Home },
    { path: '/roadmap', label: t.nav.roadmap, icon: Map },
    { path: '/resources', label: t.nav.resources, icon: BookOpen },
    { path: '/faq', label: t.nav.faq, icon: HelpCircle },
  ];

  const dropdownLabels = {
    tj: { ways: 'Роҳҳо ба Олмон', life: 'Зиндагӣ дар Олмон' },
    ru: { ways: 'Пути в Германию', life: 'Жизнь в Германии' },
    de: { ways: 'Wege nach Deutschland', life: 'Leben in Deutschland' },
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setMobileAccordion(null);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    const langPrefix = language === 'tj' ? '/tj' : `/${language}`;
    const fullPath = path === '/' ? langPrefix : `${langPrefix}${path}`;
    navigate(fullPath);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (newLang: Language) => {
    // Get current path without language prefix
    const currentPath = location.pathname.replace(/^\/(tj|ru|de)/, '') || '/';
    // Build new path with new language prefix
    const newPrefix = newLang === 'tj' ? '/tj' : `/${newLang}`;
    const newPath = currentPath === '/' ? newPrefix : `${newPrefix}${currentPath}`;
    navigate(newPath);
  };

  const isPathActive = (paths: { path: string }[]) => {
    const currentPathWithoutLang = location.pathname.replace(/^\/(tj|ru|de)/, '');
    return paths.some(item => currentPathWithoutLang === item.path || location.pathname === item.path);
  };

  const currentLang = languages.find(l => l.code === language);

  const isPathActive = (paths: string[]) => {
    return paths.some(path => location.pathname === path);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
          : 'bg-card/95 backdrop-blur-lg border-b border-border/30'
      )}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-12 md:h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center transition-transform group-hover:scale-105">
              <img src="/favicon.ico" alt="Germany Roadmap Logo" className="w-6 h-6" />
            </div>
            <span className="hidden sm:block font-semibold text-foreground transition-colors group-hover:text-primary">
              Germany Roadmap
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <Link
              to="/"
              className={cn(
                'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group',
                location.pathname === '/'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t.nav.home}
              <span className={cn(
                'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-200',
                location.pathname === '/' ? 'w-1/2' : 'w-0 group-hover:w-1/2'
              )} />
            </Link>

            {/* Paths to Germany Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'paths' ? null : 'paths')}
                className={cn(
                  'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isPathActive(pathsToGermany.map(p => p.path))
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.nav.pathsToGermany}
                <ChevronDown className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  openDropdown === 'paths' && 'rotate-180'
                )} />
                <span className={cn(
                  'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-200',
                  isPathActive(pathsToGermany.map(p => p.path)) ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                )} />
              </button>
              {openDropdown === 'paths' && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 space-y-1">
                    {pathsToGermany.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          'block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                          location.pathname === item.path
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Life in Germany Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'life' ? null : 'life')}
                className={cn(
                  'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isPathActive(lifeInGermany.map(p => p.path))
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.nav.lifeInGermany}
                <ChevronDown className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  openDropdown === 'life' && 'rotate-180'
                )} />
                <span className={cn(
                  'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-200',
                  isPathActive(lifeInGermany.map(p => p.path)) ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                )} />
              </button>
              {openDropdown === 'life' && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 space-y-1">
                    {lifeInGermany.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          'block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                          location.pathname === item.path
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Switcher - Desktop */}
            <div className="hidden lg:block relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200 border border-border/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Change language"
              >
                <span className="text-lg">{currentLang?.flag}</span>
                <span className="hidden sm:inline text-xs font-medium text-muted-foreground">
                  {language.toUpperCase()}
                </span>
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 rounded-xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                          language === lang.code
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                        )}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{languageFullNames[lang.code]}</span>
                        {language === lang.code && (
                          <span className="ml-auto text-primary text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-1 lg:hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    language === lang.code
                      ? 'bg-primary/10 ring-1.5 ring-primary/30'
                      : 'hover:bg-secondary/50'
                  )}
                  aria-label={`Switch to ${languageFullNames[lang.code]}`}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
