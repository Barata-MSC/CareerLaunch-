import AppPressable from '@components/AppPressable';
import BackButton from '@components/BackButton';
import googleIcon from '../../assets/google.png';
import microsoftIcon from '../../assets/microsoft.png';
import spotifyIcon from '../../assets/Spotify.png';
import canvaIcon from '../../assets/canva.png';
import deloitteIcon from '../../assets/deloitte.png';
import globeIcon from '../../assets/globe.png';

import FadeSlideIn from '@components/motion/FadeSlideIn';
import Pop from '@components/motion/Pop';
import PressScale from '@components/motion/PressScale';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  BackHandler,
  Modal,
  Pressable,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApplications } from '../../context/ApplicationsContext';
import { useProfile } from '../../context/ProfileContext';
import AccountGate from '../../components/AccountGate';
import { supabase } from '../../config/supabase';
import { openExternalUrl } from '../../utils/openExternalUrl';
import { durations, easings, distances } from '@components/motion/motionTokens';
import useReduceMotion from '@components/motion/useReduceMotion';
import {
  countJobFilters,
  createEmptyJobFilters,
  DATE_POSTED_OPTIONS,
  EMPLOYMENT_TYPES,
  getJobFilterSummary,
  JOB_CATEGORIES,
  JOB_LOCATIONS,
  JOB_REQUIREMENTS,
  removeJobFilter,
} from './jobSearchOptions';

const PURPLE = '#5B21D6';
const SEARCH_PLACEHOLDER = '#9CA3AF';

const JOBS = [
  {
    id: '1',
    title: 'Software Developer',
    company: 'Google',
    logo: googleIcon,
    category: 'IT',
    arrangement: 'Hybrid',
    type: 'Full-time',
    location: 'Makati, Metro Manila',
    salary: 'PHP 60,000 - 90,000 / month',
    description: 'Build and maintain scalable features for web products used by millions.',
    source: 'sample',
    externalId: '1',
    publisher: 'Google Careers',
    link: 'https://careers.google.com',
    color: '#EA4335',
  },
  {
    id: '2',
    title: 'Web Developer',
    company: 'Microsoft',
    logo: microsoftIcon,
    category: 'IT',
    arrangement: 'Hybrid',
    type: 'Full-time',
    location: 'Taguig, Metro Manila',
    salary: 'PHP 50,000 - 75,000 / month',
    description: 'Develop responsive websites and web apps using modern front-end tools.',
    source: 'sample',
    externalId: '2',
    publisher: 'Microsoft Careers',
    link: 'https://careers.microsoft.com',
    color: '#00A4EF',
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Spotify',
    logo: spotifyIcon,
    category: 'IT',
    arrangement: 'Hybrid',
    type: 'Full-time',
    location: 'Remote (Philippines)',
    salary: null,
    description: 'Craft smooth, accessible user interfaces for the listening experience.',
    source: 'sample',
    externalId: '3',
    publisher: 'Spotify Jobs',
    link: 'https://www.lifeatspotify.com',
    color: '#1DB954',
  },
  {
    id: '4',
    title: 'Graphic Designer',
    company: 'Canva',
    logo: canvaIcon,
    category: 'Design',
    arrangement: 'Remote',
    type: 'Contract',
    location: 'Remote',
    salary: 'PHP 35,000 - 55,000 / month',
    description: 'Create visual assets and brand materials for global campaigns.',
    source: 'sample',
    externalId: '4',
    publisher: 'Canva Careers',
    link: 'https://www.canva.com/careers',
    color: '#7D2AE8',
  },
  {
    id: '5',
    title: 'Accountant',
    company: 'Deloitte',
    logo: deloitteIcon,
    category: 'Finance',
    arrangement: 'On-site',
    type: 'Full-time',
    location: 'Quezon City, Metro Manila',
    salary: 'PHP 30,000 - 45,000 / month',
    description: 'Prepare financial statements and support audit and tax engagements.',
    source: 'sample',
    externalId: '5',
    publisher: 'Deloitte Careers',
    link: 'https://www.deloitte.com/careers',
    color: '#86BC25',
  },
  {
    id: '6',
    title: 'Marketing Assistant',
    company: 'Globe Telecom',
    logo: globeIcon,
    category: 'Marketing',
    arrangement: 'Hybrid',
    type: 'Part-time',
    location: 'BGC, Taguig',
    salary: null,
    description: 'Assist with social media, content calendars, and campaign reporting.',
    source: 'sample',
    externalId: '6',
    publisher: 'Globe Careers',
    link: 'https://www.globe.com.ph/about-us/careers',
    color: '#0072CE',
  },
];

const STATUS_STYLES = {
  Submitted: { bg: '#EDE9FE', fg: PURPLE },
  'Under Review': { bg: '#FEF3C7', fg: '#B45309' },
  Interview: { bg: '#DCFCE7', fg: '#15803D' },
};

