import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { DareCategory, categoryStyles } from "../lib/dares";
import { setJson, setString } from "../lib/storage";

const categories = Object.keys(categoryStyles) as DareCategory[];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [foxName, setFoxName] = useState("Fox");
  const [preferredCategory, setPreferredCategory] = useState<DareCategory>("Social");

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleFinish = async () => {
    await Promise.all([
      setString("foxName", foxName.trim() || "Fox"),
      setString("preferredCategory", preferredCategory),
      setJson("onboardingComplete", true)
    ]);
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {step === 0 && (
          <View style={styles.card}>
            <Image source={require("../assets/mascot/main.png")} style={styles.mascot} />
            <Text style={styles.title}>Welcome to DareFox!</Text>
            <Text style={styles.subtitle}>
              Complete daily courage dares and grow your fox companion.
            </Text>
          </View>
        )}

        {step === 1 && (
          <View style={styles.card}>
            <Text style={styles.title}>Name Your Fox</Text>
            <Text style={styles.subtitle}>Pick a name for your brave companion.</Text>
            <TextInput
              value={foxName}
              onChangeText={setFoxName}
              style={styles.input}
              placeholder="Fox"
              placeholderTextColor="#C4A99A"
            />
          </View>
        )}

        {step === 2 && (
          <View style={styles.card}>
            <Text style={styles.title}>Pick Your Vibe</Text>
            <Text style={styles.subtitle}>Choose a category to shape your first dare.</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => {
                const active = category === preferredCategory;
                const colors = categoryStyles[category];
                return (
                  <Pressable
                    key={category}
                    onPress={() => setPreferredCategory(category)}
                    style={[
                      styles.categoryPill,
                      { backgroundColor: colors.background },
                      active && styles.categoryPillActive
                    ]}
                  >
                    <Text style={[styles.categoryText, { color: colors.text }]}>{category}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.footer}>
          {step > 0 ? (
            <Pressable onPress={handleBack} style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Back</Text>
            </Pressable>
          ) : (
            <View style={styles.spacer} />
          )}
          {step < 2 ? (
            <Pressable onPress={handleNext} style={styles.primaryButton}>
              <Text style={styles.primaryText}>Next</Text>
            </Pressable>
          ) : (
            <Pressable onPress={handleFinish} style={styles.primaryButton}>
              <Text style={styles.primaryText}>Get Started</Text>
            </Pressable>
          )}
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
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 24
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    gap: 16,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  mascot: {
    width: 160,
    height: 160,
    resizeMode: "contain"
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4A3728",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 14,
    color: "#9B8579",
    textAlign: "center",
    lineHeight: 20
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#F0E6DE",
    borderRadius: 16,
    padding: 12,
    fontSize: 16,
    color: "#4A3728",
    backgroundColor: "#FFF8F0"
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center"
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F0E6DE"
  },
  categoryPillActive: {
    borderColor: "#FF8C7C"
  },
  categoryText: {
    fontWeight: "600",
    fontSize: 12
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  primaryButton: {
    backgroundColor: "#FF8C7C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16
  },
  secondaryButton: {
    backgroundColor: "#F0E6DE",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 18
  },
  secondaryText: {
    color: "#9B8579",
    fontWeight: "600"
  },
  spacer: {
    width: 80
  }
});
