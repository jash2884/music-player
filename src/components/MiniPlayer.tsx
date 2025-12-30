import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePlayerStore } from "../store/playerStore";
import { colors } from "../constants/colors"; // ✅ REQUIRED

export default function MiniPlayer() {
  const navigation = useNavigation<any>();
  const { currentSong, isPlaying, togglePlay } = usePlayerStore();

  if (!currentSong) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Player")}
    >
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {currentSong.title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {currentSong.artist}
        </Text>
      </View>

      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
      >
        <Text style={styles.control}>{isPlaying ? "⏸" : "▶️"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderColor: colors.divider,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  artist: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  control: {
    fontSize: 22,
    color: colors.primary,
  },
});
