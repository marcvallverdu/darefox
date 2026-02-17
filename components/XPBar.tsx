import { StyleSheet, Text, View } from "react-native";

type XPBarProps = {
  progress: number;
  label: string;
};

export const XPBar = ({ progress, label }: XPBarProps) => (
  <View style={styles.container}>
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }]} />
    </View>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E6ECEF",
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#4CAF50"
  },
  label: {
    fontSize: 12,
    color: "#888888"
  }
});
