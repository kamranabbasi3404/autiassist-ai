/**
 * Programmatic exercise generator — no AI needed.
 * Generates UNIQUE exercises every time by randomly picking from icon pool.
 * Implements a progressive difficulty curve: first 4 exercises are always simple/basic.
 * Used for: word-image-match, object-identification, listening-practice, pronunciation.
 */

import type { Exercise, ExerciseCategory } from "@/types";
import { shuffleArray, pickRandom } from "@/lib/utils";

/** Icon with human-readable label, category, and difficulty status */
interface IconEntry {
  icon: string;
  label: string;
  category: ExerciseCategory;
  difficulty?: "simple" | "standard";
}

/** Complete pool of icons with labels — classified by simple/standard difficulty */
const ICON_POOL: IconEntry[] = [
  // Animals
  { icon: "cat", label: "Cat", category: "animals", difficulty: "simple" },
  { icon: "dog", label: "Dog", category: "animals", difficulty: "simple" },
  { icon: "bird", label: "Bird", category: "animals", difficulty: "simple" },
  { icon: "fish", label: "Fish", category: "animals", difficulty: "simple" },
  { icon: "bug", label: "Bug", category: "animals" },
  { icon: "rabbit", label: "Rabbit", category: "animals", difficulty: "simple" },
  { icon: "turtle", label: "Turtle", category: "animals" },
  { icon: "squirrel", label: "Squirrel", category: "animals" },
  { icon: "snail", label: "Snail", category: "animals" },

  // Vehicles
  { icon: "car", label: "Car", category: "vehicles", difficulty: "simple" },
  { icon: "bus", label: "Bus", category: "vehicles", difficulty: "simple" },
  { icon: "bike", label: "Bicycle", category: "vehicles", difficulty: "simple" },
  { icon: "plane", label: "Airplane", category: "vehicles" },
  { icon: "train-front", label: "Train", category: "vehicles" },
  { icon: "ship", label: "Ship", category: "vehicles" },
  { icon: "truck", label: "Truck", category: "vehicles" },
  { icon: "rocket", label: "Rocket", category: "vehicles" },

  // Food & Drinks
  { icon: "apple", label: "Apple", category: "food", difficulty: "simple" },
  { icon: "banana", label: "Banana", category: "food", difficulty: "simple" },
  { icon: "cherry", label: "Cherry", category: "food" },
  { icon: "grape", label: "Grape", category: "food" },
  { icon: "citrus", label: "Orange", category: "food" },
  { icon: "pizza", label: "Pizza", category: "food", difficulty: "simple" },
  { icon: "cake", label: "Cake", category: "food", difficulty: "simple" },
  { icon: "cookie", label: "Cookie", category: "food", difficulty: "simple" },
  { icon: "egg", label: "Egg", category: "food", difficulty: "simple" },
  { icon: "sandwich", label: "Sandwich", category: "food" },
  { icon: "ice-cream-cone", label: "Ice Cream", category: "food" },
  { icon: "cup-soda", label: "Cup", category: "food", difficulty: "simple" },
  { icon: "milk", label: "Milk", category: "food", difficulty: "simple" },
  { icon: "coffee", label: "Coffee", category: "food" },
  { icon: "beef", label: "Meat", category: "food" },

  // School
  { icon: "book-open", label: "Book", category: "school", difficulty: "simple" },
  { icon: "pencil", label: "Pencil", category: "school", difficulty: "simple" },
  { icon: "pen-tool", label: "Pen", category: "school" },
  { icon: "ruler", label: "Ruler", category: "school" },
  { icon: "scissors", label: "Scissors", category: "school" },
  { icon: "backpack", label: "Backpack", category: "school" },
  { icon: "graduation-cap", label: "Graduation Cap", category: "school" },
  { icon: "calculator", label: "Calculator", category: "school" },
  { icon: "notebook-pen", label: "Notebook", category: "school" },

  // Family / People
  { icon: "baby", label: "Baby", category: "family", difficulty: "simple" },
  { icon: "user", label: "Person", category: "family" },
  { icon: "users", label: "People", category: "family" },
  { icon: "heart", label: "Heart", category: "family", difficulty: "simple" },
  { icon: "hand-heart", label: "Helping Hand", category: "family" },

  // Nature / Weather
  { icon: "sun", label: "Sun", category: "colors", difficulty: "simple" },
  { icon: "moon", label: "Moon", category: "colors", difficulty: "simple" },
  { icon: "star", label: "Star", category: "colors", difficulty: "simple" },
  { icon: "cloud", label: "Cloud", category: "colors", difficulty: "simple" },
  { icon: "cloud-rain", label: "Rain", category: "colors" },
  { icon: "snowflake", label: "Snowflake", category: "colors" },
  { icon: "flower-2", label: "Flower", category: "colors", difficulty: "simple" },
  { icon: "trees", label: "Trees", category: "colors" },
  { icon: "mountain", label: "Mountain", category: "colors" },
  { icon: "leaf", label: "Leaf", category: "colors" },
  { icon: "droplets", label: "Water Drops", category: "colors" },

  // Daily Objects
  { icon: "clock", label: "Clock", category: "daily-objects", difficulty: "simple" },
  { icon: "key", label: "Key", category: "daily-objects", difficulty: "simple" },
  { icon: "lamp", label: "Lamp", category: "daily-objects", difficulty: "simple" },
  { icon: "smartphone", label: "Phone", category: "daily-objects", difficulty: "simple" },
  { icon: "camera", label: "Camera", category: "daily-objects" },
  { icon: "umbrella", label: "Umbrella", category: "daily-objects" },
  { icon: "glasses", label: "Glasses", category: "daily-objects" },
  { icon: "shirt", label: "Shirt", category: "daily-objects", difficulty: "simple" },
  { icon: "watch", label: "Watch", category: "daily-objects" },
  { icon: "door-closed", label: "Door", category: "daily-objects", difficulty: "simple" },
  { icon: "bed", label: "Bed", category: "daily-objects", difficulty: "simple" },
  { icon: "brush", label: "Brush", category: "daily-objects" },

  // Home
  { icon: "home", label: "House", category: "daily-objects", difficulty: "simple" },
  { icon: "sofa", label: "Sofa", category: "daily-objects" },
  { icon: "tv", label: "Television", category: "daily-objects", difficulty: "simple" },
  { icon: "radio", label: "Radio", category: "daily-objects" },
  { icon: "fan", label: "Fan", category: "daily-objects" },

  // Shapes
  { icon: "circle", label: "Circle", category: "shapes", difficulty: "simple" },
  { icon: "square", label: "Square", category: "shapes", difficulty: "simple" },
  { icon: "triangle", label: "Triangle", category: "shapes", difficulty: "simple" },
  { icon: "hexagon", label: "Hexagon", category: "shapes" },
  { icon: "diamond", label: "Diamond", category: "shapes" },
  { icon: "octagon", label: "Octagon", category: "shapes" },

  // Sports / Activities
  { icon: "football", label: "Ball", category: "daily-objects", difficulty: "simple" },
  { icon: "trophy", label: "Trophy", category: "daily-objects" },
  { icon: "music", label: "Music", category: "daily-objects" },
  { icon: "guitar", label: "Guitar", category: "daily-objects" },
  { icon: "drum", label: "Drum", category: "daily-objects" },
  { icon: "gamepad-2", label: "Game Controller", category: "daily-objects" },
  { icon: "palette", label: "Paint Palette", category: "daily-objects" },
  { icon: "paintbrush", label: "Paintbrush", category: "daily-objects" },

  // Body
  { icon: "eye", label: "Eye", category: "family", difficulty: "simple" },
  { icon: "ear", label: "Ear", category: "family", difficulty: "simple" },
  { icon: "hand", label: "Hand", category: "family", difficulty: "simple" },
  { icon: "footprints", label: "Footprints", category: "family" },
  { icon: "brain", label: "Brain", category: "family" },
  { icon: "smile", label: "Happy Face", category: "family", difficulty: "simple" },
  { icon: "frown", label: "Sad Face", category: "family" },
];

