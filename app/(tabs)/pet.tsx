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
  stats: {
    flexDirection: "row",
    gap: 12
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#E8C4A8",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  statLabel: {
    fontSize: 12,
    color: "#9B8579"
  },
  statValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "600",
    color: "#4A3728"
  }
});
