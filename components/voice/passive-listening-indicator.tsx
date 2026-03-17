'use client';

import React, { useState, useEffect } from 'react';
import { useVoice } from '@/lib/voice-context';

export function PassiveListeningIndicator() {
  const { state, handsFreeMode, wakePhrase, startPassiveListening, stopPassiveListening } = useVoice();
  const [isActive, setIsActive] = useState(false);

  // Auto-start passive listening when hands-free is enabled
  useEffect(() => {
    if (handsFreeMode && !isActive && state === 'idle') {
      setIsActive(true);
      startPassiveListening();
    }

    return () => {
      if (isActive && state === 'listening-passive') {
        stopPassiveListening();
      }
    };
  }, [handsFreeMode, isActive, state, startPassiveListening, stopPassiveListening]);

  if (!handsFreeMode) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg">
      {/* Listening indicator */}
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>

      {/* Status text */}
      <span className="text-xs font-medium text-amber-600">
        {state === 'listening-passive' ? 'Listening for wake phrase' : 'Hands-free ready'}
      </span>

      {/* Wake phrase display */}
      <span className="text-xs text-muted-foreground ml-1">
        "{wakePhrase}"
      </span>
    </div>
  );
}
