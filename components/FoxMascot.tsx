import { useEffect, useRef, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { Asset } from "expo-asset";

// Try to import Rive — fails gracefully in Expo Go
let RiveComponent: any = null;
let Fit: any = null;
let riveAvailable = false;

try {
  const rive = require("rive-react-native");
  RiveComponent = rive.default ?? rive.Rive;
  Fit = rive.Fit;
  riveAvailable = true;
} catch {
  // Expo Go — fall back to static images
}

export type FoxMood = "idle" | "celebrate" | "sleep" | "brave" | "timid";

const MOOD_MAP: Record<FoxMood, number> = {
  idle: 0,
  celebrate: 1,
  sleep: 2,
  brave: 3,
  timid: 4,
};

const FALLBACK_IMAGES: Record<FoxMood, ImageSourcePropType> = {
  idle: require("../assets/mascot/main.png"),
  celebrate: require("../assets/mascot/celebrate.png"),
  sleep: require("../assets/mascot/sleep.png"),
  brave: require("../assets/mascot/brave.png"),
  timid: require("../assets/mascot/timid.png"),
};

interface FoxMascotProps {
  mood: FoxMood;
  triggerCelebrate?: boolean;
  size?: number;
}

export function FoxMascot({ mood, triggerCelebrate, size = 120 }: FoxMascotProps) {
  const riveRef = useRef<any>(null);
  const [useRive, setUseRive] = useState(riveAvailable);
  const [riveUri, setRiveUri] = useState<string | null>(null);
  const prevCelebrate = useRef(false);

  // Load .riv asset URI
  useEffect(() => {
    if (!riveAvailable) return;
    let cancelled = false;
    (async () => {
      try {
        const asset = Asset.fromModule(require("../assets/darefox.riv"));
        await asset.downloadAsync();
        if (!cancelled && asset.localUri) {
          setRiveUri(asset.localUri);
        }
      } catch {
        if (!cancelled) setUseRive(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Update mood via state machine input
  useEffect(() => {
    if (!useRive || !riveRef.current) return;
    try {
      riveRef.current.setInputState("FoxController", "mood", MOOD_MAP[mood] ?? 0);
    } catch {
      // ignore if state machine not ready
    }
  }, [mood, useRive]);

  // Fire celebrate trigger
  useEffect(() => {
    if (!useRive || !riveRef.current) return;
    if (triggerCelebrate && !prevCelebrate.current) {
      try {
        riveRef.current.fireState("FoxController", "dareComplete");
      } catch {
        // ignore
      }
    }
    prevCelebrate.current = !!triggerCelebrate;
  }, [triggerCelebrate, useRive]);

  // Rive version
  if (useRive && RiveComponent && riveUri) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <RiveComponent
          ref={riveRef}
          url={riveUri}
          stateMachineName="FoxController"
          fit={Fit?.Contain ?? "contain"}
          style={{ width: size, height: size }}
          onError={() => setUseRive(false)}
        />
      </View>
    );
  }

  // Fallback: static PNG
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={FALLBACK_IMAGES[mood]}
        style={{ width: size, height: size, resizeMode: "contain" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
