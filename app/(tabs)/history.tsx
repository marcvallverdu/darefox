import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { categoryStyles } from "../../lib/dares";
import { getJson } from "../../lib/storage";

export type CompletedDare = {
  id: string;
  date: string;
  text: string;
  category: keyof typeof categoryStyles;
  difficulty: number;
  reflection?: {
    emoji: string;
    note: string;
  };
  // Legacy flat fields
  reflectionEmoji?: string;
  reflectionNote?: string;
};

const formatDate = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  if (!year || !month || !day) return dateKey;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

export default function HistoryScreen() {
  const [items, setItems] = useState<CompletedDare[]>([]);

  const loadHistory = useCallback(async () => {
    const history = await getJson<CompletedDare[]>("completedDares", []);
    setItems(history);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>{items.length} dares completed</Text>
      </View>
      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📜</Text>
          <Text style={styles.emptyTitle}>No dares yet</Text>
          <Text style={styles.emptyText}>Complete today's dare to start your history.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const badge = categoryStyles[item.category];
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: badge.background }]}> 
                    <Text style={[styles.badgeText, { color: badge.text }]}>{item.category}</Text>
                  </View>
                  <View style={styles.dateRow}>
                    {(item.reflection?.emoji || item.reflectionEmoji) ? (
                      <Text style={styles.emoji}>{item.reflection?.emoji || item.reflectionEmoji}</Text>
                    ) : null}
                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                  </View>
                </View>
                <Text style={styles.text}>{item.text}</Text>
                {(item.reflection?.note || item.reflectionNote) ? (
                  <View style={styles.noteWrap}>
                    <Text style={styles.noteLabel}>Reflection</Text>
                    <Text style={styles.note}>{item.reflection?.note || item.reflectionNote}</Text>
                  </View>
                ) : null}
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF8F0"
  },
  header: {
    padding: 24,
    paddingBottom: 10
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#4A3728"
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#9B8579"
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 16
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600"
  },
  date: {
    fontSize: 12,
    color: "#9B8579"
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  emoji: {
    fontSize: 14
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#4A3728"
  },
  noteWrap: {
    marginTop: 10,
    backgroundColor: "#FFF8F0",
    borderRadius: 12,
    padding: 12,
  },
  noteLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#C4A99A",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  note: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#9B8579",
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 8
  },
  emptyEmoji: {
    fontSize: 42
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A3728"
  },
  emptyText: {
    fontSize: 14,
    color: "#9B8579",
    textAlign: "center"
  }
});
