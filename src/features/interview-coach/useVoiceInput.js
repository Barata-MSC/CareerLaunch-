import { useCallback, useEffect, useRef, useState } from 'react';
import { requireOptionalNativeModule } from 'expo';
import { AppState, Platform } from 'react-native';

export const MAX_ANSWER_LENGTH = 2000;
const BUILD_UNAVAILABLE_MESSAGE =
  'Voice input is unavailable in this app build. Install the Android development build with speech recognition enabled, or type your answer instead.';
const UNSUPPORTED_BROWSER_MESSAGE =
  'Voice input is not supported in this browser. Try Chrome or a supported Edge version, or type your answer instead.';
const WEB_PERMISSION_DENIED_MESSAGE =
  'Microphone access was denied by your browser. Allow it in this site’s browser permissions and try again, or type your answer.';
const DEVICE_UNAVAILABLE_MESSAGE =
  'Speech recognition is unavailable on this device. You can type your answer instead.';
const SPEECH_START_TIMEOUT_MS = 12000;

function joinTranscript(...parts) {
  return parts.map((part) => part.trim()).filter(Boolean).join(' ').trim();
}

function isAppActive(state) {
  return state == null || state === 'active';
}

function waitForAppActive(timeoutMs = 5000) {
  if (isAppActive(AppState.currentState)) return Promise.resolve(true);

  return new Promise((resolve) => {
    let subscription;
    let timeout;
    const finish = (isActive) => {
      subscription?.remove();
      clearTimeout(timeout);
      resolve(isActive);
    };
    subscription = AppState.addEventListener('change', (state) => {
      if (isAppActive(state)) finish(true);
    });
    timeout = setTimeout(() => finish(false), timeoutMs);
  });
}

function getSpeechErrorMessage(error, platform) {
  if (error?.error === 'not-allowed') {
    return platform === 'web'
      ? WEB_PERMISSION_DENIED_MESSAGE
      : 'Microphone or speech permission was denied. Enable it in your device settings to use voice input, or type your answer.';
  }
  if (error?.error === 'service-not-allowed' || error?.error === 'language-not-supported') {
    return DEVICE_UNAVAILABLE_MESSAGE;
  }
  if (error?.error === 'audio-capture') {
    return 'The microphone could not be started. Check microphone access and try again, or type your answer.';
  }
  if (error?.error === 'busy') {
    return 'The speech service is busy. Wait a moment and try again.';
  }
  if (error?.error === 'no-speech' || error?.error === 'speech-timeout') {
    return 'No speech was recognized. Try again or type your answer.';
  }
  if (error?.error === 'network') {
    return 'The device speech service could not complete transcription. Try again or type your answer.';
  }
  return 'Voice input could not start. Try again or type your answer.';
}

