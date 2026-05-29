"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExerciseResult, ProgressEntry } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";

interface ProgressState {
  exerciseResults: ExerciseResult[];
  progressEntries: ProgressEntry[];
  addExerciseResult: (result: ExerciseResult) => void;
  addProgressEntry: (entry: ProgressEntry) => void;
  getRecentResults: (count: number) => ExerciseResult[];
  getAccuracyRate: () => number;
  getStreakDays: () => number;
  getTotalExercises: () => number;
  getCorrectExercises: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      exerciseResults: [],
      progressEntries: [],

      addExerciseResult: (result) =>
        set((state) => ({
          exerciseResults: [...state.exerciseResults, result],
        })),

      addProgressEntry: (entry) =>
        set((state) => ({
          progressEntries: [...state.progressEntries, entry],
        })),

      getRecentResults: (count) => {
        const state = get();
        return state.exerciseResults
          .slice(-count)
          .reverse();
      },

      getAccuracyRate: () => {
        const state = get();
        if (state.exerciseResults.length === 0) return 0;
        const correct = state.exerciseResults.filter((r) => r.isCorrect).length;
        return Math.round((correct / state.exerciseResults.length) * 100);
      },

      getStreakDays: () => {
        const state = get();
        if (state.exerciseResults.length === 0) return 0;

        const uniqueDays = new Set(
          state.exerciseResults.map((r) =>
            new Date(r.timestamp).toISOString().split("T")[0]
          )
        );

        return uniqueDays.size;
      },

      getTotalExercises: () => get().exerciseResults.length,
      getCorrectExercises: () =>
        get().exerciseResults.filter((r) => r.isCorrect).length,
    }),
    {
      name: STORAGE_KEYS.EXERCISE_RESULTS,
    }
  )
);