function JobCardEntrance({ itemId, eligible, delay, animatedJobIdsRef, children }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!eligible || animatedJobIdsRef.current.has(itemId)) return;
    animatedJobIdsRef.current.add(itemId);
    setShouldAnimate(true);
  }, [animatedJobIdsRef, eligible, itemId]);

  return <FadeSlideIn enabled={shouldAnimate} delay={delay}>{children}</FadeSlideIn>;
}

function TrackedJobsButton({ count, onPress }) {
  const previousCount = useRef(count);
  const [popCount, setPopCount] = useState(null);

  useEffect(() => {
    if (previousCount.current !== count) {
      previousCount.current = count;
      setPopCount(count);
    }
  }, [count]);

  return (
    <Pop
      key={popCount === null ? 'initial' : popCount}
      value={popCount !== null}
      playOnMount={popCount !== null}
    >
      <PressScale>
        <AppPressable style={styles.primaryBtn} onPress={onPress}>
          <Text style={styles.primaryBtnText}>Tracked Jobs ({count})</Text>
        </AppPressable>
      </PressScale>
    </Pop>
  );
}

function FiltersButton({ count, onPress }) {
  const previousCount = useRef(count);
  const [popCount, setPopCount] = useState(null);

  useEffect(() => {
    if (previousCount.current !== count) {
      previousCount.current = count;
      setPopCount(count);
    }
  }, [count]);

  return (
    <Pop
      key={popCount === null ? 'initial' : popCount}
      value={popCount !== null}
      playOnMount={popCount !== null}
    >
      <PressScale>
        <AppPressable
          style={[styles.filterButton, count > 0 && styles.filterButtonActive]}
          onPress={onPress}
        >
          <Text style={[styles.filterButtonText, count > 0 && styles.filterButtonTextActive]}>
            Filter{count > 0 ? ` · ${count}` : ''}
          </Text>
        </AppPressable>
      </PressScale>
    </Pop>
  );
}

