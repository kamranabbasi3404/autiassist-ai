/**
 * Pre-built exercise bank for OFFLINE use.
 * These exercises are always available without internet.
 * Tailored for an 8-year-old at beginner-intermediate level.
 */

import type { Exercise } from "@/types";

/** ===== WORD-IMAGE MATCHING EXERCISES ===== */
export const WORD_IMAGE_EXERCISES: Exercise[] = [
  {
    id: "wim-001",
    type: "word-image-match",
    category: "animals",
    difficulty: "beginner",
    instruction: "Match the word with the correct picture",
    voiceInstruction: "Match the word CAT with the correct picture!",
    content: {
      question: "CAT",
      options: [
        { id: "a", label: "Cat", icon: "cat", isCorrect: true },
        { id: "b", label: "Dog", icon: "dog", isCorrect: false },
        { id: "c", label: "Bird", icon: "bird", isCorrect: false },
        { id: "d", label: "Fish", icon: "fish", isCorrect: false },
      ],
      correctAnswer: "a",
    },
    points: 10,
  },
  {
    id: "wim-002",
    type: "word-image-match",
    category: "animals",
    difficulty: "beginner",
    instruction: "Match the word with the correct picture",
    voiceInstruction: "Match the word DOG with the correct picture!",
    content: {
      question: "DOG",
      options: [
        { id: "a", label: "Cat", icon: "cat", isCorrect: false },
        { id: "b", label: "Dog", icon: "dog", isCorrect: true },
        { id: "c", label: "Rabbit", icon: "rabbit", isCorrect: false },
        { id: "d", label: "Turtle", icon: "turtle", isCorrect: false },
      ],
      correctAnswer: "b",
    },
    points: 10,
  },
  {
    id: "wim-003",
    type: "word-image-match",
    category: "vehicles",
    difficulty: "beginner",
    instruction: "Match the word with the correct picture",
    voiceInstruction: "Match the word CAR with the correct picture!",
    content: {
      question: "CAR",
      options: [
        { id: "a", label: "Bus", icon: "bus", isCorrect: false },
        { id: "b", label: "Car", icon: "car", isCorrect: true },
        { id: "c", label: "Bike", icon: "bike", isCorrect: false },
        { id: "d", label: "Train", icon: "train-front", isCorrect: false },
      ],
      correctAnswer: "b",
    },
    points: 10,
  },
  {
    id: "wim-004",
    type: "word-image-match",
    category: "food",
    difficulty: "beginner",
    instruction: "Match the word with the correct picture",
    voiceInstruction: "Match the word APPLE with the correct picture!",
    content: {
      question: "APPLE",
      options: [
        { id: "a", label: "Apple", icon: "apple", isCorrect: true },
        { id: "b", label: "Banana", icon: "banana", isCorrect: false },
        { id: "c", label: "Cherry", icon: "cherry", isCorrect: false },
        { id: "d", label: "Grape", icon: "grape", isCorrect: false },
      ],
      correctAnswer: "a",
    },
    points: 10,
  },
  {
    id: "wim-005",
    type: "word-image-match",
    category: "school",
    difficulty: "beginner",
    instruction: "Match the word with the correct picture",
    voiceInstruction: "Match the word BOOK with the correct picture!",
    content: {
      question: "BOOK",
      options: [
        { id: "a", label: "Pen", icon: "pen-tool", isCorrect: false },
        { id: "b", label: "Book", icon: "book-open", isCorrect: true },
        { id: "c", label: "Ruler", icon: "ruler", isCorrect: false },
        { id: "d", label: "Scissors", icon: "scissors", isCorrect: false },
      ],
      correctAnswer: "b",
    },
    points: 10,
  },
  {
    id: "wim-006",
    type: "word-image-match",
    category: "family",
    difficulty: "beginner",
    instruction: "Match the word with the correct picture",
    voiceInstruction: "Match the word BABY with the correct picture!",
    content: {
      question: "BABY",
      options: [
        { id: "a", label: "Man", icon: "user", isCorrect: false },
        { id: "b", label: "Woman", icon: "user", isCorrect: false },
        { id: "c", label: "Baby", icon: "baby", isCorrect: true },
        { id: "d", label: "Boy", icon: "user", isCorrect: false },
      ],
      correctAnswer: "c",
    },
    points: 10,
  },
  {
    id: "wim-007",
    type: "word-image-match",
    category: "colors",
    difficulty: "beginner",
    instruction: "Match the word with the correct color",
    voiceInstruction: "Match the word SUN with the correct picture!",
    content: {
      question: "SUN",
      options: [
        { id: "a", label: "Moon", icon: "moon", isCorrect: false },
        { id: "b", label: "Star", icon: "star", isCorrect: false },
        { id: "c", label: "Cloud", icon: "cloud", isCorrect: false },
        { id: "d", label: "Sun", icon: "sun", isCorrect: true },
      ],
      correctAnswer: "d",
    },
    points: 10,
  },
  {
    id: "wim-008",
    type: "word-image-match",
    category: "daily-objects",
    difficulty: "beginner",
    instruction: "Match the word with the correct picture",
    voiceInstruction: "Match the word CLOCK with the correct picture!",
    content: {
      question: "CLOCK",
      options: [
        { id: "a", label: "Clock", icon: "clock", isCorrect: true },
        { id: "b", label: "Phone", icon: "smartphone", isCorrect: false },
        { id: "c", label: "Lamp", icon: "lamp", isCorrect: false },
        { id: "d", label: "Key", icon: "key", isCorrect: false },
      ],
      correctAnswer: "a",
    },
    points: 10,
  },
];

