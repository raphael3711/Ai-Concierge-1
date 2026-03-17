export type Language = 'uk' | 'ru' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  uk: {
    // Header
    'header.title': 'КОНСЬЄРЖ',
    'header.settings': 'Параметри',
    
    // Privacy Screen
    'privacy.title': 'Приватний AI консьєрж',
    'privacy.message': 'Ваші дані конфіденційні. Ми не зберігаємо ваші фото на наших серверах.',
    'privacy.button': 'Дослідити колекцій',
    'privacy.subtitle': 'GOURMET CONCIERGE — PRIVATE ESTATE EDITION',
    
    // Home Screen
    'home.heading': 'Вдосконалюйте свій',
    'home.highlight': 'Смак',
    'home.description': 'Ваш приватний AI сомельєр та кулінарний помічник. Відчуйте унікальний гастрономічний досвід.',
    'home.premium': 'ПРЕМИУМ',
    
    // Features
    'feature.photo': 'Фото пляшки',
    'feature.photo.desc': 'Миттєве розпізнавання етикетки',
    'feature.shelf': 'Розуміє сканування полиці',
    'feature.shelf.desc': 'Знайдіть найкраще в ряду',
    'feature.voice': 'Голос і запит',
    'feature.voice.desc': 'Запитайте паралель експерта',
    'feature.pairing': 'Гурманські поєднання',
    'feature.pairing.desc': 'Ідеальна пара до страви',
    
    // Tab Navigation
    'tab.overview': 'ОГЛЯД',
    'tab.scanner': 'СКАНЕР',
    'tab.voice': 'ГОЛОС',
    'tab.history': 'ІСТОРІЯ',
    'tab.profile': 'ПРОФІЛЬ',
    
    // Voice
    'voice.listening': 'Слухаю...',
    'voice.processing': 'Обробка...',
    'voice.wake_phrase': 'Скажіть: "Привіт Консьєрж"',
  },
  ru: {
    // Header
    'header.title': 'КОНСЬЕРЖ',
    'header.settings': 'Настройки',
    
    // Privacy Screen
    'privacy.title': 'Приватный AI консьерж',
    'privacy.message': 'Ваши данные конфиденциальны. Мы не храним ваши фото на наших серверах.',
    'privacy.button': 'Исследовать коллекцию',
    'privacy.subtitle': 'GOURMET CONCIERGE — PRIVATE ESTATE EDITION',
    
    // Home Screen
    'home.heading': 'Совершенствуйте свой',
    'home.highlight': 'Вкус',
    'home.description': 'Ваш приватный AI сомелье и кулинарный помощник. Испытайте уникальный гастрономический опыт.',
    'home.premium': 'ПРЕМИУМ',
    
    // Features
    'feature.photo': 'Фото бутылки',
    'feature.photo.desc': 'Мгновенное распознавание этикетки',
    'feature.shelf': 'Понимает сканирование полки',
    'feature.shelf.desc': 'Найдите лучшее в ряду',
    'feature.voice': 'Голос и запрос',
    'feature.voice.desc': 'Спросите параллель эксперта',
    'feature.pairing': 'Гурманские пары',
    'feature.pairing.desc': 'Идеальная пара к блюду',
    
    // Tab Navigation
    'tab.overview': 'ОБЗОР',
    'tab.scanner': 'СКАНЕР',
    'tab.voice': 'ГОЛОС',
    'tab.history': 'ИСТОРИЯ',
    'tab.profile': 'ПРОФИЛЬ',
    
    // Voice
    'voice.listening': 'Слушаю...',
    'voice.processing': 'Обработка...',
    'voice.wake_phrase': 'Скажите: "Привет Консьерж"',
  },
  en: {
    // Header
    'header.title': 'CONCIERGE',
    'header.settings': 'Settings',
    
    // Privacy Screen
    'privacy.title': 'Private AI Concierge',
    'privacy.message': 'Your data is confidential. We don\'t store your photos on our servers.',
    'privacy.button': 'Explore Collection',
    'privacy.subtitle': 'GOURMET CONCIERGE — PRIVATE ESTATE EDITION',
    
    // Home Screen
    'home.heading': 'Perfect Your',
    'home.highlight': 'Taste',
    'home.description': 'Your private AI sommelier and culinary assistant. Experience unique gastronomic insights.',
    'home.premium': 'PREMIUM',
    
    // Features
    'feature.photo': 'Photo of Bottle',
    'feature.photo.desc': 'Instant label recognition',
    'feature.shelf': 'Shelf Scanning',
    'feature.shelf.desc': 'Find the best in a row',
    'feature.voice': 'Voice & Query',
    'feature.voice.desc': 'Ask an expert pairing',
    'feature.pairing': 'Gourmet Pairings',
    'feature.pairing.desc': 'Perfect pair to your dish',
    
    // Tab Navigation
    'tab.overview': 'OVERVIEW',
    'tab.scanner': 'SCANNER',
    'tab.voice': 'VOICE',
    'tab.history': 'HISTORY',
    'tab.profile': 'PROFILE',
    
    // Voice
    'voice.listening': 'Listening...',
    'voice.processing': 'Processing...',
    'voice.wake_phrase': 'Say: "Hey Concierge"',
  },
};

export function t(key: string, language: Language = 'uk'): string {
  return translations[language]?.[key] || translations['en']?.[key] || key;
}