function CompanyLogo({ company, color, logo, size = 44 }) {
  if (logo) {
    return (
      <View
        style={[
          styles.logo,
          { width: size, height: size, borderRadius: size / 4, backgroundColor: '#F3F4F6' },
        ]}
      >
        <Image
          source={logo}
          style={{ width: size * 0.7, height: size * 0.7, borderRadius: 4 }}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Fallback: initial letter, used if a job has no logo set
  return (
    <View
      style={[
        styles.logo,
        { width: size, height: size, borderRadius: size / 4, backgroundColor: color },
      ]}
    >
      <Text style={[styles.logoText, { fontSize: size * 0.42 }]}>{company?.[0] || '?'}</Text>
    </View>
  );
}

function SearchIcon() {
  return (
    <Svg width={17} height={17} viewBox="0 0 20 20" accessibilityLabel="Search">
      <Circle cx="8.5" cy="8.5" r="5.5" stroke={SEARCH_PLACEHOLDER} strokeWidth="1.8" fill="none" />
      <Line
        x1="12.5"
        y1="12.5"
        x2="17"
        y2="17"
        stroke={SEARCH_PLACEHOLDER}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function FilterChoice({ label, selected, onPress }) {
  return (
    <Pop value={selected}>
      <PressScale>
        <AppPressable
          accessibilityRole="button"
          accessibilityState={{ selected }}
          style={[styles.filterChoice, selected && styles.filterChoiceSelected]}
          onPress={onPress}
        >
          <Text style={[styles.filterChoiceText, selected && styles.filterChoiceTextSelected]}>
            {label}
          </Text>
        </AppPressable>
      </PressScale>
    </Pop>
  );
}

function ActiveFilterChip({ filter, exiting, onRemove, onRemoved }) {
  const [removing, setRemoving] = useState(false);
  const removalStartedRef = useRef(false);
  const removalAnimationRef = useRef(null);
  const opacity = useRef(new Animated.Value(1)).current;
  const reduceMotion = useReduceMotion();
  const nativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    if (!exiting) {
      removalAnimationRef.current?.stop();
      removalAnimationRef.current = null;
      removalStartedRef.current = false;
      setRemoving(false);
      opacity.setValue(1);
    }
  }, [exiting, opacity]);

  useEffect(() => () => removalAnimationRef.current?.stop(), []);

  const handleRemove = () => {
    if (removalStartedRef.current) return;
    removalStartedRef.current = true;
    setRemoving(true);
    onRemove(filter);
    const animation = Animated.timing(opacity, {
      toValue: 0,
      duration: reduceMotion ? durations.reducedMotionFade : durations.press,
      useNativeDriver: nativeDriver,
    });
    removalAnimationRef.current = animation;
    animation.start(({ finished }) => {
      removalAnimationRef.current = null;
      if (finished) onRemoved(filter.key, filter.value);
    });
  };

  return (
    <FadeSlideIn>
      <Animated.View style={{ opacity }}>
        <AppPressable
          disabled={removing}
          style={styles.summaryChip}
          onPress={handleRemove}
          accessibilityLabel={`Remove ${filter.label} filter`}
        >
          <Text style={styles.summaryChipText}>{filter.label} ×</Text>
        </AppPressable>
      </Animated.View>
    </FadeSlideIn>
  );
}

function FilterSheet({ visible, initialFilters, onClose, onApply }) {
  const [draft, setDraft] = useState(createEmptyJobFilters);
  const reduceMotion = useReduceMotion();
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);
  const closingRef = useRef(false);
  const nativeDriver = Platform.OS !== 'web';
  const initialFiltersRef = useRef(initialFilters);
  initialFiltersRef.current = initialFilters;

  useEffect(() => {
    if (!visible) return undefined;
    closingRef.current = false;
    const shouldReduceMotion = reduceMotionRef.current;
    setDraft({
      ...initialFiltersRef.current,
      employmentTypes: [...initialFiltersRef.current.employmentTypes],
      jobRequirements: [...initialFiltersRef.current.jobRequirements],
    });
    translateY.setValue(shouldReduceMotion ? 0 : distances.entrance * 3);
    opacity.setValue(0);
    backdropOpacity.setValue(0);
    const animation = Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: shouldReduceMotion ? durations.reducedMotionFade : durations.entrance,
        easing: easings.entrance,
        useNativeDriver: nativeDriver,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: shouldReduceMotion ? durations.reducedMotionFade : durations.entrance,
        useNativeDriver: nativeDriver,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: shouldReduceMotion ? durations.reducedMotionFade : durations.entrance,
        useNativeDriver: nativeDriver,
      }),
    ]);
    animationRef.current = animation;
    animation.start();
    return () => {
      animation.stop();
      if (animationRef.current === animation) animationRef.current = null;
    };
  }, [nativeDriver, translateY, opacity, backdropOpacity, visible]);

  useEffect(() => {
    if (!visible || !reduceMotion || closingRef.current) return;
    animationRef.current?.stop();
    animationRef.current = null;
    translateY.setValue(0);
    opacity.setValue(1);
    backdropOpacity.setValue(1);
  }, [reduceMotion, visible, translateY, opacity, backdropOpacity]);

  const closeSheet = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    if (reduceMotion) {
      animationRef.current?.stop();
      animationRef.current = null;
      onClose();
      return;
    }
    animationRef.current?.stop();
    const animation = Animated.parallel([
      Animated.timing(translateY, {
        toValue: distances.entrance * 3,
        duration: durations.entrance,
        easing: easings.entrance,
        useNativeDriver: nativeDriver,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: durations.entrance,
        useNativeDriver: nativeDriver,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: durations.entrance,
        useNativeDriver: nativeDriver,
      }),
    ]);
    animationRef.current = animation;
    animation.start(({ finished }) => {
      animationRef.current = null;
      if (finished) onClose();
    });
  };

  const toggleArrayValue = (field, value) => {
    setDraft((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value],
    }));
  };

  const renderChoices = (options, selectedValues, onSelect) => (
    <View style={styles.filterChoices}>
      {options.map((option) => (
        <FilterChoice
          key={option.value}
          label={option.label}
          selected={selectedValues.includes(option.value)}
          onPress={() => onSelect(option.value)}
        />
      ))}
    </View>
  );

  const sheet = (
    <Animated.View style={[styles.sheetOverlay, { opacity: backdropOpacity }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} accessibilityLabel="Close filters" />
      <Animated.View style={[styles.filterSheet, { opacity, transform: [{ translateY }] }]}>
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Filters</Text>
          <AppPressable onPress={closeSheet} hitSlop={10}>
            <Text style={styles.sheetClose}>Close</Text>
          </AppPressable>
        </View>

        <ScrollView
          style={styles.sheetScroll}
          contentContainerStyle={styles.sheetScrollContent}
          showsVerticalScrollIndicator
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.filterGroupTitle}>Job type</Text>
          {renderChoices(EMPLOYMENT_TYPES, draft.employmentTypes, (value) =>
            toggleArrayValue('employmentTypes', value))}
          <Text style={styles.filterGroupHint}>Select any that fit; selected types are combined.</Text>

          <Text style={styles.filterGroupTitle}>Remote only</Text>
          <Pop value={draft.remoteOnly}>
            <PressScale>
              <AppPressable
                accessibilityRole="switch"
                accessibilityState={{ checked: draft.remoteOnly }}
                style={[styles.remoteToggle, draft.remoteOnly && styles.remoteToggleSelected]}
                onPress={() => setDraft((current) => ({ ...current, remoteOnly: !current.remoteOnly }))}
              >
                <Text style={[styles.remoteToggleText, draft.remoteOnly && styles.remoteToggleTextSelected]}>
                  {draft.remoteOnly ? 'On' : 'Off'}
                </Text>
              </AppPressable>
            </PressScale>
          </Pop>

          <Text style={styles.filterGroupTitle}>Date posted</Text>
          {renderChoices(DATE_POSTED_OPTIONS, [draft.datePosted], (value) =>
            setDraft((current) => ({ ...current, datePosted: value })))}

          <Text style={styles.filterGroupTitle}>Experience</Text>
          {renderChoices(JOB_REQUIREMENTS, draft.jobRequirements, (value) =>
            toggleArrayValue('jobRequirements', value))}
          <Text style={styles.filterGroupHint}>Selected experience options are combined.</Text>

          <Text style={styles.filterGroupTitle}>Location</Text>
          {renderChoices(JOB_LOCATIONS, [draft.location], (value) =>
            setDraft((current) => ({ ...current, location: value })))}
        </ScrollView>

        <View style={styles.sheetFooter}>
          <AppPressable onPress={() => setDraft(createEmptyJobFilters())}>
            <Text style={styles.clearAllText}>Clear all</Text>
          </AppPressable>
          <PressScale>
            <AppPressable
              style={styles.showResultsButton}
              onPress={() => {
                onApply(draft);
                closeSheet();
              }}
            >
              <Text style={styles.showResultsText}>Show results</Text>
            </AppPressable>
          </PressScale>
        </View>
      </Animated.View>
    </Animated.View>
  );

  if (Platform.OS === 'web') {
    return visible ? <View style={styles.webSheetOverlay}>{sheet}</View> : null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeSheet}
      statusBarTranslucent
    >
      {sheet}
    </Modal>
  );
}

