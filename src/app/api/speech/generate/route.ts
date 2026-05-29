import { NextRequest, NextResponse } from "next/server";
import { AVAILABLE_ICONS } from "@/features/speech/data/available-icons";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

/** Randomly pick N items from an array */
function pickRandom<T>(arr: readonly T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/** Get a random theme/focus for variety */
function getRandomTheme(): { focus: string; icons: string[]; avoid: string[] } {
  const themes = [
    { focus: "things you find in a kitchen", icons: ["egg", "cup-soda", "milk", "pizza", "cookie", "sandwich", "cake", "flame", "coffee"], avoid: ["cat", "dog", "car", "apple"] },
    { focus: "things you see outside", icons: ["sun", "cloud", "trees", "bird", "mountain", "flower-2", "leaf", "bug", "bike"], avoid: ["book-open", "lamp", "bed", "sofa"] },
    { focus: "things at school", icons: ["book-open", "pencil", "pen-tool", "ruler", "backpack", "calculator", "graduation-cap", "notebook-pen", "scissors"], avoid: ["pizza", "bed", "car", "fish"] },
    { focus: "animals and insects", icons: ["cat", "dog", "bird", "fish", "bug", "rabbit", "turtle", "squirrel", "snail"], avoid: ["car", "book-open", "pizza", "phone"] },
    { focus: "things that move", icons: ["car", "bus", "bike", "plane", "train-front", "ship", "truck", "rocket", "bird"], avoid: ["lamp", "bed", "book-open", "egg"] },
    { focus: "things in your bedroom", icons: ["bed", "lamp", "clock", "shirt", "door", "key", "monitor", "fan", "watch"], avoid: ["cat", "car", "apple", "train-front"] },
    { focus: "weather and sky", icons: ["sun", "moon", "star", "cloud", "cloud-rain", "snowflake", "droplets", "umbrella", "flame"], avoid: ["car", "dog", "book-open", "pizza"] },
    { focus: "body and feelings", icons: ["eye", "ear", "hand", "smile", "frown", "brain", "heart", "footprints", "meh"], avoid: ["car", "apple", "bus", "lamp"] },
    { focus: "shapes and colors", icons: ["circle", "square", "triangle", "hexagon", "diamond", "star", "heart", "octagon", "clover"], avoid: ["cat", "car", "apple", "dog"] },
    { focus: "music and fun", icons: ["music", "guitar", "drum", "gamepad-2", "palette", "paintbrush", "trophy", "football", "camera"], avoid: ["book-open", "bed", "egg", "bus"] },
    { focus: "fruits and drinks", icons: ["apple", "banana", "cherry", "grape", "citrus", "cup-soda", "milk", "coffee", "ice-cream-cone"], avoid: ["car", "cat", "dog", "bed"] },
    { focus: "people and family", icons: ["baby", "user", "users", "heart", "hand-heart", "smile", "home", "hand", "eye"], avoid: ["car", "apple", "bus", "fish"] },
  ];
  return themes[Math.floor(Math.random() * themes.length)];
}

/** Build the system prompt for exercise generation */
function buildSystemPrompt(exerciseType: string): string {
  const iconList = AVAILABLE_ICONS.join(", ");

  const baseContext = `You are an AI that generates educational exercises for an 8-year-old child with autism. 
The child is at beginner-intermediate level. Use simple, common English words.
Topics: animals, vehicles, food, school, family, colors, shapes, daily objects, nature, body parts.

CRITICAL RULES:
- Generate exactly 10 UNIQUE exercises per request. Never repeat.
- Be creative and varied - use different words and topics each time.
- Each choice-based exercise (word-image-match, object-identification, listening-practice) MUST have exactly 4 options.
- Only ONE option should be correct (isCorrect: true), the other 3 must be false (only for choice-based exercises).
- For icon fields, ONLY use icons from this list: ${iconList}
- Return ONLY valid JSON array, no markdown, no explanation.
- The "id" field must be a unique string for each exercise.`;

  const typeSpecificPrompt: Record<string, string> = {
    "word-image-match": `Generate word-image matching exercises.
Each exercise shows a WORD and the child picks the correct IMAGE (icon).

JSON format for each exercise:
{
  "id": "wim-{random}",
  "type": "word-image-match",
  "category": "animals|vehicles|food|school|family|colors|shapes|daily-objects",
  "difficulty": "beginner",
  "instruction": "Match the word with the correct picture",
  "voiceInstruction": "Match the word [WORD] with the correct picture!",
  "content": {
    "question": "THE_WORD_IN_CAPS",
    "options": [
      {"id": "a", "label": "Label1", "icon": "icon-name", "isCorrect": false},
      {"id": "b", "label": "Label2", "icon": "icon-name", "isCorrect": true},
      {"id": "c", "label": "Label3", "icon": "icon-name", "isCorrect": false},
      {"id": "d", "label": "Label4", "icon": "icon-name", "isCorrect": false}
    ],
    "correctAnswer": "b"
  },
  "points": 10
}`,

    "object-identification": `Generate object identification exercises.
Each exercise shows an IMAGE (icon) and the child names what it is from 4 choices.

JSON format for each exercise:
{
  "id": "oid-{random}",
  "type": "object-identification",
  "category": "animals|vehicles|food|school|family|daily-objects",
  "difficulty": "beginner",
  "instruction": "What is this?",
  "voiceInstruction": "Look at the picture. What is this?",
  "content": {
    "question": "What is this?",
    "options": [
      {"id": "a", "label": "Label1", "icon": "icon-name", "isCorrect": false},
      {"id": "b", "label": "Label2", "icon": "icon-name", "isCorrect": true},
      {"id": "c", "label": "Label3", "icon": "icon-name", "isCorrect": false},
      {"id": "d", "label": "Label4", "icon": "icon-name", "isCorrect": false}
    ],
    "correctAnswer": "b",
    "imageId": "icon-of-correct-answer"
  },
  "points": 10
}`,

    "listening-practice": `Generate listening practice exercises.
The system speaks a word aloud. The child picks the correct IMAGE from 4 options.

JSON format for each exercise:
{
  "id": "lp-{random}",
  "type": "listening-practice",
  "category": "animals|vehicles|food|school|family|daily-objects",
  "difficulty": "beginner",
  "instruction": "Listen and choose the right picture",
  "voiceInstruction": "Listen to the word and choose the correct picture!",
  "content": {
    "question": "TheSpokenWord",
    "options": [
      {"id": "a", "label": "Label1", "icon": "icon-name", "isCorrect": true},
      {"id": "b", "label": "Label2", "icon": "icon-name", "isCorrect": false},
      {"id": "c", "label": "Label3", "icon": "icon-name", "isCorrect": false},
      {"id": "d", "label": "Label4", "icon": "icon-name", "isCorrect": false}
    ],
    "correctAnswer": "a"
  },
  "points": 10
}`,

    "sentence-building": `Generate sentence building exercises.
Give the child scrambled words. They arrange them into a correct sentence.
Use simple 4-6 word sentences an 8 year old can understand.

JSON format for each exercise:
{
  "id": "sb-{random}",
  "type": "sentence-building",
  "category": "animals|vehicles|food|school|family",
  "difficulty": "beginner",
  "instruction": "Put the words in order",
  "voiceInstruction": "Put the words in the right order to make a sentence!",
  "content": {
    "question": "Make a sentence",
    "options": [],
    "correctAnswer": "The correct full sentence here",
    "words": ["scrambled", "words", "in", "random", "order"]
  },
  "points": 15
}`,

    "pronunciation": `Generate pronunciation practice exercises.
Show a word with an icon. The child listens and tries to say it.
Use words that are slightly challenging but appropriate for an 8 year old.

JSON format for each exercise:
{
  "id": "pr-{random}",
  "type": "pronunciation",
  "category": "animals|vehicles|food|school|family|daily-objects",
  "difficulty": "beginner",
  "instruction": "Listen and say this word",
  "voiceInstruction": "Listen to the word and try to say it! Say: TheWord",
  "content": {
    "question": "Say this word:",
    "options": [],
    "correctAnswer": "theword",
    "targetWord": "TheWord",
    "imageId": "matching-icon-name"
  },
  "points": 15
}`,
  };

  return `${baseContext}\n\n${typeSpecificPrompt[exerciseType] || typeSpecificPrompt["word-image-match"]}`;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === "your_groq_api_key_here") {
    return NextResponse.json(
      { error: "GROQ_API_KEY not configured. Add it to .env.local" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { exerciseType } = body;

    if (!exerciseType) {
      return NextResponse.json(
        { error: "exerciseType is required" },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(exerciseType);

    // Generate random context for variety
    const theme = getRandomTheme();
    const randomSeed = Math.floor(Math.random() * 100000);
    const mustUseIcons = pickRandom(theme.icons, 5);

    const userMessage = `Session seed: ${randomSeed}. 
Focus theme: "${theme.focus}". 
You MUST use at least these icons as correct answers: ${mustUseIcons.join(", ")}.
Do NOT use these words as correct answers: ${theme.avoid.join(", ")}.
Generate 10 completely FRESH and UNIQUE ${exerciseType} exercises that are DIFFERENT from typical examples.
Randomize which option (a, b, c, or d) is the correct answer — spread evenly.
Return ONLY a JSON object with key "exercises" containing the array.`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 1.3,
        max_tokens: 4096,
        seed: randomSeed,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json(
        { error: "AI service unavailable", fallback: true },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Empty AI response", fallback: true },
        { status: 502 }
      );
    }

    // Parse the JSON response
    let exercises;
    try {
      const parsed = JSON.parse(content);
      // Handle both array and object-wrapped responses
      exercises = Array.isArray(parsed) ? parsed : parsed.exercises || parsed.data || Object.values(parsed)[0];
    } catch {
      console.error("Failed to parse AI response:", content);
      return NextResponse.json(
        { error: "Invalid AI response format", fallback: true },
        { status: 502 }
      );
    }

    if (!Array.isArray(exercises) || exercises.length === 0) {
      return NextResponse.json(
        { error: "No exercises generated", fallback: true },
        { status: 502 }
      );
    }

    return NextResponse.json({ exercises });
  } catch (error) {
    console.error("Exercise generation error:", error);
    return NextResponse.json(
      { error: "Internal server error", fallback: true },
      { status: 500 }
    );
  }
}
