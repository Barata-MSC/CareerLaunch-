import googleIcon from '../../assets/google.png';
import microsoftIcon from '../../assets/microsoft.png';
import spotifyIcon from '../../assets/Spotify.png';
import canvaIcon from '../../assets/canva.png';
import deloitteIcon from '../../assets/deloitte.png';
import globeIcon from '../../assets/globe.png';

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  Linking,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { useApplications } from '../../context/ApplicationsContext';
// ^ adjust this relative path if your context file lives somewhere else

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
    source: 'Google Careers',
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
    source: 'Microsoft Careers',
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
    source: 'Spotify Jobs',
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
    source: 'Canva Careers',
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
    source: 'Deloitte Careers',
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
    source: 'Globe Careers',
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
      <Text style={[styles.logoText, { fontSize: size * 0.42 }]}>{company[0]}</Text>
    </View>
  );


  // Fallback: initial letter
  return (
    <View
      style={[
        styles.logo,
        { width: size, height: size, borderRadius: size / 4, backgroundColor: color },
      ]}
    >
      <Text style={[styles.logoText, { fontSize: size * 0.42 }]}>{company[0]}</Text>
    </View>
  );
}

export default function JobFinderScreen({ navigation }) {
  // view: 'list' | 'detail'  (tracker is now its own screen)
  const [view, setView] = useState('list');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);

  // Shared with JobApplicationTracker
  const { applications, appliedIds, addApplication } = useApplications();

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((job) => {
      const matchesCategory = category === 'All' || job.category === category;
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

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
        { text: 'Apply', onPress: () => resolve(true) },
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
    if (appliedIds.includes(job.id)) {
      notify('Already applied', `You already applied to ${job.title} at ${job.company}.`);
      return;
    }
    const confirmed = await confirmApply('Confirm application', `Apply to ${job.title} at ${job.company}?`);
    if (!confirmed) return;

    addApplication(job);
    notify('Application sent', 'You can follow its status in your Application Tracker.');
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(() =>
      Alert.alert('Could not open link', 'Please try again later.')
    );
  };

  const titles = { list: 'Job Search', detail: 'Job Details' };

  // ---------- Screens ----------

  const renderJobCard = ({ item }) => {
    const applied = appliedIds.includes(item.id);
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => openDetail(item)}>
        <CompanyLogo company={item.company} color={item.color} logo={item.logo} />
        <View style={styles.cardBody}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.company}>{item.company}</Text>
          <Text style={styles.meta}>
            {item.arrangement} · {item.type}
          </Text>
          <Text style={styles.desc} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.applyBtn, applied && styles.applyBtnDone]}
          onPress={() => handleApply(item)}
        >
          <Text style={[styles.applyText, applied && styles.applyTextDone]}>
            {applied ? 'Applied' : 'Apply'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
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
              <TouchableOpacity
                key={c}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setCategory(c)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderJobCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>No jobs match your search. Try another keyword or category.</Text>
        }
      />

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation && navigation.navigate('JobApplicationTracker')}
      >
        <Text style={styles.primaryBtnText}>Applied Jobs ({applications.length})</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDetail = () => {
    if (!selectedJob) return null;
    const job = selectedJob;
    const applied = appliedIds.includes(job.id);
    const rows = [
      ['Company', job.company],
      ['Location', job.location],
      ['Job type', `${job.arrangement} · ${job.type}`],
      ...(job.salary ? [['Salary', job.salary]] : []),
      ['Source', job.source],
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

        <TouchableOpacity onPress={() => openLink(job.link)}>
          <Text style={styles.link}>{job.link}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryBtn, applied && styles.primaryBtnDone]}
          onPress={() => handleApply(job)}
        >
          <Text style={styles.primaryBtnText}>{applied ? 'Applied' : 'Apply'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => setView('list')}>
          <Text style={styles.secondaryBtnText}>Back to job list</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
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
  backBtn: { width: 32 },
  backText: { fontSize: 22, color: '#111827' },
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