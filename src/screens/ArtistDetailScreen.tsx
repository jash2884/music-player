import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import { getArtistSongs, SaavnArtistSong } from "../api/saavn";
import { usePlayerStore } from "../store/playerStore";
import { getBestAudioUrl } from "../utils/audio";

export default function ArtistDetailScreen() {
  const route = useRoute<any>();
  const { id, name } = route.params;

  const [songs, setSongs] = useState<SaavnArtistSong[]>([]);
  const playSong = usePlayerStore((s) => s.playSong);

  useEffect(() => {
    loadSongs();
  }, []);

  async function loadSongs() {
    const res = await getArtistSongs(id);
    setSongs(res);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const audioUrl = getBestAudioUrl(item.downloadUrl);

          return (
            <TouchableOpacity
              style={styles.song}
              onPress={async () => {
                if (!audioUrl) return;

                await playSong({
                  id: item.id,
                  title: item.name,
                  artist: item.primaryArtists,
                  artwork: item.image?.at(-1)?.link ?? "",
                  url: audioUrl,
                });
              }}
            >
              <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "600", marginBottom: 12 },
  song: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  title: { fontSize: 15 },
});
