'use client';

import React, { useEffect } from 'react';
import { VoiceProvider, useVoice } from '@/lib/voice-context';
import { MicrophoneButton } from '@/components/voice/microphone-button';
import { VoiceResponse } from '@/components/voice/voice-response';
import { PassiveListeningIndicator } from '@/components/voice/passive-listening-indicator';
import { VoiceSettings } from '@/components/voice/voice-settings';
import { QuickActions } from '@/components/voice/quick-actions';

function VoiceDemoContent() {
  const {
    state,
    transcript,
    response,
    handsFreeMode,
    autoReadAnswers,
    voiceOutputEnabled,
    speakResponse,
    resetState,
  } = useVoice();

  // Auto-read responses if enabled
  useEffect(() => {
    if (response && autoReadAnswers && voiceOutputEnabled && state === 'idle') {
      setTimeout(() => {
        speakResponse(response);
      }, 500);
    }
  }, [response, autoReadAnswers, voiceOutputEnabled, state, speakResponse]);

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-6 gap-8 pb-20">
      {/* Settings and Indicators */}
      <VoiceSettings />
      <PassiveListeningIndicator />

      {/* Header */}
      <div className="text-center space-y-3 max-w-md">
        <h1 className="text-4xl font-bold text-foreground text-balance">
          Hands-Free Voice Concierge
        </h1>
        <p className="text-muted-foreground text-lg">
          {handsFreeMode 
            ? '🎤 Say "Hey Concierge" to start' 
            : 'Press the microphone button to speak'}
        </p>

        {/* Status indicator */}
        <div className="pt-4">
          {state === 'listening-passive' && (
            <p className="text-sm text-amber-600 font-medium animate-pulse">
              Waiting for wake phrase...
            </p>
          )}
          {state === 'listening' && (
            <p className="text-sm text-amber-600 font-medium animate-pulse">
              Listening to your voice...
            </p>
          )}
          {state === 'processing' && (
            <p className="text-sm text-amber-600 font-medium">
              Thinking...
            </p>
          )}
          {state === 'speaking' && (
            <p className="text-sm text-amber-600 font-medium animate-pulse">
              Speaking response...
            </p>
          )}
        </div>
      </div>

      {/* Microphone Button */}
      <div className="w-full max-w-md">
        <MicrophoneButton />
      </div>

      {/* Quick Actions */}
      {!response && state === 'idle' && <QuickActions />}

      {/* Transcript Display */}
      {transcript && (
        <div className="w-full max-w-md bg-card border border-border rounded-lg p-4 space-y-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            You said
          </p>
          <p className="text-foreground text-lg">{transcript}</p>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div className="w-full max-w-md space-y-4">
          <VoiceResponse
            title="Response"
            description={response}
            alternatives={[]}
            confidence={0.95}
          />
          
          <button
            onClick={() => resetState()}
            className="w-full px-4 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors"
          >
            Ask Another Question
          </button>
        </div>
      )}

      {/* Info Panel */}
      <div className="w-full max-w-md bg-muted/30 border border-border rounded-lg p-4 space-y-3 text-sm text-muted-foreground">
        <div className="space-y-2">
          <p className="font-semibold text-foreground">💡 Settings Summary:</p>
          <ul className="space-y-1 text-xs">
            <li>• Hands-Free: {handsFreeMode ? '✓ Enabled' : '✗ Disabled'}</li>
            <li>• Auto-Read: {autoReadAnswers ? '✓ Enabled' : '✗ Disabled'}</li>
            <li>• Voice Output: {voiceOutputEnabled ? '✓ Enabled' : '✗ Disabled'}</li>
          </ul>
        </div>
        <p className="text-xs">
          Open settings (⚙️) to enable hands-free mode and configure wake phrase detection.
        </p>
      </div>
    </div>
  );
}

export default function VoiceDemoPage() {
  return (
    <VoiceProvider>
      <VoiceDemoContent />
    </VoiceProvider>
  );
}
