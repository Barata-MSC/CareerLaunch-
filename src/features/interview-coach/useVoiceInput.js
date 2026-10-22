import { useCallback, useEffect, useRef, useState } from 'react';
import { requireOptionalNativeModule } from 'expo';
import { AppState, Platform } from 'react-native';

export const MAX_ANSWER_LENGTH = 2000;
const WEB_UNAVAILABLE_MESSAGE = 'Voice input is unavailable on web. You can type your answer instead.';
const BUILD_UNAVAILABLE_MESSAGE =
  'Voice input is not included in this app build. Install a development build with speech recognition enabled, or type your answer instead.';
const DEVICE_UNAVAILABLE_MESSAGE =
  'Speech recognition is unavailable on this device. You can type your answer instead.';

function joinTranscript(...parts) {
  return parts.map((part) => part.trim()).filter(Boolean).join(' ').trim();
}

function getSpeechErrorMessage(error) {
  if (error?.error === 'not-allowed') {
    return 'Microphone or speech permission was denied. Enable it in your device settings to use voice input, or type your answer.';
  }
  if (error?.error === 'service-not-allowed' || error?.error === 'language-not-supported') {
    return DEVICE_UNAVAILABLE_MESSAGE;
  }
  if (error?.error === 'no-speech' || error?.error === 'speech-timeout') {
    return 'No speech was recognized. Try again or type your answer.';
  }
  if (error?.error === 'network') {
    return 'The device speech service could not complete transcription. Try again or type your answer.';
  }
  return 'Voice input could not start. Try again or type your answer.';
}

export default function useVoiceInput({ active = true, maxLength = MAX_ANSWER_LENGTH } = {}) {
  const [available, setAvailable] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState(
    Platform.OS === 'web' ? WEB_UNAVAILABLE_MESSAGE : 'Checking voice input availability…',
  );
  const [requestingPermission, setRequestingPermission] = useState(false);
  const [starting, setStarting] = useState(false);
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [didRecognizeSpeech, setDidRecognizeSpeech] = useState(false);

  const moduleRef = useRef(null);
  const isMountedRef = useRef(true);
  const activeRef = useRef(active);
  const appActiveRef = useRef(AppState.currentState === 'active');
  const listeningRef = useRef(false);
  const baseTranscriptRef = useRef('');
  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');
  const maxLengthRef = useRef(maxLength);

  maxLengthRef.current = maxLength;
  activeRef.current = active;

  const abort = useCallback(() => {
    const speechModule = moduleRef.current;
    if (speechModule && listeningRef.current) {
      try {
        speechModule.abort();
      } catch {
        setError('Voice input stopped unexpectedly. You can continue by typing.');
      }
    }
    listeningRef.current = false;
    setListening(false);
    setStarting(false);
    setProcessing(false);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    if (Platform.OS === 'web') {
      setAvailable(false);
      setAvailabilityMessage(WEB_UNAVAILABLE_MESSAGE);
      return () => {
        isMountedRef.current = false;
      };
    }

    let subscriptions = [];
    let disposed = false;

    const initialize = async () => {
      try {
        if (!requireOptionalNativeModule('ExpoSpeechRecognition')) {
          setAvailable(false);
          setAvailabilityMessage(BUILD_UNAVAILABLE_MESSAGE);
          return;
        }

        const speechPackage = await import('expo-speech-recognition');
        if (disposed) return;

        const speechModule = speechPackage.ExpoSpeechRecognitionModule;
        const supported = speechModule.isRecognitionAvailable();
        if (!supported) {
          setAvailable(false);
          setAvailabilityMessage(DEVICE_UNAVAILABLE_MESSAGE);
          return;
        }

        moduleRef.current = speechModule;
        subscriptions = [
          speechModule.addListener('start', () => {
            if (!isMountedRef.current) return;
            listeningRef.current = true;
            setStarting(false);
            setListening(true);
            setProcessing(false);
            setError('');
          }),
          speechModule.addListener('result', (event) => {
            if (!isMountedRef.current) return;
            const recognizedText = event?.results?.[0]?.transcript?.trim() || '';
            if (!recognizedText) return;

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
              setTranscript(limitedTranscript);
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
            setTranscript(completeTranscript);
          }),
          speechModule.addListener('error', (event) => {
            if (!isMountedRef.current || event?.error === 'aborted') return;
            listeningRef.current = false;
            setListening(false);
            setStarting(false);
            setProcessing(false);
            setError(getSpeechErrorMessage(event));
          }),
          speechModule.addListener('end', () => {
            if (!isMountedRef.current) return;
            listeningRef.current = false;
            setListening(false);
            setStarting(false);
            setProcessing(false);
          }),
        ];

        setAvailable(true);
        setAvailabilityMessage('');
      } catch {
        if (!disposed) {
          setAvailable(false);
          setAvailabilityMessage(BUILD_UNAVAILABLE_MESSAGE);
        }
      }
    };

    initialize();

    return () => {
      disposed = true;
      isMountedRef.current = false;
      subscriptions.forEach((subscription) => subscription.remove());
      if (moduleRef.current && listeningRef.current) {
        try {
          moduleRef.current.abort();
        } catch {
          // The native session can already be closed during screen teardown.
        }
      }
      listeningRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!active) abort();
  }, [active, abort]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      appActiveRef.current = state === 'active';
      if (!appActiveRef.current) abort();
    });
    return () => subscription.remove();
  }, [abort]);

  const start = useCallback(async (initialTranscript = '') => {
    const speechModule = moduleRef.current;
    if (!available || !speechModule) {
      setError(availabilityMessage || BUILD_UNAVAILABLE_MESSAGE);
      return;
    }
    if (requestingPermission || starting || listeningRef.current) return;

    setRequestingPermission(true);
    setError('');

    try {
      const permission = await speechModule.requestPermissionsAsync();
      if (!isMountedRef.current || !activeRef.current || !appActiveRef.current) return;
      if (!permission.granted) {
        const deniedMessage = permission.canAskAgain === false
          ? 'Microphone or speech permission is disabled. Enable it in your device settings to use voice input, or type your answer.'
          : 'Microphone or speech permission was not granted. You can allow it next time or type your answer.';
        setError(deniedMessage);
        return;
      }
      if (!isMountedRef.current || !activeRef.current || !appActiveRef.current) return;

      const baseTranscript = initialTranscript.trim().slice(0, maxLengthRef.current);
      baseTranscriptRef.current = baseTranscript;
      finalTranscriptRef.current = '';
      interimTranscriptRef.current = '';
      setTranscript(baseTranscript);
      setStarting(true);
      listeningRef.current = true;
      speechModule.start({
        lang: 'en-US',
        interimResults: true,
        continuous: true,
        addsPunctuation: true,
      });
    } catch {
      if (isMountedRef.current) {
        listeningRef.current = false;
        setStarting(false);
        setError('Voice input could not start. Check microphone and speech permissions, then try again.');
      }
    } finally {
      if (isMountedRef.current) setRequestingPermission(false);
    }
  }, [available, availabilityMessage, requestingPermission, starting]);

  const stop = useCallback(() => {
    if (!moduleRef.current || !listeningRef.current) return;

    setProcessing(true);
    try {
      moduleRef.current.stop();
    } catch {
      listeningRef.current = false;
      setListening(false);
      setProcessing(false);
      setError('Voice input could not stop cleanly. Your current transcript is still available to edit.');
    }
  }, []);

  const reset = useCallback(() => {
    abort();
    baseTranscriptRef.current = '';
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    setTranscript('');
    setError('');
    setDidRecognizeSpeech(false);
  }, [abort]);

  return {
    available,
    availabilityMessage,
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
