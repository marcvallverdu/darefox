import { DareCategory } from "./dares";

export type FoxDialogueContext = "morning" | "completion" | "streak" | "levelUp";

type FoxDialogueInput = {
  context: FoxDialogueContext;
  foxName: string;
  dateKey: string;
  category?: DareCategory;
  milestone?: number;
};

const morningMessages = [
  "Good morning! {foxName} is ready for a brave day.",
  "A new dare awaits. {foxName} believes in you!",
  "Let us be bold today. {foxName} is cheering.",
  "Tiny steps count. {foxName} is right beside you.",
  "Ready for a spark of courage? {foxName} is too!",
  "You bring the bravery, {foxName} brings the tail wags.",
  "A fresh day, a fresh dare. {foxName} is hyped!"
];

const completionMessages: Record<DareCategory, string[]> = {
  Social: [
    "That was brave! Social courage looks great on you.",
    "You showed up for people. {foxName} is proud.",
    "Nice connection! Keep that friendly energy.",
    "You stretched your social muscles today!",
    "You were bold and warm. {foxName} approves."
  ],
  Physical: [
    "Strong move! {foxName} saw that power.",
    "Your body said yes to courage today.",
    "You moved with heart. Nice work!",
    "Sweat counts as bravery too. Well done!",
    "That was a physical win. {foxName} is impressed."
  ],
  Creative: [
    "Creative sparks! {foxName} is dazzled.",
    "You made something new. That is brave.",
    "Imagination unlocked. Nice work!",
    "You colored outside the lines today.",
    "Artful courage! {foxName} is clapping."
  ],
  Mindful: [
    "You chose calm courage. Beautiful.",
    "You made space for yourself. {foxName} is proud.",
    "Quiet bravery is still bravery.",
    "You showed up for your inner world.",
    "Mindful and mighty. Nice work!"
  ],
  Random: [
    "Spontaneous bravery! {foxName} loved it.",
    "You said yes to the unexpected.",
    "Random courage keeps you playful.",
    "That was delightfully bold.",
    "Surprise win! {foxName} is cheering."
  ],
  Kindness: [
    "Your kindness was courageous today.",
    "You made someone feel seen. {foxName} beams.",
    "Soft hearts are strong hearts.",
    "Thank you for spreading warmth.",
    "Kindness looks powerful on you."
  ],
  Adventure: [
    "Adventure courage unlocked!",
    "You explored the unknown. {foxName} is amazed.",
    "That was a bold path. Keep going!",
    "You chased a little adventure today.",
    "Brave explorer vibes! {foxName} approves."
  ]
};

const streakMessages: Record<number, string[]> = {
  3: [
    "Three days strong! {foxName} is doing zoomies.",
    "3-day streak! Courage is building.",
    "That is a solid streak. Keep it up!",
    "Three days of bravery. Proud of you!",
    "Streak sparkle unlocked at 3 days!"
  ],
  7: [
    "One week of courage! {foxName} is amazed.",
    "7-day streak! Your bravery is blooming.",
    "A full week of dares. Incredible.",
    "You made it 7 days! Keep the glow.",
    "Lucky seven! {foxName} is proud."
  ],
  14: [
    "Two weeks strong! {foxName} is impressed.",
    "14 days of courage. Big glow up.",
    "That is a powerful streak!",
    "Two-week streak! You are unstoppable.",
    "Bravery habit unlocked at 14 days."
  ],
  30: [
    "30 days! That is legendary courage.",
    "A full month of dares. {foxName} celebrates!",
    "30-day streak! You are on fire.",
    "Bravery for 30 days straight. Wow.",
    "Legendary month! {foxName} is proud."
  ]
};

const levelUpMessages = [
  "Level up! {foxName} is glowing.",
  "Your fox just leveled up. Brave vibes!",
  "New level reached. {foxName} is celebrating!",
  "You grew stronger today. {foxName} noticed.",
  "Courage leveled up! High paw."
];

const hashSeed = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const pickMessage = (messages: string[], seedKey: string) => {
  if (messages.length === 0) return "";
  const index = hashSeed(seedKey) % messages.length;
  return messages[index];
};

export const getFoxMessage = ({ context, foxName, dateKey, category, milestone }: FoxDialogueInput) => {
  let message = "";

  if (context === "completion" && category) {
    message = pickMessage(completionMessages[category], `${dateKey}-${category}-complete`);
  } else if (context === "streak" && milestone) {
    const list = streakMessages[milestone] ?? [];
    message = pickMessage(list, `${dateKey}-${milestone}-streak`);
  } else if (context === "levelUp") {
    message = pickMessage(levelUpMessages, `${dateKey}-levelup`);
  } else {
    message = pickMessage(morningMessages, `${dateKey}-morning`);
  }

  return message.replace("{foxName}", foxName);
};
