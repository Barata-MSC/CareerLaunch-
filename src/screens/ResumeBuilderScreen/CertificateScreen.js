import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useResume } from './ResumeContext';

const PURPLE = '#5B21F5';

export default function CertificateScreen({ navigation }) {
  // Extract state records and global updaters from our provider context
  const { resumeData, updateResumeData } = useResume();
  const certificatesList = resumeData.certificates || [];

  // Local component form field trackers
  const [name, setName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [year, setYear] = useState('');

  // Bundles values into a standard node item and pushes to global context array
  const handleAddCertificate = () => {
    const trimmedName = name.trim();
    const trimmedIssuer = issuer.trim();
    const trimmedYear = year.trim();

    // Prevent submission if mandatory fields are missing
    if (!trimmedName || !trimmedIssuer || !trimmedYear) return;

    const newCertificateItem = {
      id: Date.now().toString(), // Clean timestamp string hash identifier
      name: trimmedName,
      issuer: trimmedIssuer,
      year: trimmedYear,
    };

    const updatedList = [...certificatesList, newCertificateItem];
    updateResumeData('certificates', updatedList);

    // Refresh and clear input modules local cache state
    setName('');
    setIssuer('');
    setYear('');
  };

  // Safely slices selected history nodes away from the main array index map
  const handleRemoveCertificate = (itemId) => {
    const updatedList = certificatesList.filter((item) => item.id !== itemId);
    updateResumeData('certificates', updatedList);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Structural Action Title Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation?.goBack()} 
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certificates</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionSubtitle}>
            Add professional credentials, licenses, or online course achievements to verify your expertise.
          </Text>

          {/* Form Entry Field Modules Deck */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Add New Certificate</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Certificate Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. AWS Certified Cloud Practitioner"
                placeholderTextColor="#B5B5B9"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Issuing Organization / Authority</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Amazon Web Services, Coursera"
                placeholderTextColor="#B5B5B9"
                value={issuer}
                onChangeText={setIssuer}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Year Earned / Issue Date</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 2023"
                placeholderTextColor="#B5B5B9"
                value={year}
                onChangeText={setYear}
              />
            </View>

            <TouchableOpacity 
              style={styles.addButton} 
              activeOpacity={0.8} 
              onPress={handleAddCertificate}
            >
              <Text style={styles.addButtonText}>+ Add Certificate</Text>
            </TouchableOpacity>
          </View>

          {/* Render List Array Output Cards Section */}
          <Text style={styles.listLabel}>Your Certificates ({certificatesList.length})</Text>

          {certificatesList.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No certificates added yet.</Text>
            </View>
          ) : (
            <View style={styles.historyContainer}>
              {certificatesList.map((item) => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyCardLeft}>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <Text style={styles.cardIssuer}>{item.issuer}</Text>
                    <Text style={styles.cardYear}>{item.year}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => handleRemoveCertificate(item.id)}
                    style={styles.deleteButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Safe Dismiss Save Panel View Button */}
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.85}
            onPress={() => navigation?.goBack()}
          >
            <Text style={styles.saveButtonText}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#F2F2F7',
  },
  backArrow: {
    fontSize: 32,
    color: '#111111',
    lineHeight: 32,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8A8A8E',
    marginBottom: 20,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#FAFAFC',
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 14,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1C1C1E',
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: PURPLE,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  listLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  emptyContainer: {
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  emptyText: {
    fontSize: 13,
    color: '#8A8A8E',
  },
  historyContainer: {
    marginBottom: 32,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  historyCardLeft: {
    flex: 1,
    paddingRight: 8,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  cardIssuer: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 2,
  },
  cardYear: {
    fontSize: 12,
    color: '#8A8A8E',
  },
  deleteButton: {
    padding: 6,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: PURPLE,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#3D14C4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
