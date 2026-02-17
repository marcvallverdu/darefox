import { useCallback, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import {
  cancelDailyReminder,
  cancelWeeklySummary,
  ensureNotificationPermissions,
  scheduleDailyReminder,
  scheduleWeeklySummary
} from "../../lib/notifications";
import { getJson, getString, resetAll, setJson } from "../../lib/storage";
import { getDareById } from "../../lib/dares";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weeklySummaryEnabled, setWeeklySummaryEnabled] = useState(true);

  const loadSettings = useCallback(async () => {
    const [enabled, weeklyEnabled] = await Promise.all([
      getJson<boolean>("notificationsEnabled", true),
      getJson<boolean>("weeklySummaryEnabled", true)
    ]);
    setNotificationsEnabled(enabled);
    setWeeklySummaryEnabled(weeklyEnabled);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [loadSettings])
  );

  const handleToggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    await setJson("notificationsEnabled", value);
    if (!value) {
      await cancelDailyReminder();
      return;
    }

    const hasPermission = await ensureNotificationPermissions();
    if (!hasPermission) {
      Alert.alert("Permission needed", "Enable notifications in your device settings to receive daily dares.");
      setNotificationsEnabled(false);
      await setJson("notificationsEnabled", false);
      return;
    }

    const lastDareId = await getJson<string | null>("dailyDareId", null);
    const dareText = lastDareId ? getDareById(lastDareId)?.text : null;
    await scheduleDailyReminder(dareText ?? "Ready for today's dare?");
  };

  const buildWeeklySummary = async () => {
    const [completed, storedName] = await Promise.all([
      getJson<{ date: string }[]>("completedDares", []),
      getString("foxName")
    ]);
    const foxName = storedName ?? "Fox";
    const now = new Date();
    const cutoff = new Date();
    cutoff.setDate(now.getDate() - 6);
    const count = completed.filter((entry) => new Date(entry.date) >= cutoff).length;
    return `You completed ${count} dares this week! ${foxName} is proud 🦊`;
  };

  const handleToggleWeeklySummary = async (value: boolean) => {
    setWeeklySummaryEnabled(value);
    await setJson("weeklySummaryEnabled", value);
    if (!value) {
      await cancelWeeklySummary();
      return;
    }

    const hasPermission = await ensureNotificationPermissions();
    if (!hasPermission) {
      Alert.alert("Permission needed", "Enable notifications in your device settings to receive weekly summaries.");
      setWeeklySummaryEnabled(false);
      await setJson("weeklySummaryEnabled", false);
      return;
    }

    const summary = await buildWeeklySummary();
    await scheduleWeeklySummary(summary);
  };

  const handleReset = () => {
    Alert.alert("Reset all data?", "This will clear your streak, history, and pet progress.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: async () => {
          await resetAll();
          setNotificationsEnabled(true);
          setWeeklySummaryEnabled(true);
          Alert.alert("All set", "Your data has been reset.");
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your daily dare routine.</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text style={styles.cardTitle}>Daily Reminder</Text>
              <Text style={styles.cardSubtitle}>Every day at 8:00 AM</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ true: "#A8E6CF", false: "#F0E6DE" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text style={styles.cardTitle}>Weekly Summary</Text>
              <Text style={styles.cardSubtitle}>Sundays at 10:00 AM</Text>
            </View>
            <Switch
              value={weeklySummaryEnabled}
              onValueChange={handleToggleWeeklySummary}
              trackColor={{ true: "#A8E6CF", false: "#F0E6DE" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Pressable style={({ pressed }) => [styles.resetButton, pressed && styles.resetPressed]} onPress={handleReset}>
          <Text style={styles.resetText}>Reset All Data</Text>
        </Pressable>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A3728"
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#9B8579"
  },
  resetButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD4CC"
  },
  resetPressed: {
    opacity: 0.8
  },
  resetText: {
    color: "#E87461",
    fontWeight: "600",
    fontSize: 16
  }
});
