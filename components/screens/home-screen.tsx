'use client';

import React from 'react';
import { t, type Language } from '@/lib/translations';

interface HomeScreenProps {
  language: Language;
}

interface Feature {
  icon: string;
  titleKey: string;
  descKey: string;
}

const features: Feature[] = [
  {
    icon: '📷',
    titleKey: 'feature.photo',
    descKey: 'feature.photo.desc',
  },
  {
    icon: '📚',
    titleKey: 'feature.shelf',
    descKey: 'feature.shelf.desc',
  },
  {
    icon: '🎤',
    titleKey: 'feature.voice',
    descKey: 'feature.voice.desc',
  },
  {
    icon: '🍷',
    titleKey: 'feature.pairing',
    descKey: 'feature.pairing.desc',
  },
];

export function HomeScreen({ language }: HomeScreenProps) {
  return (
    <div className="w-full bg-background flex flex-col gap-0">
      {/* Hero Section */}
      <div className="min-h-[55vh] flex flex-col items-center justify-center p-6 gap-8">
        {/* Premium Badge + Logo */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-32 h-32">
            {/* Logo Circle */}
            <div className="absolute inset-0 rounded-3xl border-2 border-accent/40 flex items-center justify-center">
              <span className="text-7xl font-bold text-accent">G</span>
            </div>
            {/* Premium Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background rounded-full border border-accent/50 px-4 py-1 flex items-center gap-2">
              <span className="text-accent text-xs">★</span>
              <span className="text-accent text-xs font-semibold tracking-widest">
                {t('home.premium', language)}
              </span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground leading-tight">
            {t('home.heading', language)}{' '}
            <span className="text-accent italic">{t('home.highlight', language)}</span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
            {t('home.description', language)}
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 pb-32 space-y-3">
        {features.map((feature, idx) => (
          <button
            key={idx}
            className="w-full rounded-2xl border border-accent/20 bg-card hover:bg-card/80 hover:border-accent/40 p-5 flex items-center gap-4 transition group"
          >
            {/* Icon Container */}
            <div className="w-14 h-14 rounded-xl border border-accent/30 flex items-center justify-center flex-shrink-0 bg-accent/5 group-hover:bg-accent/10 transition">
              <div className="w-7 h-7 rounded-lg border border-accent flex items-center justify-center text-accent text-sm font-bold">
                {feature.icon === '📷' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" /></svg>}
                {feature.icon === '📚' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 5.3L1 10.5v8L12 23l11-4.5v-8L12 5.3z" /></svg>}
                {feature.icon === '🎤' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /></svg>}
                {feature.icon === '🍷' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 3h12v2H6V3zm4 4h4v2h-4V7zm-2 4h8v8c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-8z" /></svg>}
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-left">
              <h3 className="text-foreground font-semibold text-sm mb-1">
                {t(feature.titleKey, language)}
              </h3>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                {t(feature.descKey, language)}
              </p>
            </div>

            {/* Chevron */}
            <svg className="w-5 h-5 text-accent/50 group-hover:text-accent transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
