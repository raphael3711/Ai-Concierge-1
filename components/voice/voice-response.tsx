'use client';

import React from 'react';
import { useVoice } from '@/lib/voice-context';
import { Button } from '@/components/ui/button';

interface VoiceResponseProps {
  title?: string;
  description?: string;
  alternatives?: string[];
  confidence?: number;
}

export function VoiceResponse({
  title,
  description,
  alternatives,
  confidence,
}: VoiceResponseProps) {
  const { response, isSpeaking, speakResponse, stopSpeaking, transcript } = useVoice();

  const displayText = response || description;

  if (!displayText && !transcript) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Transcript display */}
      {transcript && (
        <div className="bg-muted p-4 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Your question:</p>
          <p className="text-foreground font-medium">{transcript}</p>
        </div>
      )}

      {/* Response card */}
      {displayText && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4 shadow-md">
          {title && (
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
          )}

          <div className="space-y-2">
            <p className="text-foreground leading-relaxed">{displayText}</p>

            {confidence !== undefined && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-muted-foreground">Confidence:</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(confidence * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Alternatives */}
          {alternatives && alternatives.length > 0 && (
            <div className="pt-3 border-t border-border">
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Alternatives:
              </p>
              <ul className="space-y-1">
                {alternatives.map((alt, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-foreground flex items-start gap-2"
                  >
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => speakResponse(displayText)}
              disabled={isSpeaking}
              variant="outline"
              size="sm"
            >
              {isSpeaking ? 'Speaking...' : 'Speak'}
            </Button>

            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                variant="outline"
                size="sm"
              >
                Stop
              </Button>
            )}

            <Button
              onClick={() => {
                // Save to favorites
              }}
              variant="outline"
              size="sm"
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
