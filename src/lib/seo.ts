/**
 * SEO Configuration for Roadmap.m4li.de
 * 
 * PRIMARY LANGUAGE: Tajik (тоҷикӣ)
 * Domain: https://roadmap.m4li.de
 * 
 * All SEO is optimized for Tajik language first.
 * German and Russian are secondary languages.
 */

export const SITE_CONFIG = {
  domain: 'https://roadmap.m4li.de',
  siteName: {
    tj: 'Роҳнамо ба Олмон',
    de: 'Roadmap nach Deutschland',
    ru: 'Дорожная карта в Германию',
  },
  author: 'Muhammadali Rahimov',
  authorWebsite: 'https://m4li.de',
  defaultLanguage: 'tg',
  languages: ['tg', 'de', 'ru'],
};

export interface SEOConfig {
  title: {
    tj: string;
    de: string;
    ru: string;
  };
  description: {
    tj: string;
    de: string;
    ru: string;
  };
  keywords: {
    tj: string[];
    de: string[];
    ru: string[];
  };
  image?: string;
  type?: string;
  noindex?: boolean;
}

/**
 * SEO Configuration for all pages
 * Tajik content is PRIMARY and comes first
 */
export const PAGE_SEO: Record<string, SEOConfig> = {
  home: {
    title: {
      tj: 'Роҳнамо ба Олмон – Таҳсил, Кор ва Зиндагӣ дар Олмон',
      de: 'Roadmap nach Deutschland – Studium, Arbeit und Leben',
      ru: 'Дорожная карта в Германию – Учёба, Работа и Жизнь',
    },
    description: {
      tj: 'Роҳнамои пурра барои шаҳрвандони Тоҷикистон: чӣ гуна ба Олмон барои таҳсил, кор ё Ausbildung рафтан. Қадам ба қадам, равшан ва фаҳмо.',
      de: 'Vollständiger Leitfaden für Tadschikistan-Bürger: Wie man nach Deutschland zum Studium, zur Arbeit oder zur Ausbildung kommt. Schritt für Schritt, klar und verständlich.',
      ru: 'Полное руководство для граждан Таджикистана: как приехать в Германию для учёбы, работы или Ausbildung. Шаг за шагом, ясно и понятно.',
    },
    keywords: {
      tj: [
        'роҳнамо ба Олмон',
        'муҳоҷират ба Олмон',
        'таҳсил дар Олмон',
        'кор дар Олмон аз Тоҷикистон',
        'зиндагӣ дар Олмон',
        'виза ба Олмон',
        'донишгоҳҳои Олмон',
        'Ausbildung дар Олмон',
      ],
      de: ['Deutschland Roadmap', 'Studieren in Deutschland', 'Arbeiten in Deutschland', 'Ausbildung'],
      ru: ['путь в Германию', 'учёба в Германии', 'работа в Германии', 'переезд в Германию'],
    },
    image: '/seo-images/home-tj.jpg',
  },

  study: {
    title: {
      tj: 'Таҳсил дар Олмон – Роҳнамои пурра барои донишҷӯён аз Тоҷикистон',
      de: 'Studium in Deutschland – Vollständiger Leitfaden für Studenten aus Tadschikistan',
      ru: 'Учёба в Германии – Полное руководство для студентов из Таджикистана',
    },
    description: {
      tj: 'Ҳама чизе дар бораи таҳсил дар Олмон: интихоби донишгоҳ, талаботҳо, визаи таҳсилӣ, маблағгузорӣ ва стипендияҳо. Роҳнамои қадам ба қадам.',
      de: 'Alles über Studium in Deutschland: Universitätsauswahl, Anforderungen, Studentenvisum, Finanzierung und Stipendien. Schritt-für-Schritt-Anleitung.',
      ru: 'Всё об учёбе в Германии: выбор университета, требования, студенческая виза, финансирование и стипендии. Пошаговое руководство.',
    },
    keywords: {
      tj: [
        'таҳсил дар Олмон',
        'донишгоҳҳои Олмон',
        'визаи таҳсилӣ',
        'стипендия дар Олмон',
        'DAAD',
        'uni-assist',
        'донишҷӯи хориҷӣ',
        'таҳсилоти олӣ Олмон',
      ],
      de: ['Studium Deutschland', 'Universitäten Deutschland', 'Studentenvisum', 'DAAD Stipendium'],
      ru: ['учёба Германия', 'университеты Германии', 'студенческая виза', 'стипендия DAAD'],
    },
    image: '/seo-images/study-tj.jpg',
  },

  work: {
    title: {
      tj: 'Кор дар Олмон – Имконоти корӣ барои мутахассисон аз Тоҷикистон',
      de: 'Arbeit in Deutschland – Karrieremöglichkeiten für Fachkräfte aus Tadschikistan',
      ru: 'Работа в Германии – Карьерные возможности для специалистов из Таджикистана',
    },
    description: {
      tj: 'Чӣ гуна дар Олмон кор ёбем: визаи ҷустуҷӯи кор, EU Blue Card, талаботҳо барои мутахассисон, эътирофи диплом ва музди миёна.',
      de: 'Wie man Arbeit in Deutschland findet: Jobsuchevisum, EU Blue Card, Anforderungen für Fachkräfte, Anerkennung von Diplomen und Durchschnittsgehälter.',
      ru: 'Как найти работу в Германии: виза для поиска работы, EU Blue Card, требования для специалистов, признание дипломов и средняя зарплата.',
    },
    keywords: {
      tj: [
        'кор дар Олмон',
        'визаи корӣ',
        'EU Blue Card',
        'ҷустуҷӯи кор',
        'музди Олмон',
        'мутахассиси хориҷӣ',
        'эътирофи диплом',
        'кори ИТ дар Олмон',
      ],
      de: ['Arbeit Deutschland', 'Jobsuche', 'EU Blue Card', 'Fachkräfte', 'IT Jobs Deutschland'],
      ru: ['работа Германия', 'поиск работы', 'EU Blue Card', 'специалисты', 'IT работа'],
    },
    image: '/seo-images/work-tj.jpg',
  },

  ausbildung: {
    title: {
      tj: 'Ausbildung дар Олмон – Омӯзиши касбӣ бо музд',
      de: 'Ausbildung in Deutschland – Berufsausbildung mit Gehalt',
      ru: 'Ausbildung в Германии – Профессиональное обучение с зарплатой',
    },
    description: {
      tj: 'Барномаи Ausbildung: ҳамзамон омӯзиш ва кор бо музд 800-1200€. Дипломи эътирофшуда ва имкони кор баъд аз хатм.',
      de: 'Ausbildung-Programm: gleichzeitig Lernen und Arbeiten mit Gehalt 800-1200€. Anerkanntes Diplom und Jobchance nach Abschluss.',
      ru: 'Программа Ausbildung: одновременно учиться и работать с зарплатой 800-1200€. Признанный диплом и возможность работы после завершения.',
    },
    keywords: {
      tj: [
        'Ausbildung дар Олмон',
        'омӯзиши касбӣ',
        'кор бо омӯзиш',
        'музди Ausbildung',
        'касбҳои Олмон',
        'ИТ Fachinformatiker',
        'Pflegefachmann',
      ],
      de: ['Ausbildung Deutschland', 'duale Ausbildung', 'Berufsausbildung', 'IT Fachinformatiker'],
      ru: ['Ausbildung Германия', 'профобучение', 'дуальное обучение', 'профессии'],
    },
    image: '/seo-images/ausbildung-tj.jpg',
  },

  living: {
    title: {
      tj: 'Зиндагӣ дар Олмон – Роҳнамои амалӣ барои навомадагон аз Тоҷикистон',
      de: 'Leben in Deutschland – Praktischer Leitfaden für Neuankömmlinge aus Tadschikistan',
      ru: 'Жизнь в Германии – Практическое руководство для приезжих из Таджикистана',
    },
    description: {
      tj: 'Ҳама чизе дар бораи зиндагӣ дар Олмон: иҷораи манзил, Anmeldung, суғурта, нақлиёт, хароҷот ва фарҳанги корӣ.',
      de: 'Alles über das Leben in Deutschland: Wohnungsmiete, Anmeldung, Versicherung, Transport, Kosten und Arbeitskultur.',
      ru: 'Всё о жизни в Германии: аренда жилья, Anmeldung, страховка, транспорт, расходы и рабочая культура.',
    },
    keywords: {
      tj: [
        'зиндагӣ дар Олмон',
        'иҷораи квартира',
        'Anmeldung',
        'суғуртаи саломатӣ',
        'хароҷоти зиндагӣ',
        'фарҳанги Олмон',
        'манзил дар Олмон',
        'буҷети моҳона',
      ],
      de: ['Leben Deutschland', 'Wohnung mieten', 'Anmeldung', 'Krankenversicherung', 'Lebenshaltungskosten'],
      ru: ['жизнь Германия', 'аренда квартиры', 'Anmeldung', 'медстраховка', 'расходы на жизнь'],
    },
    image: '/seo-images/living-tj.jpg',
  },

  roadmap: {
    title: {
      tj: 'Роҳнамои муфассал – Сафари пурра ба Олмон қадам ба қадам',
      de: 'Detaillierte Roadmap – Komplette Reise nach Deutschland Schritt für Schritt',
      ru: 'Подробная дорожная карта – Полный путь в Германию шаг за шагом',
    },
    description: {
      tj: 'Нақшаи пурраи омодагӣ ва муҳоҷират ба Олмон: аз ҷамъоварии ҳуҷҷатҳо то иқомати дарозмуддат. 5 марҳила бо маслиҳатҳо ва рӯйхатҳои санҷиш.',
      de: 'Vollständiger Vorbereitungs- und Migrationsplan nach Deutschland: von der Dokumentensammlung bis zur langfristigen Niederlassung. 5 Phasen mit Tipps und Checklisten.',
      ru: 'Полный план подготовки и миграции в Германию: от сбора документов до долгосрочного проживания. 5 этапов с советами и чек-листами.',
    },
    keywords: {
      tj: [
        'роҳнамо ба Олмон',
        'омодагӣ барои Олмон',
        'ҳуҷҷатҳои виза',
        'Anmeldung',
        'иқомат дар Олмон',
        'Blue Card',
        'марҳилаҳои муҳоҷират',
        'нақшаи Олмон',
      ],
      de: ['Roadmap Deutschland', 'Deutschland Vorbereitung', 'Visa Dokumente', 'Niederlassung'],
      ru: ['дорожная карта Германия', 'подготовка Германия', 'документы визы', 'ПМЖ Германия'],
    },
    image: '/seo-images/roadmap-tj.jpg',
  },

  faq: {
    title: {
      tj: 'Саволҳои маъмул – Ҷавобҳо ба саволҳо дар бораи Олмон',
      de: 'Häufig gestellte Fragen – Antworten zu Fragen über Deutschland',
      ru: 'Часто задаваемые вопросы – Ответы на вопросы о Германии',
    },
    description: {
      tj: 'Ҷавоб ба саволҳои маъмул дар бораи виза, маблағ, забон, таҳсил ва кор дар Олмон. Маълумоти дақиқ ва амалӣ.',
      de: 'Antworten auf häufige Fragen zu Visum, Finanzen, Sprache, Studium und Arbeit in Deutschland. Genaue und praktische Informationen.',
      ru: 'Ответы на частые вопросы о визе, финансах, языке, учёбе и работе в Германии. Точная и практическая информация.',
    },
    keywords: {
      tj: ['саволҳо Олмон', 'FAQ виза', 'чӣ қадар пул', 'давраи виза', 'талаботи забон'],
      de: ['FAQ Deutschland', 'Visum Fragen', 'Kosten', 'Sprachanforderungen'],
      ru: ['вопросы Германия', 'FAQ виза', 'сколько денег', 'требования язык'],
    },
    image: '/seo-images/faq-tj.jpg',
  },

  resources: {
    title: {
      tj: 'Захираҳо ва пайвандҳо – Сайтҳои муфид барои Олмон',
      de: 'Ressourcen und Links – Nützliche Websites für Deutschland',
      ru: 'Ресурсы и ссылки – Полезные сайты для Германии',
    },
    description: {
      tj: 'Рӯйхати пайвандҳои расмӣ ва захираҳои муфид: DAAD, Make it in Germany, Anerkennung, сафорати Олмон ва дигар.',
      de: 'Liste offizieller Links und nützlicher Ressourcen: DAAD, Make it in Germany, Anerkennung, Deutsche Botschaft und mehr.',
      ru: 'Список официальных ссылок и полезных ресурсов: DAAD, Make it in Germany, Anerkennung, посольство Германии и другое.',
    },
    keywords: {
      tj: ['захираҳо Олмон', 'DAAD', 'Make it in Germany', 'сафорати Олмон', 'пайвандҳо'],
      de: ['Ressourcen Deutschland', 'DAAD', 'Deutsche Botschaft', 'offizielle Links'],
      ru: ['ресурсы Германия', 'DAAD', 'посольство Германии', 'официальные ссылки'],
    },
    image: '/seo-images/resources-tj.jpg',
  },

  cvGenerator: {
    title: {
      tj: 'Эҷодкунандаи Lebenslauf – CV-и олмонӣ ройгон созед',
      de: 'Lebenslauf Generator – Erstellen Sie kostenlos einen deutschen CV',
      ru: 'Генератор Lebenslauf – Создайте немецкое резюме бесплатно',
    },
    description: {
      tj: 'Барномаи ройгон барои эҷоди CV-и олмонӣ (Lebenslauf). Шаблонҳои гуногун, 100% бепул, маҳфияти пурра, бе backend.',
      de: 'Kostenloses Tool zur Erstellung eines deutschen CV (Lebenslauf). Verschiedene Vorlagen, 100% kostenlos, völlige Privatsphäre, kein Backend.',
      ru: 'Бесплатный инструмент для создания немецкого резюме (Lebenslauf). Различные шаблоны, 100% бесплатно, полная конфиденциальность, без backend.',
    },
    keywords: {
      tj: ['Lebenslauf', 'CV', 'резюме олмонӣ', 'эҷодкунанда CV', 'CV ройгон'],
      de: ['Lebenslauf erstellen', 'CV Generator', 'kostenloser Lebenslauf', 'deutsches Resumee'],
      ru: ['создать Lebenslauf', 'генератор CV', 'бесплатное резюме', 'немецкое CV'],
    },
    image: '/seo-images/cv-generator-tj.jpg',
  },

  privacy: {
    title: {
      tj: 'Сиёсати ҳифзи маълумот – Datenschutzerklärung',
      de: 'Datenschutzerklärung – Privacy Policy',
      ru: 'Политика конфиденциальности – Datenschutzerklärung',
    },
    description: {
      tj: 'Сиёсати ҳифзи маълумоти сомонаи Roadmap.m4li.de мувофиқи GDPR ва қонунҳои Олмон.',
      de: 'Datenschutzerklärung der Website Roadmap.m4li.de gemäß GDPR und deutschen Gesetzen.',
      ru: 'Политика конфиденциальности сайта Roadmap.m4li.de согласно GDPR и немецким законам.',
    },
    keywords: {
      tj: ['сиёсати махфият', 'ҳифзи маълумот', 'GDPR'],
      de: ['Datenschutz', 'Privacy Policy', 'GDPR'],
      ru: ['конфиденциальность', 'защита данных', 'GDPR'],
    },
    noindex: true,
  },

  cookies: {
    title: {
      tj: 'Сиёсати Cookie – Cookie-Richtlinie',
      de: 'Cookie-Richtlinie – Cookie Policy',
      ru: 'Политика файлов Cookie – Cookie-Richtlinie',
    },
    description: {
      tj: 'Маълумот дар бораи истифодаи cookies дар сомонаи Roadmap.m4li.de ва идораи розигӣ.',
      de: 'Informationen über die Verwendung von Cookies auf Roadmap.m4li.de und Consent-Management.',
      ru: 'Информация об использовании cookies на сайте Roadmap.m4li.de и управлении согласием.',
    },
    keywords: {
      tj: ['cookies', 'сиёсати cookie', 'розигӣ'],
      de: ['Cookies', 'Cookie-Richtlinie', 'Einwilligung'],
      ru: ['cookies', 'политика cookie', 'согласие'],
    },
    noindex: true,
  },

  imprint: {
    title: {
      tj: 'Маълумоти ҳуқуқӣ – Impressum',
      de: 'Impressum – Legal Notice',
      ru: 'Выходные данные – Impressum',
    },
    description: {
      tj: 'Маълумоти ҳуқуқӣ ва масъул барои мазмуни сомонаи Roadmap.m4li.de.',
      de: 'Rechtliche Informationen und Verantwortlicher für den Inhalt von Roadmap.m4li.de.',
      ru: 'Юридическая информация и ответственный за содержание сайта Roadmap.m4li.de.',
    },
    keywords: {
      tj: ['impressum', 'маълумоти ҳуқуқӣ', 'масъул'],
      de: ['Impressum', 'rechtliche Informationen', 'Verantwortlicher'],
      ru: ['impressum', 'юридические данные', 'ответственный'],
    },
    noindex: true,
  },
};

