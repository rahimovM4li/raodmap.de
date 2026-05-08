import type { Language } from '@/lib/i18n';
import type { GermanLearningCenter } from './germanLearningCenters';

type CenterTextFields = Pick<
  GermanLearningCenter,
  | 'shortDescription'
  | 'fullDescription'
  | 'suitableFor'
  | 'possibleBenefits'
  | 'programs'
  | 'formats'
  | 'examPreparation'
  | 'schedule'
  | 'pricingNote'
  | 'teacherNote'
  | 'reviewSummary'
  | 'statusLabel'
>;

export const centersI18n: Record<Language, Record<string, CenterTextFields>> = {
  // ===================== RUSSIAN =====================
  ru: {
    SLC: {
      shortDescription:
        'Популярный официальный языковой центр для изучения немецкого языка в Таджикистане.',
      fullDescription:
        'SLZ — один из известных языковых центров, где можно системно изучать немецкий язык от A1 до B2. Центр подходит тем, кто хочет готовиться к Goethe-сертификату, учиться по структурированной программе и заниматься с опытными преподавателями. В центре также есть немецкие преподаватели.',
      suitableFor: [
        'Тем, кто хочет изучать немецкий системно',
        'Тем, кто готовится к Goethe-сертификату',
        'Тем, кому важна структурированная программа',
        'Тем, кто хочет заниматься с опытными преподавателями',
      ],
      possibleBenefits: [
        'Структурированные уроки',
        'Подготовка к Goethe-сертификату',
        'Опытные преподаватели',
        'Наличие преподавателей из Германии',
        'Популярность среди студентов в Таджикистане',
      ],
      programs: [
        'Общий немецкий',
        'Подготовка к Goethe-сертификату',
        'Немецкий для учебы, работы и переезда',
      ],
      formats: ['Групповые занятия', 'Индивидуальные занятия', 'Очные занятия'],
      examPreparation: ['Goethe'],
      schedule: 'Расписание зависит от выбранного уровня и формата обучения.',
      pricingNote: 'Стоимость зависит от уровня, формата и программы обучения.',
      teacherNote:
        'В центре работают опытные преподаватели, включая преподавателей из Германии.',
      reviewSummary:
        'SLZ считается одним из популярных центров для изучения немецкого языка и подготовки к Goethe-сертификату в Таджикистане.',
      statusLabel: 'Популярный центр',
    },

    Dex: {
      shortDescription:
        'Современный языковой центр для старта с нуля и подготовки к экзаменам.',
      fullDescription:
        'DEX подходит тем, кто хочет начать немецкий с нуля или улучшить свой уровень до B2. Центр показывает хорошие результаты и помогает студентам готовиться к экзаменам, включая Goethe. Многие преподаватели имеют опыт учебы или жизни в Германии.',
      suitableFor: [
        'Тем, кто начинает немецкий с нуля',
        'Тем, кто хочет подготовиться к экзаменам',
        'Тем, кто планирует учебу, работу или переезд',
        'Тем, кому нужна регулярная практика',
      ],
      possibleBenefits: [
        'Хороший старт для новичков',
        'Подготовка к Goethe-сертификату',
        'Преподаватели с опытом Германии',
        'Практичный подход к обучению',
        'Хорошие результаты студентов',
      ],
      programs: [
        'Немецкий с нуля',
        'Общий немецкий',
        'Подготовка к Goethe-сертификату',
        'Немецкий для учебы, работы и переезда',
      ],
      formats: ['Групповые занятия', 'Индивидуальные занятия', 'Очные занятия'],
      examPreparation: ['Goethe'],
      schedule: 'Расписание зависит от выбранного уровня и формата обучения.',
      pricingNote: 'Стоимость зависит от уровня, формата и программы обучения.',
      teacherNote:
        'В центре работают преподаватели с опытом учебы или жизни в Германии.',
      reviewSummary:
        'DEX считается хорошим вариантом для старта немецкого языка и подготовки к экзаменам.',
      statusLabel: 'Современный центр',
    },

    'Polyglott Centre': {
      shortDescription:
        'Языковой центр, где можно изучать немецкий язык по уровням от A1 до B2.',
      fullDescription:
        'Polyglott Centre подходит тем, кто хочет изучать немецкий язык в понятном формате и двигаться по уровням. Центр может быть полезен как для начинающих, так и для студентов, которые продолжают обучение и готовятся к учебе, работе или переезду.',
      suitableFor: [
        'Тем, кто хочет изучать немецкий по уровням',
        'Тем, кому подходит групповое обучение',
        'Тем, кто хочет регулярные занятия',
        'Тем, кто готовится к будущей учебе или работе',
      ],
      possibleBenefits: [
        'Обучение по уровням',
        'Групповая практика',
        'Регулярная программа',
        'Подходит для разных целей изучения языка',
      ],
      programs: [
        'Общий немецкий',
        'Немецкий с нуля',
        'Немецкий для учебы, работы и переезда',
        'Подготовка к экзаменам',
      ],
      formats: ['Групповые занятия', 'Индивидуальные занятия', 'Очные занятия'],
      examPreparation: ['Goethe'],
      schedule: 'Расписание зависит от выбранного уровня и формата обучения.',
      pricingNote: 'Стоимость зависит от уровня, формата и программы обучения.',
      teacherNote:
        'Занятия ведут преподаватели немецкого языка с опытом обучения студентов разных уровней.',
      reviewSummary:
        'Polyglott Centre является одним из языковых центров, где можно изучать немецкий язык в Таджикистане.',
      statusLabel: 'Языковой центр',
    },

    DSW: {
      shortDescription:
        'Языковой центр для изучения немецкого языка и подготовки к учебе, работе или переезду.',
      fullDescription:
        'DSW — языковой центр, который открылся относительно недавно и уже показывает хорошие результаты. Центр подходит тем, кто хочет изучать немецкий от A1 до B2, готовиться к экзаменам и использовать язык для поступления, работы или переезда.',
      suitableFor: [
        'Тем, кто хочет изучать немецкий для конкретной цели',
        'Тем, кто готовится к поступлению или работе',
        'Тем, кто хочет дойти до уровня B1 или B2',
        'Тем, кто ищет современный языковой центр',
      ],
      possibleBenefits: [
        'Обучение от A1 до B2',
        'Подготовка к экзаменам',
        'Хорошие результаты студентов',
        'Фокус на учебе, работе и переезде',
        'Современный подход к обучению',
      ],
      programs: [
        'Общий немецкий',
        'Немецкий для учебы',
        'Немецкий для работы',
        'Подготовка к экзаменам',
      ],
      formats: ['Групповые занятия', 'Индивидуальные занятия', 'Очные занятия'],
      examPreparation: ['Goethe'],
      schedule: 'Расписание зависит от выбранного уровня и формата обучения.',
      pricingNote: 'Стоимость зависит от уровня, формата и программы обучения.',
      teacherNote:
        'В центре работают преподаватели немецкого языка с опытом подготовки студентов к разным целям.',
      reviewSummary:
        'DSW показывает хорошие результаты и становится одним из заметных языковых центров для немецкого языка.',
      statusLabel: 'Новый популярный центр',
    },

    TO_Akademie: {
      shortDescription:
        'Новый языковой центр для изучения немецкого языка от A1 до B2.',
      fullDescription:
        'TO_Akademie — новый языковой центр, где можно изучать немецкий язык по уровням от A1 до B2. Так как центр открылся недавно, подробная информация о результатах и программах пока формируется.',
      suitableFor: [
        'Тем, кто ищет новый языковой центр',
        'Тем, кто хочет изучать немецкий по уровням',
        'Тем, кто готовится к учебе, работе или переезду',
        'Тем, кто хочет начать обучение с A1',
      ],
      possibleBenefits: [
        'Новый формат обучения',
        'Обучение от A1 до B2',
        'Подходит для старта немецкого языка',
        'Фокус на будущей учебе, работе и адаптации',
      ],
      programs: [
        'Общий немецкий',
        'Немецкий с нуля',
        'Немецкий для учебы, работы и переезда',
        'Подготовка к экзаменам',
      ],
      formats: ['Групповые занятия', 'Индивидуальные занятия', 'Очные занятия'],
      examPreparation: ['Goethe'],
      schedule: 'Расписание зависит от выбранного уровня и формата обучения.',
      pricingNote: 'Стоимость зависит от уровня, формата и программы обучения.',
      teacherNote:
        'Информация о преподавателях и программе будет дополняться по мере появления новых данных.',
      reviewSummary:
        'TO_Akademie — новый центр, поэтому подробные отзывы и результаты пока еще формируются.',
      statusLabel: 'Новый центр',
    },
  },

  // ===================== TAJIK =====================
  tj: {
    SLC: {
      shortDescription:
        'Маркази маъруфи расмӣ барои омӯзиши забони олмонӣ дар Тоҷикистон.',
      fullDescription:
        'SLZ яке аз марказҳои маъруфи забономӯзӣ мебошад, ки дар он забони олмониро аз сатҳи A1 то B2 омӯхтан мумкин аст. Марказ барои онҳое мувофиқ аст, ки мехоҳанд ба сертификати Goethe тайёрӣ бинанд, аз рӯйи барномаи сохторнок таҳсил кунанд ва бо омӯзгорони таҷрибадор машғул шаванд. Дар марказ омӯзгорони олмонӣ низ ҳастанд.',
      suitableFor: [
        'Барои онҳое, ки мехоҳанд олмониро бо система омӯзанд',
        'Барои онҳое, ки ба сертификати Goethe тайёрӣ мебинанд',
        'Барои онҳое, ки барномаи сохторнок мехоҳанд',
        'Барои онҳое, ки мехоҳанд бо омӯзгорони таҷрибадор таҳсил кунанд',
      ],
      possibleBenefits: [
        'Дарсҳои сохторнок',
        'Тайёрӣ ба сертификати Goethe',
        'Омӯзгорони таҷрибадор',
        'Ҳузури омӯзгорон аз Германия',
        'Маъруфият байни донишҷӯён дар Тоҷикистон',
      ],
      programs: [
        'Олмонии умумӣ',
        'Тайёрӣ ба сертификати Goethe',
        'Олмонӣ барои таҳсил, кор ва кӯчидан',
      ],
      formats: ['Дарсҳои гурӯҳӣ', 'Дарсҳои инфиродӣ', 'Дарсҳои ҳузурӣ'],
      examPreparation: ['Goethe'],
      schedule: 'Ҷадвал аз сатҳ ва формати интихобшуда вобаста аст.',
      pricingNote: 'Нарх аз сатҳ, формат ва барномаи таълим вобаста аст.',
      teacherNote:
        'Дар марказ омӯзгорони таҷрибадор, аз ҷумла омӯзгорон аз Германия, фаъолият мекунанд.',
      reviewSummary:
        'SLZ яке аз марказҳои маъруф барои омӯзиши забони олмонӣ ва тайёрӣ ба сертификати Goethe дар Тоҷикистон ҳисобида мешавад.',
      statusLabel: 'Маркази маъруф',
    },

    Dex: {
      shortDescription:
        'Маркази муосири забономӯзӣ барои оғоз аз сифр ва тайёрӣ ба имтиҳонҳо.',
      fullDescription:
        'DEX барои онҳое мувофиқ аст, ки мехоҳанд олмониро аз сифр оғоз кунанд ё сатҳи худро то B2 беҳтар намоянд. Марказ натиҷаҳои хуб нишон медиҳад ва ба донишҷӯён барои тайёрӣ ба имтиҳонҳо, аз ҷумла Goethe, кӯмак мекунад. Бисёр омӯзгорон таҷрибаи таҳсил ё зиндагӣ дар Германия доранд.',
      suitableFor: [
        'Барои онҳое, ки олмониро аз сифр оғоз мекунанд',
        'Барои онҳое, ки ба имтиҳонҳо тайёрӣ мебинанд',
        'Барои онҳое, ки таҳсил, кор ё кӯчиданро ба нақша доранд',
        'Барои онҳое, ки ба машқи мунтазам ниёз доранд',
      ],
      possibleBenefits: [
        'Оғози хуб барои навомӯзон',
        'Тайёрӣ ба сертификати Goethe',
        'Омӯзгорон бо таҷрибаи Германия',
        'Равиши амалӣ ба омӯзиш',
        'Натиҷаҳои хуби донишҷӯён',
      ],
      programs: [
        'Олмонӣ аз сифр',
        'Олмонии умумӣ',
        'Тайёрӣ ба сертификати Goethe',
        'Олмонӣ барои таҳсил, кор ва кӯчидан',
      ],
      formats: ['Дарсҳои гурӯҳӣ', 'Дарсҳои инфиродӣ', 'Дарсҳои ҳузурӣ'],
      examPreparation: ['Goethe'],
      schedule: 'Ҷадвал аз сатҳ ва формати интихобшуда вобаста аст.',
      pricingNote: 'Нарх аз сатҳ, формат ва барномаи таълим вобаста аст.',
      teacherNote:
        'Дар марказ омӯзгороне фаъолият мекунанд, ки таҷрибаи таҳсил ё зиндагӣ дар Германия доранд.',
      reviewSummary:
        'DEX ҳамчун варианти хуб барои оғози забони олмонӣ ва тайёрӣ ба имтиҳонҳо ҳисобида мешавад.',
      statusLabel: 'Маркази муосир',
    },

    'Polyglott Centre': {
      shortDescription:
        'Маркази забономӯзӣ, ки дар он забони олмониро аз A1 то B2 омӯхтан мумкин аст.',
      fullDescription:
        'Polyglott Centre барои онҳое мувофиқ аст, ки мехоҳанд забони олмониро бо формати фаҳмо ва аз рӯйи сатҳҳо омӯзанд. Марказ метавонад ҳам барои навомӯзон ва ҳам барои донишҷӯёне, ки омӯзишро идома медиҳанд ва ба таҳсил, кор ё кӯчидан тайёрӣ мебинанд, муфид бошад.',
      suitableFor: [
        'Барои онҳое, ки мехоҳанд олмониро аз рӯйи сатҳҳо омӯзанд',
        'Барои онҳое, ки ба омӯзиши гурӯҳӣ майл доранд',
        'Барои онҳое, ки дарсҳои мунтазам мехоҳанд',
        'Барои онҳое, ки ба таҳсил ё кори оянда тайёрӣ мебинанд',
      ],
      possibleBenefits: [
        'Омӯзиш аз рӯйи сатҳҳо',
        'Машқи гурӯҳӣ',
        'Барномаи мунтазам',
        'Муносиб барои ҳадафҳои гуногуни омӯзиши забон',
      ],
      programs: [
        'Олмонии умумӣ',
        'Олмонӣ аз сифр',
        'Олмонӣ барои таҳсил, кор ва кӯчидан',
        'Тайёрӣ ба имтиҳонҳо',
      ],
      formats: ['Дарсҳои гурӯҳӣ', 'Дарсҳои инфиродӣ', 'Дарсҳои ҳузурӣ'],
      examPreparation: ['Goethe'],
      schedule: 'Ҷадвал аз сатҳ ва формати интихобшуда вобаста аст.',
      pricingNote: 'Нарх аз сатҳ, формат ва барномаи таълим вобаста аст.',
      teacherNote:
        'Дарсҳоро омӯзгорони забони олмонӣ бо таҷрибаи таълими донишҷӯёни сатҳҳои гуногун мегузаронанд.',
      reviewSummary:
        'Polyglott Centre яке аз марказҳои забономӯзӣ мебошад, ки дар Тоҷикистон забони олмониро омӯзондааст.',
      statusLabel: 'Маркази нави маъруф',
    },

    DSW: {
      shortDescription:
        'Маркази забономӯзӣ барои омӯзиши олмонӣ ва тайёрӣ ба таҳсил, кор ё кӯчидан.',
      fullDescription:
        'DSW маркази забономӯзист, ки нисбатан нав кушода шудааст ва аллакай натиҷаҳои хуб нишон медиҳад. Марказ барои онҳое мувофиқ аст, ки мехоҳанд олмониро аз A1 то B2 омӯзанд, ба имтиҳонҳо тайёрӣ бинанд ва забонро барои дохилшавӣ, кор ё кӯчидан истифода баранд.',
      suitableFor: [
        'Барои онҳое, ки олмониро барои ҳадафи мушаххас меомӯзанд',
        'Барои онҳое, ки ба дохилшавӣ ё кор тайёрӣ мебинанд',
        'Барои онҳое, ки мехоҳанд ба сатҳи B1 ё B2 расанд',
        'Барои онҳое, ки маркази муосири забономӯзӣ меҷӯянд',
      ],
      possibleBenefits: [
        'Омӯзиш аз A1 то B2',
        'Тайёрӣ ба имтиҳонҳо',
        'Натиҷаҳои хуби донишҷӯён',
        'Тамаркуз ба таҳсил, кор ва кӯчидан',
        'Равиши муосир ба омӯзиш',
      ],
      programs: [
        'Олмонии умумӣ',
        'Олмонӣ барои таҳсил',
        'Олмонӣ барои кор',
        'Тайёрӣ ба имтиҳонҳо',
      ],
      formats: ['Дарсҳои гурӯҳӣ', 'Дарсҳои инфиродӣ', 'Дарсҳои ҳузурӣ'],
      examPreparation: ['Goethe'],
      schedule: 'Ҷадвал аз сатҳ ва формати интихобшуда вобаста аст.',
      pricingNote: 'Нарх аз сатҳ, формат ва барномаи таълим вобаста аст.',
      teacherNote:
        'Дар марказ омӯзгорони забони олмонӣ бо таҷрибаи тайёр кардани донишҷӯён ба ҳадафҳои гуногун кор мекунанд.',
      reviewSummary:
        'DSW натиҷаҳои хуб нишон медиҳад ва ба яке аз марказҳои намоёни забони олмонӣ табдил ёфта истодааст.',
      statusLabel: 'Маркази нави маъруф',
    },

    TO_Akademie: {
      shortDescription:
        'Маркази нави забономӯзӣ барои омӯзиши забони олмонӣ аз A1 то B2.',
      fullDescription:
        'TO_Akademie маркази нави забономӯзӣ мебошад, ки дар он забони олмониро аз сатҳи A1 то B2 омӯхтан мумкин аст. Азбаски марказ нав кушода шудааст, маълумоти муфассал дар бораи натиҷаҳо ва барномаҳо тадриҷан пурра мешавад.',
      suitableFor: [
        'Барои онҳое, ки маркази нави забономӯзӣ меҷӯянд',
        'Барои онҳое, ки мехоҳанд олмониро аз рӯйи сатҳҳо омӯзанд',
        'Барои онҳое, ки ба таҳсил, кор ё кӯчидан тайёрӣ мебинанд',
        'Барои онҳое, ки мехоҳанд омӯзишро аз A1 оғоз кунанд',
      ],
      possibleBenefits: [
        'Формати нави омӯзиш',
        'Омӯзиш аз A1 то B2',
        'Муносиб барои оғози забони олмонӣ',
        'Тамаркуз ба таҳсил, кор ва мутобиқшавии оянда',
      ],
      programs: [
        'Олмонии умумӣ',
        'Олмонӣ аз сифр',
        'Олмонӣ барои таҳсил, кор ва кӯчидан',
        'Тайёрӣ ба имтиҳонҳо',
      ],
      formats: ['Дарсҳои гурӯҳӣ', 'Дарсҳои инфиродӣ', 'Дарсҳои ҳузурӣ'],
      examPreparation: ['Goethe'],
      schedule: 'Ҷадвал аз сатҳ ва формати интихобшуда вобаста аст.',
      pricingNote: 'Нарх аз сатҳ, формат ва барномаи таълим вобаста аст.',
      teacherNote:
        'Маълумот дар бораи омӯзгорон ва барнома бо пайдо шудани маълумоти нав пурра карда мешавад.',
      reviewSummary:
        'TO_Akademie маркази нав аст, бинобар ин маълумоти муфассал дар бораи натиҷаҳо ҳоло ташаккул меёбад.',
      statusLabel: 'Маркази нав',
    },
  },

  // ===================== GERMAN =====================
  de: {
    SLC: {
      shortDescription:
        'Ein beliebtes offizielles Sprachzentrum für Deutsch in Tadschikistan.',
      fullDescription:
        'SLZ ist eines der bekannten Sprachzentren, in dem Deutsch von A1 bis B2 systematisch gelernt werden kann. Das Zentrum eignet sich für Lernende, die sich auf das Goethe-Zertifikat vorbereiten, nach einem strukturierten Programm lernen und mit erfahrenen Lehrkräften arbeiten möchten. Es gibt dort auch deutsche Lehrkräfte.',
      suitableFor: [
        'Für alle, die Deutsch systematisch lernen möchten',
        'Für alle, die sich auf das Goethe-Zertifikat vorbereiten',
        'Für alle, denen ein strukturierter Lernplan wichtig ist',
        'Für alle, die mit erfahrenen Lehrkräften lernen möchten',
      ],
      possibleBenefits: [
        'Strukturierter Unterricht',
        'Vorbereitung auf das Goethe-Zertifikat',
        'Erfahrene Lehrkräfte',
        'Deutsche Lehrkräfte vorhanden',
        'Beliebt bei Deutschlernenden in Tadschikistan',
      ],
      programs: [
        'Allgemeines Deutsch',
        'Vorbereitung auf das Goethe-Zertifikat',
        'Deutsch für Studium, Arbeit und Ausreise',
      ],
      formats: ['Gruppenunterricht', 'Einzelunterricht', 'Präsenzunterricht'],
      examPreparation: ['Goethe'],
      schedule: 'Der Stundenplan hängt vom gewählten Niveau und Kursformat ab.',
      pricingNote: 'Die Kosten hängen vom Niveau, Format und Programm ab.',
      teacherNote:
        'Im Zentrum arbeiten erfahrene Lehrkräfte, darunter auch Lehrkräfte aus Deutschland.',
      reviewSummary:
        'SLZ gilt als eines der beliebten Zentren für Deutschunterricht und Goethe-Vorbereitung in Tadschikistan.',
      statusLabel: 'Beliebtes Zentrum',
    },

    Dex: {
      shortDescription:
        'Ein modernes Sprachzentrum für den Einstieg von null und die Prüfungsvorbereitung.',
      fullDescription:
        'DEX eignet sich für Lernende, die Deutsch von Grund auf beginnen oder ihr Niveau bis B2 verbessern möchten. Das Zentrum zeigt gute Ergebnisse und unterstützt Studierende bei der Prüfungsvorbereitung, einschließlich Goethe. Viele Lehrkräfte haben Studien- oder Lebenserfahrung in Deutschland.',
      suitableFor: [
        'Für Anfängerinnen und Anfänger',
        'Für Lernende, die sich auf Prüfungen vorbereiten möchten',
        'Für alle, die Studium, Arbeit oder Ausreise planen',
        'Für alle, die regelmäßige Sprachpraxis brauchen',
      ],
      possibleBenefits: [
        'Guter Einstieg für Anfänger',
        'Vorbereitung auf das Goethe-Zertifikat',
        'Lehrkräfte mit Deutschland-Erfahrung',
        'Praxisorientierter Unterricht',
        'Gute Ergebnisse der Lernenden',
      ],
      programs: [
        'Deutsch von null',
        'Allgemeines Deutsch',
        'Vorbereitung auf das Goethe-Zertifikat',
        'Deutsch für Studium, Arbeit und Ausreise',
      ],
      formats: ['Gruppenunterricht', 'Einzelunterricht', 'Präsenzunterricht'],
      examPreparation: ['Goethe'],
      schedule: 'Der Stundenplan hängt vom gewählten Niveau und Kursformat ab.',
      pricingNote: 'Die Kosten hängen vom Niveau, Format und Programm ab.',
      teacherNote:
        'Im Zentrum arbeiten Lehrkräfte mit Studien- oder Lebenserfahrung in Deutschland.',
      reviewSummary:
        'DEX gilt als gute Option für den Einstieg in die deutsche Sprache und die Prüfungsvorbereitung.',
      statusLabel: 'Modernes Zentrum',
    },

    'Polyglott Centre': {
      shortDescription:
        'Ein Sprachzentrum, in dem Deutsch von A1 bis B2 gelernt werden kann.',
      fullDescription:
        'Polyglott Centre eignet sich für Lernende, die Deutsch in einem verständlichen Format und nach Niveaustufen lernen möchten. Das Zentrum kann sowohl für Anfänger als auch für fortgeschrittene Lernende hilfreich sein, die sich auf Studium, Arbeit oder Ausreise vorbereiten.',
      suitableFor: [
        'Für alle, die Deutsch nach Niveaustufen lernen möchten',
        'Für alle, denen Gruppenunterricht passt',
        'Für alle, die regelmäßigen Unterricht möchten',
        'Für alle, die sich auf Studium oder Arbeit vorbereiten',
      ],
      possibleBenefits: [
        'Lernen nach Niveaustufen',
        'Gruppenpraxis',
        'Regelmäßiges Programm',
        'Geeignet für verschiedene Lernziele',
      ],
      programs: [
        'Allgemeines Deutsch',
        'Deutsch von null',
        'Deutsch für Studium, Arbeit und Ausreise',
        'Prüfungsvorbereitung',
      ],
      formats: ['Gruppenunterricht', 'Einzelunterricht', 'Präsenzunterricht'],
      examPreparation: ['Goethe'],
      schedule: 'Der Stundenplan hängt vom gewählten Niveau und Kursformat ab.',
      pricingNote: 'Die Kosten hängen vom Niveau, Format und Programm ab.',
      teacherNote:
        'Der Unterricht wird von Deutschlehrkräften mit Erfahrung in verschiedenen Niveaustufen durchgeführt.',
      reviewSummary:
        'Polyglott Centre ist eines der Sprachzentren, in denen Deutsch in Tadschikistan gelernt werden kann.',
      statusLabel: 'Sprachzentrum',
    },

    DSW: {
      shortDescription:
        'Ein Sprachzentrum für Deutsch und Vorbereitung auf Studium, Arbeit oder Ausreise.',
      fullDescription:
        'DSW ist ein relativ neues Sprachzentrum, das bereits gute Ergebnisse zeigt. Das Zentrum eignet sich für Lernende, die Deutsch von A1 bis B2 lernen, sich auf Prüfungen vorbereiten und die Sprache für Studium, Arbeit oder Ausreise nutzen möchten.',
      suitableFor: [
        'Für alle, die Deutsch für ein konkretes Ziel lernen',
        'Für alle, die sich auf Studium oder Arbeit vorbereiten',
        'Für alle, die B1 oder B2 erreichen möchten',
        'Für alle, die ein modernes Sprachzentrum suchen',
      ],
      possibleBenefits: [
        'Unterricht von A1 bis B2',
        'Prüfungsvorbereitung',
        'Gute Ergebnisse der Lernenden',
        'Fokus auf Studium, Arbeit und Ausreise',
        'Moderner Lernansatz',
      ],
      programs: [
        'Allgemeines Deutsch',
        'Deutsch für Studium',
        'Deutsch für Arbeit',
        'Prüfungsvorbereitung',
      ],
      formats: ['Gruppenunterricht', 'Einzelunterricht', 'Präsenzunterricht'],
      examPreparation: ['Goethe'],
      schedule: 'Der Stundenplan hängt vom gewählten Niveau und Kursformat ab.',
      pricingNote: 'Die Kosten hängen vom Niveau, Format und Programm ab.',
      teacherNote:
        'Im Zentrum arbeiten Deutschlehrkräfte mit Erfahrung in der Vorbereitung auf verschiedene Ziele.',
      reviewSummary:
        'DSW zeigt gute Ergebnisse und entwickelt sich zu einem sichtbaren Zentrum für Deutschunterricht.',
      statusLabel: 'Neues beliebtes Zentrum',
    },

    TO_Akademie: {
      shortDescription:
        'Ein neues Sprachzentrum für Deutschunterricht von A1 bis B2.',
      fullDescription:
        'TO_Akademie ist ein neues Sprachzentrum, in dem Deutsch von A1 bis B2 gelernt werden kann. Da das Zentrum erst vor Kurzem eröffnet wurde, entstehen detaillierte Informationen zu Ergebnissen und Programmen noch Schritt für Schritt.',
      suitableFor: [
        'Für alle, die ein neues Sprachzentrum suchen',
        'Für alle, die Deutsch nach Niveaustufen lernen möchten',
        'Für alle, die sich auf Studium, Arbeit oder Ausreise vorbereiten',
        'Für alle, die mit A1 beginnen möchten',
      ],
      possibleBenefits: [
        'Neues Lernformat',
        'Unterricht von A1 bis B2',
        'Geeignet für den Einstieg in die deutsche Sprache',
        'Fokus auf Studium, Arbeit und zukünftige Anpassung',
      ],
      programs: [
        'Allgemeines Deutsch',
        'Deutsch von null',
        'Deutsch für Studium, Arbeit und Ausreise',
        'Prüfungsvorbereitung',
      ],
      formats: ['Gruppenunterricht', 'Einzelunterricht', 'Präsenzunterricht'],
      examPreparation: ['Goethe'],
      schedule: 'Der Stundenplan hängt vom gewählten Niveau und Kursformat ab.',
      pricingNote: 'Die Kosten hängen vom Niveau, Format und Programm ab.',
      teacherNote:
        'Informationen zu Lehrkräften und Programm werden mit neuen Daten ergänzt.',
      reviewSummary:
        'TO_Akademie ist ein neues Zentrum, daher bilden sich ausführliche Informationen zu Ergebnissen noch heraus.',
      statusLabel: 'Neues Zentrum',
    },
  },
};