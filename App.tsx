import { StyleSheet, Text, View } from "react-native";
import CardComponent from "./src/components/CardComponent";
import { DATA } from "./src/Data";
import Deck from "./src/Deck";

export default function App() {
  return (
    <View style={styles.container}>
      <Deck data={DATA} onSwipeLeft={() => {}} onSwipeRight={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
