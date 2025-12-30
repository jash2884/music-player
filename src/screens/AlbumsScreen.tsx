import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";

export default function AlbumsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Albums Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...typography.title,
    color: colors.textSecondary,
  },
});
