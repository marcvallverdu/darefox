import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getJson } from "../lib/storage";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const completed = await getJson<boolean>("onboardingComplete", false);
      setOnboardingComplete(completed);
      setReady(true);
    };
    load();
  }, []);

  useEffect(() => {
    if (ready && !onboardingComplete) {
      router.replace("/onboarding");
    }
  }, [ready, onboardingComplete, router]);

  if (!ready) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0"
  }
});
