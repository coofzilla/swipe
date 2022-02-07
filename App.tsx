import { StyleSheet, Text, View } from "react-native";
import { DATA } from "./src/Data";
import Deck from "./src/Deck";

export default function App() {
  const renderCard = (item: any) => {
    return <Text>{item.text}</Text>;
  };

  return (
    <View style={styles.container}>
      <Deck data={DATA} renderCard={renderCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
