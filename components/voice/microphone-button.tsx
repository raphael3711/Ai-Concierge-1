'use client';

import React, { useEffect, useState } from 'react';
import { useVoice } from '@/lib/voice-context';

export function MicrophoneButton() {
  const { state, isListening, startListening, stopListening, error } = useVoice();
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    if (!isListening) return;

    const interval = setInterval(() => {
      setPulseScale(prev => (prev >= 1.3 ? 1 : prev + 0.1));
    }, 50);

    return () => clearInterval(interval);
  }, [isListening]);

  const handleClick = async () => {
    if (state === 'listening') {
      stopListening();
    } else if (state === 'permission-denied') {
      // Open settings
      window.open('about:preferences#privacy', '_blank');
    } else {
      await startListening();
    }
  };

  const buttonStates = {
    idle: 'bg-amber-600 hover:bg-amber-700',
    'permission-denied': 'bg-red-600 hover:bg-red-700',
    listening: 'bg-amber-600',
    processing: 'bg-amber-600 opacity-70',
    speaking: 'bg-amber-600',
    error: 'bg-red-600 hover:bg-red-700',
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Pulse rings */}
        {isListening && (
          <>
            <div
              className="absolute inset-0 rounded-full bg-amber-600 opacity-20"
              style={{
                transform: `scale(${pulseScale + 0.2})`,
              }}
            />
            <div
              className="absolute inset-0 rounded-full bg-amber-600 opacity-10"
              style={{
                transform: `scale(${pulseScale + 0.4})`,
              }}
            />
          </>
        )}

        {/* Main button */}
        <button
          onClick={handleClick}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 ${
            buttonStates[state]
          }`}
          disabled={state === 'processing'}
        >
          {/* Microphone icon */}
          <svg
            className={`w-10 h-10 transition-opacity ${
              state === 'processing' ? 'opacity-50' : 'opacity-100'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 16.91c-1.48 1.46-3.51 2.36-5.77 2.36-2.26 0-4.29-.9-5.77-2.36l-1.1 1.1c1.86 1.86 4.41 3 7.07 3s5.21-1.14 7.07-3l-1.1-1.1zM12 20c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1z" />
          </svg>
        </button>
      </div>

      {/* State indicators */}
      <div className="h-6">
        {state === 'listening' && (
          <p className="text-sm font-medium text-amber-600">Listening...</p>
        )}
        {state === 'processing' && (
          <p className="text-sm font-medium text-amber-600">Processing...</p>
        )}
        {state === 'speaking' && (
          <p className="text-sm font-medium text-amber-600">Speaking...</p>
        )}
        {state === 'permission-denied' && (
          <p className="text-sm font-medium text-red-600">Permission denied</p>
        )}
        {error && state === 'error' && (
          <p className="text-sm font-medium text-red-600">Error: {error}</p>
        )}
      </div>
    </div>
  );
}
