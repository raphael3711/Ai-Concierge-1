'use client';

import React, { useState } from 'react';
import { t, type Language } from '@/lib/translations';

interface RecipeScreenProps {
  language: Language;
  category?: string;
}

interface RecipeData {
  name: Record<Language, string>;
  servings: number;
  timeMin: number;
  sommelierNote: Record<Language, string>;
  ingredients: Record<Language, string[]>;
  steps: Record<Language, string[]>;
  pairings: Record<Language, string[]>;
}

const RECIPES: Record<string, RecipeData> = {
  wine: {
    name: { uk: 'Яловичина Бургундська', ru: 'Говядина по-бургундски', en: 'Beef Bourguignon' },
    servings: 4,
    timeMin: 120,
    sommelierNote: {
      uk: 'Пінло Нуар або Бургундське 2018–2020 року підкреслять насичений смак тушкованого м\'яса.',
      ru: 'Пино Нуар или Бургундское 2018–2020 подчеркнут насыщенный вкус тушёного мяса.',
      en: 'A Pinot Noir or Burgundy 2018–2020 will complement the rich braised flavours perfectly.',
    },
    ingredients: {
      uk: ['800 г яловичини (лопатка)', '200 мл червоного вина', '2 моркви', '1 цибулина', '3 зубчики часнику', '200 г шампіньйонів', '2 ст.л. томатної пасти', '1 ст.л. борошна', 'Чебрець, лавровий лист', 'Сіль, перець'],
      ru: ['800 г говядины (лопатка)', '200 мл красного вина', '2 моркови', '1 луковица', '3 зубчика чеснока', '200 г шампиньонов', '2 ст.л. томатной пасты', '1 ст.л. муки', 'Тимьян, лавровый лист', 'Соль, перец'],
      en: ['800 g beef chuck', '200 ml red wine', '2 carrots', '1 onion', '3 garlic cloves', '200 g mushrooms', '2 tbsp tomato paste', '1 tbsp flour', 'Thyme, bay leaf', 'Salt and pepper'],
    },
    steps: {
      uk: ['Наріжте яловичину кубиками 4 см, обсушіть паперовим рушником.', 'Обсмажте на сильному вогні до золотистої скоринки з усіх боків.', 'Додайте нарізані цибулю, моркву та часник, смажте 5 хв.', 'Влийте вино, додайте томатну пасту та борошно, перемішайте.', 'Тушкуйте під кришкою на малому вогні 90 хвилин.', 'За 15 хв до кінця додайте гриби. Подавайте з картопляним пюре.'],
      ru: ['Нарежьте говядину кубиками 4 см, обсушите бумажным полотенцем.', 'Обжарьте на сильном огне до золотистой корочки со всех сторон.', 'Добавьте нарезанные лук, морковь и чеснок, жарьте 5 мин.', 'Влейте вино, добавьте томатную пасту и муку, перемешайте.', 'Тушите под крышкой на малом огне 90 минут.', 'За 15 мин до конца добавьте грибы. Подавайте с картофельным пюре.'],
      en: ['Cut beef into 4 cm cubes and pat dry with paper towels.', 'Sear over high heat until golden brown on all sides.', 'Add diced onion, carrots and garlic; cook 5 minutes.', 'Pour in wine, add tomato paste and flour; stir well.', 'Cover and braise on low heat for 90 minutes.', 'Add mushrooms 15 minutes before end. Serve with mashed potato.'],
    },
    pairings: {
      uk: ['Pinot Noir — Domaine de la Romanée-Conti', 'Côte de Nuits Village 2019', 'Bourgogne Rouge Réserve'],
      ru: ['Pinot Noir — Domaine de la Romanée-Conti', 'Côte de Nuits Village 2019', 'Bourgogne Rouge Réserve'],
      en: ['Pinot Noir — Domaine de la Romanée-Conti', 'Côte de Nuits Village 2019', 'Bourgogne Rouge Réserve'],
    },
  },
  sparkling: {
    name: { uk: 'Устриці з вершковим соусом', ru: 'Устрицы с кремовым соусом', en: 'Oysters with Cream Sauce' },
    servings: 2,
    timeMin: 20,
    sommelierNote: {
      uk: 'Брют Шампань або Кава ідеально доповнять морську свіжість устриць завдяки своїй кислотності.',
      ru: 'Брют Шампань или Кава идеально дополнят морскую свежесть устриц благодаря своей кислотности.',
      en: 'Brut Champagne or Cava perfectly complements the briny freshness of oysters thanks to its acidity.',
    },
    ingredients: {
      uk: ['12 устриць', '100 мл вершків 33%', '50 мл білого вина', '2 ст.л. вершкового масла', 'Шалот 1 шт.', 'Лимон', 'Свіжий кріп', 'Сіль, білий перець'],
      ru: ['12 устриц', '100 мл сливок 33%', '50 мл белого вина', '2 ст.л. сливочного масла', '1 шт. шалот', 'Лимон', 'Свежий укроп', 'Соль, белый перец'],
      en: ['12 oysters', '100 ml heavy cream', '50 ml white wine', '2 tbsp butter', '1 shallot', 'Lemon', 'Fresh dill', 'Salt, white pepper'],
    },
    steps: {
      uk: ['Відкрийте устриці, збережіть морський сік.', 'Обсмажте дрібно нарізаний шалот на маслі до м\'якості.', 'Влийте вино та сік устриць, уваріть наполовину.', 'Додайте вершки, готуйте до злегка густого стану.', 'Приправте сіллю, перцем та лимонним соком.', 'Полийте соусом устриці, прикрасьте кропом.'],
      ru: ['Откройте устрицы, сохраните морской сок.', 'Обжарьте мелко нарезанный шалот на масле до мягкости.', 'Влейте вино и сок устриц, уварите наполовину.', 'Добавьте сливки, готовьте до слегка густого состояния.', 'Приправьте солью, перцем и лимонным соком.', 'Полейте соусом устрицы, украсьте укропом.'],
      en: ['Shuck the oysters, reserving their brine.', 'Sauté finely diced shallot in butter until soft.', 'Add wine and oyster brine; reduce by half.', 'Add cream and cook until slightly thickened.', 'Season with salt, pepper and lemon juice.', 'Spoon sauce over oysters and garnish with dill.'],
    },
    pairings: {
      uk: ['Billecart-Salmon Brut Blanc de Blancs', 'Ruinart Blanc de Blancs NV', 'Gramona III Lustros Cava Brut Nature'],
      ru: ['Billecart-Salmon Brut Blanc de Blancs', 'Ruinart Blanc de Blancs NV', 'Gramona III Lustros Cava Brut Nature'],
      en: ['Billecart-Salmon Brut Blanc de Blancs', 'Ruinart Blanc de Blancs NV', 'Gramona III Lustros Cava Brut Nature'],
    },
  },
  coffee: {
    name: { uk: 'Тірамісу класичний', ru: 'Классический тирамису', en: 'Classic Tiramisu' },
    servings: 6,
    timeMin: 45,
    sommelierNote: {
      uk: 'Подавайте з Americano або міцним еспресо. Marsala у рецепті дає теплий мигдалевий фінал.',
      ru: 'Подавайте с Americano или крепким эспрессо. Marsala в рецепте даёт тёплый миндальный финал.',
      en: 'Serve with an Americano or strong espresso. The Marsala in the recipe gives a warm almond finish.',
    },
    ingredients: {
      uk: ['500 г маскарпоне', '4 яйця', '100 г цукру', '300 мл міцного еспресо', '50 мл Marsala', '200 г савоярді (дамські пальчики)', 'Какао-порошок для посипки'],
      ru: ['500 г маскарпоне', '4 яйца', '100 г сахара', '300 мл крепкого эспрессо', '50 мл Marsala', '200 г савоярди (дамские пальчики)', 'Какао-порошок для посыпки'],
      en: ['500 g mascarpone', '4 eggs', '100 g sugar', '300 ml strong espresso', '50 ml Marsala wine', '200 g savoiardi biscuits', 'Cocoa powder for dusting'],
    },
    steps: {
      uk: ['Збийте жовтки з цукром до білої пишної маси.', 'Акуратно вмішайте маскарпоне до однорідності.', 'Окремо збийте білки до стійких піків, вмішайте у крем.', 'Змішайте охолоджений еспресо з Marsala.', 'Швидко вмочіть савоярді у кавову суміш, викладіть шаром.', 'Покрийте кремом, повторіть шари. Посипте какао. Охолоджуйте 4+ год.'],
      ru: ['Взбейте желтки с сахаром до белой пышной массы.', 'Аккуратно вмешайте маскарпоне до однородности.', 'Отдельно взбейте белки до стойких пиков, вмешайте в крем.', 'Смешайте охлаждённый эспрессо с Marsala.', 'Быстро обмакните савоярди в кофейную смесь, выложите слоем.', 'Покройте кремом, повторите слои. Посыпьте какао. Охлаждайте 4+ ч.'],
      en: ['Beat egg yolks with sugar until pale and fluffy.', 'Gently fold in mascarpone until smooth.', 'Whip egg whites to stiff peaks; fold into the cream.', 'Combine cooled espresso with Marsala.', 'Quickly dip savoiardi in coffee mixture; lay in one layer.', 'Spread cream, repeat layers. Dust with cocoa. Chill 4+ hours.'],
    },
    pairings: {
      uk: ['Espresso Martini (коктейль)', 'Single-origin Americano 18 г / 150 мл', 'Ristretto подвійний'],
      ru: ['Espresso Martini (коктейль)', 'Single-origin Americano 18 г / 150 мл', 'Доппио ристретто'],
      en: ['Espresso Martini (cocktail)', 'Single-origin Americano 18 g / 150 ml', 'Double ristretto'],
    },
  },
};

