import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  streak: "darefox:streak",
  lastCompletedDate: "darefox:lastCompletedDate",
  completedDares: "darefox:completedDares",
  petXp: "darefox:petXp",
  dailyDareDate: "darefox:dailyDareDate",
  dailyDareId: "darefox:dailyDareId",
  recentDareIds: "darefox:recentDareIds",
  notificationsEnabled: "darefox:notificationsEnabled"
} as const;

const safeJsonParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const getNumber = async (key: keyof typeof KEYS, fallback = 0) => {
  const value = await AsyncStorage.getItem(KEYS[key]);
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const setNumber = async (key: keyof typeof KEYS, value: number) =>
  AsyncStorage.setItem(KEYS[key], value.toString());

export const getString = async (key: keyof typeof KEYS) =>
  AsyncStorage.getItem(KEYS[key]);

export const setString = async (key: keyof typeof KEYS, value: string) =>
  AsyncStorage.setItem(KEYS[key], value);

export const getJson = async <T>(key: keyof typeof KEYS, fallback: T) => {
  const value = await AsyncStorage.getItem(KEYS[key]);
  return safeJsonParse<T>(value, fallback);
};

export const setJson = async <T>(key: keyof typeof KEYS, value: T) =>
  AsyncStorage.setItem(KEYS[key], JSON.stringify(value));

export const removeKeys = async (keys: (keyof typeof KEYS)[]) => {
  await AsyncStorage.multiRemove(keys.map((key) => KEYS[key]));
};

export const resetAll = async () => {
  await AsyncStorage.multiRemove(Object.values(KEYS));
};

export { KEYS };
