'use client';

import { VoiceProvider } from '@/lib/voice-context';
import { AppContainer } from '@/components/app-container';

export default function Home() {
  return (
    <VoiceProvider>
      <main className="h-dvh w-full max-w-lg mx-auto flex flex-col bg-background overflow-hidden">
        <AppContainer />
      </main>
    </VoiceProvider>
  );
}
