'use client';

import React from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Language, t } from '@/lib/translations';

interface ProfileScreenProps {
  language: Language;
}

export function ProfileScreen({ language }: ProfileScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <div className="bg-gradient-to-b from-amber-500/10 to-transparent p-6 rounded-lg border border-amber-500/20 text-center">
          <div className="w-24 h-24 rounded-full bg-secondary border-2 border-amber-500 mx-auto mb-4 flex items-center justify-center">
            <User size={48} className="text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            {t(language, 'premiumUser')}
          </h2>
          <p className="text-sm text-muted-foreground">
            Gourmet Concierge Premium Member
          </p>
        </div>

        {/* Settings Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">
            {t(language, 'preferences')}
          </h3>
          <button className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors text-left">
            <Settings size={20} className="text-amber-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm">
                {t(language, 'appSettings')}
              </p>
              <p className="text-xs text-muted-foreground">
                Notifications, language, privacy
              </p>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 bg-card border border-border rounded-lg text-center">
            <p className="text-2xl font-bold text-amber-500">42</p>
            <p className="text-xs text-muted-foreground mt-1">
              {t(language, 'searches')}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg text-center">
            <p className="text-2xl font-bold text-amber-500">18</p>
            <p className="text-xs text-muted-foreground mt-1">
              {t(language, 'favorites')}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg text-center">
            <p className="text-2xl font-bold text-amber-500">9</p>
            <p className="text-xs text-muted-foreground mt-1">
              {t(language, 'shared')}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-lg hover:bg-red-900/30 transition-colors text-left">
          <LogOut size={20} className="text-red-500 flex-shrink-0" />
          <p className="font-semibold text-red-400 text-sm">
            {t(language, 'logout')}
          </p>
        </button>
      </div>
    </div>
  );
}
