export type Language = 'uk' | 'ru' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  uk: {
    // Header
    'header.title': 'КОНСЬЄРЖ',
    'header.settings': 'Параметри',

    // Privacy Screen
    'privacy.title': 'Приватний AI консьєрж',
    'privacy.message': 'Ваші дані конфіденційні. Ми не зберігаємо ваші фото на наших серверах.',
    'privacy.button': 'Дослідити колекції',
    'privacy.subtitle': 'GOURMET CONCIERGE — PRIVATE ESTATE EDITION',

    // Home Screen
    'home.heading': 'Вдосконалюйте свій',
    'home.highlight': 'Смак',
    'home.description': 'Ваш приватний AI сомельєр та кулінарний помічник. Відчуйте унікальний гастрономічний досвід.',
    'home.premium': 'ПРЕМІУМ',

    // Features
    'feature.photo': 'Фото пляшки',
    'feature.photo.desc': 'Миттєве розпізнавання етикетки',
    'feature.shelf': 'Сканування полиці',
    'feature.shelf.desc': 'Знайдіть найкраще в ряду',
    'feature.voice': 'Голос і запит',
    'feature.voice.desc': 'Запитайте пораду експерта',
    'feature.pairing': 'Гурманські поєднання',
    'feature.pairing.desc': 'Ідеальна пара до страви',

    // Tab Navigation
    'tab.overview': 'ОГЛЯД',
    'tab.scanner': 'СКАНЕР',
    'tab.voice': 'ГОЛОС',
    'tab.history': 'ІСТОРІЯ',
    'tab.profile': 'ПРОФІЛЬ',

    // Beverage Screen
    'bev.title': 'Напої',
    'bev.alcoholic': 'Алкогольні',
    'bev.nonalcoholic': 'Безалкогольні',
    'bev.back': 'Назад',
    // Alcoholic categories
    'bev.wine': 'Вино',
    'bev.sparkling': 'Ігристе вино',
    'bev.vodka': 'Водка',
    'bev.whisky': 'Віскі',
    'bev.tequila': 'Текіла',
    'bev.rum': 'Ром',
    'bev.gin': 'Джин',
    'bev.liqueur': 'Лікери',
    'bev.beer': 'Пиво',
    // Non-alcoholic categories
    'bev.drinks': 'Напої',
    'bev.lemonade': 'Лимонад',
    'bev.water': 'Вода',
    'bev.juice': 'Сік',
    'bev.tea': 'Чай',
    'bev.coffee': 'Кава',
    // Category descriptions
    'bev.wine.desc': 'Червоне, біле, рожеве',
    'bev.sparkling.desc': 'Шампанське, просекко, кава',
    'bev.vodka.desc': 'Класична та ароматизована',
    'bev.whisky.desc': 'Односолодовий, бурбон, купажований',
    'bev.tequila.desc': 'Бланко, репосадо, аньєхо',
    'bev.rum.desc': 'Світлий, темний, пряний',
    'bev.gin.desc': 'Лондонський сухий, новий стиль',
    'bev.liqueur.desc': 'Фруктові, вершкові, трав\'яні',
    'bev.beer.desc': 'Ель, лагер, стаут, пшеничне',
    'bev.drinks.desc': 'Холодні та газовані',
    'bev.lemonade.desc': 'Освіжаючі цитрусові напої',
    'bev.water.desc': 'Негазована та газована',
    'bev.juice.desc': 'Свіжовичавлені та нектари',
    'bev.tea.desc': 'Чорний, зелений, трав\'яний',
    'bev.coffee.desc': 'Еспресо, americano, latte',

    // Recipe / Pairing Screen
    'recipe.title': 'Рецепт та поєднання',
    'recipe.pairing_for': 'Поєднання для',
    'recipe.ingredients': 'Інгредієнти',
    'recipe.steps': 'Кроки приготування',
    'recipe.pairs_with': 'Ідеально підходить до',
    'recipe.serving': 'Подача',
    'recipe.servings': 'порцій',
    'recipe.time': 'Час',
    'recipe.min': 'хв',
    'recipe.save': 'Зберегти рецепт',
    'recipe.share': 'Поділитися',
    'recipe.expert_note': 'Примітка сомельє',

    // Voice Screen
    'voice.title': 'Голосовий помічник',
    'voice.hint': 'Натисніть мікрофон і задайте питання',
    'voice.listening': 'Слухаю...',
    'voice.processing': 'Обробка...',
    'voice.speaking': 'Відповідаю...',
    'voice.tap_to_speak': 'Натисніть, щоб говорити',
    'voice.ask_example': 'Що підійде до стейку?',

    // History Screen
    'history.title': 'Історія',
    'history.empty': 'Ще немає запитів',
    'history.empty.desc': 'Ваші пошуки та рекомендації з\'являться тут',

    // Profile Screen
    'profile.title': 'Профіль',
    'profile.language': 'Мова',
    'profile.subscription': 'Підписка',
    'profile.premium_sub': 'Преміум',
    'profile.preferences': 'Уподобання',
    'profile.privacy': 'Конфіденційність',
    'profile.logout': 'Вийти',

    // Language names
    'lang.en': 'English',
    'lang.uk': 'Українська',
    'lang.ru': 'Русский',
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
    'feature.shelf': 'Сканирование полки',
    'feature.shelf.desc': 'Найдите лучшее в ряду',
    'feature.voice': 'Голос и запрос',
    'feature.voice.desc': 'Спросите совет эксперта',
    'feature.pairing': 'Гурманские пары',
    'feature.pairing.desc': 'Идеальная пара к блюду',

    // Tab Navigation
    'tab.overview': 'ОБЗОР',
    'tab.scanner': 'СКАНЕР',
    'tab.voice': 'ГОЛОС',
    'tab.history': 'ИСТОРИЯ',
    'tab.profile': 'ПРОФИЛЬ',

    // Beverage Screen
    'bev.title': 'Напитки',
    'bev.alcoholic': 'Алкогольные',
    'bev.nonalcoholic': 'Безалкогольные',
    'bev.back': 'Назад',
    'bev.wine': 'Вино',
    'bev.sparkling': 'Игристое вино',
    'bev.vodka': 'Водка',
    'bev.whisky': 'Виски',
    'bev.tequila': 'Текила',
    'bev.rum': 'Ром',
    'bev.gin': 'Джин',
    'bev.liqueur': 'Ликёры',
    'bev.beer': 'Пиво',
    'bev.drinks': 'Напитки',
    'bev.lemonade': 'Лимонад',
    'bev.water': 'Вода',
    'bev.juice': 'Сок',
    'bev.tea': 'Чай',
    'bev.coffee': 'Кофе',
    'bev.wine.desc': 'Красное, белое, розовое',
    'bev.sparkling.desc': 'Шампанское, просекко, кава',
    'bev.vodka.desc': 'Классическая и ароматизированная',
    'bev.whisky.desc': 'Односолодовый, бурбон, купажированный',
    'bev.tequila.desc': 'Бланко, репосадо, аньехо',
    'bev.rum.desc': 'Светлый, тёмный, пряный',
    'bev.gin.desc': 'Лондонский сухой, новый стиль',
    'bev.liqueur.desc': 'Фруктовые, сливочные, травяные',
    'bev.beer.desc': 'Эль, лагер, стаут, пшеничное',
    'bev.drinks.desc': 'Холодные и газированные',
    'bev.lemonade.desc': 'Освежающие цитрусовые напитки',
    'bev.water.desc': 'Негазированная и газированная',
    'bev.juice.desc': 'Свежевыжатые и нектары',
    'bev.tea.desc': 'Чёрный, зелёный, травяной',
    'bev.coffee.desc': 'Эспрессо, американо, латте',

    // Recipe / Pairing Screen
    'recipe.title': 'Рецепт и паринг',
    'recipe.pairing_for': 'Паринг для',
    'recipe.ingredients': 'Ингредиенты',
    'recipe.steps': 'Шаги приготовления',
    'recipe.pairs_with': 'Идеально подходит к',
    'recipe.serving': 'Подача',
    'recipe.servings': 'порций',
    'recipe.time': 'Время',
    'recipe.min': 'мин',
    'recipe.save': 'Сохранить рецепт',
    'recipe.share': 'Поделиться',
    'recipe.expert_note': 'Заметка сомелье',

    // Voice Screen
    'voice.title': 'Голосовой помощник',
    'voice.hint': 'Нажмите микрофон и задайте вопрос',
    'voice.listening': 'Слушаю...',
    'voice.processing': 'Обработка...',
    'voice.speaking': 'Отвечаю...',
    'voice.tap_to_speak': 'Нажмите, чтобы говорить',
    'voice.ask_example': 'Что подойдёт к стейку?',

    // History Screen
    'history.title': 'История',
    'history.empty': 'Ещё нет запросов',
    'history.empty.desc': 'Ваши поиски и рекомендации появятся здесь',

    // Profile Screen
    'profile.title': 'Профиль',
    'profile.language': 'Язык',
    'profile.subscription': 'Подписка',
    'profile.premium_sub': 'Премиум',
    'profile.preferences': 'Предпочтения',
    'profile.privacy': 'Конфиденциальность',
    'profile.logout': 'Выйти',

    // Language names
    'lang.en': 'English',
    'lang.uk': 'Українська',
    'lang.ru': 'Русский',
  },

  en: {
    // Header
    'header.title': 'CONCIERGE',
    'header.settings': 'Settings',

    // Privacy Screen
    'privacy.title': 'Private AI Concierge',
    'privacy.message': "Your data is confidential. We don't store your photos on our servers.",
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
    'feature.shelf.desc': 'Find the best on the shelf',
    'feature.voice': 'Voice & Query',
    'feature.voice.desc': 'Ask an expert for advice',
    'feature.pairing': 'Gourmet Pairings',
    'feature.pairing.desc': 'Perfect pair to your dish',

    // Tab Navigation
    'tab.overview': 'OVERVIEW',
    'tab.scanner': 'SCANNER',
    'tab.voice': 'VOICE',
    'tab.history': 'HISTORY',
    'tab.profile': 'PROFILE',

    // Beverage Screen
    'bev.title': 'Beverages',
    'bev.alcoholic': 'Alcoholic',
    'bev.nonalcoholic': 'Non-Alcoholic',
    'bev.back': 'Back',
    'bev.wine': 'Wine',
    'bev.sparkling': 'Sparkling Wine',
    'bev.vodka': 'Vodka',
    'bev.whisky': 'Whisky',
    'bev.tequila': 'Tequila',
    'bev.rum': 'Rum',
    'bev.gin': 'Gin',
    'bev.liqueur': 'Liqueurs',
    'bev.beer': 'Beer',
    'bev.drinks': 'Drinks',
    'bev.lemonade': 'Lemonade',
    'bev.water': 'Water',
    'bev.juice': 'Juice',
    'bev.tea': 'Tea',
    'bev.coffee': 'Coffee',
    'bev.wine.desc': 'Red, white, rosé',
    'bev.sparkling.desc': 'Champagne, prosecco, cava',
    'bev.vodka.desc': 'Classic and flavoured',
    'bev.whisky.desc': 'Single malt, bourbon, blended',
    'bev.tequila.desc': 'Blanco, reposado, añejo',
    'bev.rum.desc': 'Light, dark, spiced',
    'bev.gin.desc': 'London dry, new world style',
    'bev.liqueur.desc': 'Fruit, cream, herbal',
    'bev.beer.desc': 'Ale, lager, stout, wheat',
    'bev.drinks.desc': 'Cold and sparkling',
    'bev.lemonade.desc': 'Refreshing citrus drinks',
    'bev.water.desc': 'Still and sparkling',
    'bev.juice.desc': 'Freshly squeezed and nectars',
    'bev.tea.desc': 'Black, green, herbal',
    'bev.coffee.desc': 'Espresso, americano, latte',

    // Recipe / Pairing Screen
    'recipe.title': 'Recipe & Pairing',
    'recipe.pairing_for': 'Pairing for',
    'recipe.ingredients': 'Ingredients',
    'recipe.steps': 'Preparation Steps',
    'recipe.pairs_with': 'Pairs perfectly with',
    'recipe.serving': 'Serving',
    'recipe.servings': 'servings',
    'recipe.time': 'Time',
    'recipe.min': 'min',
    'recipe.save': 'Save Recipe',
    'recipe.share': 'Share',
    'recipe.expert_note': "Sommelier's Note",

    // Voice Screen
    'voice.title': 'Voice Assistant',
    'voice.hint': 'Press the microphone and ask your question',
    'voice.listening': 'Listening...',
    'voice.processing': 'Processing...',
    'voice.speaking': 'Responding...',
    'voice.tap_to_speak': 'Tap to speak',
    'voice.ask_example': 'What pairs with steak?',

    // History Screen
    'history.title': 'History',
    'history.empty': 'No requests yet',
    'history.empty.desc': 'Your searches and recommendations will appear here',

    // Profile Screen
    'profile.title': 'Profile',
    'profile.language': 'Language',
    'profile.subscription': 'Subscription',
    'profile.premium_sub': 'Premium',
    'profile.preferences': 'Preferences',
    'profile.privacy': 'Privacy',
    'profile.logout': 'Sign Out',

    // Language names
    'lang.en': 'English',
    'lang.uk': 'Українська',
    'lang.ru': 'Русский',
  },
};

export function t(key: string, language: Language = 'uk'): string {
  return translations[language]?.[key] ?? translations['en']?.[key] ?? key;
}
