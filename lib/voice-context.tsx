'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

export type VoiceState = 'idle' | 'permission-denied' | 'listening' | 'processing' | 'speaking' | 'error' | 'listening-passive';

interface VoiceContextType {
  state: VoiceState;
  transcript: string;
  response: string;
  isListening: boolean;
  isSpeaking: boolean;
  error: string | null;
  handsFreeMode: boolean;
  wakePhrase: string;
  setHandsFreeMode: (enabled: boolean) => void;
  setWakePhrase: (phrase: string) => void;
  startListening: () => Promise<void>;
  stopListening: () => void;
  startPassiveListening: () => Promise<void>;
  stopPassiveListening: () => void;
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
  const [handsFreeMode, setHandsFreeMode] = useState(false);
  const [wakePhrase, setWakePhrase] = useState('Hey Concierge');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const passiveMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const passiveAudioChunksRef = useRef<Blob[]>([]);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  const startPassiveListening = useCallback(async () => {
    try {
      setState('listening-passive');
      setError(null);
      passiveAudioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      passiveMediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        passiveAudioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstart = () => {
        console.log('[v0] Passive listening started');
        // Set inactivity timeout (20 seconds)
        if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
        inactivityTimeoutRef.current = setTimeout(() => {
          if (passiveMediaRecorderRef.current && state === 'listening-passive') {
            stopPassiveListening();
          }
        }, 20000);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(passiveAudioChunksRef.current, { type: 'audio/wav' });
        const text = await mockTranscribe(audioBlob);
        
        // Check if wake phrase detected
        if (detectWakePhrase(text)) {
          console.log('[v0] Wake phrase detected');
          // Auto-trigger listening
          await startListening();
        } else {
          setState('idle');
        }
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
  }, [state]);

  const stopPassiveListening = useCallback(() => {
    if (passiveMediaRecorderRef.current && state === 'listening-passive') {
      passiveMediaRecorderRef.current.stop();
      passiveMediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  }, [state]);

  const detectWakePhrase = (text: string): boolean => {
    // Simple fuzzy detection - in production use proper speech recognition
    const normalized = text.toLowerCase().trim();
    const phraseNormalized = wakePhrase.toLowerCase().trim();
    
    // Check for exact match or partial match with at least 60% similarity
    if (normalized.includes(phraseNormalized)) return true;
    
    // Simple word-based detection
    const wordsInPhrase = phraseNormalized.split(' ');
    return wordsInPhrase.every(word => normalized.includes(word));
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
        handsFreeMode,
        wakePhrase,
        setHandsFreeMode,
        setWakePhrase,
        startListening,
        stopListening,
        startPassiveListening,
        stopPassiveListening,
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
