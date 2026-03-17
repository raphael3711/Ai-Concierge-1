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
  autoReadAnswers: boolean;
  voiceOutputEnabled: boolean;
  setHandsFreeMode: (enabled: boolean) => void;
  setWakePhrase: (phrase: string) => void;
  setAutoReadAnswers: (enabled: boolean) => void;
  setVoiceOutputEnabled: (enabled: boolean) => void;
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
  const [autoReadAnswers, setAutoReadAnswers] = useState(true);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);

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
        // Set inactivity timeout (30 seconds between phrase checks)
        if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
        inactivityTimeoutRef.current = setTimeout(() => {
          if (passiveMediaRecorderRef.current && state === 'listening-passive') {
            console.log('[v0] Inactivity timeout - stopping passive listening');
            passiveMediaRecorderRef.current.stop();
            passiveMediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
          }
        }, 30000);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(passiveAudioChunksRef.current, { type: 'audio/wav' });
        const text = await mockTranscribe(audioBlob);
        console.log('[v0] Passive listening transcribed:', text);
        
        // Check if wake phrase detected
        if (detectWakePhrase(text)) {
          console.log('[v0] Activating active listening after wake phrase detection');
          setState('idle'); // Reset to idle before active listening starts
          // Auto-trigger listening after a brief delay
          setTimeout(() => {
            startListening();
          }, 300);
        } else {
          // Resume passive listening if hands-free still enabled
          if (handsFreeMode) {
            console.log('[v0] Wake phrase not detected, resuming passive listening');
            try {
              const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
              const newMediaRecorder = new MediaRecorder(newStream);
              passiveMediaRecorderRef.current = newMediaRecorder;
              passiveAudioChunksRef.current = [];

              newMediaRecorder.ondataavailable = (e) => {
                passiveAudioChunksRef.current.push(e.data);
              };

              newMediaRecorder.onstop = mediaRecorder.onstop;
              newMediaRecorder.onstart = mediaRecorder.onstart;

              setState('listening-passive');
              newMediaRecorder.start();
            } catch (err) {
              setState('idle');
            }
          } else {
            setState('idle');
          }
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
    // Fuzzy detection - in production use Web Speech API with higher accuracy
    const normalized = text.toLowerCase().trim();
    const phraseNormalized = wakePhrase.toLowerCase().trim();
    
    // Exact match
    if (normalized === phraseNormalized) {
      console.log('[v0] Wake phrase detected (exact match)');
      return true;
    }
    
    // Substring match (good enough for voice)
    if (normalized.includes(phraseNormalized)) {
      console.log('[v0] Wake phrase detected (substring match)');
      return true;
    }
    
    // Word-based detection - all key words present
    const wordsInPhrase = phraseNormalized.split(' ');
    const allWordsFound = wordsInPhrase.every(word => 
      normalized.includes(word.toLowerCase())
    );
    
    if (allWordsFound) {
      console.log('[v0] Wake phrase detected (word match)');
      return true;
    }
    
    console.log('[v0] Wake phrase not detected. Transcribed:', text);
    return false;
  };

  const speakResponse = useCallback((text: string) => {
    // Only speak if voice output is enabled
    if (!voiceOutputEnabled || !('speechSynthesis' in window)) {
      console.log('[v0] Voice output disabled or not supported');
      setState('idle');
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    setState('speaking');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
      setState('idle');
    };

    utterance.onerror = (event) => {
      console.log('[v0] Speech synthesis error:', event.error);
      setIsSpeaking(false);
      setState('idle');
    };

    window.speechSynthesis.speak(utterance);
  }, [voiceOutputEnabled]);

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
        autoReadAnswers,
        voiceOutputEnabled,
        setHandsFreeMode,
        setWakePhrase,
        setAutoReadAnswers,
        setVoiceOutputEnabled,
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
