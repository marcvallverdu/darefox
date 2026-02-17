import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";

type FoxDialogueProps = {
  message: string;
};

export const FoxDialogue = ({ message }: FoxDialogueProps) => {
  const scale = useSharedValue(0.95);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 0 }),
      withDelay(100, withTiming(1.02, { duration: 200 })),
      withTiming(1, { duration: 150 })
    );
  }, [message]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!message) return null;

  return (
    <Animated.View
      style={[styles.container, animStyle]}
      entering={FadeIn.duration(400)}
    >
      <View style={styles.bubble}>
        <Text style={styles.text}>{message}</Text>
        <View style={styles.pointer} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  bubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F5EDE6",
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    position: "relative",
  },
  text: {
    fontSize: 14,
    color: "#4A3728",
    lineHeight: 21,
    fontStyle: "italic",
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
    borderTopColor: "#FFFFFF",
  },
});
