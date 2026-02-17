import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as Haptics from "expo-haptics";

export type ReflectionEmoji = "😰" | "😊" | "🔥";

type ReflectionModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (reflection: { emoji: ReflectionEmoji; note: string }) => void;
};

const EMOJIS: { emoji: ReflectionEmoji; label: string }[] = [
  { emoji: "😰", label: "Scary" },
  { emoji: "😊", label: "Good" },
  { emoji: "🔥", label: "Amazing" }
];

export const ReflectionModal = ({ visible, onClose, onSave }: ReflectionModalProps) => {
  const [selected, setSelected] = useState<ReflectionEmoji>("😊");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (visible) {
      setSelected("😊");
      setNote("");
    }
  }, [visible]);

  const handleSelect = async (emoji: ReflectionEmoji) => {
    setSelected(emoji);
    await Haptics.selectionAsync();
  };

  const handleSave = () => {
    onSave({ emoji: selected, note: note.trim() });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>How did it feel?</Text>
          <View style={styles.emojiRow}>
            {EMOJIS.map(({ emoji, label }) => {
              const active = emoji === selected;
              return (
                <Pressable
                  key={emoji}
                  onPress={() => handleSelect(emoji)}
                  style={[styles.emojiButton, active && styles.emojiButtonActive]}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                  <Text style={[styles.emojiLabel, active && styles.emojiLabelActive]}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.noteWrap}>
            <TextInput
              placeholder="Optional note (140 chars max)"
              placeholderTextColor="#C4A99A"
              value={note}
              onChangeText={setNote}
              style={styles.input}
              maxLength={140}
              multiline
            />
            <Text style={styles.counter}>{note.length}/140</Text>
          </View>
          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Not now</Text>
            </Pressable>
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(74, 55, 40, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A3728"
  },
  emojiRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12
  },
  emojiButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#FFF8F0",
    borderWidth: 1,
    borderColor: "#F0E6DE"
  },
  emojiButtonActive: {
    backgroundColor: "#FFE9E4",
    borderColor: "#FF8C7C"
  },
  emojiText: {
    fontSize: 24
  },
  emojiLabel: {
    marginTop: 4,
    fontSize: 11,
    color: "#9B8579",
    fontWeight: "600"
  },
  emojiLabelActive: {
    color: "#E87461"
  },
  noteWrap: {
    marginTop: 16,
    gap: 8
  },
  input: {
    minHeight: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0E6DE",
    padding: 12,
    fontSize: 14,
    color: "#4A3728",
    backgroundColor: "#FFF8F0"
  },
  counter: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#9B8579"
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end"
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#F0E6DE"
  },
  cancelText: {
    color: "#9B8579",
    fontWeight: "600"
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: "#FF8C7C"
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "600"
  }
});