/** ===== OBJECT IDENTIFICATION EXERCISES ===== */
export const OBJECT_ID_EXERCISES: Exercise[] = [
  {
    id: "oid-001",
    type: "object-identification",
    category: "animals",
    difficulty: "beginner",
    instruction: "What is this?",
    voiceInstruction: "Look at the picture. What animal is this?",
    content: {
      question: "What animal is this?",
      options: [
        { id: "a", label: "Cat", icon: "cat", isCorrect: true },
        { id: "b", label: "Dog", icon: "dog", isCorrect: false },
        { id: "c", label: "Fish", icon: "fish", isCorrect: false },
      ],
      correctAnswer: "a",
      imageId: "cat",
    },
    points: 10,
  },
  {
    id: "oid-002",
    type: "object-identification",
    category: "vehicles",
    difficulty: "beginner",
    instruction: "What is this?",
    voiceInstruction: "Look at the picture. What vehicle is this?",
    content: {
      question: "What vehicle is this?",
      options: [
        { id: "a", label: "Plane", icon: "plane", isCorrect: false },
        { id: "b", label: "Bus", icon: "bus", isCorrect: true },
        { id: "c", label: "Bike", icon: "bike", isCorrect: false },
      ],
      correctAnswer: "b",
      imageId: "bus",
    },
    points: 10,
  },
  {
    id: "oid-003",
    type: "object-identification",
    category: "food",
    difficulty: "beginner",
    instruction: "What is this?",
    voiceInstruction: "Look at the picture. What fruit is this?",
    content: {
      question: "What fruit is this?",
      options: [
        { id: "a", label: "Orange", icon: "citrus", isCorrect: false },
        { id: "b", label: "Apple", icon: "apple", isCorrect: false },
        { id: "c", label: "Cherry", icon: "cherry", isCorrect: true },
      ],
      correctAnswer: "c",
      imageId: "cherry",
    },
    points: 10,
  },
  {
    id: "oid-004",
    type: "object-identification",
    category: "daily-objects",
    difficulty: "beginner",
    instruction: "What is this?",
    voiceInstruction: "Look at the picture. What is this object?",
    content: {
      question: "What is this?",
      options: [
        { id: "a", label: "Umbrella", icon: "umbrella", isCorrect: true },
        { id: "b", label: "Hat", icon: "hard-hat", isCorrect: false },
        { id: "c", label: "Bag", icon: "shopping-bag", isCorrect: false },
      ],
      correctAnswer: "a",
      imageId: "umbrella",
    },
    points: 10,
  },
  {
    id: "oid-005",
    type: "object-identification",
    category: "school",
    difficulty: "beginner",
    instruction: "What is this?",
    voiceInstruction: "Look at the picture. What school item is this?",
    content: {
      question: "What school item is this?",
      options: [
        { id: "a", label: "Pencil", icon: "pencil", isCorrect: true },
        { id: "b", label: "Book", icon: "book-open", isCorrect: false },
        { id: "c", label: "Bag", icon: "backpack", isCorrect: false },
      ],
      correctAnswer: "a",
      imageId: "pencil",
    },
    points: 10,
  },
];

