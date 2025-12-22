import jsPDF from 'jspdf';
import { Language } from '@/lib/i18n';

interface ChecklistItem {
  text: string;
  required: boolean;
}

interface ChecklistData {
  title: string;
  subtitle: string;
  timeline: string;
  documents: ChecklistItem[];
  steps: string[];
  embassy: {
    title: string;
    address: string;
    phone: string;
    website: string;
  };
  sources: string[];
}

const checklists: Record<string, Record<Language, ChecklistData>> = {
  study: {
    tj: {
      title: 'ЧЕКЛИСТ: Визаи таҳсил ба Олмон',
      subtitle: 'Ҳуҷҷатҳои зарурӣ барои визаи таҳсил',
      timeline: 'Вақти омодагӣ: 12-24 моҳ',
      documents: [
        { text: 'Паспорти амалкунанда (ҳадди ақал 12 моҳ)', required: true },
        { text: 'Шаҳодатномаи хатми мактаб (бо тарҷума)', required: true },
        { text: 'Дипломи донишгоҳ (агар бошад) бо тарҷумаи тасдиқшуда', required: false },
        { text: 'Сертификати забони олмонӣ (TestDaF, DSH, Goethe B1-C1)', required: true },
        { text: 'Мактуби ангезиш (Motivationsschreiben)', required: true },
        { text: 'CV/Резюме ба забони олмонӣ', required: true },
        { text: 'Тасдиқи маблағ — Sperrkonto бо 11,208 евро', required: true },
        { text: 'Суғуртаи тандурустӣ (барои виза)', required: true },
        { text: 'Расмҳои биометрикӣ (35x45mm)', required: true },
        { text: 'Номаи қабул аз донишгоҳ (Zulassungsbescheid)', required: true },
        { text: 'Пурра кардани анкетаи виза', required: true },
        { text: 'Тасдиқи манзил дар Олмон (агар бошад)', required: false },
      ],
      steps: [
        '1. Омӯзиши забони олмонӣ то сатҳи B1-B2',
        '2. Ҷустуҷӯи барнома дар DAAD ё uni-assist',
        '3. Омода кардани ҳуҷҷатҳо ва тарҷумаҳо',
        '4. Фиристодани ариза ба донишгоҳ',
        '5. Кушодани Sperrkonto (11,208 евро)',
        '6. Гирифтани суғуртаи тандурустӣ',
        '7. Гирифтани вақти мулоқот дар Сафоратхона',
        '8. Бо ҳама ҳуҷҷатҳо ба Сафоратхона рафтан',
      ],
      embassy: {
        title: 'Сафоратхонаи Олмон дар Душанбе',
        address: 'ш. Душанбе, кӯчаи Сомонӣ 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'DAAD — daad.de',
        'Make it in Germany — make-it-in-germany.com',
        'Auswärtiges Amt — auswaertiges-amt.de',
      ],
    },
    de: {
      title: 'CHECKLISTE: Studentenvisum für Deutschland',
      subtitle: 'Erforderliche Dokumente für das Studentenvisum',
      timeline: 'Vorbereitungszeit: 12-24 Monate',
      documents: [
        { text: 'Gültiger Reisepass (mindestens 12 Monate)', required: true },
        { text: 'Schulabschlusszeugnis (mit Übersetzung)', required: true },
        { text: 'Hochschulabschluss (falls vorhanden) mit beglaubigter Übersetzung', required: false },
        { text: 'Deutschzertifikat (TestDaF, DSH, Goethe B1-C1)', required: true },
        { text: 'Motivationsschreiben', required: true },
        { text: 'Lebenslauf auf Deutsch', required: true },
        { text: 'Finanzierungsnachweis — Sperrkonto mit 11.208 Euro', required: true },
        { text: 'Krankenversicherung (für Visum)', required: true },
        { text: 'Biometrische Fotos (35x45mm)', required: true },
        { text: 'Zulassungsbescheid der Universität', required: true },
        { text: 'Ausgefüllter Visumantrag', required: true },
        { text: 'Wohnungsnachweis in Deutschland (falls vorhanden)', required: false },
      ],
      steps: [
        '1. Deutsch lernen bis Niveau B1-B2',
        '2. Programm bei DAAD oder uni-assist suchen',
        '3. Dokumente und Übersetzungen vorbereiten',
        '4. Bewerbung an Universität senden',
        '5. Sperrkonto eröffnen (11.208 Euro)',
        '6. Krankenversicherung abschließen',
        '7. Termin bei der Botschaft vereinbaren',
        '8. Mit allen Dokumenten zur Botschaft gehen',
      ],
      embassy: {
        title: 'Deutsche Botschaft in Duschanbe',
        address: 'Duschanbe, Somoni Straße 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'DAAD — daad.de',
        'Make it in Germany — make-it-in-germany.com',
        'Auswärtiges Amt — auswaertiges-amt.de',
      ],
    },
    ru: {
      title: 'ЧЕКЛИСТ: Учебная виза в Германию',
      subtitle: 'Необходимые документы для студенческой визы',
      timeline: 'Время подготовки: 12-24 месяца',
      documents: [
        { text: 'Действующий паспорт (минимум 12 месяцев)', required: true },
        { text: 'Аттестат об окончании школы (перевод на немецкий)', required: true },
        { text: 'Диплом (если есть) с заверенным переводом', required: false },
        { text: 'Сертификат немецкого языка (TestDaF, DSH, Goethe B1-C1)', required: true },
        { text: 'Мотивационное письмо (Motivationsschreiben)', required: true },
        { text: 'CV / Резюме на немецком языке', required: true },
        { text: 'Подтверждение средств — Sperrkonto с 11,208 евро', required: true },
        { text: 'Медицинская страховка (для визы)', required: true },
        { text: 'Биометрические фото (35x45mm)', required: true },
        { text: 'Письмо о зачислении (Zulassungsbescheid)', required: true },
        { text: 'Заполненная анкета на визу', required: true },
        { text: 'Подтверждение жилья в Германии (если есть)', required: false },
      ],
      steps: [
        '1. Изучение немецкого языка до уровня B1-B2',
        '2. Поиск программы на DAAD или uni-assist',
        '3. Подготовка документов и переводов',
        '4. Отправка заявки в университет',
        '5. Открытие Sperrkonto (11,208 евро)',
        '6. Оформление медицинской страховки',
        '7. Запись на приём в Посольство',
        '8. Подача документов в Посольство',
      ],
      embassy: {
        title: 'Посольство Германии в Душанбе',
        address: 'г. Душанбе, ул. Сомони 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'DAAD — daad.de',
        'Make it in Germany — make-it-in-germany.com',
        'Auswärtiges Amt — auswaertiges-amt.de',
      ],
    },
  },
  jobseeker: {
    tj: {
      title: 'ЧЕКЛИСТ: Визаи ҷустуҷӯи кор',
      subtitle: 'Виза барои ҷустуҷӯи кор дар Олмон (6 моҳ)',
      timeline: 'Вақти омодагӣ: 3-6 моҳ',
      documents: [
        { text: 'Паспорти амалкунанда (ҳадди ақал 12 моҳ)', required: true },
        { text: 'Дипломи донишгоҳ (бакалавр ё магистр)', required: true },
        { text: 'Тасдиқи эътироф (anabin H+)', required: true },
        { text: 'CV ба забони олмонӣ ё англисӣ', required: true },
        { text: 'Мактуби ангезиш', required: true },
        { text: 'Тасдиқи таҷрибаи корӣ', required: false },
        { text: 'Тасдиқи маблағ барои 6 моҳ (~5,000 евро)', required: true },
        { text: 'Суғуртаи тандурустӣ', required: true },
        { text: 'Расмҳои биометрикӣ (35x45mm)', required: true },
        { text: 'Сертификати забон (олмонӣ B1+ ё англисӣ)', required: true },
        { text: 'Тасдиқи манзил дар Олмон', required: false },
      ],
      steps: [
        '1. Санҷиши диплом дар anabin.kmk.org',
        '2. Омӯзиши забон (олмонӣ ё англисӣ)',
        '3. Омода кардани CV ба олмонӣ',
        '4. Ҷамъ кардани ҳуҷҷатҳо',
        '5. Гирифтани суғурта',
        '6. Гирифтани вақт дар Сафоратхона',
        '7. Супоридани ҳуҷҷатҳо ба Сафоратхона',
      ],
      embassy: {
        title: 'Сафоратхонаи Олмон дар Душанбе',
        address: 'ш. Душанбе, кӯчаи Сомонӣ 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'Make it in Germany — make-it-in-germany.com',
        'Auswärtiges Amt — auswaertiges-amt.de',
      ],
    },
    de: {
      title: 'CHECKLISTE: Job Seeker Visa',
      subtitle: 'Visum zur Arbeitssuche in Deutschland (6 Monate)',
      timeline: 'Vorbereitungszeit: 3-6 Monate',
      documents: [
        { text: 'Gültiger Reisepass (mindestens 12 Monate)', required: true },
        { text: 'Hochschulabschluss (Bachelor oder Master)', required: true },
        { text: 'Nachweis der Anerkennung (anabin H+)', required: true },
        { text: 'Lebenslauf auf Deutsch oder Englisch', required: true },
        { text: 'Motivationsschreiben', required: true },
        { text: 'Nachweis der Berufserfahrung', required: false },
        { text: 'Finanzierungsnachweis für 6 Monate (~5.000 Euro)', required: true },
        { text: 'Krankenversicherung', required: true },
        { text: 'Biometrische Fotos (35x45mm)', required: true },
        { text: 'Sprachzertifikat (Deutsch B1+ oder Englisch)', required: true },
        { text: 'Wohnungsnachweis in Deutschland', required: false },
      ],
      steps: [
        '1. Abschluss auf anabin.kmk.org prüfen',
        '2. Sprache lernen (Deutsch oder Englisch)',
        '3. Lebenslauf auf Deutsch vorbereiten',
        '4. Dokumente sammeln',
        '5. Versicherung abschließen',
        '6. Termin bei der Botschaft vereinbaren',
        '7. Dokumente bei der Botschaft einreichen',
      ],
      embassy: {
        title: 'Deutsche Botschaft in Duschanbe',
        address: 'Duschanbe, Somoni Straße 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'Make it in Germany — make-it-in-germany.com',
        'Auswärtiges Amt — auswaertiges-amt.de',
      ],
    },
    ru: {
      title: 'ЧЕКЛИСТ: Job Seeker Visa',
      subtitle: 'Виза для поиска работы в Германии (6 месяцев)',
      timeline: 'Время подготовки: 3-6 месяцев',
      documents: [
        { text: 'Действующий паспорт (минимум 12 месяцев)', required: true },
        { text: 'Диплом университета (Bachelor или Master)', required: true },
        { text: 'Подтверждение признания диплома (anabin H+)', required: true },
        { text: 'CV на немецком или английском', required: true },
        { text: 'Мотивационное письмо', required: true },
        { text: 'Подтверждение опыта работы', required: false },
        { text: 'Подтверждение средств на 6 месяцев (~5,000 евро)', required: true },
        { text: 'Медицинская страховка', required: true },
        { text: 'Биометрические фото (35x45mm)', required: true },
        { text: 'Языковой сертификат (немецкий B1+ или английский)', required: true },
        { text: 'Подтверждение жилья в Германии', required: false },
      ],
      steps: [
        '1. Проверка диплома на anabin.kmk.org',
        '2. Изучение языка (немецкий или английский)',
        '3. Подготовка CV на немецком',
        '4. Сбор документов',
        '5. Оформление страховки',
        '6. Запись в Посольство',
        '7. Подача документов в Посольство',
      ],
      embassy: {
        title: 'Посольство Германии в Душанбе',
        address: 'г. Душанбе, ул. Сомони 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'Make it in Germany — make-it-in-germany.com',
        'Auswärtiges Amt — auswaertiges-amt.de',
      ],
    },
  },
  bluecard: {
    tj: {
      title: 'ЧЕКЛИСТ: EU Blue Card',
      subtitle: 'Корти кабуд барои мутахассисони баландихтисос',
      timeline: 'Вақти омодагӣ: 2-6 моҳ (бо шартнома)',
      documents: [
        { text: 'Паспорти амалкунанда', required: true },
        { text: 'Дипломи эътирофшудаи донишгоҳ', required: true },
        { text: 'Тасдиқи эътироф (anabin H+)', required: true },
        { text: 'Шартномаи кор аз корфармои олмонӣ', required: true },
        { text: 'Тасдиқи ҳадди ақали маош: 45,300 евро/сол (2024)', required: true },
        { text: 'Барои IT/муҳандисӣ: 41,000 евро/сол', required: true },
        { text: 'CV ба забони олмонӣ', required: true },
        { text: 'Суғуртаи тандурустӣ', required: true },
        { text: 'Расмҳои биометрикӣ (35x45mm)', required: true },
        { text: 'Анкетаи виза', required: true },
      ],
      steps: [
        '1. Ҷустуҷӯи кор (LinkedIn, StepStone, Indeed)',
        '2. Гирифтани шартнома аз корфармо',
        '3. Санҷиши ҳадди ақали маош',
        '4. Тасдиқи эътирофи диплом',
        '5. Ҷамъ кардани ҳуҷҷатҳо',
        '6. Супоридан ба Сафоратхона',
      ],
      embassy: {
        title: 'Сафоратхонаи Олмон дар Душанбе',
        address: 'ш. Душанбе, кӯчаи Сомонӣ 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'Make it in Germany — make-it-in-germany.com',
        'EU Blue Card — eu-bluecard.de',
      ],
    },
    de: {
      title: 'CHECKLISTE: EU Blue Card',
      subtitle: 'Blaue Karte für hochqualifizierte Fachkräfte',
      timeline: 'Vorbereitungszeit: 2-6 Monate (mit Vertrag)',
      documents: [
        { text: 'Gültiger Reisepass', required: true },
        { text: 'Anerkannter Hochschulabschluss', required: true },
        { text: 'Nachweis der Anerkennung (anabin H+)', required: true },
        { text: 'Arbeitsvertrag von deutschem Arbeitgeber', required: true },
        { text: 'Nachweis Mindestgehalt: 45.300 Euro/Jahr (2024)', required: true },
        { text: 'Für IT/Ingenieurwesen: 41.000 Euro/Jahr', required: true },
        { text: 'Lebenslauf auf Deutsch', required: true },
        { text: 'Krankenversicherung', required: true },
        { text: 'Biometrische Fotos (35x45mm)', required: true },
        { text: 'Visumantrag', required: true },
      ],
      steps: [
        '1. Jobsuche (LinkedIn, StepStone, Indeed)',
        '2. Arbeitsvertrag vom Arbeitgeber erhalten',
        '3. Mindestgehalt prüfen',
        '4. Anerkennung des Abschlusses bestätigen',
        '5. Dokumente sammeln',
        '6. Bei der Botschaft einreichen',
      ],
      embassy: {
        title: 'Deutsche Botschaft in Duschanbe',
        address: 'Duschanbe, Somoni Straße 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'Make it in Germany — make-it-in-germany.com',
        'EU Blue Card — eu-bluecard.de',
      ],
    },
    ru: {
      title: 'ЧЕКЛИСТ: EU Blue Card',
      subtitle: 'Голубая карта для высококвалифицированных специалистов',
      timeline: 'Время подготовки: 2-6 месяцев (с контрактом)',
      documents: [
        { text: 'Действующий паспорт', required: true },
        { text: 'Признанный диплом университета', required: true },
        { text: 'Подтверждение признания диплома (anabin H+)', required: true },
        { text: 'Трудовой контракт от немецкого работодателя', required: true },
        { text: 'Подтверждение мин. зарплаты: 45,300 евро/год (2024)', required: true },
        { text: 'Для IT/инженерии: 41,000 евро/год', required: true },
        { text: 'CV на немецком языке', required: true },
        { text: 'Медицинская страховка', required: true },
        { text: 'Биометрические фото (35x45mm)', required: true },
        { text: 'Заполненная анкета на визу', required: true },
      ],
      steps: [
        '1. Поиск работы (LinkedIn, StepStone, Indeed)',
        '2. Получение контракта от работодателя',
        '3. Проверка минимальной зарплаты',
        '4. Подтверждение признания диплома',
        '5. Сбор документов',
        '6. Подача в Посольство',
      ],
      embassy: {
        title: 'Посольство Германии в Душанбе',
        address: 'г. Душанбе, ул. Сомони 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'Make it in Germany — make-it-in-germany.com',
        'EU Blue Card — eu-bluecard.de',
      ],
    },
  },
  ausbildung: {
    tj: {
      title: 'ЧЕКЛИСТ: Визаи Ausbildung',
      subtitle: 'Виза барои омӯзиши касбӣ дар Олмон',
      timeline: 'Вақти омодагӣ: 6-18 моҳ',
      documents: [
        { text: 'Паспорти амалкунанда', required: true },
        { text: 'Шаҳодатномаи мактаб', required: true },
        { text: 'Сертификати забони олмонӣ (B1-B2)', required: true },
        { text: 'Шартномаи омӯзиш (Ausbildungsvertrag)', required: true },
        { text: 'CV ба забони олмонӣ', required: true },
        { text: 'Мактуби ангезиш', required: true },
        { text: 'Тасдиқи манзил дар Олмон', required: true },
        { text: 'Суғуртаи тандурустӣ', required: true },
        { text: 'Расмҳои биометрикӣ (35x45mm)', required: true },
        { text: 'Тасдиқи маблағи ибтидоӣ (~1,500 евро)', required: false },
      ],
      steps: [
        '1. Интихоби касб (IT, тандурустӣ, техника...)',
        '2. Омӯзиши олмонӣ то B1-B2',
        '3. Ҷустуҷӯи ҷой дар ausbildung.de',
        '4. Фиристодани аризаҳо ба ширкатҳо',
        '5. Гирифтани шартномаи омӯзиш',
        '6. Ёфтани манзил дар Олмон',
        '7. Супоридан ба Сафоратхона',
      ],
      embassy: {
        title: 'Сафоратхонаи Олмон дар Душанбе',
        address: 'ш. Душанбе, кӯчаи Сомонӣ 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'ausbildung.de',
        'Make it in Germany — make-it-in-germany.com',
      ],
    },
    de: {
      title: 'CHECKLISTE: Ausbildungsvisum',
      subtitle: 'Visum für Berufsausbildung in Deutschland',
      timeline: 'Vorbereitungszeit: 6-18 Monate',
      documents: [
        { text: 'Gültiger Reisepass', required: true },
        { text: 'Schulabschlusszeugnis', required: true },
        { text: 'Deutschzertifikat (B1-B2)', required: true },
        { text: 'Ausbildungsvertrag', required: true },
        { text: 'Lebenslauf auf Deutsch', required: true },
        { text: 'Motivationsschreiben', required: true },
        { text: 'Wohnungsnachweis in Deutschland', required: true },
        { text: 'Krankenversicherung', required: true },
        { text: 'Biometrische Fotos (35x45mm)', required: true },
        { text: 'Nachweis Anfangskapital (~1.500 Euro)', required: false },
      ],
      steps: [
        '1. Beruf wählen (IT, Gesundheit, Technik...)',
        '2. Deutsch bis B1-B2 lernen',
        '3. Ausbildungsplatz auf ausbildung.de suchen',
        '4. Bewerbungen an Unternehmen senden',
        '5. Ausbildungsvertrag erhalten',
        '6. Unterkunft in Deutschland finden',
        '7. Bei der Botschaft einreichen',
      ],
      embassy: {
        title: 'Deutsche Botschaft in Duschanbe',
        address: 'Duschanbe, Somoni Straße 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'ausbildung.de',
        'Make it in Germany — make-it-in-germany.com',
      ],
    },
    ru: {
      title: 'ЧЕКЛИСТ: Виза Ausbildung',
      subtitle: 'Виза для профессионального обучения в Германии',
      timeline: 'Время подготовки: 6-18 месяцев',
      documents: [
        { text: 'Действующий паспорт', required: true },
        { text: 'Аттестат об окончании школы', required: true },
        { text: 'Сертификат немецкого языка (B1-B2)', required: true },
        { text: 'Контракт на обучение (Ausbildungsvertrag)', required: true },
        { text: 'CV на немецком языке', required: true },
        { text: 'Мотивационное письмо', required: true },
        { text: 'Подтверждение жилья в Германии', required: true },
        { text: 'Медицинская страховка', required: true },
        { text: 'Биометрические фото (35x45mm)', required: true },
        { text: 'Подтверждение начальных средств (~1,500 евро)', required: false },
      ],
      steps: [
        '1. Выбор профессии (IT, медицина, техника...)',
        '2. Изучение немецкого до B1-B2',
        '3. Поиск места на ausbildung.de',
        '4. Отправка заявок в компании',
        '5. Получение контракта на обучение',
        '6. Поиск жилья в Германии',
        '7. Подача в Посольство',
      ],
      embassy: {
        title: 'Посольство Германии в Душанбе',
        address: 'г. Душанбе, ул. Сомони 59/1',
        phone: '+992 37 221 35 37',
        website: 'https://duschanbe.diplo.de',
      },
      sources: [
        'ausbildung.de',
        'Make it in Germany — make-it-in-germany.com',
      ],
    },
  },
};

