import { StyleSheet, Text, View } from "react-native";

type FoxDialogueProps = {
  message: string;
};

export const FoxDialogue = ({ message }: FoxDialogueProps) => (
  <View style={styles.container}>
    <View style={styles.bubble}>
      <Text style={styles.text}>{message}</Text>
      <View style={styles.pointer} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  bubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    position: "relative"
  },
  text: {
    fontSize: 14,
    color: "#4A3728",
    lineHeight: 20
  },
  pointer: {
    position: "absolute",
    left: 24,
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFFFFF"
  }
});
