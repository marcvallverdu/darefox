import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

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
    lightColor: "#4CAF50"
  });
};

export const scheduleDailyReminder = async (dareText: string, hour = 8, minute = 0) => {
  await configureAndroidChannel();
  await Notifications.cancelAllScheduledNotificationsAsync();
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Today's Dare",
      body: dareText,
      sound: "default"
    },
    trigger: { type: "daily", hour, minute, channelId: "daily-dare" } as any
  });
};

export const cancelDailyReminder = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
