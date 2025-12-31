import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { searchSongs, SaavnSong } from "../api/saavn";
import { getBestAudioUrl } from "../utils/audio";
import { usePlayerStore } from "../store/playerStore";

import { colors } from "../constants/colors";
import { spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

export default function HomeScreen() {
  const [songs, setSongs] = useState<SaavnSong[]>([]);
  const navigation = useNavigation<any>();

  const playSong = usePlayerStore((s) => s.playSong);
  const addToQueue = usePlayerStore((s) => s.addToQueue);

  useEffect(() => {
    loadSongs();
  }, []);

  async function loadSongs() {
    const results = await searchSongs("arijit");
    setSongs(results);
  }

  const renderRightActions = (onAdd: () => void) => (
    <TouchableOpacity style={styles.swipeAction} onPress={onAdd}>
      <Text style={styles.swipeText}>Add to Queue</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Songs</Text>

      <FlatList
        data={songs}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => {
          const audioUrl = getBestAudioUrl(item.downloadUrl);
          if (!audioUrl) return null;

          const song = {
            id: item.id,
            title: item.name,
            artist: item.primaryArtists,
            artwork: item.image?.at(-1)?.link ?? "",
            url: audioUrl,
          };

          return (
            <Swipeable
              renderRightActions={() =>
                renderRightActions(() => addToQueue(song))
              }
            >
              <TouchableOpacity
                style={styles.song}
                onPress={async () => {
                  await playSong(song);
                  navigation.navigate("Player");
                }}
              >
                <Text style={styles.title} numberOfLines={1}>
                  {song.title}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                  {song.artist}
                </Text>
              </TouchableOpacity>
            </Swipeable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  song: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  artist: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  swipeAction: {
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    borderRadius: 10,
    marginBottom: spacing.sm,
  },
  swipeText: {
    color: "white",
    fontWeight: "600",
  },
});
