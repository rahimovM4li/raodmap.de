# SEO Image Fix - Dokumentation

## Problem

Wenn man Links der Website auf Social Media (WhatsApp, Facebook, Twitter, etc.) teilt, wurde immer das Default-Bild angezeigt, unabhängig von der Seite. Außerdem wurden die Titles und Descriptions nicht übersetzt für `/ru` und `/de` URLs.

**Ursachen**: 
1. React ist eine Single Page Application (SPA). Es gibt nur eine `index.html` für alle Routes. Social Media Crawler sehen nur das statisches HTML, nicht die client-seitig generierten Meta-Tags.
2. Die Regex-Patterns im Prerender-Script konnten keine Multi-Line Meta-Tags matchen.

## Lösung: Prerender Script mit Multi-Line Support

Ein Prerender-Script generiert nach jedem Build statische HTML-Dateien mit korrekten Meta-Tags für jede wichtige Route in allen Sprachen.

### Wie es funktioniert

1. **Build Process**: `npm run build` führt jetzt automatisch:
   - `vite build` → Baut die React App
   - `node prerender.cjs` → Generiert statische HTML für alle Routes

2. **Prerender Script** (`prerender.cjs`):
   - Liest die `dist/index.html` als Template
   - Erstellt für jede Route (`/tj/study`, `/ru/work`, etc.) eine eigene `index.html`
   - **Verwendet Multi-Line Regex** mit `[\s\S]*?` und `/m` flag um Meta-Tags über mehrere Zeilen zu matchen
   - Aktualisiert die Meta-Tags mit den richtigen **übersetzten** Werten:
     - `<title>`
     - `<meta name="description">`
     - `<link rel="canonical">`
     - `<meta property="og:image">` ← **Wichtig für Social Media**
     - `<meta property="og:title">`
     - `<meta property="og:description">`
     - `<meta property="og:url">`
     - Hreflang Links
     - Twitter Card Tags

3. **Ergebnis**: Jede Route hat ihre eigene statische HTML-Datei:
   ```
   dist/
   ├── index.html (root - redirects to /tj)
   ├── tj/
   │   ├── index.html (home-tj.jpg)
   │   ├── study/index.html (study-tj.jpg)
   │   ├── work/index.html (work-tj.jpg)
   │   ├── ausbildung/index.html (ausbildung-tj.jpg)
   │   └── ...
   ├── ru/
   │   ├── index.html (home-tj.jpg)
   │   ├── study/index.html (study-tj.jpg)
   │   └── ...
   └── de/
       ├── index.html (home-tj.jpg)
       ├── study/index.html (study-tj.jpg)
       └── ...
   ```

## SEO-Bilder

Alle Bilder sind in `public/seo-images/`:
- `home-tj.jpg` - Homepage
- `study-tj.jpg` - Studium-Seite
- `work-tj.jpg` - Arbeit-Seite
- `ausbildung-tj.jpg` - Ausbildung-Seite
- `living-tj.jpg` - Leben-Seite
- `roadmap-tj.jpg` - Roadmap-Seite
- `faq-tj.jpg` - FAQ-Seite
- `resources-tj.jpg` - Ressourcen-Seite
- `cv-generator-tj.jpg` - CV Generator-Seite
- `default-tj.jpg` - Fallback

**Wichtig**: Die Bilder sind sprachneutral (nur mit `-tj` Suffix) und werden für alle Sprachen verwendet.

## Build & Deploy

### Normaler Build
```bash
npm run build
```
Führt automatisch Vite Build + Prerender aus.

### Nur Prerender (nach manuellem Build)
```bash
npm run prerender
```

### Development
```bash
npm run dev
```
Im Development-Modus wird kein Prerender ausgeführt (nicht nötig).

## Testen

### Meta-Tags prüfen

1. **Lokaler Test**:
   ```bash
   # Build erstellen
   npm run build
   
   # Spezifische Seite prüfen
   cat dist/tj/study/index.html | grep "og:image"
   cat dist/ru/work/index.html | grep "og:title"
   ```

2. **Nach Deploy**:
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### URL-Struktur testen

Alle folgenden URLs sollten funktionieren und die richtigen Bilder zeigen:

**Tajik:**
- https://roadmap.m4li.de/tj
- https://roadmap.m4li.de/tj/study
- https://roadmap.m4li.de/tj/work
- https://roadmap.m4li.de/tj/ausbildung

**Russian:**
- https://roadmap.m4li.de/ru
- https://roadmap.m4li.de/ru/study
- https://roadmap.m4li.de/ru/work

**German:**
- https://roadmap.m4li.de/de
- https://roadmap.m4li.de/de/study
- https://roadmap.m4li.de/de/work

