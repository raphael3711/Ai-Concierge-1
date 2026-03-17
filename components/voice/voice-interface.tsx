'use client';

import React, { useEffect } from 'react';
import { useVoice } from '@/lib/voice-context';
import { MicrophoneButton } from './microphone-button';
import { VoiceResponse } from './voice-response';
import { QuickActions } from './quick-actions';
import { VoiceSettings } from './voice-settings';
import { PassiveListeningIndicator } from './passive-listening-indicator';

export function VoiceInterface() {
  const { state, transcript, response, setResponse, speakResponse, error } = useVoice();

  // Mock AI response generation
  useEffect(() => {
    if (transcript && state === 'processing') {
      // Simulate API call
      const timer = setTimeout(() => {
        const mockResponse = generateMockResponse(transcript);
        setResponse(mockResponse);
        // Auto-speak the response
        speakResponse(mockResponse);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [transcript, state, setResponse, speakResponse]);

  function generateMockResponse(query: string): string {
    const lowerQuery = query.toLowerCase();

    if (
      lowerQuery.includes('steak') ||
      lowerQuery.includes('pairing') ||
      lowerQuery.includes('goes with')
    ) {
      return 'A full-bodied Cabernet Sauvignon would be perfect with steak. It has bold tannins that complement the richness of the meat beautifully. Try a 2019 Napa Valley Cabernet for excellent quality at a reasonable price.';
    }

    if (
      lowerQuery.includes('cheaper') ||
      lowerQuery.includes('budget') ||
      lowerQuery.includes('affordable')
    ) {
      return 'For a budget-friendly option, try a Côtes du Rhône. It offers excellent quality at $15-20 per bottle. Look for producers like Guigal or Chapoutier for consistent, reliable wines.';
    }

    if (
      lowerQuery.includes('non-alcoholic') ||
      lowerQuery.includes('alcohol-free') ||
      lowerQuery.includes('no alcohol')
    ) {
      return 'I recommend trying a premium non-alcoholic wine like Fre or Ariel. They use advanced dealcoholization techniques to preserve flavor. A non-alcoholic red pairs wonderfully with most foods.';
    }

    if (lowerQuery.includes('better') || lowerQuery.includes('compare')) {
      return 'The Château Margaux is the superior choice for its complexity and aging potential. It has elegant notes of blackcurrant and cedar. However, if budget is a concern, the second option offers 80% of the quality at half the price.';
    }

    return 'That\'s a great question! Based on your preferences, I recommend exploring wines from the Rhône Valley. They offer excellent quality and distinctive character. Would you like specific recommendations?';
  }

  return (
    <>
      {/* Settings */}
      <VoiceSettings />

      {/* Passive listening indicator */}
      <PassiveListeningIndicator />

      <div className="w-full min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex flex-col items-center justify-center p-4 gap-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-md">
          <h1 className="text-3xl font-bold text-foreground">AI Concierge</h1>
          <p className="text-muted-foreground">
            Ask me anything about wines and dining
          </p>
        </div>

        {/* Main voice interface */}
        <div className="w-full max-w-md">
          <MicrophoneButton />
        </div>

        {/* Response display */}
        {response && (
          <VoiceResponse
            title="Recommendation"
            description={response}
            alternatives={[
              'Château Lafite Rothschild',
              'Penfolds Grange',
              'Brunello di Montalcino',
            ]}
            confidence={0.92}
          />
        )}

        {/* Quick actions */}
        {!response && state === 'idle' && (
          <QuickActions />
        )}

        {/* Error display */}
        {error && (
          <div className="w-full max-w-md bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-700 dark:text-red-100">{error}</p>
          </div>
        )}

        {/* Status indicator */}
        {(state === 'listening' || state === 'processing') && (
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
