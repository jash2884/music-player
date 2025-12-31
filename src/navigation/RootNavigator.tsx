import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import PlayerScreen from "../screens/PlayerScreen";
import QueueScreen from "../screens/QueueScreen";
import ArtistDetailScreen from "../screens/ArtistDetailScreen";
import MiniPlayer from "../components/MiniPlayer";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Queue" component={QueueScreen} />
        <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
      </Stack.Navigator>

      {/* 🌍 Global Mini Player (outside navigation stack) */}
      <MiniPlayer />
    </>
  );
}
