/**
 * Available Lucide icon names that can be used in exercises.
 * This list is provided to the AI so it only uses valid icons.
 */
export const AVAILABLE_ICONS = [
  // Animals
  "cat", "dog", "bird", "fish", "bug", "rabbit", "turtle", "squirrel", "snail",
  // Vehicles
  "car", "bus", "bike", "plane", "train-front", "ship", "truck", "rocket",
  // Food
  "apple", "banana", "cherry", "grape", "citrus", "pizza", "cake", "cookie", "egg", "beef", "sandwich", "ice-cream-cone", "cup-soda", "milk", "coffee",
  // School
  "book-open", "pencil", "pen-tool", "ruler", "scissors", "backpack", "graduation-cap", "calculator", "notebook-pen",
  // Family / People
  "baby", "user", "users", "heart", "hand-heart",
  // Nature
  "sun", "moon", "star", "cloud", "cloud-rain", "snowflake", "flower-2", "trees", "mountain", "leaf", "droplets",
  // Daily Objects
  "clock", "key", "lamp", "smartphone", "camera", "umbrella", "glasses", "shirt", "watch", "door-closed", "bed", "bath", "brush", "comb",
  // Home
  "home", "sofa", "tv", "monitor", "radio", "fan",
  // Sports / Activities
  "football", "trophy", "music", "guitar", "drum", "gamepad-2", "palette", "paintbrush",
  // Body / Health
  "eye", "ear", "hand", "footprints", "brain", "smile", "frown", "meh",
  // Shapes
  "circle", "square", "triangle", "hexagon", "octagon", "diamond",
  // Colors (represented by objects)
  "flame", "droplet", "clover",
] as const;

export type AvailableIcon = (typeof AVAILABLE_ICONS)[number];
