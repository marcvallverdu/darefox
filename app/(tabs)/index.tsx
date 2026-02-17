import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { DareCard } from "../../components/DareCard";
import { FoxDialogue } from "../../components/FoxDialogue";
import { FoxMascot } from "../../components/FoxMascot";
import { ReflectionModal, ReflectionEmoji } from "../../components/ReflectionModal";
import { StreakCounter } from "../../components/StreakCounter";
import { DARES, getDareById, getDailyDare } from "../../lib/dares";
import { getFoxMessage } from "../../lib/foxPersonality";
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
  const [foxName, setFoxName] = useState("Fox");
  const [reflectionVisible, setReflectionVisible] = useState(false);
  const [shieldAvailable, setShieldAvailable] = useState(false);

  const dare = useMemo(() => (dareId ? getDareById(dareId) : null), [dareId]);
  const foxMessage = useMemo(() => {
    if (!dare) return "";
    const context = completedToday ? "completion" : "morning";
    return getFoxMessage({
      context,
      foxName,
      dateKey,
      category: completedToday ? dare.category : undefined
    });
  }, [completedToday, dare, dateKey, foxName]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const today = getDateKey();
      const yesterday = getDateKey(-1);
      const dayBeforeYesterday = getDateKey(-2);
      setDateKey(today);

      const [
        storedStreak,
        storedLastCompleted,
        storedXp,
        storedDailyDate,
        storedDailyId,
        storedShieldAvailable,
        storedFoxName
      ] =
        await Promise.all([
          getNumber("streak"),
          getString("lastCompletedDate"),
          getNumber("petXp"),
          getString("dailyDareDate"),
          getString("dailyDareId"),
          getJson<boolean>("shieldAvailable", true),
          getString("foxName")
        ]);

      let nextStreak = storedStreak;
      let nextLastCompleted = storedLastCompleted;
      let nextShieldAvailable = storedShieldAvailable;

      if (storedLastCompleted && storedLastCompleted !== today && storedLastCompleted !== yesterday && storedStreak > 0) {
        if (storedShieldAvailable && storedLastCompleted === dayBeforeYesterday) {
          nextShieldAvailable = false;
          nextLastCompleted = yesterday;
          await Promise.all([
            setJson("shieldAvailable", false),
            setString("lastShieldUsedDate", today),
            setString("lastCompletedDate", yesterday)
          ]);
          Alert.alert("Shield used!", "Your streak was protected for a missed day.");
        } else {
          nextStreak = 0;
          await setNumber("streak", 0);
        }
      }

      setStreak(nextStreak);
      setPetXp(storedXp);
      setLastCompletedDate(nextLastCompleted);
      setCompletedToday(nextLastCompleted === today);
      setShieldAvailable(nextShieldAvailable);
      setFoxName(storedFoxName ?? "Fox");

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

  const handleComplete = async (reflection: { emoji: ReflectionEmoji; note: string }) => {
    if (!dare || completedToday) return;

    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const today = getDateKey();
      const yesterday = getDateKey(-1);
      const previousStreak = streak;
      const newStreak = lastCompletedDate === yesterday ? previousStreak + 1 : 1;

      const updatedXp = addXp(petXp, XP_PER_DARE);

      const [completedDares, storedLongest, storedFirstDate] = await Promise.all([
        getJson<any[]>("completedDares", []),
        getNumber("longestStreak"),
        getString("firstDareDate")
      ]);
      const newEntry = {
        id: dare.id,
        date: today,
        text: dare.text,
        category: dare.category,
        difficulty: dare.difficulty,
        reflection
      };
      const nextLongest = Math.max(storedLongest, newStreak);
      const firstDate = storedFirstDate ?? today;

      await Promise.all([
        setNumber("streak", newStreak),
        setString("lastCompletedDate", today),
        setNumber("petXp", updatedXp),
        setJson("completedDares", [newEntry, ...completedDares]),
        setNumber("longestStreak", nextLongest),
        setString("firstDareDate", firstDate)
      ]);

      setStreak(newStreak);
      setLastCompletedDate(today);
      setPetXp(updatedXp);
      setCompletedToday(true);
    } catch (error) {
      Alert.alert("Oops", "We couldn't save your progress. Please try again.");
    }
  };

  const handleCompletePress = () => {
    if (!dare || completedToday) return;
    setReflectionVisible(true);
  };

  const handleReshuffle = async () => {
    if (!dare || completedToday) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const recentIds = await getJson<string[]>("recentDareIds", []);
    const today = getDateKey();
    const available = DARES.filter((d) => d.id !== dare.id && !recentIds.includes(d.id));
    if (available.length === 0) return;
    const randomIndex = Math.floor(Math.random() * available.length);
    const newDare = available[randomIndex];
    const updatedRecent = [newDare.id, ...recentIds.filter((id) => id !== newDare.id)].slice(0, 7);
    await Promise.all([
      setString("dailyDareId", newDare.id),
      setJson("recentDareIds", updatedRecent)
    ]);
    setDareId(newDare.id);
  };

  const handleReflectionSave = async (reflection: { emoji: ReflectionEmoji; note: string }) => {
    setReflectionVisible(false);
    await handleComplete(reflection);
  };

  if (loading || !dare) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#FF8C7C" />
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
          <View style={styles.streakRow}>
            <StreakCounter streak={streak} />
            {shieldAvailable && <Text style={styles.shieldIcon}>🛡️</Text>}
          </View>
        </View>

        <View style={styles.mascotRow}>
          <FoxMascot
            mood={completedToday ? "celebrate" : "idle"}
            triggerCelebrate={completedToday}
            size={120}
          />
          <View style={styles.greeting}>
            <Text style={styles.greetingTitle}>
              {completedToday ? "You did it!" : "Ready for today's dare?"}
            </Text>
            <Text style={styles.greetingSubtitle}>
              {completedToday
                ? `${foxName} is so proud of you!`
                : `${foxName} is cheering you on!`}
            </Text>
          </View>
        </View>

        <FoxDialogue message={foxMessage} />

        {completedToday ? (
          <View style={styles.completedCard}>
            <View style={styles.completedCheck}>
              <Text style={styles.completedCheckText}>✓</Text>
            </View>
            <Text style={styles.completedTitle}>Dare Complete</Text>
            <Text style={styles.completedDareText}>{dare.text}</Text>
            <Text style={styles.completedSubtext}>Come back tomorrow for a new dare</Text>
          </View>
        ) : (
          <>
            <View style={styles.cardWrap}>
              <DareCard dare={dare} animate />
            </View>

            <View style={styles.actionRow}>
              <Pressable
                style={({ pressed }) => [styles.reshuffleButton, pressed && styles.reshufflePressed]}
                onPress={handleReshuffle}
              >
                <Text style={styles.reshuffleText}>Shuffle</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                onPress={handleCompletePress}
              >
                <Text style={styles.buttonText}>I Did It!</Text>
              </Pressable>
            </View>
            <Text style={styles.helperText}>Tap to log your dare and build your streak.</Text>
          </>
        )}
      </ScrollView>
      <ReflectionModal
        visible={reflectionVisible}
        onClose={() => setReflectionVisible(false)}
        onSave={handleReflectionSave}
      />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  shieldIcon: {
    fontSize: 18
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#4A3728"
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#9B8579"
  },
  mascotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  mascot: {
    width: 120,
    height: 120,
    resizeMode: "contain"
  },
  greeting: {
    flex: 1,
    gap: 6
  },
  greetingTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A3728"
  },
  greetingSubtitle: {
    fontSize: 13,
    color: "#9B8579"
  },
  cardWrap: {
    marginTop: 4
  },
  actionRow: {
    flexDirection: "row",
    gap: 12
  },
  reshuffleButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F0E6DE"
  },
  reshufflePressed: {
    opacity: 0.7
  },
  reshuffleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9B8579"
  },
  button: {
    flex: 1,
    backgroundColor: "#FF8C7C",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center"
  },
  buttonPressed: {
    opacity: 0.85
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF"
  },
  completedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: "#A8E6CF",
    shadowColor: "#A8E6CF",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  completedCheck: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#A8E6CF",
    alignItems: "center",
    justifyContent: "center"
  },
  completedCheckText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  completedTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A3728"
  },
  completedDareText: {
    fontSize: 16,
    color: "#9B8579",
    textAlign: "center"
  },
  completedSubtext: {
    fontSize: 13,
    color: "#C4A99A",
    marginTop: 4
  },
  helperText: {
    textAlign: "center",
    fontSize: 14,
    color: "#9B8579"
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
  loadingText: {
    fontSize: 14,
    color: "#9B8579"
  }
});
