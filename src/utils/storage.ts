import { UserProgress } from '@/types';

const STORAGE_KEY = 'msh_torvenyek_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  stars: 0,
  completedLevels: {},
  scores: {},
  badges: []
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROGRESS;
    return JSON.parse(data);
  } catch (e) {
    console.error('Nem sikerült betölteni az eredményeket:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Nem sikerült menteni az eredményeket:', e);
  }
}

export function resetUserProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_PROGRESS;
}