/** Helper to generate options where correct is randomized and wrong ones are selected from the pool */
function buildOptions(correct: IconEntry, pool: IconEntry[]): { options: any[]; correctPosition: number; optionIds: string[] } {
  const wrongPool = pool.filter((e) => e.icon !== correct.icon);
  const wrongOptions = pickRandom(wrongPool, 3);

  const correctPosition = Math.floor(Math.random() * 4);
  const optionIds = ["a", "b", "c", "d"];
  const options = [];
  let wrongIndex = 0;

  for (let j = 0; j < 4; j++) {
    if (j === correctPosition) {
      options.push({
        id: optionIds[j],
        label: correct.label,
        icon: correct.icon,
        isCorrect: true,
      });
    } else {
      const wrong = wrongOptions[wrongIndex++];
      options.push({
        id: optionIds[j],
        label: wrong.label,
        icon: wrong.icon,
        isCorrect: false,
      });
    }
  }
  return { options, correctPosition, optionIds };
}

/**
 * Generate word-image matching exercises.
 * First 4 exercises are ALWAYS picked from the 'simple' pool to make starting gentle.
 */
export function generateWordImageExercises(count: number = 10): Exercise[] {
  const simplePool = ICON_POOL.filter((e) => e.difficulty === "simple");
  const standardPool = ICON_POOL.filter((e) => e.difficulty !== "simple");

  const simpleCount = Math.min(4, count);
  const standardCount = Math.max(0, count - simpleCount);

  const selectedSimple = pickRandom(simplePool, simpleCount);
  const selectedStandard = pickRandom(standardPool, standardCount);

  const simpleExercises: Exercise[] = [];
  for (let i = 0; i < selectedSimple.length; i++) {
    const correct = selectedSimple[i];
    const { options, correctPosition, optionIds } = buildOptions(correct, simplePool);

    simpleExercises.push({
      id: `wim-simple-${Date.now()}-${i}`,
      type: "word-image-match",
      category: correct.category,
      difficulty: "beginner",
      instruction: "Match the word with the correct picture",
      voiceInstruction: `Match the word ${correct.label} with the correct picture!`,
      content: {
        question: correct.label.toUpperCase(),
        options,
        correctAnswer: optionIds[correctPosition],
      },
      points: 10,
    });
  }

  const standardExercises: Exercise[] = [];
  for (let i = 0; i < selectedStandard.length; i++) {
    const correct = selectedStandard[i];
    const { options, correctPosition, optionIds } = buildOptions(correct, ICON_POOL);

    standardExercises.push({
      id: `wim-std-${Date.now()}-${i}`,
      type: "word-image-match",
      category: correct.category,
      difficulty: "beginner",
      instruction: "Match the word with the correct picture",
      voiceInstruction: `Match the word ${correct.label} with the correct picture!`,
      content: {
        question: correct.label.toUpperCase(),
        options,
        correctAnswer: optionIds[correctPosition],
      },
      points: 10,
    });
  }

  // Shuffle simple items and standard items separately, but keep simple items at the front!
  return [...shuffleArray(simpleExercises), ...shuffleArray(standardExercises)];
}

