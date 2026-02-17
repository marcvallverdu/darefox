import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFF8F0",
          borderTopColor: "#F0E6DE",
          height: 88,
          paddingBottom: 28,
          paddingTop: 8
        },
        tabBarActiveTintColor: "#FF8C7C",
        tabBarInactiveTintColor: "#C4A99A",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" }
      }}
      screenListeners={{
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabIconHome color={color} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <TabIconHistory color={color} />
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <TabIconStats color={color} />
        }}
      />
      <Tabs.Screen
        name="pet"
        options={{
          title: "Pet",
          tabBarIcon: ({ color }) => <TabIconPet color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabIconSettings color={color} />
        }}
      />
    </Tabs>
  );
}

// Simple geometric tab icons — no emoji, no external deps

const TabIconHome = ({ color }: { color: string }) => (
  <View style={s.iconWrap}>
    {/* House shape */}
    <View style={[s.homeRoof, { borderBottomColor: color }]} />
    <View style={[s.homeBody, { backgroundColor: color }]} />
  </View>
);

const TabIconHistory = ({ color }: { color: string }) => (
  <View style={s.iconWrap}>
    {/* Clock circle with hands */}
    <View style={[s.clockCircle, { borderColor: color }]}>
      <View style={[s.clockHandV, { backgroundColor: color }]} />
      <View style={[s.clockHandH, { backgroundColor: color }]} />
    </View>
  </View>
);

const TabIconStats = ({ color }: { color: string }) => (
  <View style={[s.iconWrap, { flexDirection: "row", alignItems: "flex-end", gap: 2 }]}>
    <View style={[s.bar, { height: 8, backgroundColor: color }]} />
    <View style={[s.bar, { height: 14, backgroundColor: color }]} />
    <View style={[s.bar, { height: 20, backgroundColor: color }]} />
  </View>
);

const TabIconPet = ({ color }: { color: string }) => (
  <View style={s.iconWrap}>
    {/* Fox face: triangle ears + circle */}
    <View style={{ flexDirection: "row", gap: 6, marginBottom: -3 }}>
      <View style={[s.foxEar, { borderBottomColor: color }]} />
      <View style={[s.foxEar, { borderBottomColor: color }]} />
    </View>
    <View style={[s.foxFace, { backgroundColor: color }]} />
  </View>
);

const TabIconSettings = ({ color }: { color: string }) => (
  <View style={s.iconWrap}>
    {/* Gear: circle with notches */}
    <View style={[s.gearOuter, { borderColor: color }]}>
      <View style={[s.gearInner, { backgroundColor: color }]} />
    </View>
  </View>
);

const s = StyleSheet.create({
  iconWrap: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  // Home
  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  },
  homeBody: {
    width: 14,
    height: 10,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    marginTop: -1
  },
  // Clock
  clockCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  clockHandV: {
    position: "absolute",
    width: 2,
    height: 6,
    top: 3,
    borderRadius: 1
  },
  clockHandH: {
    position: "absolute",
    width: 5,
    height: 2,
    right: 3,
    top: 7,
    borderRadius: 1
  },
  // Stats bars
  bar: {
    width: 5,
    borderRadius: 2
  },
  // Fox
  foxEar: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  },
  foxFace: {
    width: 16,
    height: 12,
    borderRadius: 8
  },
  // Gear
  gearOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center"
  },
  gearInner: {
    width: 6,
    height: 6,
    borderRadius: 3
  }
});
