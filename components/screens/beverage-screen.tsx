'use client';

import React, { useState } from 'react';
import { t, type Language } from '@/lib/translations';

interface BeverageScreenProps {
  language: Language;
  onSelectCategory: (category: string) => void;
}

type BevTab = 'alcoholic' | 'nonalcoholic';

interface Category {
  id: string;
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
}

const WineIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2h10l-1.5 9A5 5 0 0 1 7 11H7a5 5 0 0 1-1.5-0H7L7 2zm5 10v8m-3 2h6" />
    <path d="M6 2h12M10 20h4M12 12v8" />
    <path d="M8.5 2C8.5 2 7 6.5 7 9a5 5 0 0 0 10 0c0-2.5-1.5-7-1.5-7" />
  </svg>
);

const GlassIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14L16 14a4 4 0 0 1-8 0L5 3zM12 14v6M9 20h6" />
  </svg>
);

const BubbleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14L16 14a4 4 0 0 1-8 0L5 3zM12 14v6M9 20h6" />
    <circle cx="9" cy="7" r="0.8" fill="currentColor" />
    <circle cx="12" cy="5" r="0.8" fill="currentColor" />
    <circle cx="15" cy="7" r="0.8" fill="currentColor" />
  </svg>
);

const BottleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v3l2 3v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l2-3V3z" />
  </svg>
);

const WhiskyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <rect x="7" y="4" width="10" height="16" rx="2" />
    <path strokeLinecap="round" d="M7 8h10M7 12h6" />
  </svg>
);

const BeerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14l-1.5 12H6.5L5 8zM3 8h18M8 8V5a2 2 0 0 1 4 0v3" />
  </svg>
);

const CupIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 2h12l-1.5 14A2 2 0 0 1 14.5 18h-5a2 2 0 0 1-2-1.8L6 2zM4 7h2M18 7h2" />
    <path strokeLinecap="round" d="M9 22h6M12 18v4" />
  </svg>
);

const DropIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8 8 6 11 6 14a6 6 0 0 0 12 0c0-3-2-6-6-12z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6 2 3 7 3 12c0 6 5 10 9 10 5 0 9-4 9-10 0-5-3-10-9-10zM3 12c3-3 6-4 9-4" />
  </svg>
);

const CoffeeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 3zM16 3h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
    <path strokeLinecap="round" d="M8 20h8M12 17v3" />
  </svg>
);

const alcoholicCategories: Category[] = [
  { id: 'wine',     titleKey: 'bev.wine',     descKey: 'bev.wine.desc',     icon: <WineIcon /> },
  { id: 'sparkling',titleKey: 'bev.sparkling', descKey: 'bev.sparkling.desc', icon: <BubbleIcon /> },
  { id: 'vodka',    titleKey: 'bev.vodka',    descKey: 'bev.vodka.desc',    icon: <BottleIcon /> },
  { id: 'whisky',   titleKey: 'bev.whisky',   descKey: 'bev.whisky.desc',   icon: <WhiskyIcon /> },
  { id: 'tequila',  titleKey: 'bev.tequila',  descKey: 'bev.tequila.desc',  icon: <GlassIcon /> },
  { id: 'rum',      titleKey: 'bev.rum',      descKey: 'bev.rum.desc',      icon: <BottleIcon /> },
  { id: 'gin',      titleKey: 'bev.gin',      descKey: 'bev.gin.desc',      icon: <GlassIcon /> },
  { id: 'liqueur',  titleKey: 'bev.liqueur',  descKey: 'bev.liqueur.desc',  icon: <CupIcon /> },
  { id: 'beer',     titleKey: 'bev.beer',     descKey: 'bev.beer.desc',     icon: <BeerIcon /> },
];

const nonAlcoholicCategories: Category[] = [
  { id: 'drinks',   titleKey: 'bev.drinks',   descKey: 'bev.drinks.desc',   icon: <CupIcon /> },
  { id: 'lemonade', titleKey: 'bev.lemonade', descKey: 'bev.lemonade.desc', icon: <CupIcon /> },
  { id: 'water',    titleKey: 'bev.water',    descKey: 'bev.water.desc',    icon: <DropIcon /> },
  { id: 'juice',    titleKey: 'bev.juice',    descKey: 'bev.juice.desc',    icon: <CupIcon /> },
  { id: 'tea',      titleKey: 'bev.tea',      descKey: 'bev.tea.desc',      icon: <LeafIcon /> },
  { id: 'coffee',   titleKey: 'bev.coffee',   descKey: 'bev.coffee.desc',   icon: <CoffeeIcon /> },
];

export function BeverageScreen({ language, onSelectCategory }: BeverageScreenProps) {
  const [activeTab, setActiveTab] = useState<BevTab>('alcoholic');
  const categories = activeTab === 'alcoholic' ? alcoholicCategories : nonAlcoholicCategories;

  return (
    <div className="w-full bg-background flex flex-col pb-28">
      {/* Tab switcher */}
      <div className="sticky top-0 z-10 bg-background px-5 pt-5 pb-4">
        <div className="flex rounded-2xl border border-border overflow-hidden">
          <button
            onClick={() => setActiveTab('alcoholic')}
            className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition ${
              activeTab === 'alcoholic'
                ? 'bg-accent text-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('bev.alcoholic', language)}
          </button>
          <button
            onClick={() => setActiveTab('nonalcoholic')}
            className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition ${
              activeTab === 'nonalcoholic'
                ? 'bg-accent text-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('bev.nonalcoholic', language)}
          </button>
        </div>
      </div>

      {/* Category list */}
      <div className="px-5 space-y-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="w-full rounded-2xl border border-accent/20 bg-card hover:border-accent/50 hover:bg-card/80 p-5 flex items-center gap-4 transition group"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl border border-accent/30 bg-accent/5 group-hover:bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent transition">
              {cat.icon}
            </div>
            {/* Text */}
            <div className="flex-1 text-left">
              <h3 className="text-foreground font-semibold text-sm mb-1">
                {t(cat.titleKey, language)}
              </h3>
              <p className="text-muted-foreground text-xs tracking-wide">
                {t(cat.descKey, language)}
              </p>
            </div>
            {/* Chevron */}
            <svg
              className="w-4 h-4 text-accent/40 group-hover:text-accent transition flex-shrink-0"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
