import { StyleSheet, Text, View } from "react-native";
import Ball from "./src/Ball";
import Deck from "./src/Deck";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Ball /> */}
      <Deck />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