/**
 * Generate object identification exercises.
 * First 4 exercises are ALWAYS picked from the 'simple' pool.
 */
export function generateObjectIdExercises(count: number = 10): Exercise[] {
  const simplePool = ICON_POOL.filter((e) => e.difficulty === "simple");
  const standardPool = ICON_POOL.filter((e) => e.difficulty !== "simple");

  const simpleCount = Math.min(4, count);
  const standardCount = Math.max(0, count - simpleCount);

  const selectedSimple = pickRandom(simplePool, simpleCount);
  const selectedStandard = pickRandom(standardPool, standardCount);

  const simpleExercises: Exercise[] = [];
  for (let i = 0; i < selectedSimple.length; i++) {
    const correct = selectedSimple[i];
    const { options, correctPosition, optionIds } = buildOptions(correct, simplePool);

    simpleExercises.push({
      id: `oid-simple-${Date.now()}-${i}`,
      type: "object-identification",
      category: correct.category,
      difficulty: "beginner",
      instruction: "What is this?",
      voiceInstruction: `Look at the picture. What is this?`,
      content: {
        question: "What is this?",
        options,
        correctAnswer: optionIds[correctPosition],
        imageId: correct.icon,
      },
      points: 10,
    });
  }

  const standardExercises: Exercise[] = [];
  for (let i = 0; i < selectedStandard.length; i++) {
    const correct = selectedStandard[i];
    const { options, correctPosition, optionIds } = buildOptions(correct, ICON_POOL);

    standardExercises.push({
      id: `oid-std-${Date.now()}-${i}`,
      type: "object-identification",
      category: correct.category,
      difficulty: "beginner",
      instruction: "What is this?",
      voiceInstruction: `Look at the picture. What is this?`,
      content: {
        question: "What is this?",
        options,
        correctAnswer: optionIds[correctPosition],
        imageId: correct.icon,
      },
      points: 10,
    });
  }

  return [...shuffleArray(simpleExercises), ...shuffleArray(standardExercises)];
}

