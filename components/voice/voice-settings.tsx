'use client';

import React, { useState } from 'react';
import { useVoice } from '@/lib/voice-context';

export function VoiceSettings() {
  const { handsFreeMode, wakePhrase, setHandsFreeMode, setWakePhrase } = useVoice();
  const [isOpen, setIsOpen] = useState(false);
  const [tempWakePhrase, setTempWakePhrase] = useState(wakePhrase);

  const handleSaveWakePhrase = () => {
    if (tempWakePhrase.trim()) {
      setWakePhrase(tempWakePhrase);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        aria-label="Voice settings"
      >
        <svg
          className="w-5 h-5 text-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Voice Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Hands-Free Mode Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">
                Hands-Free Mode
              </label>
              <p className="text-xs text-muted-foreground">
                Listen for wake phrase automatically
              </p>
            </div>
            <button
              onClick={() => setHandsFreeMode(!handsFreeMode)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                handsFreeMode ? 'bg-amber-600' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  handsFreeMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Safety Info */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground">
              Hands-free mode allows the app to listen for your wake phrase. The app does not stream audio to servers.
            </p>
          </div>
        </div>

        {/* Wake Phrase Settings (only show if hands-free enabled) */}
        {handsFreeMode && (
          <div className="space-y-3 pt-3 border-t border-border">
            <label className="text-sm font-medium text-foreground block">
              Wake Phrase
            </label>

            <input
              type="text"
              value={tempWakePhrase}
              onChange={(e) => setTempWakePhrase(e.target.value)}
              placeholder="e.g., Hey Concierge"
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-600"
            />

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Preset options:</p>
              <div className="grid grid-cols-2 gap-2">
                {['Hey Concierge', 'OK Concierge', 'Tell me', 'Ask me'].map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => setTempWakePhrase(phrase)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      tempWakePhrase === phrase
                        ? 'bg-amber-600 text-white'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveWakePhrase}
              className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
            >
              Save Wake Phrase
            </button>

            <div className="bg-muted/50 rounded-lg p-3 border border-border">
              <p className="text-xs text-muted-foreground">
                Current: <strong>"{wakePhrase}"</strong>
              </p>
            </div>
          </div>
        )}

        {/* Listening Indicator Demo */}
        {handsFreeMode && (
          <div className="pt-3 border-t border-border space-y-2">
            <p className="text-xs text-muted-foreground">When active:</p>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-xs text-amber-600 font-medium">Listening passively...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
