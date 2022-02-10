import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";

import CardComponent from "./components/CardComponent";

const SCREEN_WIDTH = 50 + Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export interface Data {
  id: number;
  text: string;
  uri: string;
}

interface DeckProps {
  data: Data[];
  onSwipeLeft: ({}) => void;
  onSwipeRight: ({}) => void;
}

enum Directions {
  left = "left",
  right = "right",
}

const Deck = ({
  data,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
}: DeckProps) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [cardIndex, setCardIndex] = useState(0);

  const forceSwipe = (direction: Directions) => {
    const x = direction === Directions.right ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x: x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction: Directions) => {
    const item = data[cardIndex];
    direction === Directions.right ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setCardIndex((prev) => prev + 1);
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
        extraData={cardIndex}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          if (index < cardIndex) return null;

          return index === cardIndex ? (
            <Animated.View
              style={
                index === cardIndex && [
                  position.getLayout(),
                  { transform: [{ rotate: rotate }] },
                ]
              }
              {...panResponder.panHandlers}
            >
              <CardComponent item={item} cardText="Swippable" />
            </Animated.View>
          ) : (
            <View>
              <CardComponent item={item} cardText="Next" />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Deck;
