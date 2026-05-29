/* ===== CHILD PROFILE ===== */

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  interests: string[];
  difficultyLevel: DifficultyLevel;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_CHILD_PROFILE: ChildProfile = {
  id: "default-child",
  name: "",
  age: 8,
  interests: ["animals", "vehicles", "food", "school"],
  difficultyLevel: "beginner",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/* ===== EMOTIONS ===== */

export type EmotionType = "happy" | "sad" | "angry" | "fear" | "neutral";

export interface EmotionRecord {
  id: string;
  emotion: EmotionType;
  confidence: number;
  timestamp: string;
  childId: string;
}

/* ===== EXERCISES ===== */

export type ExerciseType =
  | "word-image-match"
  | "object-identification"
  | "listening-practice"
  | "sentence-building"
  | "pronunciation";

export type ExerciseCategory =
  | "animals"
  | "vehicles"
  | "food"
  | "school"
  | "family"
  | "colors"
  | "shapes"
  | "daily-objects";

export interface ExerciseOption {
  id: string;
  label: string;
  icon?: string;
  isCorrect: boolean;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  category: ExerciseCategory;
  difficulty: DifficultyLevel;
  instruction: string;
  /** The spoken instruction in simple English */
  voiceInstruction: string;
  content: {
    question: string;
    options: ExerciseOption[];
    correctAnswer: string;
    /** For sentence building */
    words?: string[];
    /** For pronunciation */
    targetWord?: string;
    /** Icon/image identifier */
    imageId?: string;
  };
  /** Points awarded for completing this exercise */
  points: number;
}

export interface ExerciseResult {
  id: string;
  exerciseId: string;
  childId: string;
  isCorrect: boolean;
  responseTimeMs: number;
  attempts: number;
  timestamp: string;
}

/* ===== PROGRESS ===== */

export interface ProgressEntry {
  id: string;
  childId: string;
  activityType: string;
  score: number;
  maxScore: number;
  duration: number;
  timestamp: string;
}

/* ===== GAMIFICATION ===== */

export type BadgeId =
  | "bronze-learner"
  | "silver-learner"
  | "gold-learner"
  | "calm-champion"
  | "communication-hero"
  | "streak-master"
  | "first-step";

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  requiredPoints: number;
  earned: boolean;
  earnedAt?: string;
}

export interface GamificationState {
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  badges: Badge[];
}

/* ===== ROUTINE ===== */

export interface RoutineItem {
  id: string;
  time: string;
  title: string;
  icon: string;
  completed: boolean;
  order: number;
}

export interface DailyRoutine {
  id: string;
  childId: string;
  date: string;
  items: RoutineItem[];
}

/* ===== AAC ===== */

export type AACCategory =
  | "food"
  | "home"
  | "emotions"
  | "activities"
  | "transport"
  | "people"
  | "actions";

export interface AACSymbol {
  id: string;
  label: string;
  icon: string;
  category: AACCategory;
  voiceText: string;
}

/* ===== MOOD JOURNAL ===== */

export type MoodType = "happy" | "okay" | "sad" | "angry" | "anxious";

export interface MoodEntry {
  id: string;
  childId: string;
  mood: MoodType;
  note?: string;
  date: string;
}
