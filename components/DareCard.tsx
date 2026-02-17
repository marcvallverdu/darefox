import { StyleSheet, Text, View } from "react-native";
import { Dare, categoryStyles } from "../lib/dares";

const difficultyLabels = ["Comfort Zone", "Brave", "Legendary"] as const;

export type DareCardProps = {
  dare: Dare;
};

export const DareCard = ({ dare }: DareCardProps) => {
  const badgeStyle = categoryStyles[dare.category];
  return (
    <View style={styles.card}>
      <View style={[styles.badge, { backgroundColor: badgeStyle.background }]}> 
        <Text style={[styles.badgeText, { color: badgeStyle.text }]}>{dare.category}</Text>
      </View>
      <Text style={styles.dareText}>{dare.text}</Text>
      <View style={styles.foxWrap}>
        <Text style={styles.fox}>🦊</Text>
      </View>
      <View style={styles.difficultyRow}>
        {difficultyLabels.map((label, index) => {
          const active = index < dare.difficulty;
          return (
            <View key={label} style={[styles.difficultyPill, active && styles.difficultyPillActive]}>
              <Text style={[styles.difficultyText, active && styles.difficultyTextActive]}>{label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#0B1A26",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600"
  },
  dareText: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A"
  },
  foxWrap: {
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  fox: {
    fontSize: 64
  },
  difficultyRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap"
  },
  difficultyPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E3E6EA",
    backgroundColor: "#F7F8FA"
  },
  difficultyPillActive: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50"
  },
  difficultyText: {
    fontSize: 12,
    color: "#888888",
    fontWeight: "600"
  },
  difficultyTextActive: {
    color: "#2F7A52"
  }
});