function JobFinderContent({ navigation }) {
  // view: 'list' | 'detail'  (tracker is now its own screen)
  const [view, setView] = useState('list');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [appliedFilters, setAppliedFilters] = useState(createEmptyJobFilters);
  const [exitingFilters, setExitingFilters] = useState([]);
  const [filterSheetVisible, setFilterSheetVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [showingSamples, setShowingSamples] = useState(false);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [filterCompatibilityWarning, setFilterCompatibilityWarning] = useState(false);
  const [initialAnimatedJobIds, setInitialAnimatedJobIds] = useState(null);
  const initialAnimationOrderRef = useRef(new Map());
  const animatedJobIdsRef = useRef(new Set());
  const initialBatchCapturedRef = useRef(false);
  const requestIdRef = useRef(0);

  // Shared with JobApplicationTracker
  const { applications, isJobTracked, addApplication } = useApplications();

  const storeJobs = (nextJobs) => {
    if (!initialBatchCapturedRef.current && nextJobs.length > 0) {
      const firstBatch = nextJobs.slice(0, 6);
      const ids = new Set(firstBatch.map((job) => job.id));
      initialAnimationOrderRef.current = new Map(
        firstBatch.map((job, index) => [job.id, index]),
      );
      initialBatchCapturedRef.current = true;
      setInitialAnimatedJobIds(ids);
    }
    setJobs(nextJobs);
  };

  useEffect(() => {
    let active = true;
    const requestId = ++requestIdRef.current;

    const setSampleFallback = () => {
      if (!active) return;
      const sampleJobs = category === 'All' ? JOBS : JOBS.filter((job) => job.category === category);
      storeJobs(sampleJobs);
      setShowingSamples(true);
      setRefreshFailed(false);
      setFetchedAt(null);
      setFilterCompatibilityWarning(countJobFilters(appliedFilters) > 0);
    };

    const loadJobs = async () => {
      setLoadingJobs(true);
      setJobs([]);
      setShowingSamples(false);
      setRefreshFailed(false);
      setFetchedAt(null);
      setFilterCompatibilityWarning(false);

      try {
        const requestedCategories = [category];
        const results = await Promise.all(
          requestedCategories.map(async (requestedCategory) => {
            try {
              const { data, error } = await supabase.functions.invoke('job-search', {
                body: {
                  category: requestedCategory,
                  searchText: submittedQuery,
                  employmentTypes: appliedFilters.employmentTypes,
                  remoteOnly: appliedFilters.remoteOnly,
                  datePosted: appliedFilters.datePosted,
                  jobRequirements: appliedFilters.jobRequirements,
                  location: appliedFilters.location,
                },
              });
              if (!active || requestId !== requestIdRef.current) return null;
              if (error || !Array.isArray(data?.jobs)) {
                return { jobs: [], fetchedAt: null, failed: true };
              }

              const providerJobs = data.jobs.map((job) => ({
                ...job,
                id: String(job.externalId),
                source: 'jsearch',
                externalId: String(job.externalId),
                category: requestedCategory,
                type: job.employmentType || 'Not specified',
                link: job.applyUrl,
                salary: null,
                color: '#2563EB',
                logo: null,
              }));

              return {
                jobs: providerJobs,
                fetchedAt: data.fetchedAt || null,
                failed: Boolean(data.error) || Boolean(data.quotaExhausted && !providerJobs.length),
                filtersApplied: data.filtersApplied === true,
              };
            } catch {
              if (!active || requestId !== requestIdRef.current) return null;
              return { jobs: [], fetchedAt: null, failed: true };
            }
          }),
        );
        if (!active || requestId !== requestIdRef.current) return;

        const uniqueJobs = new Map();
        results
          .filter(Boolean)
          .flatMap((result) => result.jobs)
          .forEach((job) => {
          uniqueJobs.set(`${job.source}:${job.externalId}`, job);
        });
        const providerJobs = Array.from(uniqueJobs.values());

        const validResults = results.filter(Boolean);
        if (!providerJobs.length && validResults.some((result) => result.failed)) {
          setSampleFallback();
          return;
        }

        storeJobs(providerJobs);
        setShowingSamples(false);
        setRefreshFailed(validResults.some((result) => result.failed));
        setFilterCompatibilityWarning(
          countJobFilters(appliedFilters) > 0 && validResults.some((result) => !result.filtersApplied),
        );
        const timestamps = validResults
          .map((result) => result.fetchedAt)
          .filter(Boolean)
          .map((value) => new Date(value).getTime())
          .filter(Number.isFinite);
        setFetchedAt(timestamps.length ? new Date(Math.min(...timestamps)).toISOString() : null);
      } catch {
        if (!active || requestId !== requestIdRef.current) return;
        setSampleFallback();
      } finally {
        if (active && requestId === requestIdRef.current) setLoadingJobs(false);
      }
    };

    loadJobs();
    return () => {
      active = false;
    };
  }, [appliedFilters, category, retryCount, submittedQuery]);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesCategory = category === 'All' || job.category === category;
      const matchesQuery = !q ||
        [
          job.title,
          job.company,
          job.category,
          job.location,
          job.publisher,
          job.type,
          job.description,
        ].some((field) => String(field || '').toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [jobs, query, category]);
  const activeFilterCount = countJobFilters(appliedFilters);
  const activeFilterSummary = useMemo(
    () => getJobFilterSummary(appliedFilters),
    [appliedFilters],
  );
  const activeFilterKeys = new Set(
    activeFilterSummary.map((filter) => `${filter.key}:${filter.value}`),
  );
  const visibleFilterSummary = [
    ...activeFilterSummary.map((filter) => ({ ...filter, exiting: false })),
    ...exitingFilters
      .filter((filter) => !activeFilterKeys.has(`${filter.key}:${filter.value}`))
      .map((filter) => ({ ...filter, exiting: true })),
  ];

  const updatedLabel = () => {
    if (!fetchedAt) return '';
    const elapsedMinutes = Math.max(0, Math.floor((Date.now() - new Date(fetchedAt).getTime()) / 60000));
    if (!Number.isFinite(elapsedMinutes) || elapsedMinutes < 1) return 'Updated just now';
    if (elapsedMinutes < 60) return `Updated ${elapsedMinutes} min ago`;
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) return `Updated ${elapsedHours} hr ago`;
    return `Updated ${Math.floor(elapsedHours / 24)} days ago`;
  };

  const handleBack = () => {
    if (view === 'detail') return setView('list');
    if (navigation && navigation.goBack) navigation.goBack();
  };

  const openDetail = (job) => {
    setSelectedJob(job);
    setView('detail');
  };

  const handleSearchSubmit = () => {
    const nextQuery = query.trim();
    if (nextQuery === submittedQuery) {
      setRetryCount((count) => count + 1);
    } else {
      setSubmittedQuery(nextQuery);
    }
  };

  const applyFilters = (filters) => {
    setAppliedFilters(filters);
    setSubmittedQuery(query.trim());
  };

  const clearAppliedFilters = () => {
    setAppliedFilters(createEmptyJobFilters());
    setSubmittedQuery(query.trim());
  };

  const removeAppliedFilter = (key, value) => {
    setAppliedFilters((current) => removeJobFilter(current, key, value));
    setSubmittedQuery(query.trim());
  };

  const startRemovingFilter = (filter) => {
    setExitingFilters((current) => (
      current.some((item) => item.key === filter.key && item.value === filter.value)
        ? current
        : [...current, filter]
    ));
    removeAppliedFilter(filter.key, filter.value);
  };

  const finishRemovingFilter = (key, value) => {
    setExitingFilters((current) => current.filter(
      (filter) => filter.key !== key || filter.value !== value,
    ));
  };

  // Apply -> confirmation -> record in ApplicationsContext -> visible in Application Tracker
  const confirmApply = (title, message) => {
    if (Platform.OS === 'web') {
      return Promise.resolve(window.confirm(`${title}\n\n${message}`));
    }
    return new Promise((resolve) => {
      Alert.alert(title, message, [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Track job', onPress: () => resolve(true) },
      ]);
    });
  };

  const notify = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleApply = async (job) => {
    if (isJobTracked(job)) {
      notify('Already tracked', `${job.title} at ${job.company} is already in your tracker.`);
      return;
    }
    const confirmed = await confirmApply(
      'Track this job?',
      `Add ${job.title} at ${job.company} to your Application Tracker? This will not submit an application to the employer.`,
    );
    if (!confirmed) return;

    const result = await addApplication(job);
    if (result.error) {
      notify(
        'Could not save tracker entry',
        'Check your connection and confirm the job tracker migration has been applied.',
      );
      return;
    }
    if (!result.added) {
      notify('Already tracked', `${job.title} at ${job.company} is already in your tracker.`);
      return;
    }
    notify(
      'Added to tracker',
      'You can follow its status in your Application Tracker. The app did not submit an application to the employer.',
    );
  };

  const openLink = (url) => {
    openExternalUrl(url);
  };

  const titles = { list: 'Job Search', detail: 'Job Details' };

  // ---------- Screens ----------

  const renderJobCard = ({ item }) => {
    const applied = isJobTracked(item);
    return (
      <JobCardEntrance
        itemId={item.id}
        eligible={initialAnimatedJobIds?.has(item.id) || false}
        delay={Math.min((initialAnimationOrderRef.current.get(item.id) || 0) * 65, 325)}
        animatedJobIdsRef={animatedJobIdsRef}
      >
        <PressScale>
          <AppPressable style={styles.card} activeOpacity={0.85} onPress={() => openDetail(item)}>
            <CompanyLogo company={item.company} color={item.color} logo={item.logo} />
            <View style={styles.cardBody}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.meta} numberOfLines={1}>
                {[item.location, item.type].filter(Boolean).join(' · ')}
              </Text>
              <Text style={styles.desc} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
            <Pop value={applied}>
              <PressScale>
                <AppPressable
                  style={[styles.applyBtn, applied && styles.applyBtnDone]}
                  onPress={() => handleApply(item)}
                >
                  <Text style={[styles.applyText, applied && styles.applyTextDone]}>
                    {applied ? 'Tracked' : 'Track'}
                  </Text>
                </AppPressable>
              </PressScale>
            </Pop>
          </AppPressable>
        </PressScale>
      </JobCardEntrance>
    );
  };

  const renderList = () => (
    <View style={styles.flex}>
      <View style={styles.searchBox}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs, companies, agencies..."
          placeholderTextColor={SEARCH_PLACEHOLDER}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
      </View>

      <View style={styles.categoryHeader}>
        <Text style={styles.sectionLabel}>Categories</Text>
        <FiltersButton count={activeFilterCount} onPress={() => setFilterSheetVisible(true)} />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.chipRow}>
          {JOB_CATEGORIES.map(({ value, label }) => {
            const active = value === category;
            return (
              <Pop key={value} value={active}>
                <PressScale>
                  <AppPressable
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setCategory(value)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
                  </AppPressable>
                </PressScale>
              </Pop>
            );
          })}
        </ScrollView>
      </View>

      {visibleFilterSummary.length > 0 && (
        <View style={styles.summaryRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.summaryChipRow}
          >
            {visibleFilterSummary.map((filter) => (
              <ActiveFilterChip
                key={`${filter.key}:${filter.value}`}
                filter={filter}
                exiting={filter.exiting}
                onRemove={startRemovingFilter}
                onRemoved={finishRemovingFilter}
              />
            ))}
            {activeFilterSummary.length > 0 && (
              <AppPressable onPress={clearAppliedFilters} style={styles.summaryClearButton}>
                <Text style={styles.summaryClearText}>Clear all</Text>
              </AppPressable>
            )}
          </ScrollView>
        </View>
      )}

      {filterCompatibilityWarning && (
        <Text style={styles.filterCompatibilityWarning}>
          {showingSamples
            ? 'Filters are not applied to sample listings. Check your connection, or ask the lead developer to deploy the updated search function.'
            : 'Filters need the updated job-search service. Ask the lead developer to deploy the latest Edge Function to apply them to live results.'}
        </Text>
      )}

      {loadingJobs ? null : showingSamples ? (
        <View style={styles.sampleNotice}>
          <Text style={styles.sampleNoticeText}>
            Showing sample listings. Live listings are unavailable right now.
          </Text>
          <AppPressable onPress={() => setRetryCount((count) => count + 1)}>
            <Text style={styles.retryText}>Retry</Text>
          </AppPressable>
        </View>
      ) : (
        <View style={styles.attribution}>
          <Text style={styles.attributionText}>Listings from JSearch</Text>
          {!!fetchedAt && <Text style={styles.updatedText}>{updatedLabel()}</Text>}
          {refreshFailed && (
            <AppPressable onPress={() => setRetryCount((count) => count + 1)}>
              <Text style={styles.retryText}>Refresh failed · Retry</Text>
            </AppPressable>
          )}
        </View>
      )}

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderJobCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          loadingJobs ? (
            <FadeSlideIn>
              <View style={styles.loadingJobs}>
                <ActivityIndicator size="small" color={PURPLE} />
                <Text style={styles.empty}>Loading listings...</Text>
              </View>
            </FadeSlideIn>
          ) : (
            <FadeSlideIn>
              <View>
                <Text style={styles.empty}>
                  {activeFilterCount > 0
                    ? 'No jobs match these filters. Try changing them or clear all filters.'
                    : 'No jobs match your search. Try another keyword or category.'}
                </Text>
                {activeFilterCount > 0 && (
                  <AppPressable style={styles.emptyClearButton} onPress={clearAppliedFilters}>
                    <Text style={styles.emptyClearText}>Clear filters</Text>
                  </AppPressable>
                )}
              </View>
            </FadeSlideIn>
          )
        }
      />

      <TrackedJobsButton
        count={applications.length}
        onPress={() => navigation && navigation.navigate('JobApplicationTracker')}
      />
    </View>
  );

  const renderDetail = () => {
    if (!selectedJob) return null;
    const job = selectedJob;
    const applied = isJobTracked(job);
    const rows = [
      ['Company', job.company],
      ['Location', job.location],
      ['Employment type', job.type || 'Not specified'],
      ...(job.salary ? [['Salary', job.salary]] : []),
      ['Source', job.publisher || (job.source === 'sample' ? 'Sample listing' : 'JSearch')],
      ...(job.postedAt ? [['Posted', job.postedAt]] : []),
    ];
    return (
      <ScrollView contentContainerStyle={styles.detailContent}>
        <View style={styles.detailHeader}>
          <Pop value playOnMount>
            <CompanyLogo company={job.company} color={job.color} logo={job.logo} size={64} />
          </Pop>
          <FadeSlideIn delay={40}>
            <Text style={styles.detailTitle}>{job.title}</Text>
          </FadeSlideIn>
        </View>

        <FadeSlideIn delay={80}>
          <View>
            {rows.map(([label, value]) => (
              <View key={label} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
              </View>
            ))}
          </View>
        </FadeSlideIn>

        <FadeSlideIn delay={100}>
          <View>
            <Text style={styles.detailSectionTitle}>Description</Text>
            <Text style={styles.detailDesc}>{job.description}</Text>
          </View>
        </FadeSlideIn>

        <PressScale>
          <AppPressable onPress={() => openLink(job.link || job.applyUrl)}>
            <Text style={styles.link}>{job.link || job.applyUrl}</Text>
          </AppPressable>
        </PressScale>

        <PressScale>
          <AppPressable
            style={[styles.primaryBtn, applied && styles.primaryBtnDone]}
            onPress={() => handleApply(job)}
          >
            <Text style={styles.primaryBtnText}>{applied ? 'Tracked' : 'Track job'}</Text>
          </AppPressable>
        </PressScale>
        <PressScale>
          <AppPressable style={styles.secondaryBtn} onPress={() => setView('list')}>
            <Text style={styles.secondaryBtnText}>Back to job list</Text>
          </AppPressable>
        </PressScale>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <BackButton onPress={handleBack} style={styles.backBtn} />
        <Text style={styles.headerTitle}>{titles[view]}</Text>
        <View style={styles.backBtn} />
      </View>

      {view === 'list' && renderList()}
      {view === 'detail' && renderDetail()}
      {view === 'list' && (
        <FilterSheet
          visible={filterSheetVisible}
          initialFilters={appliedFilters}
          onClose={() => setFilterSheetVisible(false)}
          onApply={applyFilters}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { width: 44 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },

  searchBox: {
    marginHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: { flex: 1, height: 44, fontSize: 14, paddingHorizontal: 10, color: '#111827' },

  categoryHeader: {
    marginHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  sectionLabel: { flexShrink: 1, fontSize: 13, fontWeight: '700', color: '#111827' },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  filterButtonActive: { borderColor: PURPLE, backgroundColor: '#EDE9FE' },
  filterButtonText: { color: '#374151', fontSize: 12, fontWeight: '700' },
  filterButtonTextActive: { color: PURPLE },
  chipRow: { paddingHorizontal: 16, paddingVertical: 10 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  chipActive: { backgroundColor: PURPLE, borderColor: PURPLE },
  chipText: { fontSize: 13, color: '#374151' },
  chipTextActive: { color: '#fff', fontWeight: '600' },

  summaryRow: { marginBottom: 8 },
  summaryChipRow: { paddingHorizontal: 16, alignItems: 'center', gap: 8 },
  summaryChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#EDE9FE',
  },
  summaryChipText: { color: PURPLE, fontSize: 11, fontWeight: '600' },
  summaryClearButton: { paddingHorizontal: 4, paddingVertical: 6 },
  summaryClearText: { color: PURPLE, fontSize: 11, fontWeight: '700' },
  filterCompatibilityWarning: {
    marginHorizontal: 16,
    marginBottom: 8,
    color: '#92400E',
    fontSize: 11,
    lineHeight: 16,
  },

  listContent: { paddingHorizontal: 16, paddingBottom: 12, flexGrow: 1 },
  sampleNotice: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FEF3C7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  sampleNoticeText: { flex: 1, color: '#78350F', fontSize: 12, lineHeight: 17 },
  retryText: { color: '#92400E', fontSize: 13, fontWeight: '700' },
  attribution: {
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attributionText: { color: '#4B5563', fontSize: 12, fontWeight: '600' },
  updatedText: { color: '#6B7280', fontSize: 12 },
  loadingJobs: { alignItems: 'center', marginTop: 40 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardBody: { flex: 1, marginHorizontal: 12 },
  jobTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
  company: { fontSize: 13, color: '#4B5563', marginTop: 2 },
  meta: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  desc: { fontSize: 12, color: '#6B7280', marginTop: 4 },

  logo: { alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#fff', fontWeight: '800' },

  applyBtn: {
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyBtnDone: { backgroundColor: '#EDE9FE' },
  applyText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  applyTextDone: { color: PURPLE },

  primaryBtn: {
    backgroundColor: PURPLE,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnDone: { backgroundColor: '#A78BFA' },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtn: { alignItems: 'center', paddingVertical: 8 },
  secondaryBtnText: { color: PURPLE, fontSize: 14, fontWeight: '600' },

  empty: { textAlign: 'center', color: '#6B7280', marginTop: 40, paddingHorizontal: 24 },
  emptyClearButton: { alignSelf: 'center', marginTop: 12, padding: 8 },
  emptyClearText: { color: PURPLE, fontWeight: '700', fontSize: 13 },

  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(17,24,39,0.45)',
  },
  webSheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  filterSheet: {
    width: '100%',
    maxHeight: '86%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginBottom: 10,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sheetTitle: { color: '#111827', fontSize: 17, fontWeight: '700' },
  sheetClose: { color: PURPLE, fontSize: 13, fontWeight: '700' },
  sheetScroll: { flexShrink: 1 },
  sheetScrollContent: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 12 },
  filterGroupTitle: {
    marginTop: 16,
    marginBottom: 9,
    color: '#111827',
    fontSize: 13,
    fontWeight: '700',
  },
  filterGroupHint: { color: '#6B7280', fontSize: 11, marginTop: -2 },
  filterChoices: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChoice: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  filterChoiceSelected: { backgroundColor: '#EDE9FE', borderColor: PURPLE },
  filterChoiceText: { color: '#374151', fontSize: 12 },
  filterChoiceTextSelected: { color: PURPLE, fontWeight: '700' },
  remoteToggle: {
    alignSelf: 'flex-start',
    minWidth: 74,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  remoteToggleSelected: { backgroundColor: '#EDE9FE' },
  remoteToggleText: { color: '#4B5563', fontSize: 12, fontWeight: '700' },
  remoteToggleTextSelected: { color: PURPLE },
  sheetFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  clearAllText: { color: PURPLE, fontSize: 13, fontWeight: '700', paddingVertical: 10 },
  showResultsButton: {
    minWidth: 140,
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: PURPLE,
  },
  showResultsText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },

  detailContent: { padding: 16 },
  detailHeader: { alignItems: 'center', marginBottom: 16 },
  detailTitle: { fontSize: 20, fontWeight: '800', color: '#111827', marginTop: 12, textAlign: 'center' },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: { fontSize: 13, color: '#6B7280' },
  detailValue: { fontSize: 13, color: '#111827', fontWeight: '600', flexShrink: 1, textAlign: 'right', marginLeft: 16 },
  detailSectionTitle: { marginTop: 18, fontSize: 14, fontWeight: '700', color: '#111827' },
  detailDesc: { marginTop: 6, fontSize: 14, color: '#4B5563', lineHeight: 20 },
  link: { marginTop: 12, color: PURPLE, fontSize: 13, textDecorationLine: 'underline' },
});

export default function JobFinderScreen(props) {
  return (
    <AccountGate
      featureName="Job Finder"
      description="Explore openings and track your applications. Complete your account to unlock Job Finder and keep your saved progress."
      navigation={props.navigation}
    >
      <JobFinderContent {...props} />
    </AccountGate>
  );
}