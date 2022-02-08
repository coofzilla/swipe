import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Card, Button, Icon } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface Data {
  id: number;
  text: string;
  uri: string;
}

interface DeckProps {
  data: Data[];
}

const Deck = ({ data }: DeckProps) => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      //called when click
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      //called whenver user drags finger across scren
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {},
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 1.75, 0, SCREEN_WIDTH * 1.75],
    outputRange: ["-120deg", "0deg", "120deg"],
  });

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <Animated.View
              style={
                index === 0 && [
                  position.getLayout(),
                  { borderWidth: 3 },
                  { transform: [{ rotate: rotate }] },
                ]
              }
              {...panResponder.panHandlers}
            >
              <Card>
                <Card.Title>{item.text}</Card.Title>
                <Card.Image source={{ uri: item.uri }} />
                <Text style={{ marginTop: 10, marginBottom: 10 }}>
                  Some information about card here
                </Text>
                <Button
                  title=" View"
                  icon={<Icon name="code" color="white" size={20} />}
                />
              </Card>
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Deck;