const FALLBACK_RECIPE = RECIPES.wine;

export function RecipeScreen({ language, category }: RecipeScreenProps) {
  const [saved, setSaved] = useState(false);
  const recipe = (category && RECIPES[category]) ? RECIPES[category] : FALLBACK_RECIPE;

  return (
    <div className="w-full bg-background flex flex-col pb-28">
      {/* Header card */}
      <div className="px-5 pt-6 pb-5">
        <div className="rounded-3xl border border-accent/30 bg-card p-6 space-y-3">
          <p className="text-xs text-accent uppercase tracking-widest font-semibold">
            {t('recipe.pairing_for', language)} &mdash; {t(`bev.${category ?? 'wine'}`, language)}
          </p>
          <h2 className="text-2xl font-bold text-foreground leading-tight">
            {recipe.name[language]}
          </h2>
          <div className="flex gap-6 pt-1">
            <div className="flex flex-col items-center gap-1">
              <span className="text-accent font-bold text-lg">{recipe.servings}</span>
              <span className="text-muted-foreground text-xs uppercase tracking-wide">{t('recipe.servings', language)}</span>
            </div>
            <div className="w-px bg-border" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-accent font-bold text-lg">{recipe.timeMin}</span>
              <span className="text-muted-foreground text-xs uppercase tracking-wide">{t('recipe.min', language)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sommelier note */}
      <div className="px-5 pb-4">
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4 flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-accent text-xs font-bold">S</span>
          </div>
          <div>
            <p className="text-xs text-accent font-semibold uppercase tracking-wide mb-1">
              {t('recipe.expert_note', language)}
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {recipe.sommelierNote[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="px-5 pb-4">
        <h3 className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
          {t('recipe.ingredients', language)}
        </h3>
        <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
          {recipe.ingredients[language].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <span className="w-5 h-5 rounded-full border border-accent/40 text-accent text-xs flex items-center justify-center flex-shrink-0 font-bold">
                {i + 1}
              </span>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="px-5 pb-4">
        <h3 className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
          {t('recipe.steps', language)}
        </h3>
        <div className="space-y-3">
          {recipe.steps[language].map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-foreground leading-relaxed pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pairings */}
      <div className="px-5 pb-4">
        <h3 className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
          {t('recipe.pairs_with', language)}
        </h3>
        <div className="space-y-2">
          {recipe.pairings[language].map((pair, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-accent/20 bg-card px-4 py-3">
              <span className="text-accent text-xs">&#9733;</span>
              <span className="text-sm text-foreground">{pair}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-5 flex gap-3">
        <button
          onClick={() => setSaved(true)}
          className={`flex-1 py-3 rounded-full text-sm font-semibold tracking-wide border transition ${
            saved
              ? 'bg-accent/20 border-accent text-accent'
              : 'border-accent text-accent hover:bg-accent/10'
          }`}
        >
          {saved ? '&#10003; ' : ''}{t('recipe.save', language)}
        </button>
        <button className="flex-1 py-3 rounded-full text-sm font-semibold tracking-wide bg-accent text-background hover:bg-accent/90 transition">
          {t('recipe.share', language)}
        </button>
      </div>
    </div>
  );
}
