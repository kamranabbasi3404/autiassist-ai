"use client";

import { useState, useEffect } from "react";
import { speak } from "@/lib/utils";
import { getStoredValue, setStoredValue } from "@/lib/storage/local-storage";
import { STORAGE_KEYS, POINTS } from "@/lib/constants";
import { useGamificationStore } from "@/stores/gamification.store";
import type { AACSymbol } from "../data/symbols";

export interface AACFavorite {
  id: string;
  sentence: string;
  symbols: AACSymbol[];
}

export function useAACBoard() {
  const [selectedSymbols, setSelectedSymbols] = useState<AACSymbol[]>([]);
  const [favorites, setFavorites] = useState<AACFavorite[]>([]);

  const addPoints = useGamificationStore((s) => s.addPoints);
  const recordActivity = useGamificationStore((s) => s.recordActivity);
  const checkAndAwardBadges = useGamificationStore((s) => s.checkAndAwardBadges);

  // Load favorites on mount
  useEffect(() => {
    const stored = getStoredValue<AACFavorite[]>(STORAGE_KEYS.AAC_FAVORITES, []);
    setFavorites(stored);
  }, []);

  const addSymbol = (symbol: AACSymbol) => {
    setSelectedSymbols((prev) => [...prev, symbol]);
    // Scaffolding vocalization: immediately speak the word tapped
    speak(symbol.label);
  };

  const removeSymbol = (index: number) => {
    setSelectedSymbols((prev) => prev.filter((_, i) => i !== index));
  };

  const clearSentence = () => {
    setSelectedSymbols([]);
  };

  const speakSentence = () => {
    if (selectedSymbols.length === 0) return;

    const sentence = selectedSymbols.map((s) => s.label).join(" ");
    
    // Vocalize the complete constructed sentence
    speak(sentence);

    // Gamification Integration: Award 2 points for constructive communication
    addPoints(POINTS.AAC_USAGE || 2);
    recordActivity();
    checkAndAwardBadges();
  };

  const saveToFavorites = () => {
    if (selectedSymbols.length === 0) return;

    const sentence = selectedSymbols.map((s) => s.label).join(" ");
    
    // Check if this exact sentence is already favorited
    if (favorites.some((fav) => fav.sentence.toLowerCase() === sentence.toLowerCase())) {
      return;
    }

    const newFavorite: AACFavorite = {
      id: `fav-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sentence,
      symbols: [...selectedSymbols],
    };

    const updated = [...favorites, newFavorite];
    setFavorites(updated);
    setStoredValue(STORAGE_KEYS.AAC_FAVORITES, updated);
    
    speak("Saved to favorites!");
  };

  const deleteFavorite = (id: string) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    setStoredValue(STORAGE_KEYS.AAC_FAVORITES, updated);
  };

  const loadFavorite = (favorite: AACFavorite) => {
    setSelectedSymbols(favorite.symbols);
    speak(favorite.sentence);
  };

  const isCurrentSentenceFavorited = () => {
    if (selectedSymbols.length === 0) return false;
    const sentence = selectedSymbols.map((s) => s.label).join(" ");
    return favorites.some((fav) => fav.sentence.toLowerCase() === sentence.toLowerCase());
  };

  return {
    selectedSymbols,
    favorites,
    addSymbol,
    removeSymbol,
    clearSentence,
    speakSentence,
    saveToFavorites,
    deleteFavorite,
    loadFavorite,
    isCurrentSentenceFavorited,
  };
}
