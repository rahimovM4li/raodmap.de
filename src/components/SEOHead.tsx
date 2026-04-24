import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { PAGE_SEO, SITE_CONFIG, getCanonicalUrl, getHreflangLinks, getMetaTags } from '@/lib/seo';

interface SEOHeadProps {
  pageKey: keyof typeof PAGE_SEO;
}

/**
 * SEO Head Component
 * 
 * Automatically generates all necessary meta tags, hreflang, canonical URLs
 * based on current language and page from URL.
 * 
 * PRIORITY: Tajik language is PRIMARY for SEO
 */
export function SEOHead({ pageKey }: SEOHeadProps) {
  const { language } = useLanguage();
  const location = useLocation();
  
  // Extract the page path without language prefix
  const pagePath = location.pathname.replace(/^\/(tj|ru|de)/, '').replace(/^\//, '');
  
  // Convert language code (tj/ru/de) to SEO language (tg/ru/de)
  const seoLang = language === 'tj' ? 'tg' : language;
  
  const meta = getMetaTags(pageKey, seoLang, pagePath);
  const seo = PAGE_SEO[pageKey];
  
  // Language for HTML lang attribute
  const htmlLang = language === 'tj' ? 'tg' : language;

  return (
    <Helmet>
      {/* HTML Language */}
      <html lang={htmlLang} />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href={language === 'tj' ? '/site.webmanifest' : language === 'de' ? '/site-de.webmanifest' : '/site-ru.webmanifest'} />

      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content={SITE_CONFIG.author} />
      <meta name="robots" content={meta.robots} />

      {/* Canonical URL */}
      <link rel="canonical" href={meta.canonical} />

      {/* Hreflang Links - Important for multilingual SEO */}
      {getHreflangLinks(pagePath).map((link, index) => (
        <link
          key={index}
          rel="alternate"
          hrefLang={link.includes('hreflang="tg"') ? 'tg' : link.includes('hreflang="de"') ? 'de' : link.includes('hreflang="ru"') ? 'ru' : 'x-default'}
          href={link.match(/href="([^"]+)"/)?.[1] || ''}
        />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type || 'website'} />
      <meta property="og:url" content={meta.ogUrl} />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:image" content={meta.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_CONFIG.siteName[language === 'tj' ? 'tj' : language === 'de' ? 'de' : 'ru']} />
      <meta property="og:locale" content={htmlLang === 'tg' ? 'tg_TJ' : htmlLang === 'de' ? 'de_DE' : 'ru_RU'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={meta.ogUrl} />
      <meta name="twitter:title" content={meta.twitterTitle} />
      <meta name="twitter:description" content={meta.twitterDescription} />
      <meta name="twitter:image" content={meta.twitterImage} />

      {/* Additional SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#2563eb" />
    </Helmet>
  );
}

/**
 * Home Page SEO Component
 */
export function HomePageSEO() {
  return <SEOHead pageKey="home" />;
}

/**
 * Study Page SEO Component
 */
export function StudyPageSEO() {
  return <SEOHead pageKey="study" />;
}

/**
 * Work Page SEO Component
 */
export function WorkPageSEO() {
  return <SEOHead pageKey="work" />;
}

/**
 * Ausbildung Page SEO Component
 */
export function AusbildungPageSEO() {
  return <SEOHead pageKey="ausbildung" />;
}

/**
 * Living Page SEO Component
 */
export function LivingPageSEO() {
  return <SEOHead pageKey="living" />;
}

/**
 * Roadmap Page SEO Component
 */
export function RoadmapPageSEO() {
  return <SEOHead pageKey="roadmap" />;
}

/**
 * FAQ Page SEO Component
 */
export function FAQPageSEO() {
  return <SEOHead pageKey="faq" />;
}

/**
 * Resources Page SEO Component
 */
export function ResourcesPageSEO() {
  return <SEOHead pageKey="resources" />;
}

/**
 * CV Generator Page SEO Component
 */
export function CVGeneratorPageSEO() {
  return <SEOHead pageKey="cvGenerator" />;
}

/**
 * Privacy Page SEO Component
 */
export function PrivacyPageSEO() {
  return <SEOHead pageKey="privacy" />;
}

/**
 * Cookies Page SEO Component
 */
export function CookiesPageSEO() {
  return <SEOHead pageKey="cookies" />;
}

/**
 * Imprint Page SEO Component
 */
export function ImprintPageSEO() {
  return <SEOHead pageKey="imprint" />;
}
