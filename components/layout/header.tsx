'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import { t, Language } from '@/lib/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [showLanguageMenu, setShowLanguageMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border border-amber-600/50 flex items-center justify-center bg-black/40">
            <span className="text-amber-500 text-lg font-bold">G</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground tracking-widest">
              {t(language, 'appName')}
            </h1>
            <p className="text-xs text-muted-foreground">PREMIUM EDITION</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground transition-colors"
            title="Language"
          >
            <Settings size={20} />
          </button>

          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
              {(['en', 'uk', 'ru'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang);
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    language === lang
                      ? 'bg-amber-500/20 text-amber-500'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'uk' ? 'Українська' : 'Русский'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