const getLabel = (language: Language, tj: string, ru: string, de: string) => {
  if (language === 'tj') return tj;
  if (language === 'ru') return ru;
  return de;
};

export function generateChecklistPDF(type: 'study' | 'jobseeker' | 'bluecard' | 'ausbildung', language: Language): void {
  const data = checklists[type][language];
  const doc = new jsPDF();
  
  let y = 20;
  const marginLeft = 20;
  const pageWidth = 170;
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(data.title, marginLeft, y);
  y += 10;
  
  // Subtitle
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(data.subtitle, marginLeft, y);
  y += 8;
  
  // Timeline
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(data.timeline, marginLeft, y);
  doc.setTextColor(0, 0, 0);
  y += 15;
  
  // Documents section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(getLabel(language, 'ҲУҶҶАТҲО:', 'ДОКУМЕНТЫ:', 'DOKUMENTE:'), marginLeft, y);
  y += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  data.documents.forEach((item) => {
    const checkbox = '[ ] ';
    const requiredMark = item.required ? ' *' : '';
    const text = checkbox + item.text + requiredMark;
    
    const lines = doc.splitTextToSize(text, pageWidth);
    lines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, marginLeft, y);
      y += 6;
    });
  });
  
  y += 5;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(getLabel(language, '* = ҳатмӣ', '* = обязательно', '* = erforderlich'), marginLeft, y);
  doc.setTextColor(0, 0, 0);
  y += 15;
  
  // Steps section
  if (y > 200) {
    doc.addPage();
    y = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(getLabel(language, 'ҚАДАМҲО:', 'ШАГИ:', 'SCHRITTE:'), marginLeft, y);
  y += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  data.steps.forEach((step) => {
    const lines = doc.splitTextToSize(step, pageWidth);
    lines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, marginLeft, y);
      y += 6;
    });
  });
  
  y += 15;
  
  // Embassy section
  if (y > 220) {
    doc.addPage();
    y = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(data.embassy.title.toUpperCase(), marginLeft, y);
  y += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(data.embassy.address, marginLeft, y);
  y += 6;
  doc.text(data.embassy.phone, marginLeft, y);
  y += 6;
  doc.text(data.embassy.website, marginLeft, y);
  y += 15;
  
  // Sources
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(getLabel(language, 'МАНБАЪҲО:', 'ИСТОЧНИКИ:', 'QUELLEN:'), marginLeft, y);
  y += 8;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  data.sources.forEach((source) => {
    doc.text('• ' + source, marginLeft, y);
    y += 5;
  });
  
  // Footer
  y = 285;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Germany Roadmap — germanyroad.map | ' + new Date().toLocaleDateString(), marginLeft, y);
  
  // Save
  const filename = `checklist-${type}-${language}.pdf`;
  doc.save(filename);
}

