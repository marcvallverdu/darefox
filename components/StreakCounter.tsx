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
    shadowColor: "#0B1A26",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  icon: {
    fontSize: 20
  },
  count: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A"
  },
  label: {
    fontSize: 12,
    color: "#888888"
  }
});
