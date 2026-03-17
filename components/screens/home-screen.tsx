'use client';

import React from 'react';
import { t, type Language } from '@/lib/translations';

interface HomeScreenProps {
  language: Language;
  onFeatureClick: (feature: string) => void;
}

interface Feature {
  id: string;
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
}

const CameraIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

const ShelfIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const MicIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);

const PairingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.023.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5M6 10.608v2.513c0 1.135.845 2.098 1.976 2.192.406.033.815.06 1.224.082m9.8-4.787v2.513c0 1.135-.845 2.098-1.976 2.192a48.424 48.424 0 01-1.224.082M9.2 13.4c.406.033.815.06 1.224.082m4.376-.082c-.406.033-.815.06-1.224.082m0 0v2.25m-4.376-2.25v2.25M9 18.75h6" />
  </svg>
);

const features: Feature[] = [
  { id: 'photo',   titleKey: 'feature.photo',   descKey: 'feature.photo.desc',   icon: <CameraIcon /> },
  { id: 'shelf',   titleKey: 'feature.shelf',   descKey: 'feature.shelf.desc',   icon: <ShelfIcon /> },
  { id: 'voice',   titleKey: 'feature.voice',   descKey: 'feature.voice.desc',   icon: <MicIcon /> },
  { id: 'pairing', titleKey: 'feature.pairing', descKey: 'feature.pairing.desc', icon: <PairingIcon /> },
];

export function HomeScreen({ language, onFeatureClick }: HomeScreenProps) {
  return (
    <div className="w-full bg-background flex flex-col">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center px-6 pt-10 pb-8 gap-7">
        {/* Logo + badge */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-28 h-28 rounded-3xl border-2 border-accent/40 bg-card flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <span className="text-6xl font-bold text-accent" style={{ fontFamily: 'Georgia, serif' }}>G</span>
          </div>
          <div className="bg-background rounded-full border border-accent/50 px-4 py-1 flex items-center gap-2 -mt-5 shadow-sm">
            <span className="text-accent text-xs">&#9733;</span>
            <span className="text-accent text-xs font-bold tracking-widest">
              {t('home.premium', language)}
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground leading-tight text-balance">
            {t('home.heading', language)}{' '}
            <em className="not-italic text-accent" style={{ fontFamily: 'Georgia, serif' }}>
              {t('home.highlight', language)}
            </em>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto text-pretty">
            {t('home.description', language)}
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="px-5 pb-32 space-y-3">
        {features.map((feat) => (
          <button
            key={feat.id}
            onClick={() => onFeatureClick(feat.id)}
            className="w-full rounded-2xl border border-accent/20 bg-card hover:border-accent/50 hover:bg-card/70 p-5 flex items-center gap-4 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl border border-accent/30 bg-accent/5 group-hover:bg-accent/12 flex items-center justify-center flex-shrink-0 text-accent transition-colors">
              {feat.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-foreground font-semibold text-sm mb-1">
                {t(feat.titleKey, language)}
              </h3>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                {t(feat.descKey, language)}
              </p>
            </div>
            <svg className="w-4 h-4 text-accent/40 group-hover:text-accent transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
