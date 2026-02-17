import { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { categoryStyles } from "../../lib/dares";
import { getJson, getNumber, getString } from "../../lib/storage";

export type CompletedDare = {
  id: string;
  date: string;
  text: string;
  category: keyof typeof categoryStyles;
  difficulty: number;
  reflectionEmoji?: string;
  reflectionNote?: string;
};

const formatDate = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  if (!year || !month || !day) return dateKey;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

export default function StatsScreen() {
  const [completed, setCompleted] = useState<CompletedDare[]>([]);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [petXp, setPetXp] = useState(0);
  const [firstDareDate, setFirstDareDate] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    const [history, storedStreak, storedLongest, storedXp, storedFirstDate] = await Promise.all([
      getJson<CompletedDare[]>("completedDares", []),
      getNumber("streak"),
      getNumber("longestStreak"),
      getNumber("petXp"),
      getString("firstDareDate")
    ]);
    setCompleted(history);
    setStreak(storedStreak);
    setLongestStreak(storedLongest);
    setPetXp(storedXp);
    setFirstDareDate(storedFirstDate);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [loadStats])
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    completed.forEach((entry) => {
      counts[entry.category] = (counts[entry.category] ?? 0) + 1;
    });
    return counts;
  }, [completed]);

  const averageDifficulty = useMemo(() => {
    if (completed.length === 0) return 0;
    const total = completed.reduce((sum, entry) => sum + entry.difficulty, 0);
    return total / completed.length;
  }, [completed]);

  const commonReflection = useMemo(() => {
    const counts: Record<string, number> = {};
    completed.forEach((entry) => {
      if (entry.reflectionEmoji) {
        counts[entry.reflectionEmoji] = (counts[entry.reflectionEmoji] ?? 0) + 1;
      }
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] ?? null;
  }, [completed]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Stats</Text>
          <Text style={styles.subtitle}>Your courage story so far.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Overview</Text>
          <View style={styles.row}>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>{completed.length}</Text>
              <Text style={styles.statLabel}>Total Dares</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>{petXp}</Text>
              <Text style={styles.statLabel}>Courage Score</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>{longestStreak}</Text>
              <Text style={styles.statLabel}>Longest Streak</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Category Breakdown</Text>
          <View style={styles.categoryWrap}>
            {Object.entries(categoryStyles).map(([category, style]) => (
              <View key={category} style={[styles.categoryPill, { backgroundColor: style.background }]}>
                <Text style={[styles.categoryText, { color: style.text }]}>
                  {category} · {categoryCounts[category] ?? 0}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Insights</Text>
          <View style={styles.insightRow}>
            <Text style={styles.insightLabel}>Average Difficulty</Text>
            <Text style={styles.insightValue}>
              {averageDifficulty > 0 ? averageDifficulty.toFixed(1) : "-"}
            </Text>
          </View>
          <View style={styles.insightRow}>
            <Text style={styles.insightLabel}>Most Common Feeling</Text>
            <Text style={styles.insightValue}>{commonReflection ?? "-"}</Text>
          </View>
          <View style={styles.insightRow}>
            <Text style={styles.insightLabel}>Member Since</Text>
            <Text style={styles.insightValue}>
              {firstDareDate ? formatDate(firstDareDate) : "-"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF8F0"
  },
  container: {
    padding: 24,
    paddingBottom: 120,
    gap: 20
  },
  header: {
    gap: 4
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#4A3728"
  },
  subtitle: {
    fontSize: 14,
    color: "#9B8579"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    gap: 16
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A3728"
  },
  row: {
    flexDirection: "row",
    gap: 16
  },
  statBlock: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F0E6DE"
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A3728"
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#9B8579"
  },
  categoryWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600"
  },
  insightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  insightLabel: {
    fontSize: 14,
    color: "#9B8579"
  },
  insightValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A3728"
  }
});
