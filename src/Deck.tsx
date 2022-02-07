import React, { useEffect } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Text,
  StyleSheet,
} from "react-native";

interface DeckProps {
  onSwipeRight: () => {};
  onSwipeLeft: () => {};
}

const Deck = ({}: DeckProps) => {
  return (
    <View>
      <Text>Swipe Deck</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Deck;
