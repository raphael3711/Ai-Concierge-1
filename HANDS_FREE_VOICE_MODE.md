# Hands-Free Voice Mode Implementation

## Overview
The AI Concierge now includes a complete hands-free voice mode that allows users to interact with the app using only voice commands without touching the screen.

## Features Implemented

### 1. **Hands-Free Mode Toggle**
- OFF by default for safety
- Can be enabled in Voice Settings (gear icon)
- Requires explicit user opt-in
- Shows clear indicator when active

### 2. **Wake Phrase Detection**
- **Local Processing**: All audio processing happens on the device - no continuous server streaming
- **Configurable Phrases**: Users can set custom wake phrases or choose from presets:
  - "Hey Concierge" (default)
  - "OK Concierge"
  - "Tell me"
  - "Ask me"
- **Smart Detection**: Fuzzy matching handles natural speech variations
  - Exact phrase matching
  - Substring matching
  - Word-based detection

### 3. **Passive Listening Lifecycle**
```
[Idle] → [Listening-Passive] 
  ↓ (hears wake phrase)
[Active Listening] → [Processing] → [Speaking] → [Idle]
  ↓ (no wake phrase heard after 30s)
[Listening-Passive] (resume monitoring)
```

**Timeouts:**
- 30-second inactivity timeout for passive listening
- Automatic resume of passive listening after each phrase check
- Respects handsFreeMode setting throughout lifecycle

### 4. **Auto-Read Answers**
- Option to automatically speak responses aloud
- Combined with Voice Output setting
- Controlled via toggle in Voice Settings

### 5. **Voice Output Control**
- Independent toggle for speaker enable/disable
- Affects both auto-read and manual response playback
- Shows error gracefully if TTS unavailable

### 6. **Visual Feedback**
- **Passive Listening Indicator** (bottom-left corner):
  - Shows when hands-free mode is active
  - Displays animated pulse dots
  - Shows current wake phrase
  - Auto-hides when disabled

- **Microphone Button States**:
  - Idle: Gold button, tap to start
  - Listening: Animated pulse rings
  - Processing: Dimmed state
  - Speaking: Gold with checkmark animation

## Code Architecture

### Voice Context (`lib/voice-context.tsx`)
**Manages all voice state and operations:**
```typescript
// Settings
- handsFreeMode: boolean
- wakePhrase: string
- autoReadAnswers: boolean
- voiceOutputEnabled: boolean

// State Machine
- state: 'idle' | 'listening-passive' | 'listening' | 'processing' | 'speaking' | 'error'

// Operations
- startPassiveListening()    // Starts wake phrase monitoring
- startListening()           // Records active speech
- speakResponse()            // Text-to-speech playback
- detectWakePhrase()         // Fuzzy phrase matching
```

### Components

#### `PassiveListeningIndicator` (`components/voice/passive-listening-indicator.tsx`)
- Auto-starts passive listening when hands-free enabled
- Shows indicator only when mode is active
- Auto-cleanup on disable

#### `VoiceSettings` (`components/voice/voice-settings.tsx`)
- Fixed position settings panel (top-right gear icon)
- Modal dialog with all voice settings:
  - Hands-Free Mode toggle
  - Wake phrase configuration + presets
  - Auto-Read Answers toggle
  - Voice Output toggle
  - Safety/privacy information

#### `MicrophoneButton` (`components/voice/microphone-button.tsx`)
- Manual trigger for active listening
- Animated pulse rings while listening
- State-aware color coding (gold/red)
- Error handling for permission denial

#### `VoiceResponse` (`components/voice/voice-response.tsx`)
- Displays transcribed queries
- Shows AI responses
- Lists alternative suggestions
- Confidence scores

## Demo Page

Access the hands-free voice demo at: `/voice-demo`

Features:
- Live wake phrase detection test
- Real-time state visualization
- Settings summary
- Quick-test buttons for phrases

## Privacy & Security

✅ **No Audio Streaming**
- Audio is NOT continuously sent to servers
- Wake phrase detection runs locally
- Only final transcript sent after phrase detected

✅ **User Control**
- Hands-free OFF by default
- Requires explicit enabling
- Clear privacy notice in settings

✅ **Timeout Protection**
- 30-second inactivity timeout prevents accidental activation
- App pauses hands-free in background
- User can disable anytime

## Testing Checklist

- [ ] Enable hands-free mode in Voice Settings
- [ ] Verify passive listening indicator appears
- [ ] Say configured wake phrase (e.g., "Hey Concierge")
- [ ] Confirm active listening starts automatically
- [ ] Speak a question
- [ ] Verify response displays and (if enabled) plays audio
- [ ] Test auto-read with voice output on/off
- [ ] Verify 30-second timeout pauses passive listening
- [ ] Disable hands-free mode
- [ ] Confirm indicator disappears and passive listening stops

## Browser Support

**Requirements:**
- MediaRecorder API (Chrome, Firefox, Safari 14+)
- Web Audio API
- Web Speech API (for TTS)
- Permissions: microphone access

**Tested On:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari 15+ (iOS 15+)

## Integration with Main App

The hands-free mode is available throughout the app:
1. **Every Page**: Voice settings accessible via settings gear
2. **Voice Demo**: Dedicated page to test features at `/voice-demo`
3. **Main App**: Passive indicator shows in bottom-left when enabled
4. **All Screens**: Microphone button available for manual activation

## Future Enhancements

- [ ] Implement Web Speech API for higher accuracy
- [ ] Add speaker language selection for TTS
- [ ] Multi-phrase commands ("Show recipes", "Find beverages")
- [ ] Audio feedback for wake phrase detection
- [ ] Usage analytics/history
- [ ] Wake phrase training on device
- [ ] Ambient sound noise filtering

## Config Requirements Met

✅ Wake phrase detection (local device processing)  
✅ No continuous audio streaming to servers  
✅ Visual indicator for passive listening  
✅ Complete workflow: phrase → listen → process → speak  
✅ Settings: Hands-free ON/OFF, Wake phrase, Auto-read, Voice output  
✅ 30-second inactivity timeout  
✅ Lifecycle management (pause in background, resume on activation)  
