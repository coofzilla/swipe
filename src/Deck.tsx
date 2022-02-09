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

const SCREEN_WIDTH = 50 + Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

interface Data {
  id: number;
  text: string;
  uri: string;
}

interface DeckProps {
  data: Data[];
}

type Direction = "left" | "right";

enum Directions {
  left = "left",
  right = "right",
}

const Deck = ({ data }: DeckProps) => {
  const position = useRef(new Animated.ValueXY()).current;

  const forceSwipe = (direction: Direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x: x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      //called when click
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      //called whenver user drags finger across scren
      onPanResponderMove: Animated.event(
        [
          //ignore native event
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          forceSwipe(Directions.right);
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          forceSwipe(Directions.left);
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    outputRange: ["-15deg", "0deg", "15deg"],
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
                  { transform: [{ rotate: rotate }] },
                ]
              }
              {...panResponder.panHandlers}
            >
              <Card containerStyle={{ borderWidth: 3 }}>
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
