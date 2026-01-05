import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, Briefcase, Heart, Baby, Wrench, Home, Map, HelpCircle, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Language } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

const languages: { code: Language; flag: string }[] = [
  { code: 'tj', flag: '🇹🇯' },
  { code: 'ru', flag: '🇷🇺' },
  { code: 'de', flag: '🇩🇪' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Navigation structure
  const waysToGermany = [
    { path: '/study', label: t.nav.study, icon: GraduationCap },
    { path: '/ausbildung', label: t.nav.ausbildung, icon: Wrench },
    { path: '/work', label: t.nav.work, icon: Briefcase },
    { path: '/fsj-bfd', label: 'FSJ/BFD', icon: Heart },
    { path: '/au-pair', label: 'Au-Pair', icon: Baby },
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

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-card/85 backdrop-blur-xl shadow-lg border-b border-border/50'
            : 'bg-card/60 backdrop-blur-md border-b border-transparent'
        )}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link 
              to={`/${language === 'tj' ? 'tj' : language}`}
              className="flex items-center gap-2 group"
              onClick={() => setActiveDropdown(null)}
            >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
<img src="favicon.ico" alt="Germany Roadmap Logo" />            
</div>
              <span className="hidden sm:block font-semibold text-foreground text-sm">
                Germany Roadmap
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {/* Home */}
              <Link
                to={`/${language === 'tj' ? 'tj' : language}`}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative',
                  location.pathname === `/${language}` || location.pathname === '/tj' && language === 'tj'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.nav.home}
                {(location.pathname === `/${language}` || location.pathname === '/tj' && language === 'tj') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </Link>

              {/* Ways to Germany Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'ways' ? null : 'ways')}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isPathActive(waysToGermany) || activeDropdown === 'ways'
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {dropdownLabels[language].ways}
                  <ChevronDown 
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      activeDropdown === 'ways' && 'rotate-180'
                    )} 
                  />
                  {isPathActive(waysToGermany) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'ways' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-2 py-2 w-56 bg-card rounded-xl border border-border shadow-lg z-50"
                    >
                      {waysToGermany.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleNavigation(item.path)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                            location.pathname === `/${language}${item.path}` || location.pathname === `/tj${item.path}` && language === 'tj'
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-secondary'
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Life in Germany Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'life' ? null : 'life')}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isPathActive(lifeInGermany) || activeDropdown === 'life'
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {dropdownLabels[language].life}
                  <ChevronDown 
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      activeDropdown === 'life' && 'rotate-180'
                    )} 
                  />
                  {isPathActive(lifeInGermany) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'life' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-2 py-2 w-56 bg-card rounded-xl border border-border shadow-lg z-50"
                    >
                      {lifeInGermany.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleNavigation(item.path)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                            location.pathname === `/${language}${item.path}` || location.pathname === `/tj${item.path}` && language === 'tj'
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-secondary'
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right side: Language + Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Language Switcher - Desktop */}
              <div className="hidden sm:flex items-center gap-1 bg-secondary/50 rounded-full p-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-200',
                      language === lang.code
                        ? 'bg-card shadow-sm scale-110'
                        : 'hover:bg-card/50 opacity-70 hover:opacity-100'
                    )}
                    title={lang.code.toUpperCase()}
                  >
                    {lang.flag}
                  </button>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-card z-50 lg:hidden shadow-2xl overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link 
                  to={`/${language === 'tj' ? 'tj' : language}`}
                  className="flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <img src="favicon.ico" alt="Germany Roadmap Logo" />
                  </div>
                  <span className="font-semibold text-foreground text-sm">
                    Germany Roadmap
                  </span>
                </Link>

                <div className="flex items-center gap-2">
                  {/* Language Switcher - Mobile */}
                  <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={cn(
                          'w-7 h-7 rounded-full flex items-center justify-center text-base transition-all duration-200',
                          language === lang.code
                            ? 'bg-card shadow-sm scale-110'
                            : 'opacity-60'
                        )}
                      >
                        {lang.flag}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-4 space-y-2">
                {/* Home */}
                <button
                  onClick={() => handleNavigation('/')}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors',
                    location.pathname === `/${language}` || location.pathname === '/tj' && language === 'tj'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  )}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">{t.nav.home}</span>
                </button>

                {/* Ways to Germany Accordion */}
                <div className="rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'ways' ? null : 'ways')}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 transition-colors',
                      isPathActive(waysToGermany)
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-secondary/50'
                    )}
                  >
                    <span className="font-medium">{dropdownLabels[language].ways}</span>
                    <ChevronDown 
                      className={cn(
                        'w-4 h-4 transition-transform duration-300',
                        mobileAccordion === 'ways' && 'rotate-180'
                      )} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {mobileAccordion === 'ways' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-secondary/30"
                      >
                        {waysToGermany.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={cn(
                              'w-full flex items-center gap-3 px-6 py-3 text-left transition-all active:scale-98',
                              location.pathname === `/${language}${item.path}` || location.pathname === `/tj${item.path}` && language === 'tj'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-foreground hover:bg-secondary'
                            )}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm">{item.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Life in Germany Accordion */}
                <div className="rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'life' ? null : 'life')}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 transition-colors',
                      isPathActive(lifeInGermany)
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-secondary/50'
                    )}
                  >
                    <span className="font-medium">{dropdownLabels[language].life}</span>
                    <ChevronDown 
                      className={cn(
                        'w-4 h-4 transition-transform duration-300',
                        mobileAccordion === 'life' && 'rotate-180'
                      )} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {mobileAccordion === 'life' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-secondary/30"
                      >
                        {lifeInGermany.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={cn(
                              'w-full flex items-center gap-3 px-6 py-3 text-left transition-all active:scale-98',
                              location.pathname === `/${language}${item.path}` || location.pathname === `/tj${item.path}` && language === 'tj'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-foreground hover:bg-secondary'
                            )}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm">{item.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
                <p className="text-xs text-muted-foreground text-center">
                  © 2026 Germany Roadmap
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
