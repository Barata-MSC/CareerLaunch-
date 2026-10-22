import AppPressable from '@components/AppPressable';
import BackButton from '@components/BackButton';
import googleIcon from '../../assets/google.png';
import microsoftIcon from '../../assets/microsoft.png';
import spotifyIcon from '../../assets/Spotify.png';
import canvaIcon from '../../assets/canva.png';
import deloitteIcon from '../../assets/deloitte.png';
import globeIcon from '../../assets/globe.png';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApplications } from '../../context/ApplicationsContext';
import { useProfile } from '../../context/ProfileContext';
import AccountGate from '../../components/AccountGate';
import { supabase } from '../../config/supabase';
import { openExternalUrl } from '../../utils/openExternalUrl';

const PURPLE = '#5B21D6';
const CATEGORIES = ['All', 'IT', 'Design', 'Finance', 'Marketing'];

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

function JobFinderContent({ navigation }) {
  // view: 'list' | 'detail'  (tracker is now its own screen)
  const [view, setView] = useState('list');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [showingSamples, setShowingSamples] = useState(false);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Shared with JobApplicationTracker
  const { applications, isJobTracked, addApplication } = useApplications();

  useEffect(() => {
    let active = true;

    const setSampleFallback = () => {
      if (!active) return;
      const sampleJobs = category === 'All' ? JOBS : JOBS.filter((job) => job.category === category);
      setJobs(sampleJobs);
      setShowingSamples(true);
      setRefreshFailed(false);
      setFetchedAt(null);
    };

    const loadJobs = async () => {
      setLoadingJobs(true);
      setJobs([]);
      setShowingSamples(false);
      setRefreshFailed(false);
      setFetchedAt(null);

      try {
        const { data, error } = await supabase.functions.invoke('job-search', {
          body: { category },
        });
        if (error) throw error;
        if (!Array.isArray(data?.jobs)) throw new Error('Invalid job-search response.');

        if (data.jobs.length === 0 && data.quotaExhausted) {
          setSampleFallback();
          return;
        }

        const providerJobs = data.jobs.map((job) => ({
          ...job,
          id: String(job.externalId),
          source: 'jsearch',
          externalId: String(job.externalId),
          category,
          type: job.employmentType || 'Not specified',
          link: job.applyUrl,
          salary: null,
          color: '#2563EB',
          logo: null,
        }));

        if (!active) return;
        setJobs(providerJobs);
        setShowingSamples(false);
        setRefreshFailed(Boolean(data.error));
        setFetchedAt(data.fetchedAt || null);
      } catch {
        setSampleFallback();
      } finally {
        if (active) setLoadingJobs(false);
      }
    };

    loadJobs();
    return () => {
      active = false;
    };
  }, [category, retryCount]);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesCategory = category === 'All' || job.category === category;
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [jobs, query, category]);

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
        <AppPressable
          style={[styles.applyBtn, applied && styles.applyBtnDone]}
          onPress={() => handleApply(item)}
        >
          <Text style={[styles.applyText, applied && styles.applyTextDone]}>
            {applied ? 'Tracked' : 'Track'}
          </Text>
        </AppPressable>
      </AppPressable>
    );
  };

  const renderList = () => (
    <View style={styles.flex}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs, companies, agencies..."
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
      </View>

      <Text style={styles.sectionLabel}>Categories</Text>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.chipRow}>
          {CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <AppPressable
                key={c}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setCategory(c)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
              </AppPressable>
            );
          })}
        </ScrollView>
      </View>

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
            <View style={styles.loadingJobs}>
              <ActivityIndicator size="small" color={PURPLE} />
              <Text style={styles.empty}>Loading listings...</Text>
            </View>
          ) : (
            <Text style={styles.empty}>No jobs match your search. Try another keyword or category.</Text>
          )
        }
      />

      <AppPressable
        style={styles.primaryBtn}
        onPress={() => navigation && navigation.navigate('JobApplicationTracker')}
      >
        <Text style={styles.primaryBtnText}>Tracked Jobs ({applications.length})</Text>
      </AppPressable>
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
          <CompanyLogo company={job.company} color={job.color} logo={job.logo} size={64} />
          <Text style={styles.detailTitle}>{job.title}</Text>
        </View>

        {rows.map(([label, value]) => (
          <View key={label} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
          </View>
        ))}

        <Text style={styles.detailSectionTitle}>Description</Text>
        <Text style={styles.detailDesc}>{job.description}</Text>

        <AppPressable onPress={() => openLink(job.link || job.applyUrl)}>
          <Text style={styles.link}>{job.link || job.applyUrl}</Text>
        </AppPressable>

        <AppPressable
          style={[styles.primaryBtn, applied && styles.primaryBtnDone]}
          onPress={() => handleApply(job)}
        >
            <Text style={styles.primaryBtnText}>{applied ? 'Tracked' : 'Track job'}</Text>
        </AppPressable>
        <AppPressable style={styles.secondaryBtn} onPress={() => setView('list')}>
          <Text style={styles.secondaryBtnText}>Back to job list</Text>
        </AppPressable>
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
  },
  searchInput: { height: 44, fontSize: 14, paddingHorizontal: 10, color: '#111827' },

  sectionLabel: { marginTop: 16, marginHorizontal: 16, fontSize: 13, fontWeight: '700', color: '#111827' },
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