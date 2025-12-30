import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { searchSongs, SaavnSong } from "../api/saavn";
import { usePlayerStore } from "../store/playerStore";
import { getBestAudioUrl } from "../utils/audio";
import { colors } from "../constants/colors";
import { spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

export default function HomeScreen() {
  const [songs, setSongs] = useState<SaavnSong[]>([]);
  const playSong = usePlayerStore((s) => s.playSong);
  const addToQueue = usePlayerStore((s) => s.addToQueue);
  const navigation = useNavigation<any>();

  useEffect(() => {
    loadSongs();
  }, []);

  async function loadSongs() {
    const results = await searchSongs("arijit");
    setSongs(results);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Songs</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const audioUrl = getBestAudioUrl(item.downloadUrl);
          const imageUrl = item.image?.at(-1)?.link;

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={async () => {
                if (!audioUrl) return;

                await playSong({
                  id: item.id,
                  title: item.name,
                  artist: item.primaryArtists,
                  artwork: imageUrl ?? "",
                  url: audioUrl,
                });

                navigation.navigate("Player");
              }}
              onLongPress={() => {
                if (!audioUrl) return;

                addToQueue({
                  id: item.id,
                  title: item.name,
                  artist: item.primaryArtists,
                  artwork: imageUrl ?? "",
                  url: audioUrl,
                });
              }}
            >
              {/* Album Art */}
              <Image
                source={{
                  uri: imageUrl ?? "https://via.placeholder.com/60x60/222/999",
                }}
                style={styles.artwork}
              />

              {/* Song Info */}
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                  {item.primaryArtists}
                </Text>
              </View>

              {/* Play Indicator */}
              <View style={styles.playIcon}>
                <Text style={{ color: colors.primary }}>▶</Text>
              </View>
            </TouchableOpacity>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  header: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  list: {
    paddingBottom: 120, // space for mini player
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  artwork: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#222",
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  artist: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  playIcon: {
    marginLeft: spacing.sm,
  },
});
