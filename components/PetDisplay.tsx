import { Image, StyleSheet, Text, View } from "react-native";
import { getLevelFromXp } from "../lib/pet";
import { XPBar } from "./XPBar";

type PetDisplayProps = {
  xp: number;
};

export const PetDisplay = ({ xp }: PetDisplayProps) => {
  const pet = getLevelFromXp(xp);
  const mascotSource = (() => {
    switch (pet.level) {
      case 1:
        return require("../assets/mascot/timid.png");
      case 2:
        return require("../assets/mascot/main.png");
      case 3:
        return require("../assets/mascot/brave.png");
      case 4:
        return require("../assets/mascot/brave.png");
      default:
        return require("../assets/mascot/celebrate.png");
    }
  })();
  return (
    <View style={styles.card}>
      <Image source={mascotSource} style={styles.fox} />
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
    elevation: 4
  },
  fox: {
    width: 140,
    height: 140,
    resizeMode: "contain"
  },
  levelTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4A3728"
  },
  levelSubtitle: {
    fontSize: 14,
    color: "#9B8579"
  }
});
