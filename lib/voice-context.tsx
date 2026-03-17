'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

export type VoiceState = 'idle' | 'permission-denied' | 'listening' | 'processing' | 'speaking' | 'error';

interface VoiceContextType {
  state: VoiceState;
  transcript: string;
  response: string;
  isListening: boolean;
  isSpeaking: boolean;
  error: string | null;
  startListening: () => Promise<void>;
  stopListening: () => void;
  speakResponse: (text: string) => void;
  stopSpeaking: () => void;
  resetState: () => void;
  setTranscript: (text: string) => void;
  setResponse: (text: string) => void;
  mediaRecorder: MediaRecorder | null;
  audioContext: AudioContext | null;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const synth = useRef(window.speechSynthesis);

  const startListening = useCallback(async () => {
    try {
      setState('listening');
      setError(null);
      setTranscript('');
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstart = () => {
        console.log('[v0] Recording started');
      };

      mediaRecorder.onstop = async () => {
        setState('processing');
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        setState('permission-denied');
        setError('Microphone permission denied');
      } else {
        setState('error');
        setError(err.message || 'Failed to access microphone');
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && state === 'listening') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  }, [state]);

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      const text = await mockTranscribe(audioBlob);
      setTranscript(text);
    } catch (err) {
      setState('error');
      setError('Failed to transcribe audio');
    }
  };

  const mockTranscribe = async (blob: Blob): Promise<string> => {
    // Mock transcription - in production use Web Speech API or cloud service
    return new Promise(resolve => {
      setTimeout(() => {
        const mocks = [
          'What wine goes with steak?',
          'What is the cheaper option?',
          'Is there a non-alcoholic alternative?',
          'Which one is better?',
          'Tell me about this wine'
        ];
        resolve(mocks[Math.floor(Math.random() * mocks.length)]);
      }, 1000);
    });
  };

  const speakResponse = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      setState('speaking');

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onend = () => {
        setIsSpeaking(false);
        setState('idle');
      };

      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setState('idle');
  }, []);

  const resetState = useCallback(() => {
    setState('idle');
    setTranscript('');
    setResponse('');
    setError(null);
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
  }, []);

  return (
    <VoiceContext.Provider
      value={{
        state,
        transcript,
        response,
        isListening: state === 'listening',
        isSpeaking,
        error,
        startListening,
        stopListening,
        speakResponse,
        stopSpeaking,
        resetState,
        setTranscript,
        setResponse,
        mediaRecorder: mediaRecorderRef.current,
        audioContext: audioContextRef.current,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within VoiceProvider');
  }
  return context;
}
