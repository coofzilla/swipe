import React, { useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import CardComponent from "./components/CardComponent";
import renderNoMoreCards from "../utils/renderNoMoreCards";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";

const SWIPE_THRESHOLD = 0.25 * ScreenWidth;
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

  useLayoutEffect(() => {
    //Android bug fix
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [cardIndex]);

  const forceSwipe = (direction: Directions) => {
    const x = direction === Directions.right ? ScreenWidth : -ScreenWidth;
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
    inputRange: [-ScreenWidth * 1.5, 0, ScreenWidth * 1.5],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  const renderCards = () => {
    return data
      .map((item, i) => {
        if (i < cardIndex) return null;

        if (i === cardIndex) {
          return (
            <Animated.View
              key={item.id}
              style={[
                position.getLayout(),
                { transform: [{ rotate: rotate }] },
              ]}
              {...panResponder.panHandlers}
            >
              <CardComponent item={item} cardText="Swipe Me" />
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, { top: 10 * (i - cardIndex) }]}
          >
            <CardComponent item={item} cardText="Next" />
          </Animated.View>
        );
      })
      .reverse();
  };

  return (
    <SafeAreaView>
      {renderNoMoreCards(cardIndex, data.length, setCardIndex)}
      <View>{renderCards()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: ScreenWidth,
  },
});

export default Deck;
