import { StyleSheet, Text, View } from "react-native";
import { getLevelFromXp } from "../lib/pet";
import { XPBar } from "./XPBar";

type PetDisplayProps = {
  xp: number;
};

export const PetDisplay = ({ xp }: PetDisplayProps) => {
  const pet = getLevelFromXp(xp);
  return (
    <View style={styles.card}>
      <Text style={styles.fox}>🦊</Text>
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
    shadowColor: "#0B1A26",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  },
  fox: {
    fontSize: 72
  },
  levelTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A"
  },
  levelSubtitle: {
    fontSize: 14,
    color: "#888888"
  }
});
