'use client';

import { VoiceProvider } from '@/lib/voice-context';
import { VoiceInterface } from '@/components/voice/voice-interface';

export default function Home() {
  return (
    <VoiceProvider>
      <main className="h-dvh w-full max-w-2xl mx-auto flex flex-col bg-background">
        <VoiceInterface />
      </main>
    </VoiceProvider>
  );
}
