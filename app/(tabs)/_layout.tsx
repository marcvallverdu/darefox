import { Tabs } from "expo-router";
import { Text } from "react-native";
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
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" }
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
          tabBarIcon: ({ color }) => <TabIcon label="🏠" color={color} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <TabIcon label="📜" color={color} />
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <TabIcon label="📊" color={color} />
        }}
      />
      <Tabs.Screen
        name="pet"
        options={{
          title: "Pet",
          tabBarIcon: ({ color }) => <TabIcon label="🦊" color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabIcon label="⚙️" color={color} />
        }}
      />
    </Tabs>
  );
}

const TabIcon = ({ label, color }: { label: string; color: string }) => (
  <Text style={{ color, fontSize: 18 }}>{label}</Text>
);