/**
 * Generate listening practice exercises.
 * First 4 exercises are ALWAYS picked from the 'simple' pool.
 */
export function generateListeningExercises(count: number = 10): Exercise[] {
  const simplePool = ICON_POOL.filter((e) => e.difficulty === "simple");
  const standardPool = ICON_POOL.filter((e) => e.difficulty !== "simple");

  const simpleCount = Math.min(4, count);
  const standardCount = Math.max(0, count - simpleCount);

  const selectedSimple = pickRandom(simplePool, simpleCount);
  const selectedStandard = pickRandom(standardPool, standardCount);

  const simpleExercises: Exercise[] = [];
  for (let i = 0; i < selectedSimple.length; i++) {
    const correct = selectedSimple[i];
    const { options, correctPosition, optionIds } = buildOptions(correct, simplePool);

    simpleExercises.push({
      id: `lp-simple-${Date.now()}-${i}`,
      type: "listening-practice",
      category: correct.category,
      difficulty: "beginner",
      instruction: "Listen and choose the right picture",
      voiceInstruction: "Listen to the word and choose the correct picture!",
      content: {
        question: correct.label,
        options,
        correctAnswer: optionIds[correctPosition],
      },
      points: 10,
    });
  }

  const standardExercises: Exercise[] = [];
  for (let i = 0; i < selectedStandard.length; i++) {
    const correct = selectedStandard[i];
    const { options, correctPosition, optionIds } = buildOptions(correct, ICON_POOL);

    standardExercises.push({
      id: `lp-std-${Date.now()}-${i}`,
      type: "listening-practice",
      category: correct.category,
      difficulty: "beginner",
      instruction: "Listen and choose the right picture",
      voiceInstruction: "Listen to the word and choose the correct picture!",
      content: {
        question: correct.label,
        options,
        correctAnswer: optionIds[correctPosition],
      },
      points: 10,
    });
  }

  return [...shuffleArray(simpleExercises), ...shuffleArray(standardExercises)];
}

/**
 * Generate pronunciation exercises.
 * First 4 exercises are ALWAYS picked from the 'simple' pool.
 */
export function generatePronunciationExercises(count: number = 10): Exercise[] {
  const simplePool = ICON_POOL.filter((e) => e.difficulty === "simple");
  const standardPool = ICON_POOL.filter((e) => e.difficulty !== "simple");

  const simpleCount = Math.min(4, count);
  const standardCount = Math.max(0, count - simpleCount);

  const selectedSimple = pickRandom(simplePool, simpleCount);
  const selectedStandard = pickRandom(standardPool, standardCount);

  const simpleExercises: Exercise[] = [];
  for (let i = 0; i < selectedSimple.length; i++) {
    const item = selectedSimple[i];
    simpleExercises.push({
      id: `pr-simple-${Date.now()}-${i}`,
      type: "pronunciation",
      category: item.category,
      difficulty: "beginner",
      instruction: "Listen and say this word",
      voiceInstruction: `Listen to the word and try to say it! Say: ${item.label}`,
      content: {
        question: "Say this word:",
        options: [],
        correctAnswer: item.label.toLowerCase(),
        targetWord: item.label,
        imageId: item.icon,
      },
      points: 15,
    });
  }

  const standardExercises: Exercise[] = [];
  for (let i = 0; i < selectedStandard.length; i++) {
    const item = selectedStandard[i];
    standardExercises.push({
      id: `pr-std-${Date.now()}-${i}`,
      type: "pronunciation",
      category: item.category,
      difficulty: "beginner",
      instruction: "Listen and say this word",
      voiceInstruction: `Listen to the word and try to say it! Say: ${item.label}`,
      content: {
        question: "Say this word:",
        options: [],
        correctAnswer: item.label.toLowerCase(),
        targetWord: item.label,
        imageId: item.icon,
      },
      points: 15,
    });
  }

  return [...shuffleArray(simpleExercises), ...shuffleArray(standardExercises)];
}
