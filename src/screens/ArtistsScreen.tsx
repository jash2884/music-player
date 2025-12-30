import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { searchArtists, SaavnArtist } from "../api/saavn";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import { spacing } from "../constants/spacing";

export default function ArtistsScreen() {
  const [artists, setArtists] = useState<SaavnArtist[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    loadArtists();
  }, []);

  async function loadArtists() {
    const res = await searchArtists("arijit");
    setArtists(res);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Artists</Text>

      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ArtistDetail", {
                id: item.id,
                name: item.name,
              })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
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
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.title,
    color: colors.textPrimary,
  },
});
