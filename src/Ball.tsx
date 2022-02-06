import React from "react";
import { View, Animated, Text, StyleSheet } from "react-native";
interface BallProps {}

const Ball: React.FC<BallProps> = () => {
  return <View style={styles.ball} />;
};

export default Ball;

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "black",
  },
});
