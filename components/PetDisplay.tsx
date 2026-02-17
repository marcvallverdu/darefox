import { StyleSheet, Text, View } from "react-native";
import { getLevelFromXp } from "../lib/pet";
import { FoxMascot, FoxMood } from "./FoxMascot";
import { XPBar } from "./XPBar";

type PetDisplayProps = {
  xp: number;
};

const LEVEL_MOOD: Record<number, FoxMood> = {
  1: "timid",
  2: "idle",
  3: "brave",
  4: "brave",
  5: "celebrate",
};

export const PetDisplay = ({ xp }: PetDisplayProps) => {
  const pet = getLevelFromXp(xp);
  const mood = LEVEL_MOOD[pet.level] ?? "celebrate";

  return (
    <View style={styles.card}>
      <FoxMascot mood={mood} size={140} />
      <Text style={styles.levelTitle}>{pet.levelName}</Text>
      <Text style={styles.levelSubtitle}>Level {pet.level}</Text>
      <XPBar
        progress={pet.progress}
        label={pet.isMax ? "Legendary reached" : `${pet.levelXp}/${pet.nextLevelXp} XP to next level`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    gap: 10,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  levelTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4A3728",
  },
  levelSubtitle: {
    fontSize: 14,
    color: "#9B8579",
  },
});
