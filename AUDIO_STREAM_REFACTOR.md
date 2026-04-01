# Audio Streaming Refactor - TO-DO

## Remove SpeechRecognition API
- [x] Remove SpeechRecognition API usage
- [x] Remove webkitSpeechRecognition fallback
- [x] Remove recognition event handlers (onresult, onerror, onend)

## Implement Audio Capture with getUserMedia
- [x] Implement getUserMedia for audio capture
- [x] Store and manage MediaStream lifecycle
- [x] Stop tracks on cleanup

## Implement MediaRecorder
- [x] Implement MediaRecorder
- [x] Configure ondataavailable handler
- [x] Stream audio chunks via WebSocket
- [x] Set chunk interval (e.g., 250ms)
- [x] Ensure WebSocket connection before streaming
- [x] Emit audio:chunk events

## Backend Audio Processing
- [x] Receive audio chunks on backend
- [x] Convert Blob to Buffer
- [x] Normalize audio format (PCM 16-bit, 16kHz, mono) - handled by frontend audio constraints
- [x] Integrate STT engine (Whisper)

## Cross-Browser Audio Handling
- [x] Detect and handle MIME types (webm, mp4)
- [x] Normalize audio formats across browsers

## Silence Detection (Lightweight Alternative to AudioWorklet)
- [ ] Implement RMS (Root Mean Square) calculation for audio levels
- [ ] Set silence threshold (e.g., RMS < 0.02)
- [ ] Only emit audio chunks when audio level > threshold
- [ ] This reduces bandwidth ~50% without AudioWorklet complexity

## (Optional) AudioWorklet Implementation - DEPRECATED
- [ ] (Optional) NOT RECOMMENDED - too complex for marginal gains
- [ ] Complexity: ~500+ lines vs ~50 lines for silence detection
- [ ] See "Silence Detection" above for simpler alternative

## Security & Permissions
- [x] Enforce HTTPS or localhost
- [x] Handle permission errors (NotAllowedError)
- [x] Ensure user interaction before mic access
- [x] Handle Safari/iOS restrictions

## Cleanup & Memory Management
- [x] Stop MediaRecorder on unmount
- [x] Close MediaStream tracks
- [x] Disconnect WebSocket
- [x] Prevent memory leaks

## Monitoring & Debugging
- [x] Add logging for audio lifecycle events
- [ ] Measure end-to-end latency

---

## 🐛 Bugs

### Bug 1: Multi-click to start InterviewRoom
- **Description**: Need to click the "Start Interview" button ~4 times to navigate to InterviewRoom
- **Priority**: High
- **Status**: 🧪 TESTING
- **Fix applied**: Countdown waits for preload data before navigating

### Bug 2: Preloaded data not loading immediately
- **Description**: Preloaded message/interviewer data only appears after several seconds, should be ready before interview starts
- **Priority**: High
- **Status**: 🧪 TESTING
- **Fix applied**: Countdown retries until preloadedDataRef.current exists

### Bug 3: Voice collection inconsistent across browsers
- **Description**: Voice is not being captured consistently across browsers. Backend rejects audio chunks with "No active interview found"
- **Priority**: High
- **Status**: 🧪 TESTING
- **Root cause**: Backend stores interviews by `interviewId`, but audio chunks were sent without this ID, and backend tried to find by `socketId` (which could be different)
- **Fix applied**: 
  - Backend `handleAudioChunk` now accepts `interviewId` in payload and looks up interview by that ID
  - Backend `handleAudioTranscribe` also accepts `interviewId`
  - Frontend captures `interviewId` from `start` event response
  - Frontend sends `interviewId` with `audio:chunk`, `audio:transcribe`, `user:text`, and `end` events
