export const XP_PER_DARE = 10;
export const XP_PER_LEVEL = 50;
export const MAX_LEVEL = 5;

const LEVELS = ["Timid", "Cautious", "Brave", "Fearless", "Legendary"] as const;

export type PetLevelName = (typeof LEVELS)[number];

export const getLevelName = (level: number): PetLevelName =>
  LEVELS[Math.min(Math.max(level, 1), MAX_LEVEL) - 1];

export const getLevelFromXp = (xp: number) => {
  const safeXp = Math.max(0, xp);
  const rawLevel = Math.floor(safeXp / XP_PER_LEVEL) + 1;
  const level = Math.min(rawLevel, MAX_LEVEL);
  const levelName = getLevelName(level);
  const isMax = level >= MAX_LEVEL;
  const levelXp = safeXp - (level - 1) * XP_PER_LEVEL;
  const nextLevelXp = isMax ? XP_PER_LEVEL : XP_PER_LEVEL;
  const progress = isMax ? 1 : Math.min(levelXp / XP_PER_LEVEL, 1);

  return {
    level,
    levelName,
    xp: safeXp,
    levelXp,
    nextLevelXp,
    progress,
    isMax
  };
};

export const addXp = (xp: number, amount: number) => Math.max(0, xp + amount);
