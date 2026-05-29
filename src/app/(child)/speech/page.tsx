"use client";

import React, { useState } from "react";
import Link from "next/link";
import { speak } from "@/lib/utils";
import {
  Images,
  Search,
  Headphones,
  PuzzleIcon,
  MicIcon,
  Sparkles,
} from "lucide-react";

const exerciseTypes = [
  {
    id: "word-image-match",
    label: "Word & Image",
    desc: "Match words with pictures",
    icon: Images,
    voice: "Match the word with the correct picture!",
  },
  {
    id: "object-identification",
    label: "Identify Objects",
    desc: "Name what you see",
    icon: Search,
    voice: "Look at the picture and name the object!",
  },
  {
    id: "listening-practice",
    label: "Listening",
    desc: "Listen and choose",
    icon: Headphones,
    voice: "Listen carefully and pick the right answer!",
  },
  {
    id: "sentence-building",
    label: "Build Sentences",
    desc: "Put words in order",
    icon: PuzzleIcon,
    voice: "Put the words in the right order to make a sentence!",
  },
  {
    id: "pronunciation",
    label: "Say It",
    desc: "Practice speaking words",
    icon: MicIcon,
    voice: "Listen to the word and try to say it!",
  },
];

export default function SpeechPage() {
  const [instructionText, setInstructionText] = useState<string | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const handleCardClick = (voice: string) => {
    speak(voice);
  };

  const handleReadInstructions = () => {
    const message = "Choose an exercise to start learning!";
    speak(message);
    setInstructionText(message);

    // Clear any existing timer to avoid overlapping hides
    if (timerId) {
      clearTimeout(timerId);
    }

    // Set text to hide after 4 seconds (duration of speech)
    const newTimer = setTimeout(() => {
      setInstructionText(null);
    }, 4000);
    setTimerId(newTimer);
  };

  return (
    <div className="page-container">
      <div className="module-header">
        <h1>Speech Practice</h1>
        <p>Choose an exercise to start learning!</p>
      </div>

      <div className="exercise-grid">
        {exerciseTypes.map((ex) => (
          <Link
            key={ex.id}
            href={`/speech/${ex.id}`}
            className="home-card"
            id={`speech-${ex.id}`}
            onClick={() => handleCardClick(ex.voice)}
          >
            <ex.icon size={28} strokeWidth={1.5} className="home-card-icon" />
            <span>{ex.label}</span>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 400 }}>
              {ex.desc}
            </span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "var(--spacing-xl)", textAlign: "center" }}>
        {/* Animated Speech Bubble */}
        {instructionText && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
            animation: "bubbleFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <div style={{
              position: "relative",
              background: "var(--color-accent-light, #e0f2fe)",
              color: "var(--color-accent, #0284c7)",
              padding: "12px 24px",
              borderRadius: "16px",
              fontWeight: "600",
              fontSize: "1rem",
              boxShadow: "0 10px 15px -3px rgba(2, 132, 199, 0.1), 0 4px 6px -4px rgba(2, 132, 199, 0.1)",
              border: "2px solid var(--color-accent)",
              maxWidth: "320px",
              textAlign: "center",
            }}>
              {instructionText}
              {/* Downward triangle for speech bubble */}
              <div style={{
                position: "absolute",
                bottom: "-7px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: "12px",
                height: "12px",
                background: "var(--color-accent-light, #e0f2fe)",
                borderRight: "2px solid var(--color-accent)",
                borderBottom: "2px solid var(--color-accent)",
              }} />
            </div>
          </div>
        )}

        <button
          className="btn btn-outline"
          onClick={handleReadInstructions}
          id="speech-voice-help"
          style={{ transition: "all 0.2s ease" }}
        >
          <Sparkles size={18} />
          Read Instructions
        </button>
      </div>

      <style>{`
        @keyframes bubbleFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
