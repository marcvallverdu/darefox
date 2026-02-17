import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { PetDisplay } from "../../components/PetDisplay";
import { getLevelFromXp } from "../../lib/pet";
import { getNumber } from "../../lib/storage";

export default function PetScreen() {
  const [xp, setXp] = useState(0);

  const loadPet = useCallback(async () => {
    const storedXp = await getNumber("petXp");
    setXp(storedXp);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPet();
    }, [loadPet])
  );

  const pet = getLevelFromXp(xp);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Fox Companion</Text>
        <Text style={styles.subtitle}>Grow courage by completing dares.</Text>
      </View>
      <View style={styles.content}>
        <PetDisplay xp={xp} />
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total XP</Text>
            <Text style={styles.statValue}>{pet.xp}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Current Level</Text>
            <Text style={styles.statValue}>{pet.level}</Text>
          </View>
        </View>
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
  stats: {
    flexDirection: "row",
    gap: 12
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#0B1A26",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  statLabel: {
    fontSize: 12,
    color: "#888888"
  },
  statValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A"
  }
});
