'use client';

import React from 'react';
import { t, type Language } from '@/lib/translations';

interface TabItem {
  id: string;
  labelKey: string;
  icon: (active: boolean) => React.ReactNode;
}

interface BottomNavProps {
  activeTab: string;
  language: Language;
  onTabChange: (tabId: string) => void;
}

const tabs: TabItem[] = [
  {
    id: 'overview',
    labelKey: 'tab.overview',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'scanner',
    labelKey: 'tab.scanner',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c1.486 0 2.785.364 3.947 1.053M3 5v5m0-8h16M3 12v7c0 1.657 1.343 3 3 3h12c1.657 0 3-1.343 3-3v-7" />
      </svg>
    ),
  },
  {
    id: 'voice',
    labelKey: 'tab.voice',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
      </svg>
    ),
  },
  {
    id: 'history',
    labelKey: 'tab.history',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'profile',
    labelKey: 'tab.profile',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export function BottomNav({ activeTab, language, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border flex items-center justify-around max-w-lg mx-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-4 transition ${
              isActive
                ? 'text-accent'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.icon(isActive)}
            <span className="text-xs font-semibold tracking-wide">
              {t(tab.labelKey, language)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
