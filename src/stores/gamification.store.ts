"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GamificationState, BadgeId, Badge } from "@/types";
import { STORAGE_KEYS, BADGE_DEFINITIONS, POINTS } from "@/lib/constants";
import { getTodayDate } from "@/lib/utils";

interface GamificationStore extends GamificationState {
  addPoints: (points: number) => void;
  recordActivity: () => void;
  checkAndAwardBadges: () => BadgeId[];
  getProgress: () => { level: string; nextBadge: string; pointsToNext: number };
}

const initialBadges: Badge[] = BADGE_DEFINITIONS.map((def) => ({
  ...def,
  earned: false,
}));

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      totalPoints: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: "",
      badges: initialBadges,

      addPoints: (points) =>
        set((state) => ({
          totalPoints: state.totalPoints + points,
        })),

      recordActivity: () =>
        set((state) => {
          const today = getTodayDate();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0];

          let newStreak = state.currentStreak;
          let newLongest = state.longestStreak;
          let bonusPoints = 0;

          if (state.lastActivityDate === today) {
            // Already recorded today, no streak change
            return state;
          } else if (state.lastActivityDate === yesterdayStr) {
            // Consecutive day — increment streak
            newStreak += 1;
            bonusPoints = POINTS.DAILY_STREAK;
          } else {
            // Streak broken — reset
            newStreak = 1;
          }

          if (newStreak > newLongest) {
            newLongest = newStreak;
          }

          return {
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastActivityDate: today,
            totalPoints: state.totalPoints + bonusPoints,
          };
        }),

      checkAndAwardBadges: () => {
        const state = get();
        const newlyEarned: BadgeId[] = [];

        const updatedBadges = state.badges.map((badge) => {
          if (badge.earned) return badge;

          if (state.totalPoints >= badge.requiredPoints) {
            newlyEarned.push(badge.id);
            return {
              ...badge,
              earned: true,
              earnedAt: new Date().toISOString(),
            };
          }

          return badge;
        });

        if (newlyEarned.length > 0) {
          set({ badges: updatedBadges });
        }

        return newlyEarned;
      },

      getProgress: () => {
        const state = get();
        const earnedCount = state.badges.filter((b) => b.earned).length;

        const levels = ["Beginner", "Explorer", "Achiever", "Champion", "Master"];
        const levelIndex = Math.min(earnedCount, levels.length - 1);

        const nextUnearnedBadge = state.badges.find((b) => !b.earned);
        const pointsToNext = nextUnearnedBadge
          ? nextUnearnedBadge.requiredPoints - state.totalPoints
          : 0;

        return {
          level: levels[levelIndex],
          nextBadge: nextUnearnedBadge?.name ?? "All earned!",
          pointsToNext: Math.max(0, pointsToNext),
        };
      },
    }),
    {
      name: STORAGE_KEYS.GAMIFICATION,
    }
  )
);
