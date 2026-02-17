import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { BadgeGrid } from "../../components/BadgeGrid";
import { PetDisplay } from "../../components/PetDisplay";
import { getEarnedBadgeIds } from "../../lib/badges";
import { DareCategory } from "../../lib/dares";
import { getLevelFromXp } from "../../lib/pet";
import { getJson, getNumber, getString, setJson } from "../../lib/storage";

export default function PetScreen() {
  const [xp, setXp] = useState(0);
  const [foxName, setFoxName] = useState("Fox");
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [firstDareDate, setFirstDareDate] = useState<string | null>(null);

  const loadPet = useCallback(async () => {
    const [storedXp, storedName, completedDares, storedStreak, storedLongest, storedFirstDate] =
      await Promise.all([
        getNumber("petXp"),
        getString("foxName"),
        getJson<{ category: DareCategory; date: string }[]>("completedDares", []),
        getNumber("streak"),
        getNumber("longestStreak"),
        getString("firstDareDate")
      ]);
    setXp(storedXp);
    setFoxName(storedName ?? "Fox");
    setCompletedCount(completedDares.length);
    setStreak(storedStreak);
    setLongestStreak(storedLongest);
    setFirstDareDate(storedFirstDate);

    const progress = {
      completedDares,
      streak: storedStreak,
      longestStreak: storedLongest,
      level: getLevelFromXp(storedXp).level,
      firstDareDate: storedFirstDate
    };
    const earned = getEarnedBadgeIds(progress);
    setEarnedBadges(earned);
    await setJson("earnedBadges", earned);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPet();
    }, [loadPet])
  );

  const pet = useMemo(() => getLevelFromXp(xp), [xp]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {foxName} — Level {pet.level}
        </Text>
        <Text style={styles.subtitle}>
          {completedCount === 0 ? "Complete dares to grow your courage." : "Your courage keeps growing."}
        </Text>
      </View>
      <View style={styles.content}>
        <PetDisplay xp={xp} />
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total XP</Text>
            <Text style={styles.statValue}>{pet.xp}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Best Streak</Text>
            <Text style={styles.statValue}>{Math.max(streak, longestStreak)}</Text>
          </View>
        </View>
        <View style={styles.badgeSection}>
          <Text style={styles.badgeTitle}>Courage Badges</Text>
          <BadgeGrid earnedIds={earnedBadges} />
        </View>
      </View>
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
  content: {
    padding: 24,
    gap: 20
  },
  stats: {
    flexDirection: "row",
    gap: 12
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  statLabel: {
    fontSize: 12,
    color: "#9B8579"
  },
  statValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "600",
    color: "#4A3728"
  },
  badgeSection: {
    gap: 12
  },
  badgeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A3728"
  }
});
