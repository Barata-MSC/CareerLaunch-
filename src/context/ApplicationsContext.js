import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { supabase } from '@config/supabase';
import { useProfile } from './ProfileContext';
import { isGuestUser } from '../features/auth/guestAccount';

const ApplicationsContext = createContext(null);

export const STATUSES = ['Applied', 'Interview', 'Hired', 'Rejected'];

const STATUS_TO_CODE = {
  Applied: 'applied',
  Interview: 'interview',
  Hired: 'hired',
  Rejected: 'rejected',
};

const CODE_TO_STATUS = Object.fromEntries(
  Object.entries(STATUS_TO_CODE).map(([label, code]) => [code, label]),
);

const SAMPLE_JOB_BRANDS = {
  Google: { logo: require('../assets/google.png'), color: '#EA4335' },
  Microsoft: { logo: require('../assets/microsoft.png'), color: '#00A4EF' },
  Spotify: { logo: require('../assets/Spotify.png'), color: '#1DB954' },
  Canva: { logo: require('../assets/canva.png'), color: '#7D2AE8' },
  Deloitte: { logo: require('../assets/deloitte.png'), color: '#86BC25' },
  'Globe Telecom': { logo: require('../assets/globe.png'), color: '#0072CE' },
};

function getJobIdentity(job) {
  return {
    source: job.sourceType || job.provider || 'sample',
    externalJobId: String(job.externalJobId ?? job.id),
  };
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function mapRowToApplication(row) {
  const source = row.source;
  const externalJobId = String(row.external_job_id);
  const brand = SAMPLE_JOB_BRANDS[row.company] || {};
  return {
    id: row.id,
    job: {
      id: externalJobId,
      sourceType: source,
      title: row.title,
      company: row.company || '',
      location: row.location || '',
      link: row.apply_url || '',
      logo: brand.logo,
      color: brand.color,
    },
    source,
    externalJobId,
    status: CODE_TO_STATUS[row.status] || 'Applied',
    notes: row.notes || '',
    dateApplied: formatDate(row.applied_at),
    appliedAt: row.applied_at,
    statusUpdatedAt: row.status_updated_at,
  };
}

function createApplicationPayload(job, userId, notes = '') {
  const { source, externalJobId } = getJobIdentity(job);
  return {
    user_id: userId,
    source,
    external_job_id: externalJobId,
    title: String(job.title || 'Untitled role'),
    company: job.company ? String(job.company) : null,
    location: job.location ? String(job.location) : null,
    apply_url: job.link || job.applyUrl ? String(job.link || job.applyUrl) : null,
    status: STATUS_TO_CODE.Applied,
    notes: notes || null,
  };
}

function getLoadErrorMessage(error) {
  if (error?.code === '42P01' || error?.code === 'PGRST205') {
    return 'Application storage is not set up yet. Ask your project admin to apply the job_applications migration, then retry.';
  }
  if (error?.code === '42501') {
    return 'Your account cannot access application storage. Ask your project admin to check its access policies.';
  }
  return 'Could not load your applications. Check your connection and try again.';
}

export function ApplicationsProvider({ children }) {
  const { session } = useProfile();
  const userId = session?.user?.id ?? null;
  const isGuest = isGuestUser(session?.user);
  const [applications, setApplications] = useState([]);
  const [loadStatus, setLoadStatus] = useState('idle');
  const [loadError, setLoadError] = useState('');
  const [mutationError, setMutationError] = useState('');
  const applicationsRef = useRef(applications);
  const loadedUserIdRef = useRef(null);
  const generationRef = useRef(0);
  const userIdRef = useRef(userId);
  const isGuestRef = useRef(isGuest);

  userIdRef.current = userId;
  isGuestRef.current = isGuest;

  const replaceApplications = useCallback((nextApplications) => {
    applicationsRef.current = nextApplications;
    setApplications(nextApplications);
  }, []);

  const loadApplications = useCallback(async () => {
    const generation = ++generationRef.current;
    loadedUserIdRef.current = null;
    replaceApplications([]);
    setLoadError('');
    setMutationError('');

    if (!userId || isGuest) {
      setLoadStatus('idle');
      return;
    }

    setLoadStatus('loading');
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(
          'id, user_id, source, external_job_id, title, company, location, apply_url, status, notes, applied_at, status_updated_at',
        )
        .eq('user_id', userId)
        .order('applied_at', { ascending: false });
      if (error) throw error;
      if (generation !== generationRef.current) return;

      replaceApplications((data || []).map(mapRowToApplication));
      loadedUserIdRef.current = userId;
      setLoadStatus('ready');
    } catch (error) {
      if (generation !== generationRef.current) return;
      setLoadStatus('error');
      setLoadError(getLoadErrorMessage(error));
    }
  }, [isGuest, replaceApplications, userId]);

  useEffect(() => {
    loadApplications();
    return () => {
      generationRef.current += 1;
    };
  }, [loadApplications]);

  const isReady =
    loadStatus === 'ready' &&
    !!userId &&
    loadedUserIdRef.current === userId &&
    !isGuest;
  const visibleApplications = isReady ? applications : [];

  const appliedIds = useMemo(
    () => visibleApplications.map((application) => application.job.id),
    [visibleApplications],
  );

  const isJobTracked = useCallback((job) => {
    if (
      !userIdRef.current ||
      isGuestRef.current ||
      loadedUserIdRef.current !== userIdRef.current
    ) {
      return false;
    }
    const { source, externalJobId } = getJobIdentity(job);
    return applicationsRef.current.some(
      (application) =>
        application.source === source && application.externalJobId === externalJobId,
    );
  }, []);

  const addApplication = useCallback(
    async (job) => {
      const currentUserId = userIdRef.current;
      if (
        !currentUserId ||
        isGuestRef.current ||
        loadedUserIdRef.current !== currentUserId
      ) {
        return { added: false, existing: null, error: 'Your applications are not ready to save.' };
      }

      const { source, externalJobId } = getJobIdentity(job);
      const existing = applicationsRef.current.find(
        (application) =>
          application.source === source && application.externalJobId === externalJobId,
      );
      if (existing) return { added: false, existing, error: null };

      const temporaryId = `pending-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const optimisticApplication = {
        id: temporaryId,
        job: {
          id: externalJobId,
          sourceType: source,
          title: String(job.title || 'Untitled role'),
          company: job.company || '',
          location: job.location || '',
          link: job.link || job.applyUrl || '',
        },
        source,
        externalJobId,
        status: 'Applied',
        notes: '',
        dateApplied: formatDate(new Date()),
        appliedAt: new Date().toISOString(),
        statusUpdatedAt: new Date().toISOString(),
      };
      replaceApplications([optimisticApplication, ...applicationsRef.current]);
      setMutationError('');

      try {
        const { data, error } = await supabase
          .from('job_applications')
          .insert(createApplicationPayload(job, currentUserId))
          .select(
            'id, user_id, source, external_job_id, title, company, location, apply_url, status, notes, applied_at, status_updated_at',
          )
          .single();
        if (error) throw error;

        const savedApplication = mapRowToApplication(data);
        if (userIdRef.current === currentUserId && !isGuestRef.current) {
          replaceApplications(
            applicationsRef.current.map((application) =>
              application.id === temporaryId ? savedApplication : application,
            ),
          );
        }
        return { added: true, existing: savedApplication, error: null };
      } catch (error) {
        if (error?.code === '23505') {
          let existingRow = null;
          try {
            const { data, error: lookupError } = await supabase
              .from('job_applications')
              .select(
                'id, user_id, source, external_job_id, title, company, location, apply_url, status, notes, applied_at, status_updated_at',
              )
              .eq('user_id', currentUserId)
              .eq('source', source)
              .eq('external_job_id', externalJobId)
              .maybeSingle();
            if (!lookupError) existingRow = data;
          } catch {
            existingRow = null;
          }
          if (existingRow) {
            const existingApplication = mapRowToApplication(existingRow);
            if (userIdRef.current === currentUserId && !isGuestRef.current) {
              replaceApplications(
                [
                  existingApplication,
                  ...applicationsRef.current.filter(
                    (application) => application.id !== temporaryId,
                  ),
                ],
              );
            }
            return { added: false, existing: existingApplication, error: null };
          }
        }
        if (userIdRef.current === currentUserId && !isGuestRef.current) {
          replaceApplications(
            applicationsRef.current.filter((application) => application.id !== temporaryId),
          );
          setMutationError('Could not save this application. Check your connection and try again.');
        }
        return { added: false, existing: null, error: 'Could not save this application.' };
      }
    },
    [replaceApplications],
  );

  const updateApplication = useCallback(
    async (applicationId, updates, dbUpdates) => {
      const currentUserId = userIdRef.current;
      if (
        !currentUserId ||
        isGuestRef.current ||
        loadedUserIdRef.current !== currentUserId
      ) {
        setMutationError('Your applications are not ready to update.');
        return false;
      }

      const previous = applicationsRef.current.find(
        (application) => application.id === applicationId,
      );
      if (!previous) return false;

      replaceApplications(
        applicationsRef.current.map((application) =>
          application.id === applicationId ? { ...application, ...updates } : application,
        ),
      );
      setMutationError('');

      let failed = false;
      try {
        const { data, error } = await supabase
          .from('job_applications')
          .update(dbUpdates)
          .eq('user_id', currentUserId)
          .eq('id', applicationId)
          .select('id')
          .maybeSingle();
        failed = !!error || !data;
      } catch {
        failed = true;
      }
      if (!failed) return true;

      if (userIdRef.current === currentUserId && !isGuestRef.current) {
        replaceApplications(
          applicationsRef.current.map((application) =>
            application.id === applicationId ? previous : application,
          ),
        );
        setMutationError('Could not update this application. Check your connection and try again.');
      }
      return false;
    },
    [replaceApplications],
  );

  const updateStatus = useCallback(
    (applicationId, status) => {
      const statusCode = STATUS_TO_CODE[status];
      if (!statusCode) return Promise.resolve(false);
      const statusUpdatedAt = new Date().toISOString();
      return updateApplication(
        applicationId,
        { status, statusUpdatedAt },
        { status: statusCode, status_updated_at: statusUpdatedAt },
      );
    },
    [updateApplication],
  );

  const updateNotes = useCallback(
    (applicationId, notes) =>
      updateApplication(applicationId, { notes }, { notes: notes || null }),
    [updateApplication],
  );

  const removeApplication = useCallback(
    async (applicationId) => {
      const currentUserId = userIdRef.current;
      if (
        !currentUserId ||
        isGuestRef.current ||
        loadedUserIdRef.current !== currentUserId
      ) {
        setMutationError('Your applications are not ready to update.');
        return false;
      }

      const previous = applicationsRef.current.find(
        (application) => application.id === applicationId,
      );
      if (!previous) return false;

      replaceApplications(
        applicationsRef.current.filter((application) => application.id !== applicationId),
      );
      setMutationError('');
      let failed = false;
      try {
        const { data, error } = await supabase
          .from('job_applications')
          .delete()
          .eq('user_id', currentUserId)
          .eq('id', applicationId)
          .select('id')
          .maybeSingle();
        failed = !!error || !data;
      } catch {
        failed = true;
      }
      if (!failed) return true;

      if (userIdRef.current === currentUserId && !isGuestRef.current) {
        replaceApplications([previous, ...applicationsRef.current]);
        setMutationError('Could not remove this application. Check your connection and try again.');
      }
      return false;
    },
    [replaceApplications],
  );

  const value = {
    applications: visibleApplications,
    appliedIds,
    addApplication,
    updateStatus,
    updateNotes,
    removeApplication,
    isJobTracked,
    loading: loadStatus === 'loading',
    loadStatus,
    loadError,
    mutationError,
    refresh: loadApplications,
  };

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return ctx;
}
