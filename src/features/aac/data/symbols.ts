import { AvailableIcon } from "@/features/speech/data/available-icons";

export interface AACSymbol {
  id: string;
  label: string;
  icon: AvailableIcon;
  category: "people" | "verbs" | "nouns" | "feelings" | "social" | "places";
  color: string;       // Background color hex for the Fitzgerald key
  textColor: string;   // Text color hex
  borderColor: string; // Border color hex
}

export const AAC_CATEGORIES = [
  { id: "people" as const, label: "People", color: "#FEF08A", borderColor: "#FACC15" }, // Yellow
  { id: "verbs" as const, label: "Actions", color: "#BBF7D0", borderColor: "#4ADE80" },  // Green
  { id: "nouns" as const, label: "Objects", color: "#FED7AA", borderColor: "#FB923C" },  // Orange
  { id: "feelings" as const, label: "Feelings", color: "#BAE6FD", borderColor: "#38BDF8" }, // Blue
  { id: "social" as const, label: "Social", color: "#FBCFE8", borderColor: "#F472B6" },   // Pink
  { id: "places" as const, label: "Places", color: "#E9D5FF", borderColor: "#C084FC" },   // Purple
] as const;

export type AACCategoryType = (typeof AAC_CATEGORIES)[number]["id"];

export const AAC_SYMBOLS: AACSymbol[] = [
  // People & Pronouns (Yellow - Fitzgerald key)
  { id: "p-i", label: "I", icon: "user", category: "people", color: "#FEF08A", textColor: "#854D0E", borderColor: "#FACC15" },
  { id: "p-you", label: "You", icon: "users", category: "people", color: "#FEF08A", textColor: "#854D0E", borderColor: "#FACC15" },
  { id: "p-mom", label: "Mom", icon: "heart", category: "people", color: "#FEF08A", textColor: "#854D0E", borderColor: "#FACC15" },
  { id: "p-dad", label: "Dad", icon: "smile", category: "people", color: "#FEF08A", textColor: "#854D0E", borderColor: "#FACC15" },
  { id: "p-teacher", label: "Teacher", icon: "graduation-cap", category: "people", color: "#FEF08A", textColor: "#854D0E", borderColor: "#FACC15" },
  { id: "p-baby", label: "Baby", icon: "baby", category: "people", color: "#FEF08A", textColor: "#854D0E", borderColor: "#FACC15" },

  // Verbs & Actions (Green - Fitzgerald key)
  { id: "v-want", label: "Want", icon: "hand", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },
  { id: "v-feel", label: "Feel", icon: "brain", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },
  { id: "v-play", label: "Play", icon: "gamepad-2", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },
  { id: "v-eat", label: "Eat", icon: "pizza", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },
  { id: "v-drink", label: "Drink", icon: "cup-soda", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },
  { id: "v-go", label: "Go", icon: "car", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },
  { id: "v-sleep", label: "Sleep", icon: "bed", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },
  { id: "v-stop", label: "Stop", icon: "octagon", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },
  { id: "v-help", label: "Help", icon: "hand-heart", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },
  { id: "v-like", label: "Like", icon: "smile", category: "verbs", color: "#BBF7D0", textColor: "#166534", borderColor: "#4ADE80" },

  // Nouns & Objects (Orange - Fitzgerald key)
  { id: "n-apple", label: "Apple", icon: "apple", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },
  { id: "n-banana", label: "Banana", icon: "banana", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },
  { id: "n-water", label: "Water", icon: "droplets", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },
  { id: "n-milk", label: "Milk", icon: "milk", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },
  { id: "n-toy", label: "Toy", icon: "gamepad-2", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },
  { id: "n-book", label: "Book", icon: "book-open", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },
  { id: "n-ball", label: "Ball", icon: "football", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },
  { id: "n-home", label: "Home", icon: "home", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },
  { id: "n-bed", label: "Bed", icon: "bed", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },
  { id: "n-toilet", label: "Toilet", icon: "bath", category: "nouns", color: "#FED7AA", textColor: "#9A3412", borderColor: "#FB923C" },

  // Feelings (Blue - Fitzgerald key)
  { id: "f-happy", label: "Happy", icon: "smile", category: "feelings", color: "#BAE6FD", textColor: "#075985", borderColor: "#38BDF8" },
  { id: "f-sad", label: "Sad", icon: "frown", category: "feelings", color: "#BAE6FD", textColor: "#075985", borderColor: "#38BDF8" },
  { id: "f-angry", label: "Angry", icon: "frown", category: "feelings", color: "#BAE6FD", textColor: "#075985", borderColor: "#38BDF8" },
  { id: "f-tired", label: "Tired", icon: "meh", category: "feelings", color: "#BAE6FD", textColor: "#075985", borderColor: "#38BDF8" },
  { id: "f-scared", label: "Scared", icon: "meh", category: "feelings", color: "#BAE6FD", textColor: "#075985", borderColor: "#38BDF8" },
  { id: "f-good", label: "Good", icon: "smile", category: "feelings", color: "#BAE6FD", textColor: "#075985", borderColor: "#38BDF8" },

  // Social & Interactions (Pink - Fitzgerald key)
  { id: "s-hello", label: "Hello", icon: "hand", category: "social", color: "#FBCFE8", textColor: "#9D174D", borderColor: "#F472B6" },
  { id: "s-thanks", label: "Thank You", icon: "heart", category: "social", color: "#FBCFE8", textColor: "#9D174D", borderColor: "#F472B6" },
  { id: "s-yes", label: "Yes", icon: "circle", category: "social", color: "#FBCFE8", textColor: "#9D174D", borderColor: "#F472B6" },
  { id: "s-no", label: "No", icon: "octagon", category: "social", color: "#FBCFE8", textColor: "#9D174D", borderColor: "#F472B6" },
  { id: "s-please", label: "Please", icon: "hand-heart", category: "social", color: "#FBCFE8", textColor: "#9D174D", borderColor: "#F472B6" },

  // Places (Purple - Fitzgerald key)
  { id: "pl-school", label: "School", icon: "graduation-cap", category: "places", color: "#E9D5FF", textColor: "#6B21A8", borderColor: "#C084FC" },
  { id: "pl-home", label: "Home", icon: "home", category: "places", color: "#E9D5FF", textColor: "#6B21A8", borderColor: "#C084FC" },
  { id: "pl-park", label: "Park", icon: "trees", category: "places", color: "#E9D5FF", textColor: "#6B21A8", borderColor: "#C084FC" },
  { id: "pl-bedroom", label: "Bedroom", icon: "bed", category: "places", color: "#E9D5FF", textColor: "#6B21A8", borderColor: "#C084FC" },
];