/** ===== SENTENCE BUILDING EXERCISES ===== */
export const SENTENCE_EXERCISES: Exercise[] = [
  {
    id: "sb-001",
    type: "sentence-building",
    category: "animals",
    difficulty: "beginner",
    instruction: "Put the words in order",
    voiceInstruction: "Put the words in the right order to make a sentence!",
    content: {
      question: "Make a sentence about the cat",
      options: [],
      correctAnswer: "The cat is sleeping",
      words: ["is", "The", "sleeping", "cat"],
    },
    points: 15,
  },
  {
    id: "sb-002",
    type: "sentence-building",
    category: "food",
    difficulty: "beginner",
    instruction: "Put the words in order",
    voiceInstruction: "Put the words in the right order!",
    content: {
      question: "Make a sentence about food",
      options: [],
      correctAnswer: "I want an apple",
      words: ["an", "I", "apple", "want"],
    },
    points: 15,
  },
  {
    id: "sb-003",
    type: "sentence-building",
    category: "family",
    difficulty: "beginner",
    instruction: "Put the words in order",
    voiceInstruction: "Put the words in the right order!",
    content: {
      question: "Make a sentence about your family",
      options: [],
      correctAnswer: "I love my mom",
      words: ["my", "I", "mom", "love"],
    },
    points: 15,
  },
  {
    id: "sb-004",
    type: "sentence-building",
    category: "school",
    difficulty: "intermediate",
    instruction: "Put the words in order",
    voiceInstruction: "Put the words in the right order to make a sentence!",
    content: {
      question: "Make a sentence about school",
      options: [],
      correctAnswer: "I go to school every day",
      words: ["every", "I", "school", "go", "to", "day"],
    },
    points: 15,
  },
  {
    id: "sb-005",
    type: "sentence-building",
    category: "vehicles",
    difficulty: "beginner",
    instruction: "Put the words in order",
    voiceInstruction: "Put the words in the right order!",
    content: {
      question: "Make a sentence about a vehicle",
      options: [],
      correctAnswer: "The bus is big",
      words: ["is", "The", "big", "bus"],
    },
    points: 15,
  },
];

/** ===== LISTENING PRACTICE EXERCISES ===== */
export const LISTENING_EXERCISES: Exercise[] = [
  {
    id: "lp-001",
    type: "listening-practice",
    category: "animals",
    difficulty: "beginner",
    instruction: "Listen and choose the right picture",
    voiceInstruction: "Listen to the word and choose the correct picture!",
    content: {
      question: "Bird",
      options: [
        { id: "a", label: "Bird", icon: "bird", isCorrect: true },
        { id: "b", label: "Bug", icon: "bug", isCorrect: false },
        { id: "c", label: "Fish", icon: "fish", isCorrect: false },
        { id: "d", label: "Cat", icon: "cat", isCorrect: false },
      ],
      correctAnswer: "a",
    },
    points: 10,
  },
  {
    id: "lp-002",
    type: "listening-practice",
    category: "food",
    difficulty: "beginner",
    instruction: "Listen and choose the right picture",
    voiceInstruction: "Listen to the word and choose the correct picture!",
    content: {
      question: "Banana",
      options: [
        { id: "a", label: "Apple", icon: "apple", isCorrect: false },
        { id: "b", label: "Cherry", icon: "cherry", isCorrect: false },
        { id: "c", label: "Banana", icon: "banana", isCorrect: true },
        { id: "d", label: "Grape", icon: "grape", isCorrect: false },
      ],
      correctAnswer: "c",
    },
    points: 10,
  },
  {
    id: "lp-003",
    type: "listening-practice",
    category: "vehicles",
    difficulty: "beginner",
    instruction: "Listen and choose the right picture",
    voiceInstruction: "Listen to the word and choose the correct picture!",
    content: {
      question: "Plane",
      options: [
        { id: "a", label: "Car", icon: "car", isCorrect: false },
        { id: "b", label: "Plane", icon: "plane", isCorrect: true },
        { id: "c", label: "Bus", icon: "bus", isCorrect: false },
        { id: "d", label: "Train", icon: "train-front", isCorrect: false },
      ],
      correctAnswer: "b",
    },
    points: 10,
  },
  {
    id: "lp-004",
    type: "listening-practice",
    category: "daily-objects",
    difficulty: "beginner",
    instruction: "Listen and choose the right picture",
    voiceInstruction: "Listen to the word and choose the correct picture!",
    content: {
      question: "Phone",
      options: [
        { id: "a", label: "Phone", icon: "smartphone", isCorrect: true },
        { id: "b", label: "Camera", icon: "camera", isCorrect: false },
        { id: "c", label: "TV", icon: "monitor", isCorrect: false },
        { id: "d", label: "Radio", icon: "radio", isCorrect: false },
      ],
      correctAnswer: "a",
    },
    points: 10,
  },
];

