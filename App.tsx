import { StyleSheet, Text, View } from "react-native";
import { DATA } from "./src/Data";
import Deck from "./src/Deck";

export default function App() {
  return (
    <View style={styles.container}>
      <Deck data={DATA} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
