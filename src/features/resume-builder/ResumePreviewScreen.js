import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResume } from './ResumeContext';
import { calculateResumeScore, getResumeSuggestions, getScoreBreakdown } from './resumeScore';
import { formatPhone } from './validators';

const PURPLE = '#5B21F5';

export default function ResumePreviewScreen({ navigation, route }) {
    const { resumeData } = useResume();
    const mode = route?.params?.mode === 'test' ? 'test' : 'generate';

    const score = calculateResumeScore(resumeData);
    const suggestions = getResumeSuggestions(resumeData);
    const breakdown = getScoreBreakdown(resumeData);

    const info = resumeData.personalInfo || {};
    const education = resumeData.education || [];
    const skills = resumeData.skills || [];
    const experience = resumeData.experience || [];
    const certificates = resumeData.certificates || [];
    const projects = resumeData.projects || [];

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Navigation Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation?.goBack()}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {mode === 'test' ? 'Test Resume' : 'Resume Preview'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {mode === 'test' ? (
                    <>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreHeaderRow}>
                            <Text style={styles.scoreTitle}>AI Resume Strength Score</Text>
                            <Text style={styles.scoreNumber}>{score}/100</Text>
                        </View>
                        <View style={styles.scoreTrack}>
                            <View style={[styles.scoreFill, { width: `${score}%` }]} />
                        </View>
                        <Text style={styles.scoreHint}>
                            {score < 70
                                ? '💡 Tip: Add more detailed descriptions or portfolio items to stand out to employers.'
                                : '✅ Awesome! Your resume looks robust and well-optimized for application tracking systems.'}
                        </Text>

                        <View style={styles.suggestionsBox}>
                            <Text style={styles.suggestionsTitle}>Suggestions</Text>
                            {suggestions.map((tip, index) => (
                                <Text key={index} style={styles.suggestionItem}>• {tip}</Text>
                            ))}
                        </View>
                    </View>

                    {/* Score breakdown: fills the screen and shows where points come from */}
                    <View style={styles.scoreContainer}>
                        <Text style={styles.breakdownTitle}>Score Breakdown</Text>
                        <Text style={styles.breakdownSubtitle}>Tap a section to improve it.</Text>
                        {breakdown.map((item) => {
                            const full = item.earned >= item.max;
                            return (
                                <TouchableOpacity
                                    key={item.key}
                                    style={styles.breakdownRow}
                                    activeOpacity={0.7}
                                    onPress={() => navigation?.navigate(item.key)}
                                >
                                    <View style={styles.breakdownRowTop}>
                                        <Text style={styles.breakdownLabel}>
                                            {full ? '✓  ' : ''}{item.label}
                                        </Text>
                                        <Text style={[styles.breakdownPoints, full && styles.breakdownPointsFull]}>
                                            {item.earned}/{item.max}
                                        </Text>
                                    </View>
                                    <View style={styles.breakdownTrack}>
                                        <View
                                            style={[
                                                styles.breakdownFill,
                                                { width: `${(item.earned / item.max) * 100}%` },
                                            ]}
                                        />
                                    </View>
                                    {item.tip ? <Text style={styles.breakdownTip}>{item.tip}</Text> : null}
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={styles.previewButton}
                        activeOpacity={0.85}
                        onPress={() => navigation?.setParams({ mode: 'generate' })}
                    >
                        <Text style={styles.previewButtonText}>View Resume Preview</Text>
                    </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.documentFrame}>
                        {/* Header Contact Block */}
                        <Text style={styles.docName}>{info.fullName || 'Your Name'}</Text>
                        <Text style={styles.docContact}>
                            {info.email || 'email@example.com'}  •  {info.phone ? formatPhone(info.phone) : 'Phone Number'}
                        </Text>

                        {/* Professional Summary */}
                        {info.summary ? (
                            <View style={styles.docSection}>
                                <Text style={styles.docSectionTitle}>PROFESSIONAL SUMMARY</Text>
                                <Text style={styles.docBodyText}>{info.summary}</Text>
                            </View>
                        ) : null}

                        {/* Core Professional Skills Matrix */}
                        {skills.length > 0 ? (
                            <View style={styles.docSection}>
                                <Text style={styles.docSectionTitle}>CORE SKILLS</Text>
                                <Text style={styles.docBodyText}>{skills.join('  •  ')}</Text>
                            </View>
                        ) : null}

                        {/* Employment Work History */}
                        {experience.length > 0 ? (
                            <View style={styles.docSection}>
                                <Text style={styles.docSectionTitle}>PROFESSIONAL EXPERIENCE</Text>
                                {experience.map((item) => (
                                    <View key={item.id} style={styles.docItemBlock}>
                                        <View style={styles.docRowSpace}>
                                            <Text style={styles.docItemHeader}>{item.company}</Text>
                                            <Text style={styles.docItemDate}>{item.duration}</Text>
                                        </View>
                                        <Text style={styles.docItemSubHeader}>{item.role}</Text>
                                        {item.description ? <Text style={styles.docItemDesc}>{item.description}</Text> : null}
                                    </View>
                                ))}
                            </View>
                        ) : null}

                        {/* Portfolio Projects Section */}
                        {projects.length > 0 ? (
                            <View style={styles.docSection}>
                                <Text style={styles.docSectionTitle}>PROJECTS</Text>
                                {projects.map((item) => (
                                    <View key={item.id} style={styles.docItemBlock}>
                                        <Text style={styles.docItemHeader}>{item.title}</Text>
                                        {item.link ? <Text style={styles.docItemLink}>{item.link}</Text> : null}
                                        <Text style={styles.docItemDesc}>{item.description}</Text>
                                    </View>
                                ))}
                            </View>
                        ) : null}

                        {/* Academic Profile History */}
                        {education.length > 0 ? (
                            <View style={styles.docSection}>
                                <Text style={styles.docSectionTitle}>EDUCATION</Text>
                                {education.map((item) => (
                                    <View key={item.id} style={styles.docItemBlock}>
                                        <View style={styles.docRowSpace}>
                                            <Text style={styles.docItemHeader}>{item.school}</Text>
                                            <Text style={styles.docItemDate}>{item.year}</Text>
                                        </View>
                                        <Text style={styles.docItemSubHeader}>{item.degree}</Text>
                                    </View>
                                ))}
                            </View>
                        ) : null}

                        {/* Professional Credentials & Certifications */}
                        {certificates.length > 0 ? (
                            <View style={styles.docSection}>
                                <Text style={styles.docSectionTitle}>CERTIFICATIONS</Text>
                                {certificates.map((item) => (
                                    <View key={item.id} style={styles.docItemBlock}>
                                        <View style={styles.docRowSpace}>
                                            <Text style={styles.docItemHeader}>{item.name}</Text>
                                            <Text style={styles.docItemDate}>{item.year}</Text>
                                        </View>
                                        <Text style={styles.docItemSubHeader}>{item.issuer}</Text>
                                    </View>
                                ))}
                            </View>
                        ) : null}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    breakdownTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    breakdownSubtitle: {
        fontSize: 12,
        color: '#8A8A8E',
        marginTop: 2,
        marginBottom: 14,
    },
    breakdownRow: {
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#F2F2F7',
    },
    breakdownRowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    breakdownLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    breakdownPoints: {
        fontSize: 13,
        fontWeight: '700',
        color: '#8A8A8E',
    },
    breakdownPointsFull: {
        color: PURPLE,
    },
    breakdownTrack: {
        height: 5,
        borderRadius: 3,
        backgroundColor: '#EDEBFB',
        overflow: 'hidden',
    },
    breakdownFill: {
        height: '100%',
        borderRadius: 3,
        backgroundColor: PURPLE,
    },
    breakdownTip: {
        fontSize: 12,
        color: '#636366',
        lineHeight: 16,
        marginTop: 6,
    },
    previewButton: {
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
    previewButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#E5E5EA',
        backgroundColor: '#FFFFFF',
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
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 40,
    },
    scoreContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    scoreHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    scoreTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    scoreNumber: {
        fontSize: 16,
        fontWeight: '800',
        color: PURPLE,
    },
    scoreTrack: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EDEBFB',
        overflow: 'hidden',
        marginBottom: 10,
    },
    scoreFill: {
        height: '100%',
        borderRadius: 4,
        backgroundColor: PURPLE,
    },
    scoreHint: {
        fontSize: 12,
        color: '#636366',
        lineHeight: 16,
    },
    suggestionsBox: {
        marginTop: 16,
        borderTopWidth: 1,
        borderColor: '#E5E5EA',
        paddingTop: 14,
    },
    suggestionsTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    suggestionItem: {
        fontSize: 13,
        color: '#3A3A3C',
        lineHeight: 19,
        marginBottom: 6,
    },
    documentFrame: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D1D1D6',
        padding: 24,
        shadowColor: '#000000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    docName: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#1C1C1E',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    docContact: {
        fontSize: 12,
        textAlign: 'center',
        color: '#48484A',
        marginBottom: 20,
    },
    docSection: {
        borderTopWidth: 1,
        borderColor: '#3A3A3C',
        paddingTop: 8,
        marginBottom: 16,
    },
    docSectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#1C1C1E',
        letterSpacing: 1,
        marginBottom: 8,
    },
    docBodyText: {
        fontSize: 13,
        color: '#3A3A3C',
        lineHeight: 18,
    },
    docItemBlock: {
        marginBottom: 10,
    },
    docRowSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    docItemHeader: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    docItemDate: {
        fontSize: 12,
        color: '#48484A',
    },
    docItemSubHeader: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#48484A',
        marginTop: 1,
    },
    docItemLink: {
        fontSize: 11,
        color: PURPLE,
        fontWeight: '600',
        marginTop: 1,
    },
    docItemDesc: {
        fontSize: 12,
        color: '#3A3A3C',
        lineHeight: 16,
        marginTop: 4,
    },
});