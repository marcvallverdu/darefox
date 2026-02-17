import { DareCategory } from "./dares";

export type BadgeProgress = {
  completedDares: { category: DareCategory; date: string }[];
  streak: number;
  longestStreak: number;
  level: number;
  firstDareDate: string | null;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  check: (progress: BadgeProgress) => boolean;
};

const hasAllCategories = (items: { category: DareCategory }[]) => {
  const required: DareCategory[] = [
    "Social",
    "Physical",
    "Creative",
    "Mindful",
    "Random",
    "Kindness",
    "Adventure"
  ];
  const set = new Set(items.map((item) => item.category));
  return required.every((category) => set.has(category));
};

const totalCompleted = (progress: BadgeProgress) => progress.completedDares.length;

const peakStreak = (progress: BadgeProgress) => Math.max(progress.streak, progress.longestStreak);

export const BADGES: Badge[] = [
  {
    id: "first-dare",
    title: "First Dare",
    description: "Complete your first dare.",
    emoji: "🌟",
    check: (progress) => totalCompleted(progress) >= 1
  },
  {
    id: "streak-3",
    title: "3-Day Streak",
    description: "Hold a streak for 3 days.",
    emoji: "🔥",
    check: (progress) => peakStreak(progress) >= 3
  },
  {
    id: "streak-7",
    title: "7-Day Streak",
    description: "Hold a streak for 7 days.",
    emoji: "🔥",
    check: (progress) => peakStreak(progress) >= 7
  },
  {
    id: "streak-14",
    title: "14-Day Streak",
    description: "Hold a streak for 14 days.",
    emoji: "🔥",
    check: (progress) => peakStreak(progress) >= 14
  },
  {
    id: "streak-30",
    title: "30-Day Streak",
    description: "Hold a streak for 30 days.",
    emoji: "🔥",
    check: (progress) => peakStreak(progress) >= 30
  },
  {
    id: "dares-10",
    title: "10 Dares",
    description: "Complete 10 total dares.",
    emoji: "📘",
    check: (progress) => totalCompleted(progress) >= 10
  },
  {
    id: "dares-25",
    title: "25 Dares",
    description: "Complete 25 total dares.",
    emoji: "📗",
    check: (progress) => totalCompleted(progress) >= 25
  },
  {
    id: "dares-50",
    title: "50 Dares",
    description: "Complete 50 total dares.",
    emoji: "📙",
    check: (progress) => totalCompleted(progress) >= 50
  },
  {
    id: "dares-100",
    title: "100 Dares",
    description: "Complete 100 total dares.",
    emoji: "📕",
    check: (progress) => totalCompleted(progress) >= 100
  },
  {
    id: "all-categories",
    title: "All Categories",
    description: "Complete at least one dare from every category.",
    emoji: "🧭",
    check: (progress) => hasAllCategories(progress.completedDares)
  },
  {
    id: "brave-fox",
    title: "Brave Fox",
    description: "Reach level 3 with your fox.",
    emoji: "🦊",
    check: (progress) => progress.level >= 3
  },
  {
    id: "legendary-fox",
    title: "Legendary Fox",
    description: "Reach level 5 with your fox.",
    emoji: "🏆",
    check: (progress) => progress.level >= 5
  },
  {
    id: "early-bird",
    title: "Early Bird",
    description: "Complete your first dare on day one.",
    emoji: "🌅",
    check: (progress) => Boolean(progress.firstDareDate)
  }
];

export const getEarnedBadgeIds = (progress: BadgeProgress) =>
  BADGES.filter((badge) => badge.check(progress)).map((badge) => badge.id);
