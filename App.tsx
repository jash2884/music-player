import "react-native-gesture-handler";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";

import RootNavigator from "./src/navigation/RootNavigator";
import { usePlayerStore } from "./src/store/playerStore";
import { colors } from "./src/constants/colors";

export default function App() {
  const hydrateQueue = usePlayerStore((s) => s.hydrateQueue);

  useEffect(() => {
    hydrateQueue();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor={colors.background} />
        <RootNavigator />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