## Cache-Clearing

Social Media Crawler cachen Meta-Tags! Nach Deploy:

1. **Facebook**: https://developers.facebook.com/tools/debug/
   - URL eingeben → "Scrape Again" klicken

2. **Twitter**: URLs werden beim ersten Teilen gescraped
   - Eventuell https://cards-dev.twitter.com/validator nutzen

3. **WhatsApp**: Kein offizielles Tool
   - Cache läuft nach einigen Tagen ab
   - Workaround: Query-Parameter anhängen (`?v=2`)

## Wichtige Dateien

- `prerender.cjs` - Prerender-Script
- `src/lib/seo.ts` - SEO-Konfiguration
- `src/components/SEOHead.tsx` - Client-seitige SEO-Component
- `index.html` - Template für Prerender
- `public/seo-images/` - SEO-Bilder

## Wartung

### Neue Seite hinzufügen

1. **SEO-Konfiguration** in `src/lib/seo.ts`:
   ```javascript
   export const PAGE_SEO = {
     // ...
     newPage: {
       title: { tj: '...', ru: '...', de: '...' },
       description: { tj: '...', ru: '...', de: '...' },
       image: '/seo-images/newpage-tj.jpg',
     },
   };
   ```

2. **Bild** hinzufügen: `public/seo-images/newpage-tj.jpg`

3. **Route** zu `prerender.cjs` hinzufügen:
   ```javascript
   const routes = [
     // ...
     { path: '/tj/newpage', page: 'newPage', lang: 'tj' },
     { path: '/ru/newpage', page: 'newPage', lang: 'ru' },
     { path: '/de/newpage', page: 'newPage', lang: 'de' },
   ];
   ```

4. Build: `npm run build`

### Bild aktualisieren

1. Neues Bild in `public/seo-images/` ersetzen
2. Rebuild: `npm run build`
3. Deploy
4. Cache clearing auf Social Media Platformen

## Limitierungen

- **Nur statische Meta-Tags**: Dynamische Inhalte (z.B. Blogposts mit IDs) benötigen SSR
- **Build-Zeit**: Jede neue Route muss manuell hinzugefügt werden
- **Bilder sprachneutral**: Aktuell nur `-tj` Suffix, aber für alle Sprachen verwendet

## Alternative Lösungen (Zukunft)

Für eine vollautomatische Lösung:

1. **Server-Side Rendering (SSR)** mit:
   - Next.js
   - Remix
   - Vite SSR

2. **Prerender Service**:
   - Prerender.io
   - Rendertron
   - Firebase Cloud Functions

3. **Static Site Generation (SSG)**:
   - Next.js Static Export
   - Astro

## Bestätigung

✅ Jede Seite hat jetzt ihre eigenen SEO-Meta-Tags
✅ Jede Seite zeigt ihr eigenes OG-Bild beim Teilen
✅ **Alle Titles sind übersetzt** (Tajik, Russian, German)
✅ **Alle Descriptions sind übersetzt** (Tajik, Russian, German)
✅ **Alle OG-Tags sind übersetzt** (og:title, og:description)
✅ Alle 3 Sprachen (Tajik, Russian, German) funktionieren
✅ Social Media Crawler sehen die korrekten Meta-Tags
✅ URLs sind sauber und SEO-freundlich

### Getestete Beispiele:

**Russian Study Page (/ru/study)**
- ✅ Title: "Учёба в Германии – Полное руководство для студентов из Таджикистана"
- ✅ Description: "Всё об учёбе в Германии: выбор университета, требования..."
- ✅ OG:Image: study-tj.jpg

**German Ausbildung Page (/de/ausbildung)**
- ✅ Title: "Ausbildung in Deutschland – Berufsausbildung mit Gehalt"
- ✅ Description: "Ausbildung-Programm: gleichzeitig Lernen und Arbeiten..."
- ✅ OG:Image: ausbildung-tj.jpg

**Tajik Work Page (/tj/work)**
- ✅ Title: "Кор дар Олмон – Имконоти корӣ барои мутахассисон аз Тоҷикистон"
- ✅ Description: "Чӣ гуна дар Олмон кор ёбем: визаи ҷустуҷӯи кор..."
- ✅ OG:Image: work-tj.jpg

## Support

Bei Problemen:
1. Prüfen Sie die Browser-Konsole auf Fehler
2. Testen Sie `npm run build` lokal
3. Prüfen Sie die generierten HTML-Dateien in `dist/`
4. Nutzen Sie Facebook/Twitter Debugging-Tools

**Autor**: Implementiert am 01.01.2026
