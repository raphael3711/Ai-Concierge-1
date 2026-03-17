'use client';

import React from 'react';
import { t, type Language } from '@/lib/translations';

interface PrivacyScreenProps {
  language: Language;
  onAccept: () => void;
}

export function PrivacyScreen({ language, onAccept }: PrivacyScreenProps) {
  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-6 gap-8">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center">
            <span className="text-accent font-bold text-lg">G</span>
          </div>
          <span className="text-foreground font-bold tracking-widest text-sm">
            {t('header.title', language)}
          </span>
        </div>
        <button className="text-accent hover:text-accent/80 transition">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Privacy Message Card */}
      <div className="w-full max-w-md space-y-6">
        <div className="rounded-3xl border border-accent/30 bg-card/50 p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center flex-shrink-0">
              <span className="text-accent text-lg font-bold">i</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                {t('privacy.title', language)}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('privacy.message', language)}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onAccept}
          className="w-full rounded-full border-2 border-accent px-6 py-3 text-accent font-semibold tracking-wide text-sm hover:bg-accent/10 transition duration-300"
        >
          {t('privacy.button', language)}
        </button>
      </div>

      {/* Subtitle */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground tracking-widest font-light">
          {t('privacy.subtitle', language)}
        </p>
      </div>
    </div>
  );
}
