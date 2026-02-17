import { StyleSheet, Text, View } from "react-native";
import { BADGES } from "../lib/badges";

type BadgeGridProps = {
  earnedIds: string[];
};

export const BadgeGrid = ({ earnedIds }: BadgeGridProps) => {
  const earnedSet = new Set(earnedIds);
  return (
    <View style={styles.grid}>
      {BADGES.map((badge) => {
        const earned = earnedSet.has(badge.id);
        return (
          <View key={badge.id} style={[styles.card, !earned && styles.cardLocked]}>
            <Text style={styles.emoji}>{earned ? badge.emoji : "?"}</Text>
            <Text style={[styles.title, !earned && styles.textMuted]}>{badge.title}</Text>
            <Text style={[styles.description, !earned && styles.textMuted]}>{badge.description}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  card: {
    flexBasis: "46%",
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  cardLocked: {
    backgroundColor: "#FFF8F0",
    borderWidth: 1,
    borderColor: "#F0E6DE"
  },
  emoji: {
    fontSize: 22
  },
  title: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#4A3728"
  },
  description: {
    marginTop: 4,
    fontSize: 11,
    color: "#9B8579"
  },
  textMuted: {
    color: "#C4A99A"
  }
});
