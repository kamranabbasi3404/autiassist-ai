"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChildProfile, DifficultyLevel } from "@/types";
import { DEFAULT_CHILD_PROFILE } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";

interface ChildProfileState {
  profile: ChildProfile;
  isProfileSetup: boolean;
  setProfile: (profile: Partial<ChildProfile>) => void;
  setName: (name: string) => void;
  setAge: (age: number) => void;
  setDifficulty: (level: DifficultyLevel) => void;
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
  resetProfile: () => void;
}

export const useChildProfileStore = create<ChildProfileState>()(
  persist(
    (set) => ({
      profile: DEFAULT_CHILD_PROFILE,
      isProfileSetup: false,

      setProfile: (updates) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
          isProfileSetup: true,
        })),

      setName: (name) =>
        set((state) => ({
          profile: {
            ...state.profile,
            name,
            updatedAt: new Date().toISOString(),
          },
          isProfileSetup: true,
        })),

      setAge: (age) =>
        set((state) => ({
          profile: {
            ...state.profile,
            age,
            updatedAt: new Date().toISOString(),
          },
        })),

      setDifficulty: (difficultyLevel) =>
        set((state) => ({
          profile: {
            ...state.profile,
            difficultyLevel,
            updatedAt: new Date().toISOString(),
          },
        })),

      addInterest: (interest) =>
        set((state) => ({
          profile: {
            ...state.profile,
            interests: state.profile.interests.includes(interest)
              ? state.profile.interests
              : [...state.profile.interests, interest],
            updatedAt: new Date().toISOString(),
          },
        })),

      removeInterest: (interest) =>
        set((state) => ({
          profile: {
            ...state.profile,
            interests: state.profile.interests.filter((i) => i !== interest),
            updatedAt: new Date().toISOString(),
          },
        })),

      resetProfile: () =>
        set({
          profile: DEFAULT_CHILD_PROFILE,
          isProfileSetup: false,
        }),
    }),
    {
      name: STORAGE_KEYS.CHILD_PROFILE,
    }
  )
);
