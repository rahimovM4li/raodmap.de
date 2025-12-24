import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_CONFIG } from '@/lib/seo';

/**
 * Structured Data (JSON-LD) Components for SEO
 * 
 * These components add Schema.org structured data to help search engines
 * understand the content better.
 * 
 * PRIMARY LANGUAGE: Tajik
 */

interface StructuredDataProps {
  data: object;
}

function StructuredData({ data }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data, null, 2)}</script>
    </Helmet>
  );
}

/**
 * Website Structured Data
 * Used on homepage
 */
export function WebsiteStructuredData() {
  const { language } = useLanguage();
  const lang = language === 'tj' ? 'tj' : language === 'de' ? 'de' : 'ru';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.siteName[lang],
    alternateName: [
      SITE_CONFIG.siteName.tj,
      SITE_CONFIG.siteName.de,
      SITE_CONFIG.siteName.ru,
    ],
    url: SITE_CONFIG.domain,
    description:
      lang === 'tj'
        ? 'Роҳнамои пурра барои шаҳрвандони Тоҷикистон: чӣ гуна ба Олмон барои таҳсил, кор ё Ausbildung рафтан.'
        : lang === 'de'
        ? 'Vollständiger Leitfaden für Tadschikistan-Bürger: Wie man nach Deutschland zum Studium, zur Arbeit oder zur Ausbildung kommt.'
        : 'Полное руководство для граждан Таджикистана: как приехать в Германию для учёбы, работы или Ausbildung.',
    inLanguage: ['tg', 'de', 'ru'],
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.authorWebsite,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.authorWebsite,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.domain}?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <StructuredData data={data} />;
}

/**
 * Organization Structured Data
 */
export function OrganizationStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.siteName.tj, // Primary: Tajik
    url: SITE_CONFIG.domain,
    logo: `${SITE_CONFIG.domain}/logo.png`,
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.authorWebsite,
    },
    sameAs: [SITE_CONFIG.authorWebsite, 'https://github.com/m4li'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'rahimov.muhammadali1704@gmail.com',
      availableLanguage: ['Tajik', 'German', 'Russian', 'English'],
    },
  };

  return <StructuredData data={data} />;
}

/**
 * Breadcrumb Structured Data
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={data} />;
}

/**
 * FAQ Structured Data
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  items: FAQItem[];
}

export function FAQStructuredData({ items }: FAQStructuredDataProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <StructuredData data={data} />;
}

/**
 * Article Structured Data
 * Used for educational/guide pages
 */
interface ArticleStructuredDataProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  image,
}: ArticleStructuredDataProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || `${SITE_CONFIG.domain}/seo-images/default-tj.jpg`,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.authorWebsite,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.authorWebsite,
    },
    inLanguage: 'tg', // Primary: Tajik
  };

  return <StructuredData data={data} />;
}

/**
 * HowTo Structured Data
 * Used for step-by-step guides
 */
interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToStructuredDataProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}

export function HowToStructuredData({
  name,
  description,
  steps,
  totalTime,
}: HowToStructuredDataProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    inLanguage: 'tg', // Primary: Tajik
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };

  return <StructuredData data={data} />;
}

/**
 * EducationalOrganization Structured Data
 * Used for education-related pages
 */
export function EducationalStructuredData() {
  const { language } = useLanguage();
  const lang = language === 'tj' ? 'tj' : language === 'de' ? 'de' : 'ru';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_CONFIG.siteName[lang],
    url: SITE_CONFIG.domain,
    description:
      lang === 'tj'
        ? 'Платформа барои маълумот ва роҳнамо дар бораи таҳсил, кор ва зиндагӣ дар Олмон'
        : lang === 'de'
        ? 'Plattform für Informationen und Anleitungen zu Studium, Arbeit und Leben in Deutschland'
        : 'Платформа для информации и руководств по учёбе, работе и жизни в Германии',
    educationalCredentialAwarded: 'Information and Guidance',
    availableLanguage: ['Tajik', 'German', 'Russian'],
  };

  return <StructuredData data={data} />;
}

/**
 * Person Structured Data (Author)
 */
export function AuthorStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author,
    url: SITE_CONFIG.authorWebsite,
    jobTitle: 'Full-Stack Developer',
    description: 'Creator of Roadmap.m4li.de - A comprehensive guide for Tajik citizens moving to Germany',
    knowsLanguage: ['Tajik', 'Russian', 'German', 'English'],
    nationality: {
      '@type': 'Country',
      name: 'Tajikistan',
    },
    alumniOf: 'University of Passau',
    worksFor: {
      '@type': 'Organization',
      name: 'm4li.de',
      url: SITE_CONFIG.authorWebsite,
    },
  };

  return <StructuredData data={data} />;
}
