import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Dare, categoryStyles } from "../lib/dares";

const difficultyLabels = ["Comfort Zone", "Brave", "Legendary"] as const;

export type DareCardProps = {
  dare: Dare;
  animate?: boolean;
};

export const DareCard = ({ dare, animate = false }: DareCardProps) => {
  const badgeStyle = categoryStyles[dare.category];
  return (
    <Animated.View style={styles.card} entering={animate ? FadeInUp.duration(500) : undefined}>
      <View style={[styles.badge, { backgroundColor: badgeStyle.background }]}> 
        <Text style={[styles.badgeText, { color: badgeStyle.text }]}>{dare.category}</Text>
      </View>
      <Text style={styles.dareText}>{dare.text}</Text>
      <View style={styles.foxWrap}>
        <Image source={require("../assets/mascot/main.png")} style={styles.fox} />
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#E8C4A8",
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
    fontWeight: "600",
    color: "#4A3728"
  },
  foxWrap: {
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  fox: {
    width: 48,
    height: 48,
    borderRadius: 24
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
    borderColor: "#F0E6DE",
    backgroundColor: "#FFF8F0"
  },
  difficultyPillActive: {
    backgroundColor: "#FFE9E4",
    borderColor: "#FF8C7C"
  },
  difficultyText: {
    fontSize: 12,
    color: "#9B8579",
    fontWeight: "600"
  },
  difficultyTextActive: {
    color: "#E87461"
  }
});
