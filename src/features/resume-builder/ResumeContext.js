import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AppState } from 'react-native';
import { supabase } from '@config/supabase';
import { useProfile } from '../../context/ProfileContext';
import { isGuestUser } from '../auth/guestAccount';

const SAVE_DEBOUNCE_MS = 700;
const RESUME_SCHEMA_VERSION = 1;
const INITIAL_RESUME_STATE = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    summary: '',
  },
  education: [],
  skills: [],
  experience: [],
  certificates: [],
  projects: [],
};

const ResumeContext = createContext(null);

function createEmptyResume() {
  return {
    personalInfo: { ...INITIAL_RESUME_STATE.personalInfo },
    education: [],
    skills: [],
    experience: [],
    certificates: [],
    projects: [],
  };
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizeObjectList(value, keys) {
  if (!Array.isArray(value)) return [];

  return value.filter(isRecord).map((item) => {
    const normalized = {};
    keys.forEach((key) => {
      normalized[key] = typeof item[key] === 'string' ? item[key] : '';
    });
    return normalized;
  });
}

function normalizeResumeData(value, { includePhoto = false } = {}) {
  if (!isRecord(value)) return createEmptyResume();
  const personalInfo = isRecord(value.personalInfo) ? value.personalInfo : {};

  return {
    personalInfo: {
      fullName: typeof personalInfo.fullName === 'string' ? personalInfo.fullName : '',
      email: typeof personalInfo.email === 'string' ? personalInfo.email : '',
      phone: typeof personalInfo.phone === 'string' ? personalInfo.phone : '',
      summary: typeof personalInfo.summary === 'string' ? personalInfo.summary : '',
      ...(includePhoto && typeof personalInfo.photo === 'string'
        ? { photo: personalInfo.photo }
        : {}),
    },
    education: normalizeObjectList(value.education, ['id', 'school', 'degree', 'year']),
    skills: Array.isArray(value.skills)
      ? value.skills.filter((skill) => typeof skill === 'string')
      : [],
    experience: normalizeObjectList(value.experience, [
      'id',
      'company',
      'role',
      'duration',
      'description',
    ]),
    certificates: normalizeObjectList(value.certificates, ['id', 'name', 'issuer', 'year']),
    projects: normalizeObjectList(value.projects, ['id', 'title', 'description', 'link']),
  };
}

function getPersistableResumeData(value) {
  const normalized = normalizeResumeData(value);
  return normalized;
}

function getResumeLoadErrorMessage(error) {
  if (error?.code === '42P01') {
    return 'The resumes table is missing from the connected database. Confirm the app is connected to the Supabase project where the migration was applied.';
  }
  if (error?.code === 'PGRST205') {
    return 'The resumes table is not available through the connected Supabase API. Confirm the project and refresh the public schema cache.';
  }
  if (error?.code === '42501') {
    return 'The connected account cannot access resume storage. Ask your project admin to check the resumes table grants and RLS policies.';
  }
  if (error?.code === 'PGRST301' || error?.status === 401) {
    return 'Your Supabase session could not be authorized. Sign out, sign in again, and retry.';
  }
  const reference = error?.code ? ` (error ${error.code})` : '';
  return `Could not load your resume. Check your connection and try again${reference}.`;
}

export function ResumeProvider({ children }) {
  const { session } = useProfile();
  const userId = session?.user?.id ?? null;
  const isGuest = isGuestUser(session?.user);
  const [resumeData, setResumeDataState] = useState(createEmptyResume);
  const [loadStatus, setLoadStatus] = useState('idle');
  const [saveStatus, setSaveStatusState] = useState('idle');
  const [deleting, setDeleting] = useState(false);
  const [loadError, setLoadError] = useState('');
  const accountIdentityRef = useRef({ userId, isGuest });
  const dataRef = useRef(resumeData);
  const userIdRef = useRef(userId);
  const loadedUserIdRef = useRef(null);
  const loadStatusRef = useRef(loadStatus);
  const saveStatusRef = useRef(saveStatus);
  const dirtyRef = useRef(false);
  const deletingRef = useRef(false);
  const revisionRef = useRef(0);
  const generationRef = useRef(0);
  const saveTimerRef = useRef(null);
  const saveInFlightRef = useRef(null);

  userIdRef.current = userId;
  loadStatusRef.current = loadStatus;
  saveStatusRef.current = saveStatus;

  const setSaveStatus = useCallback((status) => {
    saveStatusRef.current = status;
    setSaveStatusState(status);
  }, []);

  const loadResume = useCallback(async () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = null;
    const generation = ++generationRef.current;

    loadedUserIdRef.current = null;
    dirtyRef.current = false;
    dataRef.current = createEmptyResume();
    setResumeDataState(dataRef.current);
    setLoadError('');

    if (!userId || isGuest) {
      loadStatusRef.current = 'idle';
      setLoadStatus('idle');
      setSaveStatus('idle');
      return;
    }

    loadStatusRef.current = 'loading';
    setLoadStatus('loading');
    setSaveStatus('idle');

    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('schema_version, data')
        .eq('user_id', userId)
        .maybeSingle();
      if (error) throw error;
      if (generation !== generationRef.current) return;

      if (data?.schema_version > RESUME_SCHEMA_VERSION) {
        loadStatusRef.current = 'error';
        setLoadStatus('error');
        setLoadError('This resume was saved by a newer version of the app');
        return;
      }

      const normalized = data ? normalizeResumeData(data.data) : createEmptyResume();
      dataRef.current = normalized;
      setResumeDataState(normalized);
      loadedUserIdRef.current = userId;
      loadStatusRef.current = 'ready';
      setLoadStatus('ready');
      setSaveStatus(data ? 'saved' : 'idle');
    } catch (error) {
      if (generation !== generationRef.current) return;
      console.warn('Resume load failed:', error?.code || 'unknown');
      loadStatusRef.current = 'error';
      setLoadStatus('error');
      setLoadError(getResumeLoadErrorMessage(error));
    }
  }, [isGuest, setSaveStatus, userId]);

  useEffect(() => {
    if (
      accountIdentityRef.current.userId === userId &&
      accountIdentityRef.current.isGuest === isGuest
    ) {
      return;
    }

    accountIdentityRef.current = { userId, isGuest };
    generationRef.current += 1;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = null;
    loadedUserIdRef.current = null;
    dirtyRef.current = false;
    dataRef.current = createEmptyResume();
    setResumeDataState(dataRef.current);
    setLoadError('');
    loadStatusRef.current = 'idle';
    setLoadStatus('idle');
    setSaveStatus('idle');
  }, [isGuest, setSaveStatus, userId]);

  const isReady =
    loadStatus === 'ready' && !!userId && loadedUserIdRef.current === userId && !isGuest;

  const setResumeData = useCallback((nextValue) => {
    if (
      loadStatusRef.current !== 'ready' ||
      !userIdRef.current ||
      loadedUserIdRef.current !== userIdRef.current ||
      deletingRef.current
    ) {
      return;
    }

    const nextData =
      typeof nextValue === 'function' ? nextValue(dataRef.current) : nextValue;
    const normalized = normalizeResumeData(nextData, { includePhoto: true });
    dataRef.current = normalized;
    revisionRef.current += 1;
    dirtyRef.current = true;
    setResumeDataState(normalized);
    setSaveStatus('pending');
  }, [setSaveStatus]);

  const updateResumeData = useCallback((sectionKey, updatedValues) => {
    setResumeData((previous) => ({
      ...previous,
      [sectionKey]: updatedValues,
    }));
  }, [setResumeData]);

  const saveNow = useCallback(async () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = null;

    if (saveInFlightRef.current) {
      const inFlightSucceeded = await saveInFlightRef.current;
      if (!inFlightSucceeded) return false;
      if (dirtyRef.current) return saveNow();
      return true;
    }

    const currentUserId = userIdRef.current;
    if (
      !dirtyRef.current ||
      loadStatusRef.current !== 'ready' ||
      !currentUserId ||
      loadedUserIdRef.current !== currentUserId ||
      deletingRef.current
    ) {
      return false;
    }

    const savedRevision = revisionRef.current;
    const payload = getPersistableResumeData(dataRef.current);
    dirtyRef.current = false;
    setSaveStatus('saving');

    let task;
    task = (async () => {
      try {
        const { error } = await supabase
          .from('resumes')
          .upsert(
            {
              user_id: currentUserId,
              schema_version: RESUME_SCHEMA_VERSION,
              data: payload,
            },
            { onConflict: 'user_id' },
          );
        if (error) throw error;

        if (userIdRef.current === currentUserId) {
          setSaveStatus(revisionRef.current === savedRevision ? 'saved' : 'pending');
        }
        return true;
      } catch {
        if (userIdRef.current === currentUserId) {
          dirtyRef.current = true;
          setSaveStatus('error');
        }
        return false;
      } finally {
        if (saveInFlightRef.current === task) saveInFlightRef.current = null;
      }
    })();

    saveInFlightRef.current = task;
    return task;
  }, [setSaveStatus]);

  useEffect(() => {
    if (!isReady || !dirtyRef.current) return undefined;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveNow();
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    };
  }, [isReady, resumeData, saveNow]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'background' || state === 'inactive') saveNow();
    });
    return () => subscription.remove();
  }, [saveNow]);

  const deleteResume = useCallback(async () => {
    const currentUserId = userIdRef.current;
    if (
      loadStatusRef.current !== 'ready' ||
      !currentUserId ||
      loadedUserIdRef.current !== currentUserId
    ) {
      return false;
    }

    deletingRef.current = true;
    setDeleting(true);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = null;

    try {
      if (saveInFlightRef.current) await saveInFlightRef.current;
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('user_id', currentUserId);
      if (error) throw error;

      if (userIdRef.current === currentUserId) {
        const emptyResume = createEmptyResume();
        dataRef.current = emptyResume;
        setResumeDataState(emptyResume);
        dirtyRef.current = false;
        revisionRef.current += 1;
        setSaveStatus('idle');
      }
      return true;
    } catch {
      return false;
    } finally {
      deletingRef.current = false;
      setDeleting(false);
    }
  }, [setSaveStatus]);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updateResumeData,
        clearResumeData: () => setResumeData(createEmptyResume()),
        loadStatus,
        loadError,
        retryLoad: loadResume,
        hasAccount: !!userId && !isGuest,
        isReady,
        saveStatus,
        saveNow,
        deleteResume,
        deleting,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be safely wrapped inside a <ResumeProvider> wrapper component.');
  }
  return context;
}
