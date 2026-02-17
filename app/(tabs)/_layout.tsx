import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E3E6EA",
          height: 64,
          paddingBottom: 10,
          paddingTop: 8
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#888888",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" }
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
