import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { usePlayerStore } from "../store/playerStore";
import { colors } from "../constants/colors";
import { spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

export default function QueueScreen() {
  const queue = usePlayerStore((s) => s.queue);
  const playSong = usePlayerStore((s) => s.playSong);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Queue</Text>

      {queue.length === 0 ? (
        <Text style={styles.empty}>Queue is empty</Text>
      ) : (
        <FlatList
          data={queue}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => playSong(item)}
            >
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {item.artist}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  empty: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
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
});
