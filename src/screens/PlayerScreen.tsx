import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

import { usePlayerStore } from "../store/playerStore";
import { colors } from "../constants/colors";
import { spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

export default function PlayerScreen() {
  const navigation = useNavigation<any>();

  const {
    currentSong,
    isPlaying,
    position,
    duration,
    togglePlay,
    sound,
    toggleShuffle,
    toggleRepeat,
    isShuffle,
    isRepeat,
  } = usePlayerStore();

  if (!currentSong) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>No song playing</Text>
      </View>
    );
  }

  const progress = duration ? position / duration : 0;

  return (
    <View style={styles.container}>
      {/* Artwork */}
      <Image
        source={{
          uri:
            currentSong.artwork ||
            "https://via.placeholder.com/300x300/222/999",
        }}
        style={styles.artwork}
      />

      {/* Song Info */}
      <Text style={styles.title} numberOfLines={1}>
        {currentSong.title}
      </Text>
      <Text style={styles.artist} numberOfLines={1}>
        {currentSong.artist}
      </Text>

      {/* Seek Bar */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.divider}
        thumbTintColor={colors.primary}
        onSlidingComplete={(value) => {
          if (!sound || !duration) return;
          sound.setPositionAsync(value * duration);
        }}
      />

      {/* Controls */}
      <TouchableOpacity onPress={togglePlay}>
        <Text style={styles.play}>{isPlaying ? "⏸" : "▶️"}</Text>
      </TouchableOpacity>

      {/* Modes */}
      <View style={styles.modes}>
        <TouchableOpacity onPress={toggleShuffle}>
          <Text
            style={{
              color: isShuffle ? colors.primary : colors.textSecondary,
            }}
          >
            🔀 Shuffle
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleRepeat}>
          <Text
            style={{
              color: isRepeat ? colors.primary : colors.textSecondary,
            }}
          >
            🔁 Repeat
          </Text>
        </TouchableOpacity>
      </View>

      {/* Queue */}
      <TouchableOpacity
        style={{ marginTop: spacing.md }}
        onPress={() => navigation.navigate("Queue")}
      >
        <Text style={{ color: colors.primary }}>Open Queue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  artwork: {
    width: 280,
    height: 280,
    borderRadius: 16,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  artist: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  slider: {
    width: "100%",
    marginBottom: spacing.lg,
  },
  play: {
    fontSize: 56,
    color: colors.primary,
  },
  modes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: spacing.md,
  },
  empty: {
    ...typography.title,
    color: colors.textSecondary,
  },
});