export default function useVoiceInput({
  active = true,
  maxLength = MAX_ANSWER_LENGTH,
  onTranscript,
} = {}) {
  const [availabilityState, setAvailabilityState] = useState('checking');
  const [availabilityMessage, setAvailabilityMessage] = useState('Checking voice input availability…');
  const [requestingPermission, setRequestingPermission] = useState(false);
  const [starting, setStarting] = useState(false);
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [didRecognizeSpeech, setDidRecognizeSpeech] = useState(false);

  const moduleRef = useRef(null);
  const supportedRef = useRef(false);
  const requestIdRef = useRef(0);
  const onTranscriptRef = useRef(onTranscript);
  const startTimeoutRef = useRef(null);
  const isMountedRef = useRef(true);
  const activeRef = useRef(active);
  const appActiveRef = useRef(isAppActive(AppState.currentState));
  const listeningRef = useRef(false);
  const hasTranscriptRef = useRef(false);
  const stopRequestedRef = useRef(false);
  const permissionRequestRef = useRef(false);
  const baseTranscriptRef = useRef('');
  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');
  const maxLengthRef = useRef(maxLength);

  maxLengthRef.current = maxLength;
  onTranscriptRef.current = onTranscript;
  activeRef.current = active;

  const updateTranscript = useCallback((value) => {
    setTranscript(value);
    onTranscriptRef.current?.(value);
  }, []);

  const clearStartTimeout = useCallback(() => {
    if (startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
  }, []);

  const abort = useCallback(() => {
    requestIdRef.current += 1;
    clearStartTimeout();
    const speechModule = moduleRef.current;
    if (speechModule && listeningRef.current) {
      try {
        speechModule.abort();
      } catch {
        setError('Voice input stopped unexpectedly. You can continue by typing.');
      }
    }
    listeningRef.current = false;
    setRequestingPermission(false);
    setListening(false);
    setStarting(false);
    setProcessing(false);
  }, [clearStartTimeout]);

  useEffect(() => {
    isMountedRef.current = true;

    let subscriptions = [];
    let disposed = false;

    const initialize = async () => {
      try {
        if (Platform.OS !== 'web' && !requireOptionalNativeModule('ExpoSpeechRecognition')) {
          setAvailabilityState('unavailable-native-module');
          setAvailabilityMessage(BUILD_UNAVAILABLE_MESSAGE);
          return;
        }

        const speechPackage = await import('expo-speech-recognition');
        if (disposed) return;

        const speechModule = speechPackage.ExpoSpeechRecognitionModule;
        const supported = speechModule.isRecognitionAvailable();
        if (!supported) {
          setAvailabilityState(Platform.OS === 'web' ? 'unsupported-browser' : 'unavailable-speech-service');
          setAvailabilityMessage(
            Platform.OS === 'web' ? UNSUPPORTED_BROWSER_MESSAGE : DEVICE_UNAVAILABLE_MESSAGE,
          );
          return;
        }

        moduleRef.current = speechModule;
        supportedRef.current = true;
        subscriptions = [
          speechModule.addListener('start', () => {
            if (!isMountedRef.current) return;
            clearStartTimeout();
            if (!activeRef.current || !appActiveRef.current) {
              try {
                speechModule.abort();
              } catch {
                // Recognition may have already stopped.
              }
              listeningRef.current = false;
              setRequestingPermission(false);
              setStarting(false);
              return;
            }
            listeningRef.current = true;
            setRequestingPermission(false);
            setStarting(false);
            setListening(true);
            setProcessing(false);
            setError('');
          }),
          speechModule.addListener('result', (event) => {
            if (!isMountedRef.current || !activeRef.current || !appActiveRef.current) return;
            const recognizedText = event?.results?.[0]?.transcript?.trim() || '';
            if (!recognizedText) return;

            hasTranscriptRef.current = true;
            setDidRecognizeSpeech(true);
            if (event.isFinal) {
              finalTranscriptRef.current = joinTranscript(finalTranscriptRef.current, recognizedText);
              interimTranscriptRef.current = '';
            } else {
              interimTranscriptRef.current = recognizedText;
            }

            const completeTranscript = joinTranscript(
              baseTranscriptRef.current,
              finalTranscriptRef.current,
              interimTranscriptRef.current,
            );
            if (completeTranscript.length > maxLengthRef.current) {
              const limitedTranscript = completeTranscript.slice(0, maxLengthRef.current).trimEnd();
              updateTranscript(limitedTranscript);
              setError(`Answer limit reached (${maxLengthRef.current} characters). Voice input was stopped.`);
              setProcessing(true);
              try {
                speechModule.stop();
              } catch {
                listeningRef.current = false;
                setListening(false);
                setProcessing(false);
              }
              return;
            }
            updateTranscript(completeTranscript);
          }),
          speechModule.addListener('error', (event) => {
            if (!isMountedRef.current) return;
            clearStartTimeout();
            listeningRef.current = false;
            setRequestingPermission(false);
            setListening(false);
            setStarting(false);
            setProcessing(false);
            if (event?.error === 'aborted') {
              if (stopRequestedRef.current && hasTranscriptRef.current) {
                setError('Transcription finished. Review or edit your answer before submitting.');
              }
              return;
            }
            stopRequestedRef.current = false;
            if (event?.error === 'not-allowed') setAvailabilityState('permission-denied');
            setError(getSpeechErrorMessage(event, Platform.OS));
          }),
          speechModule.addListener('end', () => {
            if (!isMountedRef.current) return;
            clearStartTimeout();
            const endedUnexpectedly = listeningRef.current && !stopRequestedRef.current;
            listeningRef.current = false;
            setRequestingPermission(false);
            setListening(false);
            setStarting(false);
            setProcessing(false);
            if (endedUnexpectedly) {
              setError(hasTranscriptRef.current
                ? 'Transcription stopped. Review your answer or tap Speak to continue.'
                : 'Speech recognition stopped before it captured speech. Check your speech service and try again.');
            } else if (stopRequestedRef.current && hasTranscriptRef.current) {
              setError('Transcription finished. Review or edit your answer before submitting.');
            }
            stopRequestedRef.current = false;
          }),
        ];

        setAvailabilityState('available');
        setAvailabilityMessage('');
      } catch {
        if (!disposed) {
          setAvailabilityState(Platform.OS === 'web' ? 'unsupported-browser' : 'unavailable-native-module');
          setAvailabilityMessage(
            Platform.OS === 'web' ? UNSUPPORTED_BROWSER_MESSAGE : BUILD_UNAVAILABLE_MESSAGE,
          );
        }
      }
    };

    initialize();

    return () => {
      disposed = true;
      isMountedRef.current = false;
      subscriptions.forEach((subscription) => subscription.remove());
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
      if (moduleRef.current && listeningRef.current) {
        try {
          moduleRef.current.abort();
        } catch {
          // The native session can already be closed during screen teardown.
        }
      }
      listeningRef.current = false;
    };
  }, [clearStartTimeout, updateTranscript]);

  useEffect(() => {
    if (!active) abort();
  }, [active, abort]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      appActiveRef.current = isAppActive(state);
      if (!appActiveRef.current && !permissionRequestRef.current) abort();
    });
    return () => subscription.remove();
  }, [abort]);

  const start = useCallback(async (initialTranscript = '') => {
    appActiveRef.current = isAppActive(AppState.currentState);
    const speechModule = moduleRef.current;
    if (!supportedRef.current || !speechModule) {
      setError(availabilityMessage || BUILD_UNAVAILABLE_MESSAGE);
      return;
    }
    if (requestingPermission || starting || listeningRef.current) return;

    const requestId = ++requestIdRef.current;
    stopRequestedRef.current = false;
    hasTranscriptRef.current = false;
    setError('');

    try {
      if (Platform.OS === 'web') {
        setRequestingPermission(true);
      } else {
        permissionRequestRef.current = true;
        setRequestingPermission(true);
        const permission = await speechModule.requestPermissionsAsync();
        if (permission.granted && !appActiveRef.current) {
          const resumed = await waitForAppActive();
          if (!resumed) {
            permissionRequestRef.current = false;
            if (isMountedRef.current) {
              setError('Return to CareerLaunch! and tap Speak again to start voice input.');
            }
            return;
          }
        }
        permissionRequestRef.current = false;
        if (
          !isMountedRef.current ||
          requestIdRef.current !== requestId ||
          !activeRef.current
        ) return;
        if (!permission.granted) {
          setAvailabilityState('permission-denied');
          setError(permission.canAskAgain === false
            ? 'Microphone or speech permission is disabled. Enable it in your device settings to use voice input, or type your answer.'
            : 'Microphone or speech permission was not granted. You can allow it next time or type your answer.');
          return;
        }
      }
      if (
        !isMountedRef.current ||
        requestIdRef.current !== requestId ||
        !activeRef.current ||
        !appActiveRef.current
      ) return;

      const baseTranscript = initialTranscript.trim().slice(0, maxLengthRef.current);
      baseTranscriptRef.current = baseTranscript;
      finalTranscriptRef.current = '';
      interimTranscriptRef.current = '';
      updateTranscript(baseTranscript);
      setAvailabilityState('available');
      setRequestingPermission(Platform.OS === 'web');
      setStarting(true);
      listeningRef.current = true;
      clearStartTimeout();
      startTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current || !listeningRef.current) return;
        try {
          speechModule.abort();
        } catch {
          // The recognizer may have ended before the startup timeout fired.
        }
        listeningRef.current = false;
        setRequestingPermission(false);
        setStarting(false);
        setListening(false);
        setProcessing(false);
        setError('Speech recognition did not start. Check microphone access and the device speech service, then try again.');
      }, SPEECH_START_TIMEOUT_MS);
      speechModule.start({
        lang: 'en-US',
        interimResults: true,
        continuous: Platform.OS === 'web' || Number(Platform.Version) >= 33,
        addsPunctuation: true,
      });
    } catch (startError) {
      if (isMountedRef.current) {
        clearStartTimeout();
        listeningRef.current = false;
        setRequestingPermission(false);
        setStarting(false);
        if (startError?.name === 'NotAllowedError' || startError?.message?.toLowerCase().includes('not allowed')) {
          setAvailabilityState('permission-denied');
          setError(getSpeechErrorMessage({ error: 'not-allowed' }, Platform.OS));
        } else {
          setError('Voice input could not start. Check microphone and speech permissions, then try again.');
        }
      }
    } finally {
      permissionRequestRef.current = false;
      if (isMountedRef.current && Platform.OS !== 'web') setRequestingPermission(false);
    }
  }, [availabilityMessage, clearStartTimeout, requestingPermission, starting, updateTranscript]);

  const stop = useCallback(() => {
    if (!moduleRef.current || !listeningRef.current) return;

    stopRequestedRef.current = true;
    clearStartTimeout();
    setProcessing(true);
    try {
      moduleRef.current.stop();
    } catch {
      listeningRef.current = false;
      setListening(false);
      setProcessing(false);
      setError('Voice input could not stop cleanly. Your current transcript is still available to edit.');
    }
  }, [clearStartTimeout]);

  const reset = useCallback(() => {
    abort();
    baseTranscriptRef.current = '';
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    hasTranscriptRef.current = false;
    stopRequestedRef.current = false;
    clearStartTimeout();
    updateTranscript('');
    setError('');
    setDidRecognizeSpeech(false);
  }, [abort, clearStartTimeout, updateTranscript]);

  return {
    available: supportedRef.current,
    availabilityState,
    availabilityMessage,
    permissionRequestMessage: Platform.OS === 'web'
      ? 'Waiting for browser microphone permission…'
      : 'Requesting microphone and speech permission…',
    requestingPermission,
    starting,
    listening,
    processing,
    transcript,
    error,
    didRecognizeSpeech,
    start,
    stop,
    abort,
    reset,
  };
}
