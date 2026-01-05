/**
 * Simple Prerender Script for Static SEO HTML
 * 
 * This generates static HTML files with correct meta tags for each route.
 * Run this after `npm run build` to generate SEO-optimized HTML files.
 * 
 * Usage: node prerender.js
 */

const fs = require('fs');
const path = require('path');

// SEO Configuration from src/lib/seo.ts
const SITE_CONFIG = {
  domain: 'https://roadmap.m4li.de',
  siteName: {
    tj: 'Роҳнамо ба Олмон',
    de: 'Roadmap nach Deutschland',
    ru: 'Дорожная карта в Германию',
  },
  author: 'Muhammadali Rahimov',
};

const PAGE_SEO = {
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
    image: '/seo-images/resources-tj.jpg',
  },
};

// Routes to generate
const routes = [
  { path: '/tj', page: 'home', lang: 'tj' },
  { path: '/tj/study', page: 'study', lang: 'tj' },
  { path: '/tj/work', page: 'work', lang: 'tj' },
  { path: '/tj/ausbildung', page: 'ausbildung', lang: 'tj' },
  { path: '/tj/living', page: 'living', lang: 'tj' },
  { path: '/tj/roadmap', page: 'roadmap', lang: 'tj' },
  { path: '/tj/faq', page: 'faq', lang: 'tj' },
  { path: '/tj/resources', page: 'resources', lang: 'tj' },
  
  { path: '/ru', page: 'home', lang: 'ru' },
  { path: '/ru/study', page: 'study', lang: 'ru' },
  { path: '/ru/work', page: 'work', lang: 'ru' },
  { path: '/ru/ausbildung', page: 'ausbildung', lang: 'ru' },
  { path: '/ru/living', page: 'living', lang: 'ru' },
  { path: '/ru/roadmap', page: 'roadmap', lang: 'ru' },
  { path: '/ru/faq', page: 'faq', lang: 'ru' },
  { path: '/ru/resources', page: 'resources', lang: 'ru' },
  
  { path: '/de', page: 'home', lang: 'de' },
  { path: '/de/study', page: 'study', lang: 'de' },
  { path: '/de/work', page: 'work', lang: 'de' },
  { path: '/de/ausbildung', page: 'ausbildung', lang: 'de' },
  { path: '/de/living', page: 'living', lang: 'de' },
  { path: '/de/roadmap', page: 'roadmap', lang: 'de' },
  { path: '/de/faq', page: 'faq', lang: 'de' },
  { path: '/de/resources', page: 'resources', lang: 'de' },
];

// Main function
function main() {
  const distPath = path.join(__dirname, 'dist');
  const templatePath = path.join(distPath, 'index.html');
  
  // Read the original index.html as template
  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found. Run `npm run build` first.');
    process.exit(1);
  }
  
  const templateHTML = fs.readFileSync(templatePath, 'utf8');
  
  console.log('🚀 Starting prerender...\n');

  routes.forEach(route => {
    const seo = PAGE_SEO[route.page];
    if (!seo) {
      console.log(`❌ No SEO config for page: ${route.page}`);
      return;
    }

    const { path: routePath, page, lang } = route;
    const htmlLang = lang === 'tj' ? 'tg' : lang;
    const url = `${SITE_CONFIG.domain}${routePath}`;
    const imageUrl = `${SITE_CONFIG.domain}${seo.image}`;
    const pagePath = routePath.replace('/tj', '').replace('/ru', '').replace('/de', '') || '';

    // Update meta tags in template
    let html = templateHTML;
    
    // Update lang attribute
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${htmlLang}"`);
    
    // Update title
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${seo.title[lang]}</title>`);
    
    // Update description (multiline support)
    html = html.replace(/name="description"[\s\S]*?content="[^"]*"/m, `name="description"\n      content="${seo.description[lang]}"`);
    
    // Update canonical
    html = html.replace(/rel="canonical" href="[^"]*"/, `rel="canonical" href="${url}"`);
    
    // Update hreflang links
    html = html.replace(/rel="alternate" hreflang="tg" href="[^"]*"/, `rel="alternate" hreflang="tg" href="${SITE_CONFIG.domain}/tj${pagePath}"`);
    html = html.replace(/rel="alternate" hreflang="ru" href="[^"]*"/, `rel="alternate" hreflang="ru" href="${SITE_CONFIG.domain}/ru${pagePath}"`);
    html = html.replace(/rel="alternate" hreflang="de" href="[^"]*"/, `rel="alternate" hreflang="de" href="${SITE_CONFIG.domain}/de${pagePath}"`);
    html = html.replace(/rel="alternate" hreflang="x-default" href="[^"]*"/, `rel="alternate" hreflang="x-default" href="${SITE_CONFIG.domain}/tj${pagePath}"`);
    
    // Update OG tags (multiline support)
    html = html.replace(/property="og:url"[\s\S]*?content="[^"]*"/m, `property="og:url" content="${url}"`);
    html = html.replace(/property="og:title"[\s\S]*?content="[^"]*"/m, `property="og:title"\n      content="${seo.title[lang]}"`);
    html = html.replace(/property="og:description"[\s\S]*?content="[^"]*"/m, `property="og:description"\n      content="${seo.description[lang]}"`);
    html = html.replace(/property="og:image"[\s\S]*?content="[^"]*"/m, `property="og:image"\n      content="${imageUrl}"`);
    html = html.replace(/property="og:locale"[\s\S]*?content="[^"]*"/m, `property="og:locale" content="${htmlLang === 'tg' ? 'tg_TJ' : htmlLang === 'de' ? 'de_DE' : 'ru_RU'}"`);
    html = html.replace(/property="og:site_name"[\s\S]*?content="[^"]*"/m, `property="og:site_name" content="${SITE_CONFIG.siteName[lang]}"`);
    
    // Update Twitter tags (multiline support)
    html = html.replace(/name="twitter:url"[\s\S]*?content="[^"]*"/m, `name="twitter:url" content="${url}"`);
    html = html.replace(/name="twitter:title"[\s\S]*?content="[^"]*"/m, `name="twitter:title"\n      content="${seo.title[lang]}"`);
    html = html.replace(/name="twitter:description"[\s\S]*?content="[^"]*"/m, `name="twitter:description"\n      content="${seo.description[lang]}"`);
    html = html.replace(/name="twitter:image"[\s\S]*?content="[^"]*"/m, `name="twitter:image"\n      content="${imageUrl}"`);

    // Create directory if needed
    const routePathNormalized = routePath.substring(1); // Remove leading slash
    const filePath = path.join(distPath, routePathNormalized, 'index.html');
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Write HTML file
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Generated: ${routePath}/index.html`);
  });

  console.log(`\n✨ Prerender complete! Generated ${routes.length} pages.`);
  console.log('\n📝 Note: Each route now has static HTML with correct SEO meta tags.');
  console.log('   Social media crawlers will see the correct images and text.\n');
}

// Run
try {
  main();
} catch (error) {
  console.error('❌ Error during prerender:', error);
  process.exit(1);
}
