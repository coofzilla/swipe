import React, { useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

//<{}> no props
const Ball: React.FC<{}> = () => {
  const position = new Animated.ValueXY({ x: 0, y: 0 });
  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  );
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
