'use client';

import React, { useState } from 'react';
import { type Language } from '@/lib/translations';
import { PrivacyScreen } from './screens/privacy-screen';
import { HomeScreen } from './screens/home-screen';
import { BottomNav } from './layout/bottom-nav';

export function AppContainer() {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [language, setLanguage] = useState<Language>('uk');

  if (!privacyAccepted) {
    return (
      <PrivacyScreen
        language={language}
        onAccept={() => setPrivacyAccepted(true)}
      />
    );
  }

  return (
    <div className="w-full h-screen bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-card/50 border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-accent flex items-center justify-center">
            <span className="text-accent font-bold text-sm">G</span>
          </div>
          <span className="text-foreground font-bold tracking-widest text-xs">
            КОНСЬЄРЖ
          </span>
        </div>
        <button className="text-accent hover:text-accent/80 transition">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'overview' && <HomeScreen language={language} />}
        {activeTab === 'scanner' && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Scanner Screen Coming Soon</p>
          </div>
        )}
        {activeTab === 'voice' && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Voice Screen Coming Soon</p>
          </div>
        )}
        {activeTab === 'history' && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">History Screen Coming Soon</p>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Profile Screen Coming Soon</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        language={language}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
