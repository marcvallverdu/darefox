import { StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInUp,
  FadeInDown,
  ZoomIn,
  SlideInRight,
} from "react-native-reanimated";
import { Dare, categoryStyles } from "../lib/dares";

const difficultyLabels = ["Comfort Zone", "Brave", "Legendary"] as const;

const DIFFICULTY_EMOJI = ["🌱", "🔥", "⚡"] as const;

export type DareCardProps = {
  dare: Dare;
  animate?: boolean;
};

export const DareCard = ({ dare, animate = false }: DareCardProps) => {
  const badgeStyle = categoryStyles[dare.category];

  return (
    <Animated.View
      style={styles.card}
      entering={animate ? FadeInUp.duration(500).springify().damping(15) : undefined}
    >
      {/* Category badge */}
      <Animated.View
        entering={animate ? SlideInRight.delay(200).duration(400) : undefined}
      >
        <View style={[styles.badge, { backgroundColor: badgeStyle.background }]}>
          <Text style={[styles.badgeText, { color: badgeStyle.text }]}>
            {dare.category}
          </Text>
        </View>
      </Animated.View>

      {/* Dare text */}
      <Animated.Text
        style={styles.dareText}
        entering={animate ? FadeInUp.delay(300).duration(500) : undefined}
      >
        {dare.text}
      </Animated.Text>

      {/* Difficulty indicator */}
      <Animated.View
        style={styles.difficultyRow}
        entering={animate ? FadeInDown.delay(400).duration(400) : undefined}
      >
        {difficultyLabels.map((label, index) => {
          const active = index < dare.difficulty;
          return (
            <View
              key={label}
              style={[styles.difficultyPill, active && styles.difficultyPillActive]}
            >
              <Text style={styles.difficultyEmoji}>
                {active ? DIFFICULTY_EMOJI[index] : "○"}
              </Text>
              <Text
                style={[
                  styles.difficultyText,
                  active && styles.difficultyTextActive,
                ]}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    gap: 16,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  dareText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4A3728",
    lineHeight: 30,
  },
  difficultyRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  difficultyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#F0E6DE",
    backgroundColor: "#FFF8F0",
  },
  difficultyPillActive: {
    backgroundColor: "#FFE9E4",
    borderColor: "#FF8C7C",
  },
  difficultyEmoji: {
    fontSize: 11,
  },
  difficultyText: {
    fontSize: 12,
    color: "#9B8579",
    fontWeight: "600",
  },
  difficultyTextActive: {
    color: "#E87461",
  },
});