/**
 * Generate hreflang links for a page
 */
export function getHreflangLinks(path: string = ''): string[] {
  const cleanPath = path.replace(/^\//, '');
  return [
    `<link rel="alternate" hreflang="tg" href="${SITE_CONFIG.domain}/${cleanPath}" />`,
    `<link rel="alternate" hreflang="de" href="${SITE_CONFIG.domain}/de/${cleanPath}" />`,
    `<link rel="alternate" hreflang="ru" href="${SITE_CONFIG.domain}/ru/${cleanPath}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_CONFIG.domain}/${cleanPath}" />`,
  ];
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string = '', language: 'tg' | 'de' | 'ru' = 'tg'): string {
  const cleanPath = path.replace(/^\//, '');
  if (language === 'tg') {
    return `${SITE_CONFIG.domain}/${cleanPath}`;
  }
  return `${SITE_CONFIG.domain}/${language}/${cleanPath}`;
}

/**
 * Generate meta tags for a page
 */
export function getMetaTags(
  pageKey: keyof typeof PAGE_SEO,
  language: 'tg' | 'de' | 'ru' = 'tg',
  path: string = ''
): Record<string, string> {
  const seo = PAGE_SEO[pageKey];
  if (!seo) return {};

  const lang = language === 'tg' ? 'tj' : language === 'de' ? 'de' : 'ru';

  return {
    title: seo.title[lang],
    description: seo.description[lang],
    keywords: seo.keywords[lang].join(', '),
    canonical: getCanonicalUrl(path, language),
    robots: seo.noindex ? 'noindex, nofollow' : 'index, follow',
    ogTitle: seo.title[lang],
    ogDescription: seo.description[lang],
    ogImage: seo.image ? `${SITE_CONFIG.domain}${seo.image}` : `${SITE_CONFIG.domain}/seo-images/default-tj.jpg`,
    ogUrl: getCanonicalUrl(path, language),
    twitterTitle: seo.title[lang],
    twitterDescription: seo.description[lang],
    twitterImage: seo.image ? `${SITE_CONFIG.domain}${seo.image}` : `${SITE_CONFIG.domain}/seo-images/default-tj.jpg`,
  };
}
