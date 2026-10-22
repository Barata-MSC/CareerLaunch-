import { useCallback, useEffect, useRef, useState } from 'react';
import { WALKTHROUGH_STEPS } from './data/walkthroughSteps';
import { buildStoredValue, shouldShowWalkthrough } from './walkthroughLogic';
import {
  readWalkthroughPreference,
  saveWalkthroughPreference,
} from './walkthroughStorage';

const shownThisSession = new Set();

export default function useWalkthrough(userId, dashboardReady) {
  const identity = userId || 'local';
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [saveError, setSaveError] = useState('');
  const requestId = useRef(0);

  useEffect(() => {
    if (!dashboardReady) {
      setReady(false);
      setVisible(false);
      return undefined;
    }

    const currentRequest = ++requestId.current;
    let active = true;
    setReady(false);
    setVisible(false);
    setSaveError('');

    readWalkthroughPreference(identity)
      .then((storedValue) => {
        if (!active || currentRequest !== requestId.current) return;
        setReady(true);
        if (shouldShowWalkthrough(storedValue, { alreadyShown: shownThisSession.has(identity) })) {
          shownThisSession.add(identity);
          setStepIndex(0);
          setVisible(true);
        }
      })
      .catch(() => {
        if (!active || currentRequest !== requestId.current) return;
        setReady(true);
        setVisible(false);
      });

    return () => {
      active = false;
      requestId.current += 1;
    };
  }, [dashboardReady, identity]);

  const skip = useCallback(() => {
    setSaveError('');
    setVisible(false);
    setStepIndex(0);
  }, []);

  const replay = useCallback(() => {
    if (!ready) return;
    shownThisSession.add(identity);
    setSaveError('');
    setStepIndex(0);
    setVisible(true);
  }, [identity, ready]);

  const saveAndClose = useCallback(async () => {
    setSaveError('');
    try {
      await saveWalkthroughPreference(identity, buildStoredValue());
      setVisible(false);
      setStepIndex(0);
      return true;
    } catch {
      setSaveError('We could not save this choice. You can skip the tour for this session.');
      return false;
    }
  }, [identity]);

  const next = useCallback(() => {
    if (stepIndex === WALKTHROUGH_STEPS.length - 1) {
      return saveAndClose();
    }
    setStepIndex((index) => index + 1);
    return Promise.resolve(true);
  }, [saveAndClose, stepIndex]);

  return {
    ready,
    visible,
    stepIndex,
    saveError,
    setStepIndex,
    skip,
    replay,
    next,
    saveAndClose,
  };
}