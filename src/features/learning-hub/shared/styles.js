import { StyleSheet } from 'react-native';

// ---------- Theme: the one place course colors are defined ----------
export const PURPLE = '#5B21F5';
export const LIGHT_PURPLE = '#F0EBFF';
export const GREEN = '#16A34A';
export const RED = '#F97316';
export const GRAY = '#9CA3AF';

// ---------- Common: styles shared by more than one screen ----------
const common = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 14,
  },
  chevron: {
    fontSize: 24,
    color: '#BDBDBD',
    marginLeft: 8,
  },
  smallText: {
    fontSize: 11,
    color: '#929292',
  },
  quizButton: {
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 25,
  },
  quizButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  previousButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  previousText: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: '700',
  },
  nextButton: {
    flex: 1,
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default common;
