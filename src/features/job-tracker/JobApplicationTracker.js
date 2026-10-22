import AppPressable from '@components/AppPressable';
import BackButton from '@components/BackButton';
import React, { useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  Alert,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApplications, STATUSES } from '../../context/ApplicationsContext';
import AccountGate from '../../components/AccountGate';
import { openExternalUrl } from '../../utils/openExternalUrl';

const PURPLE = '#5B21D6';
const DEFAULT_LOGO_COLOR = '#2563EB';

const TABS = ['All', 'Applied', 'Interview', 'Hired', 'Rejected'];

const STATUS_STYLES = {
  Applied: {
    bg: '#EDE9FE',
    fg: PURPLE,
  },

  Interview: {
    bg: '#FCE7F3',
    fg: '#BE185D',
  },

  Hired: {
    bg: '#DCFCE7',
    fg: '#15803D',
  },

  Rejected: {
    bg: '#FEE2E2',
    fg: '#B91C1C',
  },
};

// Company logo
function CompanyLogo({ company, color, logo, size = 44 }) {
  if (logo) {
    return (
      <View
        style={[
          styles.logo,
          {
            width: size,
            height: size,
            borderRadius: size / 4,
            backgroundColor: '#F3F4F6',
          },
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

  return (
    <View
      style={[
        styles.logo,
        {
          width: size,
          height: size,
          borderRadius: size / 4,
          backgroundColor: color || DEFAULT_LOGO_COLOR,
        },
      ]}
    >
      <Text
        style={[
          styles.logoText,
          {
            fontSize: size * 0.42,
          },
        ]}
      >
        {company?.[0] || '?'}
      </Text>
    </View>
  );
}

function JobApplicationTrackerContent({ navigation }) {
  const {
    applications,
    updateStatus,
    updateNotes,
    removeApplication,
    loadStatus,
    loadError,
    mutationError,
    refresh,
  } = useApplications();

  const [tab, setTab] = useState('All');
  const [selected, setSelected] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [notesSaving, setNotesSaving] = useState(false);

  useEffect(() => {
    setNotesDraft(selected?.notes || '');
  }, [selected?.id]);

  useEffect(() => {
    if (!navigation) return undefined;
    return navigation.addListener('focus', () => {
      if (loadStatus === 'ready' || loadStatus === 'error') refresh();
    });
  }, [loadStatus, navigation, refresh]);

  // Application counts
  const counts = useMemo(() => {
    const c = {
      All: applications.length,
      Applied: 0,
      Interview: 0,
      Hired: 0,
      Rejected: 0,
    };

    applications.forEach((a) => {
      if (c[a.status] !== undefined) {
        c[a.status] += 1;
      }
    });

    return c;
  }, [applications]);

  // Filter applications
  const filtered = useMemo(() => {
    if (tab === 'All') {
      return applications;
    }

    return applications.filter((a) => a.status === tab);
  }, [applications, tab]);

  // Open application link
  const openLink = (url) => {
    if (!url) return;
    openExternalUrl(url);
  };

  // Back button
  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleRemove = (application) => {
    const confirm = async () => {
      const removed = await removeApplication(application.id);
      if (removed) setSelected(null);
    };
    const message = `Remove ${application.job.title} from your tracker?`;

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm(message)) confirm();
      return;
    }
    Alert.alert('Remove application?', message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: confirm },
    ]);
  };

  const handleSaveNotes = async () => {
    if (!selected || notesSaving || notesDraft === (selected.notes || '')) return;
    setNotesSaving(true);
    const saved = await updateNotes(selected.id, notesDraft);
    if (saved) {
      setSelected((previous) => previous && { ...previous, notes: notesDraft });
    }
    setNotesSaving(false);
  };

  if (loadStatus === 'error') {
    return (
      <SafeAreaView style={[styles.safe, styles.stateContainer]}>
        <Text style={styles.error}>{loadError}</Text>
        <AppPressable style={styles.retryBtn} onPress={refresh}>
          <Text style={styles.retryBtnText}>Retry</Text>
        </AppPressable>
      </SafeAreaView>
    );
  }

  if (loadStatus !== 'ready') {
    return (
      <SafeAreaView style={[styles.safe, styles.stateContainer]}>
        <ActivityIndicator size="large" color={PURPLE} />
        <Text style={styles.loadingText}>Loading your applications…</Text>
      </SafeAreaView>
    );
  }

  // Application card
  const renderCard = ({ item }) => {
    const s =
      STATUS_STYLES[item.status] ||
      STATUS_STYLES.Applied;

    return (
      <AppPressable
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => setSelected(item)}
      >
        {/* Company Logo */}
        <CompanyLogo
          company={item.job.company}
          color={item.job.color}
          logo={item.job.logo}
        />

        {/* Job Information */}
        <View style={styles.cardBody}>
          <Text style={styles.jobTitle}>
            {item.job.title}
          </Text>

          <Text style={styles.company}>
            {item.job.company}
          </Text>

          {!!item.job.location && (
            <Text style={styles.meta}>
              {item.job.location}
            </Text>
          )}

          <Text style={styles.meta}>
            Applied on {item.dateApplied}
          </Text>
        </View>

        {/* Status Badge */}
        <View
          style={[
            styles.badge,
            {
              backgroundColor: s.bg,
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color: s.fg,
              },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </AppPressable>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />

      {/* MAIN APPLICATION LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.header}>
              <BackButton onPress={handleBack} style={styles.backBtn} />

              <Text style={styles.headerTitle}>
                Application Tracker
              </Text>

              {/* Keeps title centered */}
              <View style={styles.backBtn} />
            </View>

            {/* FILTER TABS */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.tabRow}
            >
              {TABS.map((t) => {
                const active = t === tab;

                return (
                  <AppPressable
                    key={t}
                    style={[
                      styles.tab,
                      active && styles.tabActive,
                    ]}
                    onPress={() => setTab(t)}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        active && styles.tabTextActive,
                      ]}
                    >
                      {t} ({counts[t]})
                    </Text>
                  </AppPressable>
                );
              })}
            </ScrollView>

            {/* Small gap below tabs */}
            <View style={styles.tabsBottomSpace} />

            {mutationError ? <Text style={styles.error}>{mutationError}</Text> : null}

            {/* EMPTY STATE */}
            {filtered.length === 0 && (
              <Text style={styles.empty}>
                {applications.length === 0
                  ? 'You have not tracked any jobs yet. Find one in Job Search and tap Track.'
                  : 'No applications with this status yet.'}
              </Text>
            )}
          </>
        }
      />

      {/* STATUS UPDATE / DETAILS MODAL */}
      <Modal
        visible={!!selected && applications.some((application) => application.id === selected.id)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selected && (
              <>
                {/* Modal Header */}
                <View style={styles.modalHeaderRow}>
                  <CompanyLogo
                    company={selected.job.company}
                    color={selected.job.color}
                    logo={selected.job.logo}
                    size={40}
                  />

                  <View style={styles.modalHeaderInfo}>
                    <Text style={styles.jobTitle}>
                      {selected.job.title}
                    </Text>

                    <Text style={styles.company}>
                      {selected.job.company}
                    </Text>
                  </View>
                </View>

                {/* Location */}
                {!!selected.job.location && (
                  <Text style={styles.modalMeta}>
                    {selected.job.location}
                  </Text>
                )}

                {/* Date */}
                <Text style={styles.modalMeta}>
                  Applied on {selected.dateApplied}
                </Text>

                {/* Status */}
                <Text style={styles.modalSectionTitle}>
                  Update status
                </Text>

                <View style={styles.statusRow}>
                  {STATUSES.map((s) => {
                    const active =
                      s === selected.status;

                    const style =
                      STATUS_STYLES[s] ||
                      STATUS_STYLES.Applied;

                    return (
                      <AppPressable
                        key={s}
                        style={[
                          styles.statusChip,
                          {
                            borderColor: style.fg,
                          },
                          active && {
                            backgroundColor: style.bg,
                          },
                        ]}
                        onPress={async () => {
                          const saved = await updateStatus(selected.id, s);
                          if (saved) {
                            setSelected((previous) =>
                              previous ? { ...previous, status: s } : previous,
                            );
                          }
                        }}
                      >
                        <Text
                          style={[
                            styles.statusChipText,
                            {
                              color: style.fg,
                            },
                          ]}
                        >
                          {s}
                        </Text>
                      </AppPressable>
                    );
                  })}
                </View>

                <Text style={styles.modalSectionTitle}>Notes</Text>
                <TextInput
                  style={styles.notesInput}
                  value={notesDraft}
                  onChangeText={setNotesDraft}
                  placeholder="Add a private note about this application"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  maxLength={5000}
                />
                <AppPressable
                  style={styles.notesSaveBtn}
                  disabled={notesSaving || notesDraft === (selected.notes || '')}
                  onPress={handleSaveNotes}
                >
                  <Text style={styles.notesSaveText}>
                    {notesSaving ? 'Saving notes…' : 'Save notes'}
                  </Text>
                </AppPressable>

                {mutationError ? <Text style={styles.error}>{mutationError}</Text> : null}

                {/* Application Link */}
                {!!selected.job.link && (
                  <AppPressable
                    style={styles.linkBtn}
                    onPress={() =>
                      openLink(selected.job.link)
                    }
                  >
                    <Text style={styles.linkBtnText}>
                      Open application link
                    </Text>
                  </AppPressable>
                )}

                <AppPressable
                  style={styles.removeBtn}
                  onPress={() => handleRemove(selected)}
                >
                  <Text style={styles.removeBtnText}>Remove from tracker</Text>
                </AppPressable>

                {/* Close */}
                <AppPressable
                  style={styles.closeBtn}
                  onPress={() => setSelected(null)}
                >
                  <Text style={styles.closeBtnText}>
                    Close
                  </Text>
                </AppPressable>
              </>
            )}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

export default function JobApplicationTracker(props) {
  return (
    <AccountGate
      featureName="Application Tracker"
      description="Track the jobs you apply to and monitor their status. Complete your account to unlock the tracker and keep your applications tied to your account."
      navigation={props.navigation}
    >
      <JobApplicationTrackerContent {...props} />
    </AccountGate>
  );
}

const styles = StyleSheet.create({
  // Main screen
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },
  stateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    color: '#4B5563',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  error: {
    color: '#B42318',
    fontSize: 13,
    lineHeight: 19,
    marginHorizontal: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingVertical: 11,
    marginTop: 12,
  },
  retryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  // Main FlatList
  listContent: {
    paddingBottom: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  backBtn: {
    width: 44,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },

  // Filter Tabs
  tabRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },

  tabsBottomSpace: {
    height: 8,
  },

  tab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 8,
    backgroundColor: '#fff',
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  tabText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },

  tabTextActive: {
    color: '#fff',
  },

  // Application Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  cardBody: {
    flex: 1,
    marginHorizontal: 12,
  },

  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  company: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 2,
  },

  meta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  // Company Logo
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    color: '#fff',
    fontWeight: '800',
  },

  // Status Badge
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },

  // Empty State
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 40,
    paddingHorizontal: 24,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalCard: {
    width: '90%',
    maxWidth: 340,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },

  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  modalHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },

  modalMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  modalSectionTitle: {
    marginTop: 16,
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  notesInput: {
    minHeight: 72,
    maxHeight: 120,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#111827',
    textAlignVertical: 'top',
    fontSize: 13,
  },
  notesSaveBtn: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#EDE9FE',
  },
  notesSaveText: {
    color: PURPLE,
    fontSize: 12,
    fontWeight: '700',
  },
  removeBtn: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 4,
  },
  removeBtnText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '600',
  },

  // Status Chips
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  statusChip: {
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },

  statusChipText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Application Link
  linkBtn: {
    marginTop: 8,
    paddingVertical: 10,
  },

  linkBtnText: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // Close Button
  closeBtn: {
    marginTop: 8,
    backgroundColor: PURPLE,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  closeBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});