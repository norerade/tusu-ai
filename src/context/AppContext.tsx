import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  UserProfile,
  ScoredRecommendation,
  DiagnosticReport,
  RoadmapTask,
  UniversityProgram,
  DemoPreset
} from '../types';
import { UNIVERSITIES } from '../data/universities';
import { DEMO_PRESETS } from '../data/presets';
import { computeRecommendations, generateDiagnostics } from '../utils/recommendationEngine';
import { generatePersonalRoadmap } from '../utils/roadmapGenerator';

export type StageNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface AppContextType {
  currentStage: StageNumber;
  setCurrentStage: (stage: StageNumber) => void;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  loadPreset: (preset: DemoPreset) => void;
  resetAll: () => void;
  recommendations: ScoredRecommendation[];
  diagnostics: DiagnosticReport;
  roadmapTasks: RoadmapTask[];
  toggleTaskCompletion: (taskId: string) => void;
  comparedUniIds: string[];
  toggleCompareUni: (uniId: string) => void;
  clearCompare: () => void;
  selectedUniForDetail: UniversityProgram | null;
  setSelectedUniForDetail: (uni: UniversityProgram | null) => void;
  isEssayModalOpen: boolean;
  setIsEssayModalOpen: (open: boolean) => void;
  isCalendarModalOpen: boolean;
  setIsCalendarModalOpen: (open: boolean) => void;
  progressPercentage: number;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Алихан Сарсенов',
  level: 'grade_11',
  targetYear: 2026,
  fields: ['cs_it'],
  gpa: 4.85,
  gpaScale: '5.0',
  targetCountries: ['kz', 'eu_germany', 'asia_korea', 'usa'],
  budget: 'grant_only',
  ielts: 7.5,
  sat: 1440,
  ent: 128,
  toefl: null,
  duolingo: null,
  olympiadLevel: 'republic',
  hasVolunteeringOrProjects: true,
  notes: 'Призер олимпиад по программированию, проект на Python.'
};

const STORAGE_KEY_PROFILE = 'admitroute_profile_v1';
const STORAGE_KEY_STAGE = 'admitroute_stage_v1';
const STORAGE_KEY_TASKS = 'admitroute_tasks_completed_v1';
const STORAGE_KEY_COMPARE = 'admitroute_compare_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Загрузка состояния из localStorage
  const [currentStage, setCurrentStageState] = useState<StageNumber>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STAGE);
    if (saved) {
      const n = parseInt(saved);
      if (n >= 1 && n <= 7) return n as StageNumber;
    }
    return 1;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_PROFILE;
  });

  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TASKS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  const [comparedUniIds, setComparedUniIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_COMPARE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return ['nu-cs', 'kaist-cs']; // По умолчанию сравниваем NU и KAIST
  });

  const [selectedUniForDetail, setSelectedUniForDetail] = useState<UniversityProgram | null>(null);
  const [isEssayModalOpen, setIsEssayModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  // Синхронизация с localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STAGE, currentStage.toString());
  }, [currentStage]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(completedTaskIds));
  }, [completedTaskIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COMPARE, JSON.stringify(comparedUniIds));
  }, [comparedUniIds]);

  const setCurrentStage = (stage: StageNumber) => {
    setCurrentStageState(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const loadPreset = (preset: DemoPreset) => {
    setProfile(preset.profile);
    setCompletedTaskIds([]);
    setCurrentStage(3); // Сразу переводим жюри на экран диагностики для оценки
  };

  const resetAll = () => {
    setProfile(DEFAULT_PROFILE);
    setCompletedTaskIds([]);
    setComparedUniIds(['nu-cs', 'kaist-cs']);
    setCurrentStage(1);
    localStorage.clear();
  };

  // Реактивный пересчет рекомендаций
  const recommendations = useMemo(() => {
    return computeRecommendations(profile, UNIVERSITIES);
  }, [profile]);

  // Реактивный расчет диагностики
  const diagnostics = useMemo(() => {
    return generateDiagnostics(profile, recommendations);
  }, [profile, recommendations]);

  // Реактивная генерация дорожной карты
  const roadmapTasks = useMemo(() => {
    const rawTasks = generatePersonalRoadmap(profile, recommendations);
    return rawTasks.map(task => ({
      ...task,
      isCompleted: completedTaskIds.includes(task.id)
    }));
  }, [profile, recommendations, completedTaskIds]);

  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTaskIds(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const toggleCompareUni = (uniId: string) => {
    setComparedUniIds(prev => {
      if (prev.includes(uniId)) {
        return prev.filter(id => id !== uniId);
      }
      if (prev.length >= 3) {
        // Ограничение: максимум 3 для сравнения
        return [...prev.slice(1), uniId];
      }
      return [...prev, uniId];
    });
  };

  const clearCompare = () => {
    setComparedUniIds([]);
  };

  // Расчет общего прогресса
  const progressPercentage = useMemo(() => {
    if (roadmapTasks.length === 0) return 0;
    const completedCount = roadmapTasks.filter(t => t.isCompleted).length;
    return Math.round((completedCount / roadmapTasks.length) * 100);
  }, [roadmapTasks]);

  return (
    <AppContext.Provider
      value={{
        currentStage,
        setCurrentStage,
        profile,
        updateProfile,
        loadPreset,
        resetAll,
        recommendations,
        diagnostics,
        roadmapTasks,
        toggleTaskCompletion,
        comparedUniIds,
        toggleCompareUni,
        clearCompare,
        selectedUniForDetail,
        setSelectedUniForDetail,
        isEssayModalOpen,
        setIsEssayModalOpen,
        isCalendarModalOpen,
        setIsCalendarModalOpen,
        progressPercentage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
