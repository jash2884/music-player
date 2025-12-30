import { NavigationContainer } from "@react-navigation/native";
import QueueScreen from "../screens/QueueScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import PlayerScreen from "../screens/PlayerScreen";
import MiniPlayer from "../components/MiniPlayer";
import ArtistDetailScreen from "../screens/ArtistDetailScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Queue" component={QueueScreen} />

        <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
      </Stack.Navigator>

      {/* 👇 GLOBAL MINI PLAYER */}
      <MiniPlayer />
    </NavigationContainer>
  );
}
