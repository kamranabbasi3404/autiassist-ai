"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  generateWordImageExercises,
  generateObjectIdExercises,
  generateListeningExercises,
  generatePronunciationExercises,
} from "@/features/speech/services/exercise-generator";
import { getExercisesByType } from "@/features/speech/data/exercise-bank";
import { speak, generateId } from "@/lib/utils";
import { useSpeechRecognition } from "@/features/speech/hooks/use-speech-recognition";
import { useProgressStore } from "@/stores/progress.store";
import { useGamificationStore } from "@/stores/gamification.store";
import { VOICE_INSTRUCTIONS } from "@/lib/constants";
import type { Exercise, ExerciseResult } from "@/types";
import DynamicIcon from "@/components/common/dynamic-icon";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Volume2,
  Trophy,
  Mic,
  MicOff,
  Loader2,
  RefreshCw,
} from "lucide-react";

type FeedbackState = "none" | "correct" | "incorrect";

export default function ExerciseRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const exerciseType = params["exercise-type"] as string;

  const addExerciseResult = useProgressStore((s) => s.addExerciseResult);
  const addPoints = useGamificationStore((s) => s.addPoints);
  const recordActivity = useGamificationStore((s) => s.recordActivity);
  const checkAndAwardBadges = useGamificationStore((s) => s.checkAndAwardBadges);

  const {
    isListening,
    transcript,
    isSupported: isSpeechSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>("none");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isAIGenerated, setIsAIGenerated] = useState(false);

  // Sentence building state
  const [builtSentence, setBuiltSentence] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const currentExercise = exercises[currentIndex];

  /** Fetch AI-generated exercises from Groq API (only for sentence-building) */
  const fetchAIExercises = useCallback(async (): Promise<Exercise[] | null> => {
    try {
      const response = await fetch("/api/speech/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseType }),
      });

      if (!response.ok) return null;

      const data = await response.json();
      if (data.exercises && Array.isArray(data.exercises)) {
        return data.exercises;
      }
      return null;
    } catch {
      return null;
    }
  }, [exerciseType]);

  /** Load exercises — programmatic for icon-based, AI for sentences */
  const loadExercises = useCallback(async () => {
    setIsLoading(true);
    setCurrentIndex(0);
    setScore(0);
    setTotalAttempted(0);
    setIsComplete(false);
    setFeedback("none");
    setSelectedAnswer(null);

    let generated: Exercise[] = [];

    // Icon-based exercises: generate programmatically (instant, always unique)
    switch (exerciseType) {
      case "word-image-match":
        generated = generateWordImageExercises(10);
        break;
      case "object-identification":
        generated = generateObjectIdExercises(10);
        break;
      case "listening-practice":
        generated = generateListeningExercises(10);
        break;
      case "pronunciation":
        generated = generatePronunciationExercises(10);
        break;
      case "sentence-building": {
        // Sentence building needs AI for language creativity
        const aiExercises = await fetchAIExercises();
        if (aiExercises && aiExercises.length > 0) {
          generated = aiExercises;
          setIsAIGenerated(true);
        } else {
          // Fallback to pre-built sentences
          generated = getExercisesByType(exerciseType);
        }
        break;
      }
      default:
        generated = getExercisesByType(exerciseType);
    }

    if (exerciseType !== "sentence-building") {
      setIsAIGenerated(false);
    }

    setExercises(generated);
    setIsLoading(false);
    if (generated.length > 0) {
      setTimeout(() => speak(generated[0].voiceInstruction), 300);
    }
  }, [exerciseType, fetchAIExercises]);

  // Load exercises on mount
  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  // Reset state when exercise changes
  useEffect(() => {
    if (currentExercise?.type === "sentence-building" && currentExercise.content.words) {
      setAvailableWords([...currentExercise.content.words]);
      setBuiltSentence([]);
    }
    setStartTime(Date.now());
    setFeedback("none");
    setSelectedAnswer(null);
    resetTranscript();
  }, [currentIndex, currentExercise, resetTranscript]);

  // Handle speech recognition result for pronunciation
  useEffect(() => {
    if (
      transcript &&
      currentExercise?.type === "pronunciation" &&
      feedback === "none"
    ) {
      const target = (currentExercise.content.targetWord || currentExercise.content.correctAnswer).toLowerCase();
      const spoken = transcript.toLowerCase().trim();

      // Check if the spoken word matches (fuzzy - contains the target)
      const isCorrect =
        spoken === target ||
        spoken.includes(target) ||
        target.includes(spoken);

      setTotalAttempted((p) => p + 1);

      if (isCorrect) {
        setFeedback("correct");
        setScore((p) => p + 1);
        speak("Well done! You said it correctly!");
        recordResult(true);
      } else {
        setFeedback("incorrect");
        speak(`You said ${transcript}. The correct word is ${currentExercise.content.targetWord}. Lets try the next one!`);
        recordResult(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  const recordResult = useCallback(
    (isCorrect: boolean) => {
      if (!currentExercise) return;

      const result: ExerciseResult = {
        id: generateId(),
        exerciseId: currentExercise.id,
        childId: "default-child",
        isCorrect,
        responseTimeMs: Date.now() - startTime,
        attempts: 1,
        timestamp: new Date().toISOString(),
      };

      addExerciseResult(result);

      if (isCorrect) {
        addPoints(currentExercise.points);
        recordActivity();
        checkAndAwardBadges();
      }
    },
    [currentExercise, startTime, addExerciseResult, addPoints, recordActivity, checkAndAwardBadges]
  );

  const handleOptionSelect = (optionId: string, isCorrect: boolean) => {
    if (feedback !== "none") return;

    setSelectedAnswer(optionId);
    setTotalAttempted((p) => p + 1);

    const selectedOption = currentExercise.content.options?.find((o) => o.id === optionId);
    const labelToSpeak = selectedOption ? selectedOption.label : "";

    if (isCorrect) {
      setFeedback("correct");
      setScore((p) => p + 1);
      speak(`${labelToSpeak}. ${VOICE_INSTRUCTIONS.CORRECT}`);
      recordResult(true);
    } else {
      setFeedback("incorrect");
      setScore((p) => p); // Keep current score
      speak(`${labelToSpeak}. ${VOICE_INSTRUCTIONS.INCORRECT}`);
      recordResult(false);
    }
  };

  const handleSentenceWordClick = (word: string, index: number) => {
    if (feedback !== "none") return;
    setBuiltSentence((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== index));
    speak(word);
  };

  const handleSentenceWordRemove = (index: number) => {
    if (feedback !== "none") return;
    const word = builtSentence[index];
    setBuiltSentence((prev) => prev.filter((_, i) => i !== index));
    setAvailableWords((prev) => [...prev, word]);
    speak(word);
  };

  const handleSentenceCheck = () => {
    if (!currentExercise) return;
    const built = builtSentence.join(" ");
    const correct = currentExercise.content.correctAnswer;

    // Clean punctuation and whitespace for an accurate, punctuation-insensitive match
    const cleanString = (str: string) =>
      str
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

    const isCorrect = cleanString(built) === cleanString(correct);

    setTotalAttempted((p) => p + 1);

    if (isCorrect) {
      setFeedback("correct");
      setScore((p) => p + 1);
      speak(`${built}. ${VOICE_INSTRUCTIONS.CORRECT}`);
      recordResult(true);
    } else {
      setFeedback("incorrect");
      speak(`${built}. The correct sentence is: ${correct}`);
      recordResult(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((p) => p + 1);
      const nextExercise = exercises[currentIndex + 1];
      if (nextExercise) {
        setTimeout(() => speak(nextExercise.voiceInstruction), 300);
      }
    } else {
      setIsComplete(true);
      speak(`Great job! You got ${score} out of ${totalAttempted} correct!`);
    }
  };

  const handleReadQuestion = () => {
    if (currentExercise) {
      speak(currentExercise.voiceInstruction);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="page-container" style={{ textAlign: "center", paddingTop: "120px" }}>
        <Loader2 size={48} strokeWidth={1.5} style={{ animation: "spin 1s linear infinite", marginBottom: "16px", color: "var(--color-accent)" }} />
        <h2 style={{ marginBottom: "8px" }}>Generating Exercises...</h2>
        <p>AI is creating new exercises just for you!</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // No exercises found
  if (exercises.length === 0) {
    return (
      <div className="page-container" style={{ textAlign: "center", paddingTop: "80px" }}>
        <p>No exercises found for this type.</p>
        <button className="btn btn-outline" onClick={() => router.push("/speech")} style={{ marginTop: "16px" }}>
          <ArrowLeft size={18} />
          Back to Speech
        </button>
      </div>
    );
  }

  // Completion screen
  if (isComplete) {
    return (
      <div className="page-container" style={{ textAlign: "center", paddingTop: "60px" }}>
        <div className="card" style={{ maxWidth: "480px", margin: "0 auto", padding: "48px 32px" }}>
          <Trophy size={48} strokeWidth={1.5} style={{ marginBottom: "16px", color: "var(--color-warning)" }} />
          <h2 style={{ marginBottom: "8px" }}>Exercise Complete!</h2>
          <p style={{ fontSize: "1.25rem", marginBottom: "24px" }}>
            You got <strong>{score}</strong> out of <strong>{totalAttempted}</strong> correct!
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={loadExercises}>
              <RefreshCw size={18} />
              New Exercises
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => router.push("/speech")}>
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <button className="btn btn-outline" onClick={() => router.push("/speech")}>
          <ArrowLeft size={18} />
          Back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isAIGenerated && (
            <span style={{ fontSize: "0.75rem", background: "var(--color-accent-light)", color: "var(--color-accent)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontWeight: "600" }}>
              AI Generated
            </span>
          )}
          <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
            {currentIndex + 1} / {exercises.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: "100%",
        height: "6px",
        background: "var(--color-bg-tertiary)",
        borderRadius: "3px",
        marginBottom: "32px",
        overflow: "hidden",
      }}>
        <div style={{
          width: `${((currentIndex + 1) / exercises.length) * 100}%`,
          height: "100%",
          background: "var(--color-accent)",
          borderRadius: "3px",
          transition: "width 0.3s ease",
        }} />
      </div>

      {/* Exercise Card */}
      <div className="card" style={{ maxWidth: "640px", margin: "0 auto", padding: "32px" }}>
        {/* Instruction */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <h2 style={{ flex: 1 }}>{currentExercise.instruction}</h2>
          <button
            className="btn btn-outline"
            onClick={handleReadQuestion}
            aria-label="Read question aloud"
            style={{ minWidth: "44px", padding: "8px" }}
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* === WORD-IMAGE MATCH === */}
        {currentExercise.type === "word-image-match" && (
          <div style={{
            textAlign: "center",
            padding: "24px",
            marginBottom: "24px",
            background: "var(--color-bg-secondary)",
            borderRadius: "var(--radius-md)",
          }}>
            <span style={{ fontSize: "2rem", fontWeight: "800", letterSpacing: "2px" }}>
              {currentExercise.content.question}
            </span>
          </div>
        )}

        {/* === OBJECT IDENTIFICATION === */}
        {currentExercise.type === "object-identification" && currentExercise.content.imageId && (
          <div style={{
            textAlign: "center",
            padding: "32px",
            marginBottom: "24px",
            background: "var(--color-bg-secondary)",
            borderRadius: "var(--radius-md)",
          }}>
            <DynamicIcon name={currentExercise.content.imageId} size={64} strokeWidth={1.5} />
            <p style={{ marginTop: "12px", fontSize: "1rem" }}>{currentExercise.content.question}</p>
          </div>
        )}

        {/* === LISTENING PRACTICE === */}
        {currentExercise.type === "listening-practice" && (
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => speak(currentExercise.content.question, 0.8)}
            >
              <Volume2 size={24} />
              Listen to the word
            </button>
          </div>
        )}

        {/* === PRONUNCIATION === */}
        {currentExercise.type === "pronunciation" && (
          <div style={{
            textAlign: "center",
            padding: "32px",
            marginBottom: "24px",
            background: "var(--color-bg-secondary)",
            borderRadius: "var(--radius-md)",
          }}>
            {currentExercise.content.imageId && (
              <DynamicIcon name={currentExercise.content.imageId} size={48} strokeWidth={1.5} />
            )}
            <p style={{ fontSize: "2rem", fontWeight: "800", marginTop: "12px" }}>
              {currentExercise.content.targetWord}
            </p>
            <button
              className="btn btn-outline"
              onClick={() => speak(currentExercise.content.targetWord || "", 0.7)}
              style={{ marginTop: "12px" }}
            >
              <Volume2 size={18} />
              Hear it again
            </button>

            {/* Speech Recognition Controls */}
            {feedback === "none" && (
              <div style={{ marginTop: "24px" }}>
                {isSpeechSupported ? (
                  <>
                    <button
                      className={`btn ${isListening ? "btn-primary" : "btn-outline"} btn-lg`}
                      onClick={isListening ? stopListening : startListening}
                      style={{
                        minWidth: "200px",
                        ...(isListening ? {
                          animation: "pulse 1.5s ease-in-out infinite",
                        } : {}),
                      }}
                    >
                      {isListening ? (
                        <>
                          <MicOff size={20} />
                          Listening... Tap to stop
                        </>
                      ) : (
                        <>
                          <Mic size={20} />
                          Tap and Say It!
                        </>
                      )}
                    </button>
                    {isListening && (
                      <p style={{ marginTop: "12px", color: "var(--color-accent)", fontWeight: "600" }}>
                        🎤 Speak now...
                      </p>
                    )}
                    {transcript && feedback === "none" && (
                      <p style={{ marginTop: "8px", color: "var(--color-text-secondary)" }}>
                        You said: &quot;{transcript}&quot;
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                    Speech recognition is not supported in this browser. Try Chrome.
                  </p>
                )}
              </div>
            )}
            <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }`}</style>
          </div>
        )}

        {/* === OPTIONS GRID (for matching/identification/listening) === */}
        {currentExercise.type !== "sentence-building" &&
          currentExercise.type !== "pronunciation" &&
          currentExercise.content.options &&
          currentExercise.content.options.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}>
            {currentExercise.content.options.map((option) => {
              let bgColor = "var(--color-bg)";
              let borderColor = "var(--color-border)";

              if (feedback !== "none") {
                if (option.isCorrect) {
                  bgColor = "var(--color-success-light)";
                  borderColor = "var(--color-success)";
                } else if (selectedAnswer === option.id) {
                  bgColor = "var(--color-error-light)";
                  borderColor = "var(--color-error)";
                }
              } else if (selectedAnswer === option.id) {
                borderColor = "var(--color-accent)";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id, option.isCorrect)}
                  disabled={feedback !== "none"}
                  style={{
                    cursor: feedback !== "none" ? "default" : "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    padding: "20px",
                    minHeight: "100px",
                    justifyContent: "center",
                    background: bgColor,
                    border: `2px solid ${borderColor}`,
                    borderRadius: "var(--radius-md)",
                    transition: "all 0.15s ease",
                    boxShadow: "var(--shadow-sm)",
                    fontFamily: "var(--font-family)",
                  }}
                >
                  {option.icon && <DynamicIcon name={option.icon} size={36} strokeWidth={1.5} />}
                  <span style={{ fontWeight: "600", fontSize: "1rem" }}>{option.label}</span>
                  {feedback !== "none" && (
                    option.isCorrect
                      ? <Check size={20} style={{ color: "var(--color-success)" }} />
                      : selectedAnswer === option.id
                        ? <X size={20} style={{ color: "var(--color-error)" }} />
                        : null
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* === SENTENCE BUILDING === */}
        {currentExercise.type === "sentence-building" && (
          <div>
            {/* Built sentence area */}
            <div style={{
              minHeight: "60px",
              padding: "16px",
              marginBottom: "16px",
              background: feedback === "correct"
                ? "var(--color-success-light)"
                : feedback === "incorrect"
                  ? "var(--color-error-light)"
                  : "var(--color-bg-secondary)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
              border: `1px solid ${feedback === "correct" ? "var(--color-success)" : feedback === "incorrect" ? "var(--color-error)" : "var(--color-border)"}`,
            }}>
              {builtSentence.length === 0 && (
                <span style={{ color: "var(--color-text-muted)" }}>
                  Tap words below to build a sentence...
                </span>
              )}
              {builtSentence.map((word, i) => (
                <button
                  key={`built-${i}`}
                  onClick={() => handleSentenceWordRemove(i)}
                  disabled={feedback !== "none"}
                  style={{
                    padding: "8px 16px",
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: "600",
                    cursor: feedback !== "none" ? "default" : "pointer",
                    fontFamily: "var(--font-family)",
                  }}
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Available words */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px",
              justifyContent: "center",
            }}>
              {availableWords.map((word, i) => (
                <button
                  key={`avail-${i}`}
                  className="btn btn-outline"
                  onClick={() => handleSentenceWordClick(word, i)}
                  disabled={feedback !== "none"}
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Check button */}
            {feedback === "none" && builtSentence.length > 0 && (
              <div style={{ textAlign: "center" }}>
                <button className="btn btn-primary btn-lg" onClick={handleSentenceCheck}>
                  <Check size={18} />
                  Check Answer
                </button>
              </div>
            )}

            {/* Show correct answer on incorrect */}
            {feedback === "incorrect" && (
              <p style={{ textAlign: "center", marginTop: "12px", color: "var(--color-text-secondary)" }}>
                Correct answer: <strong>{currentExercise.content.correctAnswer}</strong>
              </p>
            )}
          </div>
        )}

        {/* Feedback hint for option-based exercises */}
        {feedback === "incorrect" && currentExercise.content.options && currentExercise.content.options.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <p style={{ color: "var(--color-text-secondary)" }}>
              The correct answer is highlighted in green.
            </p>
          </div>
        )}

        {/* Next button */}
        {feedback !== "none" && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="btn btn-primary btn-lg" onClick={handleNext}>
              {currentIndex < exercises.length - 1 ? (
                <>
                  Next <ArrowRight size={18} />
                </>
              ) : (
                <>
                  Finish <Trophy size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
