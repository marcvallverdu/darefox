import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { DareCard } from "../../components/DareCard";
import { StreakCounter } from "../../components/StreakCounter";
import { DARES, getDareById, getDailyDare } from "../../lib/dares";
import { addXp, XP_PER_DARE } from "../../lib/pet";
import { ensureNotificationPermissions, scheduleDailyReminder } from "../../lib/notifications";
import { getJson, getNumber, getString, setJson, setNumber, setString } from "../../lib/storage";

const getDateKey = (offsetDays = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
};

const formatDisplayDate = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  if (!year || !month || !day) return dateKey;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, { month: "long", day: "numeric" });
};

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [dareId, setDareId] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [petXp, setPetXp] = useState(0);
  const [completedToday, setCompletedToday] = useState(false);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [dateKey, setDateKey] = useState(getDateKey());

  const dare = useMemo(() => (dareId ? getDareById(dareId) : null), [dareId]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const today = getDateKey();
      setDateKey(today);

      const [storedStreak, storedLastCompleted, storedXp, storedDailyDate, storedDailyId] =
        await Promise.all([
          getNumber("streak"),
          getString("lastCompletedDate"),
          getNumber("petXp"),
          getString("dailyDareDate"),
          getString("dailyDareId")
        ]);

      setStreak(storedStreak);
      setPetXp(storedXp);
      setLastCompletedDate(storedLastCompleted);
      setCompletedToday(storedLastCompleted === today);

      const recentIds = await getJson<string[]>("recentDareIds", []);
      let nextDareId = storedDailyId;

      if (!storedDailyDate || storedDailyDate !== today || !storedDailyId) {
        const nextDare = getDailyDare(today, recentIds);
        nextDareId = nextDare.id;
        const updatedRecent = [nextDare.id, ...recentIds.filter((id) => id !== nextDare.id)].slice(0, 7);
        await Promise.all([
          setString("dailyDareDate", today),
          setString("dailyDareId", nextDare.id),
          setJson("recentDareIds", updatedRecent)
        ]);
      }

      setDareId(nextDareId ?? DARES[0].id);

      const notificationsEnabled = await getJson<boolean>("notificationsEnabled", true);
      if (notificationsEnabled && nextDareId) {
        const hasPermission = await ensureNotificationPermissions();
        if (hasPermission) {
          await scheduleDailyReminder(getDareById(nextDareId)?.text ?? "Ready for today's dare?");
        }
      }
    } catch (error) {
      Alert.alert("Something went wrong", "We couldn't load today's dare. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleComplete = async () => {
    if (!dare || completedToday) return;

    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const today = getDateKey();
      const yesterday = getDateKey(-1);
      const previousStreak = streak;
      const newStreak = lastCompletedDate === yesterday ? previousStreak + 1 : 1;

      const updatedXp = addXp(petXp, XP_PER_DARE);

      const completedDares = await getJson<any[]>("completedDares", []);
      const newEntry = {
        id: dare.id,
        date: today,
        text: dare.text,
        category: dare.category,
        difficulty: dare.difficulty
      };

      await Promise.all([
        setNumber("streak", newStreak),
        setString("lastCompletedDate", today),
        setNumber("petXp", updatedXp),
        setJson("completedDares", [newEntry, ...completedDares])
      ]);

      setStreak(newStreak);
      setLastCompletedDate(today);
      setPetXp(updatedXp);
      setCompletedToday(true);
    } catch (error) {
      Alert.alert("Oops", "We couldn't save your progress. Please try again.");
    }
  };

  if (loading || !dare) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Finding your dare...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>DareFox</Text>
            <Text style={styles.subtitle}>{formatDisplayDate(dateKey)}</Text>
          </View>
          <StreakCounter streak={streak} />
        </View>

        <View style={styles.cardWrap}>
          <DareCard dare={dare} />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            completedToday && styles.buttonDisabled,
            pressed && !completedToday && styles.buttonPressed
          ]}
          onPress={handleComplete}
        >
          <Text style={styles.buttonText}>{completedToday ? "Completed!" : "I Did It!"}</Text>
        </Pressable>
        <Text style={styles.helperText}>
          {completedToday ? "Great work! Come back tomorrow for a new dare." : "Tap to log your dare and build your streak."}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F2F4F5"
  },
  container: {
    padding: 20,
    paddingBottom: 120,
    gap: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1A1A1A"
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#888888"
  },
  cardWrap: {
    marginTop: 4
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center"
  },
  buttonPressed: {
    opacity: 0.85
  },
  buttonDisabled: {
    backgroundColor: "#9FD6A2"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  helperText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888888"
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
  loadingText: {
    fontSize: 14,
    color: "#888888"
  }
});
