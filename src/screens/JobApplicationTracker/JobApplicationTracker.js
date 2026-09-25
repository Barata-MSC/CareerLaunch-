// src/screens/JobApplicationTracker/JobApplicationTracker.js

import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Linking,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import { useApplications, STATUSES } from '../../context/ApplicationsContext';

const PURPLE = '#5B21D6';

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
function CompanyLogo({ company, color, size = 44 }) {
  return (
    <View
      style={[
        styles.logo,
        {
          width: size,
          height: size,
          borderRadius: size / 4,
          backgroundColor: color,
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

export default function JobApplicationTracker({ navigation }) {
  const { applications, updateStatus } = useApplications();

  const [tab, setTab] = useState('All');
  const [selected, setSelected] = useState(null);

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

    Linking.openURL(url).catch(() =>
      Alert.alert(
        'Could not open link',
        'Please try again later.'
      )
    );
  };

  // Back button
  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  // Application card
  const renderCard = ({ item }) => {
    const s =
      STATUS_STYLES[item.status] ||
      STATUS_STYLES.Applied;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => setSelected(item)}
      >
        {/* Company Logo */}
        <CompanyLogo
          company={item.job.company}
          color={item.job.color}
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
      </TouchableOpacity>
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
        keyExtractor={(item) => item.job.id.toString()}
        renderItem={renderCard}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={handleBack}
                style={styles.backBtn}
                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}
              >
                <Text style={styles.backText}>
                  {'<'}
                </Text>
              </TouchableOpacity>

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
                  <TouchableOpacity
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
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Small gap below tabs */}
            <View style={styles.tabsBottomSpace} />

            {/* EMPTY STATE */}
            {filtered.length === 0 && (
              <Text style={styles.empty}>
                {applications.length === 0
                  ? 'You have not applied to any jobs yet. Find one in Job Search and tap Apply.'
                  : 'No applications with this status yet.'}
              </Text>
            )}
          </>
        }
      />

      {/* STATUS UPDATE / DETAILS MODAL */}
      <Modal
        visible={!!selected}
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
                      <TouchableOpacity
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
                        onPress={() => {
                          updateStatus(
                            selected.job.id,
                            s
                          );

                          setSelected((prev) =>
                            prev
                              ? {
                                ...prev,
                                status: s,
                              }
                              : prev
                          );
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
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Application Link */}
                {!!selected.job.link && (
                  <TouchableOpacity
                    style={styles.linkBtn}
                    onPress={() =>
                      openLink(selected.job.link)
                    }
                  >
                    <Text style={styles.linkBtnText}>
                      Open application link
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Close */}
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setSelected(null)}
                >
                  <Text style={styles.closeBtnText}>
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
    width: 32,
  },

  backText: {
    fontSize: 22,
    color: '#111827',
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