export function generatePersonalizedPDF(
  pathType: 'study' | 'work' | 'ausbildung',
  language: Language,
  steps: { title: string; description: string }[],
  documents: string[],
  duration: string
): void {
  const doc = new jsPDF();
  
  let y = 20;
  const marginLeft = 20;
  const pageWidth = 170;
  
  const titles = {
    study: { tj: 'НАҚШАИ ТАҲСИЛ ДАР ОЛМОН', ru: 'ПЛАН УЧЁБЫ В ГЕРМАНИИ', de: 'STUDIENPLAN FÜR DEUTSCHLAND' },
    work: { tj: 'НАҚШАИ КОР ДАР ОЛМОН', ru: 'ПЛАН РАБОТЫ В ГЕРМАНИИ', de: 'ARBEITSPLAN FÜR DEUTSCHLAND' },
    ausbildung: { tj: 'НАҚШАИ AUSBILDUNG', ru: 'ПЛАН AUSBILDUNG', de: 'AUSBILDUNGSPLAN' },
  };
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(titles[pathType][language], marginLeft, y);
  y += 10;
  
  // Duration
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  const durationText = getLabel(
    language,
    `Вақти тахминӣ: ${duration} моҳ`,
    `Примерное время: ${duration} месяцев`,
    `Geschätzte Zeit: ${duration} Monate`
  );
  doc.text(durationText, marginLeft, y);
  doc.setTextColor(0, 0, 0);
  y += 15;
  
  // Steps
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(getLabel(language, 'ҚАДАМҲО:', 'ШАГИ:', 'SCHRITTE:'), marginLeft, y);
  y += 10;
  
  doc.setFontSize(10);
  steps.forEach((step, i) => {
    doc.setFont('helvetica', 'bold');
    const stepTitle = `${i + 1}. ${step.title}`;
    doc.text(stepTitle, marginLeft, y);
    y += 6;
    
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(step.description, pageWidth - 10);
    lines.forEach((line: string) => {
      doc.text('   ' + line, marginLeft, y);
      y += 5;
    });
    y += 4;
    
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });
  
  y += 10;
  
  // Documents
  if (y > 200) {
    doc.addPage();
    y = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(getLabel(language, 'ҲУҶҶАТҲО:', 'ДОКУМЕНТЫ:', 'DOKUMENTE:'), marginLeft, y);
  y += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  documents.forEach((doc_item) => {
    const text = '[ ] ' + doc_item;
    const lines = doc.splitTextToSize(text, pageWidth);
    lines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, marginLeft, y);
      y += 6;
    });
  });
  
  // Footer
  y = 285;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Germany Roadmap | ' + new Date().toLocaleDateString(), marginLeft, y);
  
  const filename = `my-plan-${pathType}-${language}.pdf`;
  doc.save(filename);
}
