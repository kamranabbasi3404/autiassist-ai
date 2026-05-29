/** App-wide constants */

export const APP_NAME = "AutiAssist AI";
export const APP_DESCRIPTION =
  "Intelligent Autism Support & Communication Platform";

/** Storage keys for LocalStorage */
export const STORAGE_KEYS = {
  CHILD_PROFILE: "autiassist-child-profile",
  EXERCISE_RESULTS: "autiassist-exercise-results",
  GAMIFICATION: "autiassist-gamification",
  MOOD_JOURNAL: "autiassist-mood-journal",
  DAILY_ROUTINE: "autiassist-daily-routine",
  SETTINGS: "autiassist-settings",
  AAC_FAVORITES: "autiassist-aac-favorites",
  EMOTION_HISTORY: "autiassist-emotion-history",
  CHAT_HISTORY: "autiassist-chat-history",
} as const;

/** Default badge definitions */
export const BADGE_DEFINITIONS = [
  {
    id: "first-step" as const,
    name: "First Step",
    description: "Complete your first exercise",
    icon: "footprints",
    requiredPoints: 10,
  },
  {
    id: "bronze-learner" as const,
    name: "Bronze Learner",
    description: "Earn 100 points",
    icon: "award",
    requiredPoints: 100,
  },
  {
    id: "silver-learner" as const,
    name: "Silver Learner",
    description: "Earn 500 points",
    icon: "award",
    requiredPoints: 500,
  },
  {
    id: "gold-learner" as const,
    name: "Gold Learner",
    description: "Earn 1000 points",
    icon: "award",
    requiredPoints: 1000,
  },
  {
    id: "calm-champion" as const,
    name: "Calm Champion",
    description: "Complete 10 calming activities",
    icon: "heart",
    requiredPoints: 200,
  },
  {
    id: "communication-hero" as const,
    name: "Communication Hero",
    description: "Use AAC board 50 times",
    icon: "message-square",
    requiredPoints: 300,
  },
  {
    id: "streak-master" as const,
    name: "Streak Master",
    description: "Maintain a 7-day streak",
    icon: "flame",
    requiredPoints: 140,
  },
] as const;

/** Points configuration */
export const POINTS = {
  EXERCISE_COMPLETE: 10,
  EXERCISE_PERFECT: 15,
  DAILY_STREAK: 20,
  CALMING_ACTIVITY: 5,
  AAC_USAGE: 2,
  ROUTINE_COMPLETE: 10,
} as const;

/** Voice instructions map */
export const VOICE_INSTRUCTIONS = {
  WELCOME: "Welcome to AutiAssist. Lets learn together!",
  CORRECT: "Well done! That is correct!",
  INCORRECT: "Lets try again. You can do it!",
  EXERCISE_START: "Lets start the exercise.",
  EXERCISE_COMPLETE: "Great job! You finished the exercise!",
  CALM_START: "Lets take a deep breath and relax.",
  AAC_PROMPT: "Tap the pictures to make a sentence.",
} as const;

/** Exercise categories with labels and icons */
export const EXERCISE_CATEGORIES = [
  { id: "animals" as const, label: "Animals", icon: "cat" },
  { id: "vehicles" as const, label: "Vehicles", icon: "car" },
  { id: "food" as const, label: "Food", icon: "apple" },
  { id: "school" as const, label: "School", icon: "book-open" },
  { id: "family" as const, label: "Family", icon: "users" },
  { id: "colors" as const, label: "Colors", icon: "palette" },
  { id: "shapes" as const, label: "Shapes", icon: "shapes" },
  { id: "daily-objects" as const, label: "Daily Objects", icon: "lamp" },
] as const;

/** Navigation items */
export const NAV_ITEMS = [
  { href: "/speech", label: "Speech", icon: "mic" },
  { href: "/aac", label: "AAC", icon: "message-square" },
  { href: "/emotions", label: "Emotions", icon: "smile" },
  { href: "/calm", label: "Calm", icon: "heart" },
  { href: "/routine", label: "Routine", icon: "calendar" },
  { href: "/progress", label: "Progress", icon: "bar-chart-2" },
] as const;

/** Parent navigation items */
export const PARENT_NAV_ITEMS = [
  { href: "/parent/dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { href: "/parent/chatbot", label: "AI Assistant", icon: "bot" },
  { href: "/parent/settings", label: "Settings", icon: "settings" },
] as const;
