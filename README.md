# Roadmap Deutschland

Eine mehrsprachige Web-Plattform (Deutsch, Russisch, Tadschikisch) als Wegweiser für die Migration nach Deutschland.

## Projektbeschreibung

Diese Plattform bietet umfassende Informationen für drei Hauptwege nach Deutschland:
- **Studium** - Hochschulbildung in Deutschland
- **Arbeit** - Berufliche Möglichkeiten
- **Ausbildung** - Duale Berufsausbildung

## Features

- 🌍 Mehrsprachige Unterstützung (TJ/RU/DE)
- 🧭 Interaktiver Wizard für personalisierte Roadmaps
- 📄 CV/Lebenslauf Generator mit PDF-Export
- 📚 Umfangreiche Ressourcen und FAQ
- 📱 Responsive Design

## Technologie-Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn-ui
- **Routing**: React Router
- **State Management**: React Query
- **PDF Generation**: jsPDF

## Installation

```sh
# Repository klonen
git clone <YOUR_GIT_URL>

# Zum Projektverzeichnis navigieren
cd roadmap.m4li

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

## Verfügbare Scripts

- `npm run dev` - Startet den Development Server
- `npm run build` - Erstellt Production Build
- `npm run preview` - Vorschau des Production Builds
- `npm run lint` - Führt ESLint aus

## Projektstruktur

```
src/
├── components/     # React Komponenten
├── pages/         # Seiten/Routes
├── contexts/      # React Context (z.B. Language)
├── lib/           # Utilities (i18n, PDF Generator)
└── hooks/         # Custom React Hooks
```
