import { Platform } from "react-native";
import { getString, setString } from "./storage";

// expo-notifications is not supported in Expo Go (SDK 53+)
// We dynamically import and guard all calls to prevent crashes
let Notifications: typeof import("expo-notifications") | null = null;

try {
  Notifications = require("expo-notifications");
} catch {
  // Silently fail in Expo Go
}

// Only set handler if module loaded successfully
if (Notifications) {
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  } catch {
    // Expo Go — ignore
  }
}

export const ensureNotificationPermissions = async (): Promise<boolean> => {
  if (!Notifications) return false;
  try {
    const settings = await Notifications.getPermissionsAsync();
    if (
      settings.granted ||
      settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    ) {
      return true;
    }
    const request = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowSound: true, allowBadge: false },
    });
    return (
      request.granted ||
      request.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  } catch {
    return false;
  }
};

export const configureAndroidChannel = async () => {
  if (Platform.OS !== "android" || !Notifications) return;
  try {
    await Notifications.setNotificationChannelAsync("daily-dare", {
      name: "Daily Dare",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF8C7C",
    });
  } catch {
    // ignore
  }
};

export const scheduleDailyReminder = async (
  dareText: string,
  hour = 8,
  minute = 0
) => {
  if (!Notifications) return null;
  try {
    await configureAndroidChannel();
    const existingId = await getString("dailyNotificationId");
    if (existingId) {
      await Notifications.cancelScheduledNotificationAsync(existingId);
    }
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Today's Dare",
        body: dareText,
        sound: "default",
      },
      trigger: {
        type: "daily",
        hour,
        minute,
        channelId: "daily-dare",
      } as any,
    });
    await setString("dailyNotificationId", notificationId);
    return notificationId;
  } catch {
    return null;
  }
};

export const cancelDailyReminder = async () => {
  if (!Notifications) return;
  try {
    const existingId = await getString("dailyNotificationId");
    if (existingId) {
      await Notifications.cancelScheduledNotificationAsync(existingId);
    }
  } catch {
    // ignore
  }
};

export const scheduleWeeklySummary = async (
  summaryText: string,
  hour = 10,
  minute = 0
) => {
  if (!Notifications) return null;
  try {
    await configureAndroidChannel();
    const existingId = await getString("weeklySummaryNotificationId");
    if (existingId) {
      await Notifications.cancelScheduledNotificationAsync(existingId);
    }
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Weekly Courage Summary",
        body: summaryText,
        sound: "default",
      },
      trigger: {
        weekday: 1,
        hour,
        minute,
        repeats: true,
        channelId: "daily-dare",
      } as any,
    });
    await setString("weeklySummaryNotificationId", notificationId);
    return notificationId;
  } catch {
    return null;
  }
};

export const cancelWeeklySummary = async () => {
  if (!Notifications) return;
  try {
    const existingId = await getString("weeklySummaryNotificationId");
    if (existingId) {
      await Notifications.cancelScheduledNotificationAsync(existingId);
    }
  } catch {
    // ignore
  }
};
