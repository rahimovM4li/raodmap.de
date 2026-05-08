import type { Language } from '@/lib/i18n';
import type { GermanLearningCenter } from './germanLearningCenters';

type CenterTextFields = Pick<
  GermanLearningCenter,
  | 'shortDescription'
  | 'fullDescription'
  | 'suitableFor'
  | 'possibleBenefits'
  | 'thingsToAsk'
  | 'programs'
  | 'formats'
  | 'examPreparation'
  | 'schedule'
  | 'pricingNote'
  | 'trialLessonNote'
  | 'certificateNote'
  | 'teacherNote'
  | 'reviewSummary'
  | 'statusLabel'
>;

export const centersI18n: Record<Language, Record<string, CenterTextFields>> = {
  // ===================== RUSSIAN =====================
  ru: {
    SLZ: {
      shortDescription: 'Один из популярных центров для изучения немецкого языка.',
      fullDescription:
        'Подходит тем, кто хочет заниматься системно, с преподавателем и учебной программой. Перед записью стоит уточнить актуальную программу, формат занятий и подготовку к экзаменам.',
      suitableFor: [
        'Тем, кому нужна дисциплина и регулярный график',
        'Новичкам, которым сложно начать самостоятельно',
        'Тем, кто хочет двигаться по готовой программе',
      ],
      possibleBenefits: [
        'Структурный учебный процесс',
        'Занятия с преподавателем',
        'Групповая динамика и регулярность',
      ],
      thingsToAsk: [
        'Какие уровни сейчас открыты',
        'Есть ли пробный урок',
        'Как проверяются домашние задания',
        'Есть ли подготовка к экзаменам A1-B2',
      ],
      programs: ['Общий немецкий', 'Подготовка к переезду', 'Экзаменационная подготовка'],
      formats: ['Группа', 'Индивидуально', 'Онлайн - уточнить'],
      examPreparation: ['Goethe - уточнить', 'Telc - уточнить', 'ÖSD - уточнить'],
      schedule: 'Уточнить у центра',
      pricingNote: 'Актуальные цены нужно уточнить напрямую.',
      trialLessonNote: 'Наличие пробного урока нужно уточнить.',
      certificateNote: 'Не указывать официальные сертификаты без подтверждения.',
      teacherNote: 'Состав преподавателей и опыт нужно уточнить перед записью.',
      reviewSummary: 'Отзывы не добавлены, пока нет проверенных источников.',
      statusLabel: 'Данные нужно проверить',
    },
    Dex: {
      shortDescription: 'Языковой центр для старта с нуля или улучшения уровня немецкого.',
      fullDescription:
        'Может быть полезен тем, кто готовит немецкий для переезда, Ausbildung или учебы. Перед записью важно уточнить темп курса и количество разговорной практики.',
      suitableFor: [
        'Тем, кто начинает с нуля',
        'Тем, кто готовится к Ausbildung или учебе',
        'Тем, кому нужна регулярная обратная связь',
      ],
      possibleBenefits: [
        'Понятный старт для новичков',
        'Регулярные занятия',
        'Возможность уточнять ошибки у преподавателя',
      ],
      thingsToAsk: [
        'Сколько человек в группе',
        'Как часто проходят занятия',
        'Какие учебники используются',
        'Есть ли разговорные занятия отдельно',
      ],
      programs: ['Немецкий с нуля', 'Интенсив - уточнить', 'Подготовка к учебе и переезду'],
      formats: ['Группа', 'Индивидуально - уточнить', 'Онлайн - уточнить'],
      examPreparation: ['Goethe - уточнить', 'Telc - уточнить', 'ÖSD - уточнить'],
      schedule: 'Уточнить у центра',
      pricingNote: 'Актуальные цены нужно уточнить напрямую.',
      trialLessonNote: 'Наличие пробного урока нужно уточнить.',
      certificateNote: 'Не указывать официальные сертификаты без подтверждения.',
      teacherNote: 'Состав преподавателей и опыт нужно уточнить перед записью.',
      reviewSummary: 'Отзывы не добавлены, пока нет проверенных источников.',
      statusLabel: 'Данные нужно проверить',
    },
    'Polyglott Centre': {
      shortDescription: 'Центр для изучения иностранных языков, включая немецкий.',
      fullDescription:
        'Подходит тем, кто хочет заниматься в группе и двигаться по понятной программе. Перед записью лучше уточнить, какие именно уровни немецкого доступны сейчас.',
      suitableFor: [
        'Тем, кому подходит групповое обучение',
        'Тем, кто хочет понятный учебный маршрут',
        'Тем, кто предпочитает регулярную программу',
      ],
      possibleBenefits: [
        'Групповая практика',
        'Плановое прохождение тем',
        'Возможность учиться вместе с другими студентами',
      ],
      thingsToAsk: [
        'Какие уровни немецкого есть сейчас',
        'Есть ли домашние задания и проверка',
        'Можно ли заниматься онлайн',
        'Какой формат разговорной практики',
      ],
      programs: ['Общий немецкий', 'Групповые курсы', 'Онлайн-формат - уточнить'],
      formats: ['Группа', 'Онлайн - уточнить'],
      examPreparation: ['Goethe - уточнить', 'Telc - уточнить', 'ÖSD - уточнить'],
      schedule: 'Уточнить у центра',
      pricingNote: 'Актуальные цены нужно уточнить напрямую.',
      trialLessonNote: 'Наличие пробного урока нужно уточнить.',
      certificateNote: 'Не указывать официальные сертификаты без подтверждения.',
      teacherNote: 'Состав преподавателей и опыт нужно уточнить перед записью.',
      reviewSummary: 'Отзывы не добавлены, пока нет проверенных источников.',
      statusLabel: 'Данные нужно проверить',
    },
    DSW: {
      shortDescription: 'Подходит для подготовки немецкого к учебе, работе или миграционным программам.',
      fullDescription:
        'Может быть полезен тем, кто изучает язык не просто "для себя", а под конкретную цель: учеба, работа, документы или будущий переезд.',
      suitableFor: [
        'Тем, у кого есть конкретная цель переезда',
        'Тем, кому нужна подготовка под учебу или работу',
        'Тем, кто хочет заранее понять требования к уровню',
      ],
      possibleBenefits: [
        'Фокус на практической цели',
        'Подготовка к языковым требованиям',
        'Возможность уточнить программу под миграционный путь',
      ],
      thingsToAsk: [
        'Есть ли интенсивные курсы',
        'Есть ли подготовка к экзаменам',
        'Какие уровни реально доступны',
        'Какие материалы используются',
      ],
      programs: ['Немецкий для учебы', 'Немецкий для работы', 'Экзаменационная подготовка - уточнить'],
      formats: ['Группа - уточнить', 'Индивидуально - уточнить', 'Онлайн - уточнить'],
      examPreparation: ['Goethe - уточнить', 'Telc - уточнить', 'ÖSD - уточнить'],
      schedule: 'Уточнить у центра',
      pricingNote: 'Актуальные цены нужно уточнить напрямую.',
      trialLessonNote: 'Наличие пробного урока нужно уточнить.',
      certificateNote: 'Не указывать официальные сертификаты без подтверждения.',
      teacherNote: 'Состав преподавателей и опыт нужно уточнить перед записью.',
      reviewSummary: 'Отзывы не добавлены, пока нет проверенных источников.',
      statusLabel: 'Данные нужно проверить',
    },
    Sirius: {
      shortDescription: 'Языковой центр для немецкого и подготовки к будущему переезду, учебе или работе.',
      fullDescription:
        'Подходит тем, кто хочет заранее готовиться к Германии и постепенно выстраивать языковую базу для учебы, работы или адаптации.',
      suitableFor: [
        'Тем, кто планирует переезд заранее',
        'Тем, кто хочет изучать немецкий системно',
        'Тем, кому важна подготовка к реальным ситуациям',
      ],
      possibleBenefits: [
        'Системное изучение языка',
        'Подготовка к будущей адаптации',
        'Возможность уточнить формат под свою цель',
      ],
      thingsToAsk: [
        'Есть ли пробный урок',
        'Как устроена обратная связь',
        'Есть ли разговорная практика',
        'Есть ли подготовка к A1-B2',
      ],
      programs: ['Общий немецкий', 'Подготовка к переезду', 'Разговорная практика - уточнить'],
      formats: ['Группа', 'Индивидуально - уточнить', 'Онлайн - уточнить'],
      examPreparation: ['Goethe - уточнить', 'Telc - уточнить', 'ÖSD - уточнить'],
      schedule: 'Уточнить у центра',
      pricingNote: 'Актуальные цены нужно уточнить напрямую.',
      trialLessonNote: 'Наличие пробного урока нужно уточнить.',
      certificateNote: 'Не указывать официальные сертификаты без подтверждения.',
      teacherNote: 'Состав преподавателей и опыт нужно уточнить перед записью.',
      reviewSummary: 'Отзывы не добавлены, пока нет проверенных источников.',
      statusLabel: 'Данные нужно проверить',
    },
  },

  // ===================== TAJIK =====================
  tj: {
    SLZ: {
      shortDescription: 'Яке аз марказҳои маъмул барои омӯзиши забони олмонӣ.',
      fullDescription:
        'Барои онҳое мувофиқ аст, ки мехоҳанд бо система, бо муаллим ва барномаи таълимӣ машғул шаванд. Пеш аз сабтнома бояд барномаи ҷорӣ, формати дарсҳо ва тайёрӣ ба имтиҳонҳоро равшан кунед.',
      suitableFor: [
        'Онҳое, ки ба интизом ва ҷадвали мунтазам ниёз доранд',
        'Навомӯзоне, ки мустақилона оғоз кардан барояшон мушкил аст',
        'Онҳое, ки мехоҳанд аз рӯи барномаи тайёр пеш раванд',
      ],
      possibleBenefits: [
        'Раванди таълимии бо сохтор',
        'Дарсҳо бо муаллим',
        'Динамикаи гурӯҳӣ ва мунтазамӣ',
      ],
      thingsToAsk: [
        'Ҳоло кадом сатҳҳо кушодаанд',
        'Дарси санҷишӣ ҳаст?',
        'Вазифаи хонагӣ чӣ тавр санҷида мешавад',
        'Тайёрӣ ба имтиҳонҳои A1-B2 ҳаст?',
      ],
      programs: ['Олмонии умумӣ', 'Тайёрӣ ба кӯчидан', 'Тайёрии имтиҳонӣ'],
      formats: ['Гурӯҳ', 'Инфиродӣ', 'Онлайн - равшан кунед'],
      examPreparation: ['Goethe - равшан кунед', 'Telc - равшан кунед', 'ÖSD - равшан кунед'],
      schedule: 'Аз марказ равшан кунед',
      pricingNote: 'Нархҳои ҷориро бояд мустақиман равшан кунед.',
      trialLessonNote: 'Мавҷудияти дарси санҷиширо бояд равшан кунед.',
      certificateNote: 'Сертификатҳои расмиро бе тасдиқ нишон надиҳед.',
      teacherNote: 'Таркиби муаллимон ва таҷрибаро бояд пеш аз сабтнома равшан кунед.',
      reviewSummary: 'Тақризҳо илова нашудаанд, то ки манбаъҳои тасдиқшуда нестанд.',
      statusLabel: 'Маълумотро бояд санҷед',
    },
    Dex: {
      shortDescription: 'Марказе забон барои аз сифр оғоз кардан ё беҳтар кардани сатҳи олмонӣ.',
      fullDescription:
        'Метавонад барои онҳое фоидабахш бошад, ки олмониро барои кӯчидан, Ausbildung ё таҳсил тайёр мекунанд. Пеш аз сабтнома муҳим аст суръати курс ва миқдори машқи гуфтугӯро равшан кунед.',
      suitableFor: [
        'Онҳое, ки аз сифр оғоз мекунанд',
        'Онҳое, ки ба Ausbildung ё таҳсил тайёрӣ мебинанд',
        'Онҳое, ки ба алоқаи баргашти мунтазам ниёз доранд',
      ],
      possibleBenefits: [
        'Оғози фаҳмо барои навомӯзон',
        'Дарсҳои мунтазам',
        'Имконияти равшан кардани хатогиҳо аз муаллим',
      ],
      thingsToAsk: [
        'Дар гурӯҳ чанд нафар аст',
        'Дарсҳо чӣ қадар зуд-зуд мешаванд',
        'Кадом китобҳои дарсӣ истифода мешаванд',
        'Дарсҳои гуфтугӯии алоҳида ҳастанд?',
      ],
      programs: ['Олмонӣ аз сифр', 'Фишурда - равшан кунед', 'Тайёрӣ ба таҳсил ва кӯчидан'],
      formats: ['Гурӯҳ', 'Инфиродӣ - равшан кунед', 'Онлайн - равшан кунед'],
      examPreparation: ['Goethe - равшан кунед', 'Telc - равшан кунед', 'ÖSD - равшан кунед'],
      schedule: 'Аз марказ равшан кунед',
      pricingNote: 'Нархҳои ҷориро бояд мустақиман равшан кунед.',
      trialLessonNote: 'Мавҷудияти дарси санҷиширо бояд равшан кунед.',
      certificateNote: 'Сертификатҳои расмиро бе тасдиқ нишон надиҳед.',
      teacherNote: 'Таркиби муаллимон ва таҷрибаро бояд пеш аз сабтнома равшан кунед.',
      reviewSummary: 'Тақризҳо илова нашудаанд, то ки манбаъҳои тасдиқшуда нестанд.',
      statusLabel: 'Маълумотро бояд санҷед',
    },
    'Polyglott Centre': {
      shortDescription: 'Марказ барои омӯзиши забонҳои хориҷӣ, аз ҷумла олмонӣ.',
      fullDescription:
        'Барои онҳое мувофиқ аст, ки мехоҳанд дар гурӯҳ машғул шаванд ва аз рӯи барномаи фаҳмо пеш раванд. Пеш аз сабтнома беҳтар аст равшан кунед, ки маҳз кадом сатҳҳои олмонӣ ҳоло дастрас ҳастанд.',
      suitableFor: [
        'Онҳое, ки омӯзиши гурӯҳӣ барояшон мувофиқ аст',
        'Онҳое, ки масири таълимии фаҳмо мехоҳанд',
        'Онҳое, ки барномаи мунтазамро афзалият медиҳанд',
      ],
      possibleBenefits: [
        'Машқи гурӯҳӣ',
        'Гузаштани нақшавии мавзӯъҳо',
        'Имконияти якҷоя бо дигар донишҷӯён омӯхтан',
      ],
      thingsToAsk: [
        'Ҳоло кадом сатҳҳои олмонӣ ҳастанд',
        'Вазифаи хонагӣ ва санҷиш ҳаст?',
        'Имконияти онлайн машғул шудан ҳаст?',
        'Формати машқи гуфтугӯ чӣ аст',
      ],
      programs: ['Олмонии умумӣ', 'Курсҳои гурӯҳӣ', 'Формати онлайн - равшан кунед'],
      formats: ['Гурӯҳ', 'Онлайн - равшан кунед'],
      examPreparation: ['Goethe - равшан кунед', 'Telc - равшан кунед', 'ÖSD - равшан кунед'],
      schedule: 'Аз марказ равшан кунед',
      pricingNote: 'Нархҳои ҷориро бояд мустақиман равшан кунед.',
      trialLessonNote: 'Мавҷудияти дарси санҷиширо бояд равшан кунед.',
      certificateNote: 'Сертификатҳои расмиро бе тасдиқ нишон надиҳед.',
      teacherNote: 'Таркиби муаллимон ва таҷрибаро бояд пеш аз сабтнома равшан кунед.',
      reviewSummary: 'Тақризҳо илова нашудаанд, то ки манбаъҳои тасдиқшуда нестанд.',
      statusLabel: 'Маълумотро бояд санҷед',
    },
    DSW: {
      shortDescription: 'Барои тайёр кардани олмонӣ ба таҳсил, кор ё барномаҳои муҳоҷиратӣ мувофиқ аст.',
      fullDescription:
        'Метавонад барои онҳое фоидабахш бошад, ки забонро на танҳо "барои худ", балки ба ҳадафи мушаххас меомӯзанд: таҳсил, кор, ҳуҷҷатҳо ё кӯчидани оянда.',
      suitableFor: [
        'Онҳое, ки ҳадафи мушаххаси кӯчидан доранд',
        'Онҳое, ки тайёрӣ ба таҳсил ё кор лозим аст',
        'Онҳое, ки мехоҳанд талаботи сатҳро пешакӣ фаҳманд',
      ],
      possibleBenefits: [
        'Тамаркуз ба ҳадафи амалӣ',
        'Тайёрӣ ба талаботи забонӣ',
        'Имконияти мутобиқ кардани барнома ба роҳи муҳоҷиратӣ',
      ],
      thingsToAsk: [
        'Курсҳои фишурда ҳастанд?',
        'Тайёрӣ ба имтиҳонҳо ҳаст?',
        'Кадом сатҳҳо воқеан дастрас ҳастанд',
        'Кадом маводҳо истифода мешаванд',
      ],
      programs: ['Олмонӣ барои таҳсил', 'Олмонӣ барои кор', 'Тайёрии имтиҳонӣ - равшан кунед'],
      formats: ['Гурӯҳ - равшан кунед', 'Инфиродӣ - равшан кунед', 'Онлайн - равшан кунед'],
      examPreparation: ['Goethe - равшан кунед', 'Telc - равшан кунед', 'ÖSD - равшан кунед'],
      schedule: 'Аз марказ равшан кунед',
      pricingNote: 'Нархҳои ҷориро бояд мустақиман равшан кунед.',
      trialLessonNote: 'Мавҷудияти дарси санҷиширо бояд равшан кунед.',
      certificateNote: 'Сертификатҳои расмиро бе тасдиқ нишон надиҳед.',
      teacherNote: 'Таркиби муаллимон ва таҷрибаро бояд пеш аз сабтнома равшан кунед.',
      reviewSummary: 'Тақризҳо илова нашудаанд, то ки манбаъҳои тасдиқшуда нестанд.',
      statusLabel: 'Маълумотро бояд санҷед',
    },
    Sirius: {
      shortDescription: 'Марказе забон барои олмонӣ ва тайёрӣ ба кӯчидан, таҳсил ё кори оянда.',
      fullDescription:
        'Барои онҳое мувофиқ аст, ки мехоҳанд пешакӣ ба Олмон тайёрӣ бубинанд ва тадриҷан пойдевори забониро барои таҳсил, кор ё мутобиқшавӣ созанд.',
      suitableFor: [
        'Онҳое, ки кӯчиданро пешакӣ банақша мегиранд',
        'Онҳое, ки мехоҳанд олмониро бо система омӯзанд',
        'Онҳое, ки тайёрӣ ба ҳолатҳои воқеӣ барояшон муҳим аст',
      ],
      possibleBenefits: [
        'Омӯзиши системавии забон',
        'Тайёрӣ ба мутобиқшавии оянда',
        'Имконияти мутобиқ кардани формат ба ҳадафи худ',
      ],
      thingsToAsk: [
        'Дарси санҷишӣ ҳаст?',
        'Алоқаи баргашт чӣ тавр ташкил шудааст',
        'Машқи гуфтугӯ ҳаст?',
        'Тайёрӣ ба A1-B2 ҳаст?',
      ],
      programs: ['Олмонии умумӣ', 'Тайёрӣ ба кӯчидан', 'Машқи гуфтугӯ - равшан кунед'],
      formats: ['Гурӯҳ', 'Инфиродӣ - равшан кунед', 'Онлайн - равшан кунед'],
      examPreparation: ['Goethe - равшан кунед', 'Telc - равшан кунед', 'ÖSD - равшан кунед'],
      schedule: 'Аз марказ равшан кунед',
      pricingNote: 'Нархҳои ҷориро бояд мустақиман равшан кунед.',
      trialLessonNote: 'Мавҷудияти дарси санҷиширо бояд равшан кунед.',
      certificateNote: 'Сертификатҳои расмиро бе тасдиқ нишон надиҳед.',
      teacherNote: 'Таркиби муаллимон ва таҷрибаро бояд пеш аз сабтнома равшан кунед.',
      reviewSummary: 'Тақризҳо илова нашудаанд, то ки манбаъҳои тасдиқшуда нестанд.',
      statusLabel: 'Маълумотро бояд санҷед',
    },
  },

  // ===================== GERMAN =====================
  de: {
    SLZ: {
      shortDescription: 'Eines der beliebten Zentren für das Erlernen der deutschen Sprache.',
      fullDescription:
        'Geeignet für alle, die systematisch mit Lehrer und Lehrplan lernen möchten. Vor der Anmeldung sollten Sie das aktuelle Programm, das Unterrichtsformat und die Prüfungsvorbereitung klären.',
      suitableFor: [
        'Wer Disziplin und einen regelmäßigen Zeitplan braucht',
        'Anfänger, denen es schwerfällt, alleine zu beginnen',
        'Wer nach einem fertigen Programm vorgehen möchte',
      ],
      possibleBenefits: [
        'Strukturierter Lernprozess',
        'Unterricht mit Lehrer',
        'Gruppendynamik und Regelmäßigkeit',
      ],
      thingsToAsk: [
        'Welche Niveaustufen sind derzeit verfügbar',
        'Gibt es eine Probestunde',
        'Wie werden Hausaufgaben überprüft',
        'Gibt es Prüfungsvorbereitung A1-B2',
      ],
      programs: ['Allgemeines Deutsch', 'Umzugsvorbereitung', 'Prüfungsvorbereitung'],
      formats: ['Gruppe', 'Einzelunterricht', 'Online – zu klären'],
      examPreparation: ['Goethe – zu klären', 'Telc – zu klären', 'ÖSD – zu klären'],
      schedule: 'Beim Zentrum erfragen',
      pricingNote: 'Aktuelle Preise müssen direkt erfragt werden.',
      trialLessonNote: 'Verfügbarkeit einer Probestunde muss erfragt werden.',
      certificateNote: 'Offizielle Zertifikate nicht ohne Bestätigung angeben.',
      teacherNote: 'Lehrerzusammensetzung und Erfahrung vor der Anmeldung klären.',
      reviewSummary: 'Bewertungen wurden nicht hinzugefügt, da keine verifizierten Quellen vorliegen.',
      statusLabel: 'Daten müssen überprüft werden',
    },
    Dex: {
      shortDescription: 'Sprachzentrum für den Start bei Null oder die Verbesserung des Deutschniveaus.',
      fullDescription:
        'Kann für diejenigen nützlich sein, die Deutsch für den Umzug, Ausbildung oder Studium vorbereiten. Vor der Anmeldung ist es wichtig, das Kurstempo und die Menge an Sprechpraxis zu klären.',
      suitableFor: [
        'Wer bei Null anfängt',
        'Wer sich auf Ausbildung oder Studium vorbereitet',
        'Wer regelmäßiges Feedback braucht',
      ],
      possibleBenefits: [
        'Verständlicher Start für Anfänger',
        'Regelmäßiger Unterricht',
        'Möglichkeit, Fehler beim Lehrer zu klären',
      ],
      thingsToAsk: [
        'Wie viele Personen in der Gruppe',
        'Wie oft findet Unterricht statt',
        'Welche Lehrbücher werden verwendet',
        'Gibt es separate Sprechübungen',
      ],
      programs: ['Deutsch von Null', 'Intensiv – zu klären', 'Vorbereitung auf Studium und Umzug'],
      formats: ['Gruppe', 'Einzelunterricht – zu klären', 'Online – zu klären'],
      examPreparation: ['Goethe – zu klären', 'Telc – zu klären', 'ÖSD – zu klären'],
      schedule: 'Beim Zentrum erfragen',
      pricingNote: 'Aktuelle Preise müssen direkt erfragt werden.',
      trialLessonNote: 'Verfügbarkeit einer Probestunde muss erfragt werden.',
      certificateNote: 'Offizielle Zertifikate nicht ohne Bestätigung angeben.',
      teacherNote: 'Lehrerzusammensetzung und Erfahrung vor der Anmeldung klären.',
      reviewSummary: 'Bewertungen wurden nicht hinzugefügt, da keine verifizierten Quellen vorliegen.',
      statusLabel: 'Daten müssen überprüft werden',
    },
    'Polyglott Centre': {
      shortDescription: 'Zentrum für das Erlernen von Fremdsprachen, einschließlich Deutsch.',
      fullDescription:
        'Geeignet für alle, die in der Gruppe lernen und einem verständlichen Programm folgen möchten. Vor der Anmeldung sollten Sie klären, welche Deutschniveaus derzeit verfügbar sind.',
      suitableFor: [
        'Wem Gruppenunterricht passt',
        'Wer einen klaren Lernweg möchte',
        'Wer ein regelmäßiges Programm bevorzugt',
      ],
      possibleBenefits: [
        'Gruppenpraxis',
        'Planmäßiges Durcharbeiten von Themen',
        'Möglichkeit, mit anderen Studenten zu lernen',
      ],
      thingsToAsk: [
        'Welche Deutschniveaus es derzeit gibt',
        'Gibt es Hausaufgaben und Überprüfung',
        'Kann man online lernen',
        'Welches Format hat die Sprechpraxis',
      ],
      programs: ['Allgemeines Deutsch', 'Gruppenkurse', 'Online-Format – zu klären'],
      formats: ['Gruppe', 'Online – zu klären'],
      examPreparation: ['Goethe – zu klären', 'Telc – zu klären', 'ÖSD – zu klären'],
      schedule: 'Beim Zentrum erfragen',
      pricingNote: 'Aktuelle Preise müssen direkt erfragt werden.',
      trialLessonNote: 'Verfügbarkeit einer Probestunde muss erfragt werden.',
      certificateNote: 'Offizielle Zertifikate nicht ohne Bestätigung angeben.',
      teacherNote: 'Lehrerzusammensetzung und Erfahrung vor der Anmeldung klären.',
      reviewSummary: 'Bewertungen wurden nicht hinzugefügt, da keine verifizierten Quellen vorliegen.',
      statusLabel: 'Daten müssen überprüft werden',
    },
    DSW: {
      shortDescription: 'Geeignet für die Vorbereitung von Deutsch auf Studium, Arbeit oder Migrationsprogramme.',
      fullDescription:
        'Kann für diejenigen nützlich sein, die Deutsch nicht nur „für sich" lernen, sondern ein konkretes Ziel haben: Studium, Arbeit, Dokumente oder zukünftiger Umzug.',
      suitableFor: [
        'Wer ein konkretes Umzugsziel hat',
        'Wer Vorbereitung auf Studium oder Arbeit braucht',
        'Wer die Niveauanforderungen vorab verstehen möchte',
      ],
      possibleBenefits: [
        'Fokus auf praktisches Ziel',
        'Vorbereitung auf Sprachanforderungen',
        'Möglichkeit, das Programm an den Migrationsweg anzupassen',
      ],
      thingsToAsk: [
        'Gibt es Intensivkurse',
        'Gibt es Prüfungsvorbereitung',
        'Welche Niveaustufen sind tatsächlich verfügbar',
        'Welche Materialien werden verwendet',
      ],
      programs: ['Deutsch für Studium', 'Deutsch für Arbeit', 'Prüfungsvorbereitung – zu klären'],
      formats: ['Gruppe – zu klären', 'Einzelunterricht – zu klären', 'Online – zu klären'],
      examPreparation: ['Goethe – zu klären', 'Telc – zu klären', 'ÖSD – zu klären'],
      schedule: 'Beim Zentrum erfragen',
      pricingNote: 'Aktuelle Preise müssen direkt erfragt werden.',
      trialLessonNote: 'Verfügbarkeit einer Probestunde muss erfragt werden.',
      certificateNote: 'Offizielle Zertifikate nicht ohne Bestätigung angeben.',
      teacherNote: 'Lehrerzusammensetzung und Erfahrung vor der Anmeldung klären.',
      reviewSummary: 'Bewertungen wurden nicht hinzugefügt, da keine verifizierten Quellen vorliegen.',
      statusLabel: 'Daten müssen überprüft werden',
    },
    Sirius: {
      shortDescription: 'Sprachzentrum für Deutsch und Vorbereitung auf zukünftigen Umzug, Studium oder Arbeit.',
      fullDescription:
        'Geeignet für alle, die sich frühzeitig auf Deutschland vorbereiten und schrittweise eine Sprachbasis für Studium, Arbeit oder Anpassung aufbauen möchten.',
      suitableFor: [
        'Wer den Umzug frühzeitig plant',
        'Wer Deutsch systematisch lernen möchte',
        'Wem die Vorbereitung auf reale Situationen wichtig ist',
      ],
      possibleBenefits: [
        'Systematisches Sprachlernen',
        'Vorbereitung auf zukünftige Anpassung',
        'Möglichkeit, das Format an das eigene Ziel anzupassen',
      ],
      thingsToAsk: [
        'Gibt es eine Probestunde',
        'Wie ist das Feedback organisiert',
        'Gibt es Sprechpraxis',
        'Gibt es Vorbereitung auf A1-B2',
      ],
      programs: ['Allgemeines Deutsch', 'Umzugsvorbereitung', 'Sprechpraxis – zu klären'],
      formats: ['Gruppe', 'Einzelunterricht – zu klären', 'Online – zu klären'],
      examPreparation: ['Goethe – zu klären', 'Telc – zu klären', 'ÖSD – zu klären'],
      schedule: 'Beim Zentrum erfragen',
      pricingNote: 'Aktuelle Preise müssen direkt erfragt werden.',
      trialLessonNote: 'Verfügbarkeit einer Probestunde muss erfragt werden.',
      certificateNote: 'Offizielle Zertifikate nicht ohne Bestätigung angeben.',
      teacherNote: 'Lehrerzusammensetzung und Erfahrung vor der Anmeldung klären.',
      reviewSummary: 'Bewertungen wurden nicht hinzugefügt, da keine verifizierten Quellen vorliegen.',
      statusLabel: 'Daten müssen überprüft werden',
    },
  },
};
