import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../../context/ProfileContext';
import { isGuestUser } from '../auth/guestAccount';
import { ASSESSMENT_COPY as copy } from './data/copy';
import { ASSESSMENT_ITEMS, ASSESSMENT_VERSION } from './data/questions.v1';
import {
  completeLocalAssessment,
  getRemoteLoadMessage,
  getRemoteSaveMessage,
  readLocalAssessment,
  readRemoteAssessments,
  saveLocalDraft,
  saveRemoteAssessment,
  updateLocalDraft,
} from './assessmentStorage';
import { createQuestionOrder, scoreAssessment } from './scoring';

function makeDraft(seed) {
  return {
    version: ASSESSMENT_VERSION,
    seed,
    order: createQuestionOrder(ASSESSMENT_ITEMS, seed),
    answers: [],
    currentIndex: 0,
  };
}

function makePersistedResult(score, answers, userId) {
  return {
    version: score.version,
    answers: answers.map(({ itemId, value }) => ({ itemId, value })),
    scores: {
      raw: score.raw,
      normalized: score.normalized,
      undifferentiated: score.undifferentiated,
    },
    code: score.code,
    takenAt: score.takenAt,
    userId: userId || null,
  };
}

export default function useAssessment() {
  const { session } = useProfile();
  const user = session?.user;
  const userId = user?.id || null;
  const isGuest = isGuestUser(user);
  const isFullAccount = Boolean(userId && !isGuest);
  const [localState, setLocalState] = useState({ draft: null, results: [] });
  const [remoteResults, setRemoteResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [remoteMessage, setRemoteMessage] = useState('');
  const [loadedIdentity, setLoadedIdentity] = useState(null);
  const localStateRef = useRef(localState);
  const identityRef = useRef(userId);
  const generationRef = useRef(0);

  localStateRef.current = localState;

  const refresh = useCallback(async () => {
    const generation = ++generationRef.current;
    setLoading(true);
    setError('');
    setRemoteMessage('');
    setRemoteResults([]);
    setLoadedIdentity(null);
    try {
      const nextLocal = await readLocalAssessment(userId);
      if (generation !== generationRef.current) return;
      localStateRef.current = nextLocal;
      setLocalState(nextLocal);
      setLoadedIdentity(userId || 'local');
      setLoading(false);
      if (isFullAccount) {
        try {
          const nextRemote = await readRemoteAssessments(userId);
          if (generation !== generationRef.current) return;
          setRemoteResults(nextRemote);
        } catch (remoteError) {
          if (generation !== generationRef.current) return;
          setRemoteResults([]);
          setRemoteMessage(getRemoteLoadMessage(remoteError));
        }
      } else {
        setRemoteResults([]);
      }
    } catch {
      if (generation === generationRef.current) {
        setError(copy.localReadError);
      }
    } finally {
      if (generation === generationRef.current) setLoading(false);
    }
  }, [isFullAccount, userId]);

  useFocusEffect(
    useCallback(() => {
      if (identityRef.current !== userId) {
        identityRef.current = userId;
        localStateRef.current = { draft: null, results: [] };
        setLocalState(localStateRef.current);
      }
      refresh();
      return () => {
        generationRef.current += 1;
      };
    }, [refresh, userId]),
  );

  const startAttempt = useCallback(async () => {
    const seed = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const draft = makeDraft(seed);
    setError('');
    try {
      await saveLocalDraft(userId, draft);
      localStateRef.current = { ...localStateRef.current, draft };
      setLocalState(localStateRef.current);
      return true;
    } catch {
      setError(copy.storageError);
      return false;
    }
  }, [userId]);

  const saveAnswer = useCallback(
    async (itemId, value) => {
      const currentDraft = localStateRef.current.draft;
      if (!currentDraft || !ASSESSMENT_ITEMS.some((item) => item.id === itemId)) {
        setError(copy.draftMissingError);
        return false;
      }
      const answers = currentDraft.answers.filter((answer) => answer.itemId !== itemId);
      const nextDraft = {
        ...currentDraft,
        answers: [...answers, { itemId, value }],
      };
      try {
        const savedDraft = await updateLocalDraft(userId, { answers: nextDraft.answers });
        const nextLocal = { ...localStateRef.current, draft: savedDraft };
        localStateRef.current = nextLocal;
        setLocalState(nextLocal);
        setError('');
        return true;
      } catch {
        setError(copy.answerSaveError);
        return false;
      }
    },
    [userId],
  );

  const setCurrentIndex = useCallback(
    async (currentIndex) => {
      try {
        const draft = await updateLocalDraft(userId, { currentIndex });
        const nextLocal = { ...localStateRef.current, draft };
        localStateRef.current = nextLocal;
        setLocalState(nextLocal);
        return true;
      } catch {
        setError(copy.progressSaveError);
        return false;
      }
    },
    [userId],
  );

  const finishAttempt = useCallback(async () => {
    const draft = localStateRef.current.draft;
    if (!draft || draft.answers.length !== ASSESSMENT_ITEMS.length) {
      setError(copy.incompleteError);
      return null;
    }

    try {
      const score = scoreAssessment(draft.answers, ASSESSMENT_ITEMS);
      const result = makePersistedResult(score, draft.answers, userId);
      const nextLocal = await completeLocalAssessment(userId, result);
      localStateRef.current = nextLocal;
      setLocalState(nextLocal);
      setError('');
      return result;
    } catch {
      setError(copy.resultSaveError);
      return null;
    }
  }, [userId]);

  const saveLocalResultToAccount = useCallback(
    async (result) => {
      if (!isFullAccount || !result) return false;
      setRemoteMessage('');
      try {
        await saveRemoteAssessment(userId, { ...result, userId });
        setRemoteResults(await readRemoteAssessments(userId));
        return true;
      } catch (remoteError) {
        setRemoteMessage(getRemoteSaveMessage(remoteError));
        return false;
      }
    },
    [isFullAccount, userId],
  );

  const identity = userId || 'local';
  const visibleLocalState =
    loadedIdentity === identity ? localState : { draft: null, results: [] };
  const visibleRemoteResults = loadedIdentity === identity ? remoteResults : [];
  const allResults = [...visibleLocalState.results, ...visibleRemoteResults].reduce((unique, result) => {
    if (!unique.some((entry) => entry.takenAt === result.takenAt)) unique.push(result);
    return unique;
  }, []);
  const latestResult = [...allResults].sort(
    (left, right) => right.takenAt.localeCompare(left.takenAt),
  )[0] || null;
  const unsyncedLocalResult =
    isFullAccount &&
    visibleLocalState.results.find(
      (result) => !visibleRemoteResults.some((remote) => remote.takenAt === result.takenAt),
    );

  return {
    draft: visibleLocalState.draft,
    latestResult,
    unsyncedLocalResult: unsyncedLocalResult || null,
    loading,
    error,
    remoteMessage,
    isFullAccount,
    refresh,
    startAttempt,
    saveAnswer,
    setCurrentIndex,
    finishAttempt,
    saveLocalResultToAccount,
  };
}