/** ===== PRONUNCIATION EXERCISES ===== */
export const PRONUNCIATION_EXERCISES: Exercise[] = [
  {
    id: "pr-001",
    type: "pronunciation",
    category: "animals",
    difficulty: "beginner",
    instruction: "Listen and say this word",
    voiceInstruction: "Listen to the word and try to say it! Say: Elephant",
    content: {
      question: "Say this word:",
      options: [],
      correctAnswer: "elephant",
      targetWord: "Elephant",
      imageId: "elephant",
    },
    points: 15,
  },
  {
    id: "pr-002",
    type: "pronunciation",
    category: "food",
    difficulty: "beginner",
    instruction: "Listen and say this word",
    voiceInstruction: "Listen to the word and try to say it! Say: Banana",
    content: {
      question: "Say this word:",
      options: [],
      correctAnswer: "banana",
      targetWord: "Banana",
      imageId: "banana",
    },
    points: 15,
  },
  {
    id: "pr-003",
    type: "pronunciation",
    category: "colors",
    difficulty: "beginner",
    instruction: "Listen and say this word",
    voiceInstruction: "Listen to the word and try to say it! Say: Purple",
    content: {
      question: "Say this word:",
      options: [],
      correctAnswer: "purple",
      targetWord: "Purple",
    },
    points: 15,
  },
  {
    id: "pr-004",
    type: "pronunciation",
    category: "family",
    difficulty: "beginner",
    instruction: "Listen and say this word",
    voiceInstruction: "Listen to the word and try to say it! Say: Brother",
    content: {
      question: "Say this word:",
      options: [],
      correctAnswer: "brother",
      targetWord: "Brother",
    },
    points: 15,
  },
  {
    id: "pr-005",
    type: "pronunciation",
    category: "school",
    difficulty: "beginner",
    instruction: "Listen and say this word",
    voiceInstruction: "Listen to the word and try to say it! Say: Teacher",
    content: {
      question: "Say this word:",
      options: [],
      correctAnswer: "teacher",
      targetWord: "Teacher",
    },
    points: 15,
  },
];

/** Get all exercises by type */
export function getExercisesByType(type: string): Exercise[] {
  switch (type) {
    case "word-image-match":
      return WORD_IMAGE_EXERCISES;
    case "object-identification":
      return OBJECT_ID_EXERCISES;
    case "sentence-building":
      return SENTENCE_EXERCISES;
    case "listening-practice":
      return LISTENING_EXERCISES;
    case "pronunciation":
      return PRONUNCIATION_EXERCISES;
    default:
      return [];
  }
}

/** Get a random exercise of a specific type */
export function getRandomExercise(type: string): Exercise | null {
  const exercises = getExercisesByType(type);
  if (exercises.length === 0) return null;
  return exercises[Math.floor(Math.random() * exercises.length)];
}

/** Get exercises filtered by category */
export function getExercisesByCategory(
  type: string,
  category: string
): Exercise[] {
  return getExercisesByType(type).filter((ex) => ex.category === category);
}
