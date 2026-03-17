'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { Language, t } from '@/lib/translations';

interface HistoryScreenProps {
  language: Language;
}

const mockHistory = [
  {
    id: '1',
    title: 'Châteauneuf-du-Pape',
    category: 'Alcoholic',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Mojito Recipe',
    category: 'Cocktail',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Fresh Orange Juice',
    category: 'Non-Alcoholic',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'Espresso',
    category: 'Beverage',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];

export function HistoryScreen({ language }: HistoryScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {t(language, 'history')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t(language, 'recentSearches')}
          </p>
        </div>

        <div className="space-y-3">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleDateString(language === 'uk' ? 'uk-UA' : language === 'ru' ? 'ru-RU' : 'en-US')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
