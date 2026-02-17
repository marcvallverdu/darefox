import { StyleSheet, Text, View } from "react-native";

type StreakCounterProps = {
  streak: number;
};

export const StreakCounter = ({ streak }: StreakCounterProps) => (
  <View style={styles.container}>
    <Text style={styles.icon}>🔥</Text>
    <View>
      <Text style={styles.count}>{streak} Days</Text>
      <Text style={styles.label}>Streak</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  icon: {
    fontSize: 20,
    color: "#FF8C7C"
  },
  count: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A3728"
  },
  label: {
    fontSize: 12,
    color: "#9B8579"
  }
});
