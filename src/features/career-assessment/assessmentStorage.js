import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@config/supabase';
import { ASSESSMENT_COPY as copy } from './data/copy';
import { ASSESSMENT_ITEMS } from './data/questions.v1';

const STORAGE_PREFIX = 'career-assessment:v1:';
const MAX_ATTEMPTS = 5;
const VALID_TYPES = new Set(['R', 'I', 'A', 'S', 'E', 'C']);
const VALID_ITEM_IDS = new Set(ASSESSMENT_ITEMS.map((item) => item.id));

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isValidAnswer(answer) {
  return (
    isRecord(answer) &&
    typeof answer.itemId === 'string' &&
    Number.isInteger(answer.value) &&
    answer.value >= 1 &&
    answer.value <= 5
  );
}

function isValidResult(result) {
  return (
    isRecord(result) &&
    typeof result.version === 'string' &&
    Array.isArray(result.answers) &&
    result.answers.length === 36 &&
    result.answers.every(isValidAnswer) &&
    new Set(result.answers.map((answer) => answer.itemId)).size === result.answers.length &&
    result.answers.every((answer) => VALID_ITEM_IDS.has(answer.itemId)) &&
    isRecord(result.scores) &&
    isRecord(result.scores.raw) &&
    Object.keys(result.scores.raw).length === VALID_TYPES.size &&
    Object.keys(result.scores.raw).every((type) => VALID_TYPES.has(type)) &&
    Object.values(result.scores.raw).every(
      (score) => Number.isInteger(score) && score >= 6 && score <= 30,
    ) &&
    isRecord(result.scores.normalized) &&
    Object.keys(result.scores.normalized).length === VALID_TYPES.size &&
    Object.keys(result.scores.normalized).every((type) => VALID_TYPES.has(type)) &&
    Object.values(result.scores.normalized).every(
      (score) => Number.isInteger(score) && score >= 0 && score <= 100,
    ) &&
    typeof result.scores.undifferentiated === 'boolean' &&
    Array.isArray(result.code) &&
    result.code.length === 3 &&
    new Set(result.code).size === 3 &&
    result.code.every((type) => VALID_TYPES.has(type)) &&
    typeof result.takenAt === 'string' &&
    !Number.isNaN(Date.parse(result.takenAt)) &&
    (typeof result.userId === 'string' || result.userId === null)
  );
}

function isValidDraft(draft) {
  if (draft === null) return true;
  return (
    isRecord(draft) &&
    typeof draft.version === 'string' &&
    typeof draft.seed === 'string' &&
    Array.isArray(draft.order) &&
    draft.order.length === 36 &&
    draft.order.every((id) => typeof id === 'string') &&
    draft.order.every((id) => VALID_ITEM_IDS.has(id)) &&
    new Set(draft.order).size === 36 &&
    Array.isArray(draft.answers) &&
    draft.answers.every(isValidAnswer) &&
    new Set(draft.answers.map((answer) => answer.itemId)).size === draft.answers.length &&
    draft.answers.every((answer) => draft.order.includes(answer.itemId) && VALID_ITEM_IDS.has(answer.itemId)) &&
    Number.isInteger(draft.currentIndex) &&
    draft.currentIndex >= 0 &&
    draft.currentIndex < 36
  );
}

function storageKey(userId) {
  return `${STORAGE_PREFIX}${userId || 'local'}`;
}

function normalizeLocalState(value) {
  if (
    !isRecord(value) ||
    !Array.isArray(value.results) ||
    !isValidDraft(value.draft ?? null) ||
    !value.results.every(isValidResult)
  ) {
    throw new Error(copy.localReadError);
  }
  return {
    draft: value.draft ?? null,
    results: value.results,
  };
}

export async function readLocalAssessment(userId) {
  const stored = await AsyncStorage.getItem(storageKey(userId));
  const state = stored ? normalizeLocalState(JSON.parse(stored)) : { draft: null, results: [] };
  if (userId && state.results.some((result) => result.userId && result.userId !== userId)) {
    throw new Error(copy.localReadError);
  }
  return state;
}

async function writeLocalAssessment(userId, state) {
  await AsyncStorage.setItem(storageKey(userId), JSON.stringify(state));
}

export async function saveLocalDraft(userId, draft) {
  const state = await readLocalAssessment(userId);
  state.draft = draft;
  await writeLocalAssessment(userId, state);
}

export async function updateLocalDraft(userId, update) {
  const state = await readLocalAssessment(userId);
  if (!state.draft) throw new Error(copy.draftMissingError);
  state.draft = { ...state.draft, ...update };
  await writeLocalAssessment(userId, state);
  return state.draft;
}

export async function completeLocalAssessment(userId, result) {
  const state = await readLocalAssessment(userId);
  state.draft = null;
  state.results = [
    result,
    ...state.results.filter((attempt) => attempt.takenAt !== result.takenAt),
  ]
    .sort((left, right) => right.takenAt.localeCompare(left.takenAt))
    .slice(0, MAX_ATTEMPTS);
  await writeLocalAssessment(userId, state);
  return state;
}

function remoteRowToResult(row) {
  const result = {
    version: row.version,
    answers: row.answers,
    scores: row.scores,
    code: row.code,
    takenAt: row.taken_at,
    userId: row.user_id,
  };
  if (!isValidResult(result)) throw new Error(copy.localReadError);
  return result;
}

export async function readRemoteAssessments(userId) {
  const { data, error } = await supabase
    .from('career_assessment_results')
    .select('id, user_id, version, answers, scores, code, taken_at')
    .eq('user_id', userId)
    .order('taken_at', { ascending: false })
    .limit(MAX_ATTEMPTS);
  if (error) throw error;
  return (data || []).map(remoteRowToResult);
}

export async function saveRemoteAssessment(userId, result) {
  const { error: insertError } = await supabase.from('career_assessment_results').insert({
    user_id: userId,
    version: result.version,
    answers: result.answers,
    scores: result.scores,
    code: result.code,
    taken_at: result.takenAt,
  });
  if (insertError) {
    if (insertError.code !== '23505') throw insertError;
    const { data: existing, error: duplicateCheckError } = await supabase
      .from('career_assessment_results')
      .select('id')
      .eq('user_id', userId)
      .eq('taken_at', result.takenAt)
      .maybeSingle();
    if (duplicateCheckError) throw duplicateCheckError;
    if (!existing) throw insertError;
  }

  const { data, error: listError } = await supabase
    .from('career_assessment_results')
    .select('id')
    .eq('user_id', userId)
    .order('taken_at', { ascending: false });
  if (listError) throw listError;

  const oldIds = (data || []).slice(MAX_ATTEMPTS).map((row) => row.id);
  if (!oldIds.length) return;

  const { error: deleteError } = await supabase
    .from('career_assessment_results')
    .delete()
    .eq('user_id', userId)
    .in('id', oldIds);
  if (deleteError) throw deleteError;
}

export function getRemoteSaveMessage(error) {
  const code = error?.code;
  if (code === '42P01' || code === 'PGRST205') {
    return copy.migrationSyncError;
  }
  if (code === '42501') {
    return copy.permissionSyncError;
  }
  return copy.genericSyncError;
}

export function getRemoteLoadMessage(error) {
  if (error?.code === '42P01' || error?.code === 'PGRST205') {
    return copy.remoteLoadMigrationError;
  }
  return copy.remoteLoadError;
}
