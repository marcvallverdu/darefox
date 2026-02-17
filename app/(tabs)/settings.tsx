import { useCallback, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { cancelDailyReminder, ensureNotificationPermissions, scheduleDailyReminder } from "../../lib/notifications";
import { getJson, resetAll, setJson } from "../../lib/storage";
import { getDareById } from "../../lib/dares";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const loadSettings = useCallback(async () => {
    const enabled = await getJson<boolean>("notificationsEnabled", true);
    setNotificationsEnabled(enabled);
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

  const handleReset = () => {
    Alert.alert("Reset all data?", "This will clear your streak, history, and pet progress.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: async () => {
          await resetAll();
          setNotificationsEnabled(true);
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
              trackColor={{ true: "#4CAF50", false: "#D5DADF" }}
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
    backgroundColor: "#F2F4F5"
  },
  header: {
    padding: 20,
    paddingBottom: 10
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A"
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#888888"
  },
  content: {
    padding: 20,
    gap: 20
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#0B1A26",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A"
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#888888"
  },
  resetButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1C1C1"
  },
  resetPressed: {
    opacity: 0.8
  },
  resetText: {
    color: "#C55353",
    fontWeight: "700",
    fontSize: 16
  }
});
