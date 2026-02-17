import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { getString, setString } from "./storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export const ensureNotificationPermissions = async () => {
  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }

  const request = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowSound: true, allowBadge: false }
  });

  return request.granted || request.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
};

export const configureAndroidChannel = async () => {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync("daily-dare", {
    name: "Daily Dare",
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF8C7C"
  });
};

export const scheduleDailyReminder = async (dareText: string, hour = 8, minute = 0) => {
  await configureAndroidChannel();
  const existingId = await getString("dailyNotificationId");
  if (existingId) {
    await Notifications.cancelScheduledNotificationAsync(existingId);
  }
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Today's Dare",
      body: dareText,
      sound: "default"
    },
    trigger: { type: "daily", hour, minute, channelId: "daily-dare" } as any
  });
  await setString("dailyNotificationId", notificationId);
  return notificationId;
};

export const cancelDailyReminder = async () => {
  const existingId = await getString("dailyNotificationId");
  if (existingId) {
    await Notifications.cancelScheduledNotificationAsync(existingId);
  }
};

export const scheduleWeeklySummary = async (summaryText: string, hour = 10, minute = 0) => {
  await configureAndroidChannel();
  const existingId = await getString("weeklySummaryNotificationId");
  if (existingId) {
    await Notifications.cancelScheduledNotificationAsync(existingId);
  }
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Weekly Courage Summary",
      body: summaryText,
      sound: "default"
    },
    trigger: { weekday: 1, hour, minute, repeats: true, channelId: "daily-dare" } as any
  });
  await setString("weeklySummaryNotificationId", notificationId);
  return notificationId;
};

export const cancelWeeklySummary = async () => {
  const existingId = await getString("weeklySummaryNotificationId");
  if (existingId) {
    await Notifications.cancelScheduledNotificationAsync(existingId);
  }
};
